// АСИНХРОННОСТЬ – 2. Promise, async/await

// Задание 1
let promise = new Promise(function(resolve, reject) {
    resolve(1);
    setTimeout(() => resolve(2), 1000);
});
promise.then(console.log); // вывело 1, а не 2 потому что значение 1 уже зафиксировано, а строчка с двойкой игнорируется

// Задание 2
// функции теперь возвращают Promise
function readConfig(name) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('(1) config from ' + name + ' loaded')
            resolve()
        }, Math.floor(Math.random() * 1000))
    })
}
function doQuery(statement) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('(2) SQL query executed: ' + statement)
            resolve()
        }, Math.floor(Math.random() * 1000))
    })
}
function httpGet(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('(3) Page retrieved: ' + url)
            resolve()
        }, Math.floor(Math.random() * 1000))
    })
}
function readFile(path) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('(4) Readme file from ' + path + ' loaded')
            resolve()
        }, Math.floor(Math.random() * 1000))
    })
}
function callback() {
    console.log('It is done!')
}

console.log('start')
readConfig('myConfig')
    .then(() => doQuery('select * from cities'))
    .then(() => httpGet('http://google.com'))
    .then(() => readFile('README.md'))
    .then(() => {
        callback()
        console.log('end')
    })

// Задание 3
// функции теперь возвращают Promise
function f1(x) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = x * x;
            console.log(`f1 дает значение ${result}, промежуточный результат будет добавлен`);
            resolve(result);
        }, Math.floor(Math.random() * 1000));
    });
}
function f2(x) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = 2 * x;
            console.log(`f2 дает значение ${result}, промежуточный результат будет добавлен`);
            resolve(result);
        }, Math.floor(Math.random() * 1000));
    });
}
function f3(x) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = -2;
            console.log(`f3 дает значение ${result}, промежуточный результат будет добавлен`);
            resolve(result);
        }, Math.floor(Math.random() * 1000));
    });
}
function f4(x) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = x + 5;
            console.log(`f4 дает значение ${result}, промежуточный результат будет добавлен`);
            resolve(result);
        }, Math.floor(Math.random() * 1000));
    });
}
function f5(x) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = 3 * x;
            console.log(`f5 дает значение ${result}, промежуточный результат будет добавлен`);
            resolve(result);
        }, Math.floor(Math.random() * 1000));
    });
}
function f6(x) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = 10;
            console.log(`f6 дает значение ${result}, промежуточный результат будет добавлен`);
            resolve(result);
        }, Math.floor(Math.random() * 1000));
    });
}

// функция для последовательного вычисления через промисы
function calculateFWithPromises(x, n) {
    console.log(`\nF(x) для x = ${x}, n = ${n}`);
    console.log(' ');
    
    let intermediate = 0;
    let currentStep = 1;
    function runNextStep(promiseFn) {
        return promiseFn(x).then(result => {
            intermediate += result;
            console.log(`Промежуточный результат после f${currentStep}: ${intermediate}`);
            currentStep++;
            return intermediate;
        });
    }
    
    // cтроим цепочку промисов в зависимости от n
    let chain = Promise.resolve();
    if (n >= 1) chain = chain.then(() => runNextStep(f1));
    if (n >= 2) chain = chain.then(() => runNextStep(f2));
    if (n >= 3) chain = chain.then(() => runNextStep(f3));
    if (n >= 4) chain = chain.then(() => runNextStep(f4));
    if (n >= 5) chain = chain.then(() => runNextStep(f5));
    if (n >= 6) chain = chain.then(() => runNextStep(f6));
    return chain.then(() => {
        console.log(`\nответ: F(${x}) = ${intermediate}`);
        return intermediate;
    });
}

// выполнение для n = 2, 4, 6
console.log('ВЫЧИСЛЕНИЕ F(x) = f1(x) + f2(x) + ... + fn(x) С ИСПОЛЬЗОВАНИЕМ ПРОМИСОВ');
console.log('='.repeat(70));

const x = 3;
calculateFWithPromises(x, 2)
    .then(() => {
        return calculateFWithPromises(x, 4);
    })
    .then(() => {
        return calculateFWithPromises(x, 6);
    })
    .then(() => {
        console.log('\n' + '='.repeat(70));
        console.log('Все вычисления завершены');
    });
    
