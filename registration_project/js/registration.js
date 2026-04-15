// Глобальные переменные
let currentStep = 0;
let isCodeVerified = false;
const CORRECT_CODE = "1234"; // Код для проверки

// Получаем все фреймы
const frames = {
    start: document.getElementById('frame_0'),
    step1: document.getElementById('frame_1'),
    step2: document.getElementById('frame_2'),
    step3: document.getElementById('frame_3'),
    final: document.getElementById('frame_4')
};

// Функция для переключения фреймов
function showFrame(frameId) {
    // Скрываем все фреймы
    Object.values(frames).forEach(frame => {
        frame.classList.remove('active');
    });
    
    // Показываем нужный фрейм
    frames[frameId].classList.add('active');
    
    // Обновляем индикатор прогресса
    updateProgressIndicator(frameId);
}

// Функция обновления индикатора прогресса
function updateProgressIndicator(frameId) {
    const steps = document.querySelectorAll('.progress-step');
    const lines = document.querySelectorAll('.progress-line');
    
    let activeStepIndex;
    switch(frameId) {
        case 'start':
            activeStepIndex = 0;
            break;
        case 'step1':
            activeStepIndex = 1;
            break;
        case 'step2':
            activeStepIndex = 2;
            break;
        case 'step3':
            activeStepIndex = 3;
            break;
        case 'final':
            activeStepIndex = 4;
            break;
    }
    
    steps.forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index < activeStepIndex) {
            step.classList.add('completed');
        } else if (index === activeStepIndex) {
            step.classList.add('active');
        }
    });
    
    lines.forEach((line, index) => {
        if (index < activeStepIndex - 1) {
            line.classList.add('completed');
        } else {
            line.classList.remove('completed');
        }
    });
}

// НАВИГАЦИЯ
// Начало регистрации
document.getElementById('startRegistration').addEventListener('click', function() {
    showFrame('step1');
});

// Отмена - возврат на стартовую
document.getElementById('cancelToStart').addEventListener('click', function() {
    showFrame('start');
});

// Шаг 1 -> Шаг 2
document.getElementById('nextToStep2').addEventListener('click', function() {
    showFrame('step2');
});

// Шаг 2 -> Шаг 1
document.getElementById('backToStep1').addEventListener('click', function() {
    showFrame('step1');
});

// Шаг 2 -> Шаг 3
document.getElementById('nextToStep3').addEventListener('click', function() {
    showFrame('step3');
});

// Шаг 3 -> Шаг 2
document.getElementById('backToStep2').addEventListener('click', function() {
    showFrame('step2');
});

// Завершение регистрации
document.getElementById('finishRegistration').addEventListener('click', function() {
    showFrame('final');
});

const personalDataInputs = {
    firstName: document.getElementById('firstName'),
    lastName: document.getElementById('lastName'),
    email: document.getElementById('email'),
    country: document.getElementById('country'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword')
};

const nextButton = document.getElementById('nextToStep2');
const passwordError = document.getElementById('passwordError');

function validateStep1() {
    // Проверяем все поля на заполненность
    const allFilled = Object.values(personalDataInputs).every(input => input.value.trim() !== '');
    
    // Проверяем совпадение паролей
    const passwordsMatch = personalDataInputs.password.value === personalDataInputs.confirmPassword.value;
    
    if (!passwordsMatch) {
        passwordError.textContent = 'Пароли не совпадают';
    } else {
        passwordError.textContent = '';
    }
    
    // Проверяем email
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalDataInputs.email.value);
    
    if (!emailValid && personalDataInputs.email.value.trim() !== '') {
        passwordError.textContent = 'Введите корректный email';
    }
    
    // Активируем кнопку только если все условия выполнены
    nextButton.disabled = !(allFilled && passwordsMatch && emailValid);
}

// Добавляем слушатели на все поля
Object.values(personalDataInputs).forEach(input => {
    input.addEventListener('input', validateStep1);
});

const phoneNumber = document.getElementById('phoneNumber');
const sendCodeBtn = document.getElementById('sendCodeBtn');
const codeSection = document.getElementById('codeSection');
const smsCode = document.getElementById('smsCode');
const verifyCodeBtn = document.getElementById('verifyCodeBtn');
const codeError = document.getElementById('codeError');
const nextToStep3Btn = document.getElementById('nextToStep3');

// Отправка кода
sendCodeBtn.addEventListener('click', function() {
    const phone = phoneNumber.value.trim();
    
    // Простая проверка номера телефона
    if (phone.length >= 10) {
        codeSection.classList.remove('hidden');
        sendCodeBtn.disabled = true;
        sendCodeBtn.textContent = 'Код отправлен';
        codeError.textContent = '';
    } else {
        codeError.textContent = 'Введите корректный номер телефона';
    }
});

// Проверка кода
verifyCodeBtn.addEventListener('click', function() {
    const code = smsCode.value.trim();
    
    if (code === CORRECT_CODE) {
        isCodeVerified = true;
        codeError.textContent = '✓ Код верный';
        codeError.style.color = '#4CAF50';
        verifyCodeBtn.disabled = true;
        nextToStep3Btn.disabled = false;
    } else {
        codeError.textContent = 'Неверный код';
        codeError.style.color = '#f44336';
        isCodeVerified = false;
        nextToStep3Btn.disabled = true;
    }
});

// Автоматический переход между полями ввода карты
const cardInputs = document.querySelectorAll('.card-part');

cardInputs.forEach((input, index) => {
    input.addEventListener('input', function() {
        // Разрешаем только цифры
        this.value = this.value.replace(/\D/g, '');
        
        // Автоматический переход к следующему полю
        if (this.value.length === 4 && index < cardInputs.length - 1) {
            cardInputs[index + 1].focus();
        }
    });
    
    input.addEventListener('keydown', function(e) {
        // Переход назад по Backspace если поле пустое
        if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
            cardInputs[index - 1].focus();
        }
    });
});

// Форматирование срока действия
const expiryDate = document.getElementById('expiryDate');
expiryDate.addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    this.value = value;
});

// Разрешаем только цифры для CVV
const cvv = document.getElementById('cvv');
cvv.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');
});

// Валидация формы оплаты
const paymentForm = document.getElementById('paymentForm');
const finishBtn = document.getElementById('finishRegistration');

paymentForm.addEventListener('input', function() {
    const cardHolder = document.getElementById('cardHolder').value.trim();
    const allCardPartsFilled = Array.from(cardInputs).every(input => input.value.length === 4);
    const expiryFilled = /^\d{2}\/\d{2}$/.test(expiryDate.value);
    const cvvFilled = cvv.value.length === 3;
    
    finishBtn.disabled = !(cardHolder && allCardPartsFilled && expiryFilled && cvvFilled);
});

// Инициализация - показываем стартовый фрейм
showFrame('start');