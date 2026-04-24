import { getData } from './humansData.js';

// Глобальные переменные
let allData = [];
let currentFilter = 'all';

// DOM элементы
const tableBody = document.getElementById('table-body');
const loadBtn = document.getElementById('load-btn');
const genderFilter = document.getElementById('gender-filter');
const addBtn = document.getElementById('add-btn');
const deleteBtn = document.getElementById('delete-selected-btn');
const selectAll = document.getElementById('select-all');
const modal = document.getElementById('modal');
const editForm = document.getElementById('edit-form');
const cancelBtn = document.getElementById('cancel-btn');

// Функция для определения цвета строки по возрасту
function getAgeColor(age) {
    if (age < 18) return 'green';
    if (age >= 18 && age <= 60) return 'yellow';
    return 'red';
}

// Функция отображения данных в таблице
function renderTable(data) {
    tableBody.innerHTML = '';
    
    data.forEach((human, index) => {
        const row = document.createElement('tr');
        row.className = getAgeColor(human.age);
        
        row.innerHTML = `
            <td><input type="checkbox" class="row-select" data-index="${index}"></td>
            <td>${human.firstName}</td>
            <td>${human.lastName}</td>
            <td>${human.age}</td>
            <td>${human.gender === 'Male' ? 'Мужской' : 'Женский'}</td>
            <td>${human.address}</td>
            <td>${human.phone}</td>
            <td>
                <button class="edit-btn" data-index="${index}">Редактировать</button>
                <button class="delete-btn" data-index="${index}">Удалить</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Обновляем обработчики событий
    attachEventHandlers();
}

// Прикрепление обработчиков событий к кнопкам в таблице
function attachEventHandlers() {
    // Кнопки редактирования
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            openEditModal(index);
        });
    });
    
    // Кнопки удаления
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            deleteRow(index);
        });
    });
}

// Фильтрация данных по полу
function filterData() {
    if (currentFilter === 'all') {
        renderTable(allData);
    } else {
        const filtered = allData.filter(human => {
            if (currentFilter === 'male') return human.gender === 'Male';
            if (currentFilter === 'female') return human.gender === 'Female';
            return true;
        });
        renderTable(filtered);
    }
}

// Удаление одной строки
function deleteRow(index) {
    allData.splice(index, 1);
    filterData();
}

// Удаление выбранных строк
function deleteSelected() {
    const checkboxes = document.querySelectorAll('.row-select:checked');
    const indices = Array.from(checkboxes).map(cb => parseInt(cb.dataset.index));
    
    // Удаляем с конца, чтобы не сбивать индексы
    indices.sort((a, b) => b - a).forEach(index => {
        allData.splice(index, 1);
    });
    
    filterData();
}

// Открытие модального окна для добавления/редактирования
function openEditModal(index = null) {
    const title = document.getElementById('modal-title');
    const editIndex = document.getElementById('edit-index');
    
    if (index !== null) {
        // Редактирование существующей записи
        title.textContent = 'Редактировать запись';
        editIndex.value = index;
        
        const human = allData[index];
        document.getElementById('edit-firstname').value = human.firstName;
        document.getElementById('edit-lastname').value = human.lastName;
        document.getElementById('edit-age').value = human.age;
        document.getElementById('edit-gender').value = human.gender === 'Male' ? 'male' : 'female';
        document.getElementById('edit-address').value = human.address;
        document.getElementById('edit-phone').value = human.phone;
    } else {
        // Добавление новой записи
        title.textContent = 'Добавить запись';
        editIndex.value = '';
        editForm.reset();
    }
    
    modal.style.display = 'flex';
}

// Закрытие модального окна
function closeModal() {
    modal.style.display = 'none';
}

// Сохранение записи
function saveRecord(e) {
    e.preventDefault();
    
    const editIndex = document.getElementById('edit-index').value;
    const human = {
        firstName: document.getElementById('edit-firstname').value,
        lastName: document.getElementById('edit-lastname').value,
        age: parseInt(document.getElementById('edit-age').value),
        gender: document.getElementById('edit-gender').value === 'male' ? 'Male' : 'Female',
        address: document.getElementById('edit-address').value,
        phone: document.getElementById('edit-phone').value
    };
    
    if (editIndex !== '') {
        // Редактирование
        allData[parseInt(editIndex)] = human;
    } else {
        // Добавление
        allData.push(human);
    }
    
    closeModal();
    filterData();
}

// Обработчики событий
loadBtn.addEventListener('click', async () => {
    loadBtn.disabled = true;
    loadBtn.textContent = 'Загрузка...';
    
    try {
        allData = await getData();
        filterData();
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        alert('Ошибка при загрузке данных');
    } finally {
        loadBtn.disabled = false;
        loadBtn.textContent = 'Загрузить данные';
    }
});

genderFilter.addEventListener('change', (e) => {
    currentFilter = e.target.value;
    filterData();
});

addBtn.addEventListener('click', () => openEditModal());

deleteBtn.addEventListener('click', deleteSelected);

selectAll.addEventListener('change', (e) => {
    const checkboxes = document.querySelectorAll('.row-select');
    checkboxes.forEach(cb => cb.checked = e.target.checked);
});

cancelBtn.addEventListener('click', closeModal);

editForm.addEventListener('submit', saveRecord);

// Закрытие модального окна при клике вне его
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});