// Задание 4
// Функция возвращает Promise
function createAdder(a, b) {
    return new Promise((resolve, reject) => {
        if (a === undefined || b === undefined) {
            reject("один из аргументов не определён");
            return;
        }
        
        if (typeof a !== "number" || typeof b !== "number") {
            reject("один из аргументов не является числом");
            return;
        }
        
        // Условие a:
        let pervoeChislo = a;
        let vtoroeChislo = b;
        let schetchik = 0;
        let interval = setInterval(() => {
            let summa = pervoeChislo + vtoroeChislo;
            schetchik++;
            
            // Условие b:
            console.log("Вызов " + schetchik + ": " + pervoeChislo + " + " + vtoroeChislo + " = " + summa);
            
            // Условие a: в первый аргумент попадает сумма с предыдущей итерации
            pervoeChislo = summa;
            
            // Условие c: после 5 раз прекращаем
            if (schetchik === 5) {
                clearInterval(interval);
                console.log("Суммирование завершено. Финальная сумма: " + summa);
                resolve(summa);
            }
        }, 2000);
    });
}

console.log("ПРИМЕР 1: УСПЕШНОЕ ВЫПОЛНЕНИЕ");
console.log("createAdder(3, 5)");
console.log(" ");

createAdder(3, 5)
    .then((result) => {
        console.log(" ");
        console.log("ПРОМИС ВЫПОЛНЕН УСПЕШНО");
        console.log("");
    })
    .catch((error) => {
        console.log("ОШИБКА: " + error);
    });

// Ждем пока выполнится первый пример
setTimeout(() => {
    // Пример 2: Ошибка - undefined
    console.log("ПРИМЕР 2: ОШИБКА (undefined)");
    console.log("createAdder(undefined, 5)");
    console.log(" ");
    
    createAdder(undefined, 5)
        .then((result) => {
            console.log("ПРОМИС ВЫПОЛНЕН УСПЕШНО");
        })
        .catch((error) => {
            console.log("ОШИБКА: " + error);
            console.log(" ");
            console.log("");
        });
}, 12000);

setTimeout(() => {
    // Пример oшибка - не число
    console.log("ПРИМЕР 3: ОШИБКА (не число)");
    console.log("createAdder(3, 'пять')");
    console.log(" ");
    
    createAdder(3, "пять")
        .then((result) => {
            console.log("ПРОМИС ВЫПОЛНЕН УСПЕШНО");
        })
        .catch((error) => {
            console.log("ОШИБКА: " + error);
            console.log(" ");
        });
}, 14000);

// Задание 5
async function task2() {
    console.log('\nЗАДАНИЕ 5: ASYNC/AWAIT');
    console.log('\nЗАДАНИЕ 2 через ASYNC/AWAIT');
    console.log('start');
    
    await readConfig('myConfig');
    await doQuery('select * from cities');
    await httpGet('http://google.com');
    await readFile('README.md');
    
    callback();
    console.log('end');
}

// задание 3 
async function calculateF(x, n) {
    console.log(`\nF(x) для x = ${x}, n = ${n}`);
    console.log(' ');
    let intermediate = 0;
    
    if (n >= 1) {
        let res = await f1(x);
        intermediate += res;
        console.log(`Промежуточный результат после f1: ${intermediate}`);
    }
    if (n >= 2) {
        let res = await f2(x);
        intermediate += res;
        console.log(`Промежуточный результат после f2: ${intermediate}`);
    }
    if (n >= 3) {
        let res = await f3(x);
        intermediate += res;
        console.log(`Промежуточный результат после f3: ${intermediate}`);
    }
    if (n >= 4) {
        let res = await f4(x);
        intermediate += res;
        console.log(`Промежуточный результат после f4: ${intermediate}`);
    }
    if (n >= 5) {
        let res = await f5(x);
        intermediate += res;
        console.log(`Промежуточный результат после f5: ${intermediate}`);
    }
    if (n >= 6) {
        let res = await f6(x);
        intermediate += res;
        console.log(`Промежуточный результат после f6: ${intermediate}`);
    }
    
    console.log(`\nответ: F(${x}) = ${intermediate}`);
    return intermediate;
}

