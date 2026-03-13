// АСИНХРОННОСТЬ 
// Задание 1


//Проверяет, является ли буква гласной (a, e, i, o, u, y)
function isVowel(char) {
    return 'aeiouy'.includes(char);
}

//Функция проверки пароля
function ask_password(login, password, success, failure) {
    // приводим к нижнему регистру
    login = login.toLowerCase();
    password = password.toLowerCase();
    
    // выделяем гласные и согласные из логина
    let loginConsonants = '';
    let loginVowelCount = 0;
    
    for (let i = 0; i < login.length; i++) {
        if (isVowel(login[i])) {
            loginVowelCount++;
        } else {
            loginConsonants += login[i];
        }
    }
    
    // выделяем гласные и согласные из пароля
    let passwordConsonants = '';
    let passwordVowelCount = 0;
    
    for (let i = 0; i < password.length; i++) {
        if (isVowel(password[i])) {
            passwordVowelCount++;
        } else {
            passwordConsonants += password[i];
        }
    }
    
    // Проверяем условия
    const vowelCondition = (passwordVowelCount === 3);
    const consonantCondition = (passwordConsonants === loginConsonants);
    
    // Вызываем соответствующий коллбэк
    if (vowelCondition && consonantCondition) {
        success(login);
    } else if (!vowelCondition && !consonantCondition) {
        failure(login, "Everything is wrong");
    } else if (!vowelCondition) {
        failure(login, "Wrong number of vowels");
    } else {
        failure(login, "Wrong consonants");
    }
}

//Основная функция
function main(login, password) {
    ask_password(
        login, 
        password,
        // success callback
        function(login) {
            console.log("Привет, " + login + "!");
        },
        // failure callback
        function(login, errorMessage) {
            console.log("Кто-то пытался притвориться пользователем " + login + 
                       ", но в пароле допустил ошибку: " + errorMessage.toUpperCase() + ".");
        }
    );
}


console.log("=== Примеры из задания ===");
main("login", "aaalgn"); 
main("login", "luagon"); 
console.log("\n=== Проверка ошибок ===");
main("login", "lgn");
main("login", "aaaabc");
main("login", "xyz");





// Задание 2
// Асинхронные функции
function readConfig(name, callback) {
    setTimeout(() => {
        console.log('(1) config from ' + name + ' loaded')
        callback()
    }, Math.floor(Math.random() * 1000))
}

function doQuery(statement, callback) {
    setTimeout(() => {
        console.log('(2) SQL query executed: ' + statement)
        callback()
    }, Math.floor(Math.random() * 1000))
}

function httpGet(url, callback) {
    setTimeout(() => {
        console.log('(3) Page retrieved: ' + url)
        callback()
    }, Math.floor(Math.random() * 1000))
}

function readFile(path, callback) {
    setTimeout(() => {
        console.log('(4) Readme file from ' + path + ' loaded')
        callback()
    }, Math.floor(Math.random() * 1000))
}

function callback() {
    console.log('It is done!')
}

// ДЕМОНСТРАЦИЯ ДВУХ ПОДХОДОВ

console.log('ВАРИАНТ А: КОЛЛБЭКИ (callback hell) ===')
console.log('start')

readConfig('myConfig', function() {
    doQuery('select * from cities', function() {
        httpGet('http://google.com', function() {
            readFile('README.md', function() {
                callback()
            })
        })
    })
})

console.log('end')

// ждем немного перед вторым примером
setTimeout(() => {
    console.log('\nВАРИАНТ Б: ФУНКЦИИ-УВЕДОМИТЕЛИ ===')
    console.log('start')
    
    // Функции-уведомители
    function afterReadConfig() {
        doQuery('select * from cities', afterDoQuery)
    }
    
    function afterDoQuery() {
        httpGet('http://google.com', afterHttpGet)
    }
    
    function afterHttpGet() {
        readFile('README.md', function() {
            callback()
        })
    }
    
    // запускаем цепочку
    readConfig('myConfig', afterReadConfig)
    
    console.log('end')
}, 5000) 







// Задание 3
// АСИНХРОННЫЕ ФУНКЦИИ fi(x) - каждое вычисление идет со случайной задержкой
function f1(x, callback) {
    setTimeout(() => {
        const result = x * x;
        console.log(`f1 дает значение ${result}, ` + 
                   `промежуточный результат будет добавлен`);
        callback(result);
    }, Math.floor(Math.random() * 1000));
}

function f2(x, callback) {
    setTimeout(() => {
        const result = 2 * x; 
        console.log(`f2 дает значение ${result}, ` + 
                   `промежуточный результат будет добавлен`);
        callback(result);
    }, Math.floor(Math.random() * 1000));
}

function f3(x, callback) {
    setTimeout(() => {
        const result = -2; 
        console.log(`f3 дает значение ${result}, ` + 
                   `промежуточный результат будет добавлен`);
        callback(result);
    }, Math.floor(Math.random() * 1000));
}

function f4(x, callback) {
    setTimeout(() => {
        const result = x + 5; 
        console.log(`f4 дает значение ${result}, ` + 
                   `промежуточный результат будет добавлен`);
        callback(result);
    }, Math.floor(Math.random() * 1000));
}

function f5(x, callback) {
    setTimeout(() => {
        const result = 3 * x; // 3x
        console.log(`f5 дает значение ${result}, ` + 
                   `промежуточный результат будет добавлен`);
        callback(result);
    }, Math.floor(Math.random() * 1000));
}

function f6(x, callback) {
    setTimeout(() => {
        const result = 10; // 10
        console.log(`f6 дает значение ${result}, ` + 
                   `промежуточный результат будет добавлен`);
        callback(result);
    }, Math.floor(Math.random() * 1000));
}

// ОСНОВНАЯ ФУНКЦИЯ с использованием функций-уведомителей
function calculateF(x, n) {
    console.log(`\nF(x) для x = ${x}, n = ${n}`);
    console.log('-----------------------------------');
    
    let intermediate = 0;
    let currentStep = 1;
    
    // Функция-уведомитель
    function notification(value) {
        intermediate += value;
        console.log(`Промежуточный результат после f${currentStep}: ${intermediate}`);
        
        currentStep++;

        if (currentStep <= n) {
            switch(currentStep) {
                case 2: f2(x, notification); break;
                case 3: f3(x, notification); break;
                case 4: f4(x, notification); break;
                case 5: f5(x, notification); break;
                case 6: f6(x, notification); break;
                default: 
                    console.log(`\nОТВЕТ: F(${x}) = ${intermediate}`);
                    setTimeout(runNextExample, 1000);
            }
        } else {
            console.log(`\nОТВЕТ: F(${x}) = ${intermediate}`);
            setTimeout(runNextExample, 1000);
        }
    }
    
    // Запускаем первую функцию
    f1(x, notification);
}

// ОЧЕРЕДЬ ЗАПУСКА ПРИМЕРОВ
let exampleIndex = 0;
const examples = [
    { x: 3, n: 2 }, 
    { x: 3, n: 4 }, 
    { x: 3, n: 6 }
];

function runNextExample() {
    if (exampleIndex < examples.length) {
        const ex = examples[exampleIndex];
        calculateF(ex.x, ex.n);
        exampleIndex++;
    }
}

console.log('ВЫЧИСЛЕНИЕ F(x) = f1(x) + f2(x) + ... + fn(x)');
console.log('Все функции асинхронные, выполняются последовательно через уведомители');
console.log('='.repeat(60));

// Запускаем первый пример
runNextExample();