// Список стран для выпадающего списка
const countriesList = [
    "Россия",
    "США",
    "Канада",
    "Великобритания",
    "Германия",
    "Франция",
    "Италия",
    "Испания",
    "Китай",
    "Япония",
    "Южная Корея",
    "Индия",
    "Бразилия",
    "Мексика",
    "Австралия",
    "Нидерланды",
    "Швейцария",
    "Швеция",
    "Норвегия",
    "Дания",
    "Финляндия",
    "Польша",
    "Чехия",
    "Австрия",
    "Бельгия",
    "Португалия",
    "Греция",
    "Турция",
    "ОАЭ",
    "Саудовская Аравия",
    "Израиль",
    "ЮАР",
    "Аргентина",
    "Чили",
    "Колумбия"
];

// Функция для заполнения выпадающего списка стран
function populateCountries() {
    const countrySelect = document.getElementById('country');
    
    countriesList.forEach(function(country) {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });
}

// Заполняем список при загрузке страницы
document.addEventListener('DOMContentLoaded', populateCountries);