async function task3() {
    console.log('\nЗАДАНИЕ 3 через ASYNC/AWAIT');
    
    const x = 3;
    
    await calculateF(x, 2);
    await calculateF(x, 4);
    await calculateF(x, 6);
    
    console.log('\nВсе вычисления завершены');
}

async function task4() {
    console.log('\nАДАНИЕ 4 через ASYNC/AWAIT');
    // Пример Успешное выполнение
    console.log("ПРИМЕР 1: createAdder(3, 5)");
    try {
        let result = await createAdder(3, 5);
        console.log("ПРОМИС ВЫПОЛНЕН УСПЕШНО");
    } catch (error) {
        console.log("ОШИБКА:", error);
    }
    
    // Пример ошибка - undefined
    console.log("\nПРИМЕР 2: createAdder(undefined, 5)");
    try {
        let result = await createAdder(undefined, 5);
        console.log("ПРОМИС ВЫПОЛНЕН УСПЕШНО");
    } catch (error) {
        console.log("ОШИБКА:", error);
    }
    
    // Пример ошибка - не число
    console.log("\nПРИМЕР 3: createAdder(3, 'пять')");
    try {
        let result = await createAdder(3, "пять");
        console.log("ПРОМИС ВЫПОЛНЕН УСПЕШНО");
    } catch (error) {
        console.log("ОШИБКА:", error);
    }
}

// запуск всего
async function runAll() {
    await task2();
    await task3();
    await task4();
}

runAll();

// Задание 6
async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 10;
}

function f() {
    // Способ с .then()
    wait().then(result => {
        console.log('Результат внутри f():', result);
        // Здесь можно работать с result
        return result;
    });
    console.log('Это выполнится сразу, не дожидаясь результата');
}

// Способ с колбэком
function fWithCallback(callback) {
    wait().then(result => {
        callback(result);
    });
}

// Способ с сохранением результата в переменную (асинхронно)
function fWithVariable() {
    let savedResult;
    wait().then(result => {
        savedResult = result;
        console.log('Результат сохранен:', savedResult);
        workWithResult(savedResult);
    });
    function workWithResult(res) {
        console.log('Работаем с результатом:', res);
    }
}

console.log('Старт программы');
f();
fWithCallback((result) => {
    console.log('Колбэк получил:', result);
});
fWithVariable();
console.log('Конец программы (но функции еще выполняются)');

// Задание 7
// функция для ожидания
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// функция для обработки одного претендента
async function processCandidate(candidate) {
    const name = candidate[0];
    const time1 = candidate[1]; // время на подготовку 1 задания
    const defense1 = candidate[2]; // время на защиту 1 задания
    const time2 = candidate[3]; // время на подготовку 2 задания
    const defense2 = candidate[4]; // время на защиту 2 задания
    
    // 1 задание: подготовка
    console.log(name + " started the 1 task.");
    await sleep(time1 * 1000); // переводим в миллисекунды
    console.log(name + " moved on to the defense of the 1 task.");
    // 1 задание: защита
    await sleep(defense1 * 1000);
    console.log(name + " completed the 1 task.");
    // Отдых
    console.log(name + " is resting.");
    await sleep(5 * 1000); // 5 времени отдых
    // 2 задание: подготовка
    console.log(name + " started the 2 task.");
    await sleep(time2 * 1000);
    console.log(name + " moved on to the defense of the 2 task.");
    // 2 задание: защита
    await sleep(defense2 * 1000);
    console.log(name + " completed the 2 task.");
}

async function interviews(candidates) {
    console.log("НАЧАЛО СОБЕСЕДОВАНИЯ\n");
    
    // Запускаем всех претендентов параллельно
    let promises = [];
    for (let i = 0; i < candidates.length; i++) {
        promises.push(processCandidate(candidates[i]));
    }
    // ждем завершения всех
    await Promise.all(promises);
    
    console.log("\nСОБЕСЕДОВАНИЕ ЗАВЕРШЕНО");
}

// входные данные
const candidates = [
    ['Ivan', 5, 2, 7, 2],
    ['John', 3, 4, 5, 1],
    ['Sophia', 4, 2, 5, 1]
];

// Запускаем программу
interviews(candidates);
