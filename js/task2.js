// Список публичных API для тестирования
const apis = [
    'https://api.agify.io?name=meelad',
    'https://api.genderize.io?name=peter',
    'https://api.nationalize.io?name=nathaniel',
    'https://datausa.io/api/data?drilldowns=Nation&measures=Population',
    'https://dog.ceo/api/breeds/image/random'
];

const output = document.getElementById('output');

// Функция для вывода результатов
function log(message) {
    output.textContent += message + '\n';
}

// Очистка вывода
function clearOutput() {
    output.textContent = '';
}

// Часть 1: Последовательные XHR запросы
function makeSequentialXHR() {
    clearOutput();
    log('=== Исходные последовательные XHR запросы ===\n');
    
    let index = 0;
    
    function makeRequest() {
        if (index >= apis.length) {
            log('\n✓ Все запросы выполнены!');
            return;
        }
        
        const xhr = new XMLHttpRequest();
        const url = apis[index];
        
        xhr.open('GET', url);
        
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                log(`Запрос ${index + 1} (${url}):`);
                log(`Статус: ${xhr.status}`);
                log(`Ответ: ${xhr.responseText.substring(0, 100)}...\n`);
            } else {
                log(`Ошибка в запросе ${index + 1}: ${xhr.status}\n`);
            }
            
            index++;
            makeRequest(); // Следующий запрос
        };
        
        xhr.onerror = function() {
            log(`Сетевая ошибка в запросе ${index + 1}\n`);
            index++;
            makeRequest();
        };
        
        log(`Отправка запроса ${index + 1}: ${url}`);
        xhr.send();
    }
    
    makeRequest();
}

document.getElementById('basic-xhr-btn').addEventListener('click', makeSequentialXHR);

// Часть 2: Функция request() с callback
function request(url, callback) {
    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', url);
    
    xhr.onload = function() {
        callback(null, {
            status: xhr.status,
            url: url,
            data: xhr.responseText
        });
    };
    
    xhr.onerror = function() {
        callback(new Error('Network error'), null);
    };
    
    xhr.send();
}

function makeCallbackRequests() {
    clearOutput();
    log('=== Запросы с использованием callback ===\n');
    
    let currentIndex = 0;
    
    function processNext() {
        if (currentIndex >= apis.length) {
            log('\n✓ Все запросы через callback выполнены!');
            return;
        }
        
        request(apis[currentIndex], function(error, result) {
            if (error) {
                log(`Ошибка в запросе ${currentIndex + 1}: ${error.message}\n`);
            } else {
                log(`Запрос ${currentIndex + 1} (${result.url}):`);
                log(`Статус: ${result.status}`);
                log(`Ответ: ${result.data.substring(0, 100)}...\n`);
            }
            
            currentIndex++;
            processNext();
        });
    }
    
    processNext();
}

document.getElementById('callback-xhr-btn').addEventListener('click', makeCallbackRequests);

// Часть 3: requestPromise() с использованием Promise
function requestPromise(url) {
    return new Promise((resolve, reject) => {
        request(url, function(error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

function makePromiseRequests() {
    clearOutput();
    log('=== Запросы с использованием Promise ===\n');
    
    let promiseChain = Promise.resolve();
    let index = 1;
    
    apis.forEach(url => {
        promiseChain = promiseChain.then(() => {
            log(`Отправка запроса ${index}: ${url}`);
            return requestPromise(url)
                .then(result => {
                    log(`Запрос ${index} (${result.url}):`);
                    log(`Статус: ${result.status}`);
                    log(`Ответ: ${result.data.substring(0, 100)}...\n`);
                    index++;
                })
                .catch(error => {
                    log(`Ошибка в запросе ${index}: ${error.message}\n`);
                    index++;
                });
        });
    });
    
    promiseChain.then(() => {
        log('\n✓ Все запросы через Promise выполнены!');
    });
}

document.getElementById('promise-xhr-btn').addEventListener('click', makePromiseRequests);

// Часть 4: Использование async/await
async function makeAsyncRequests() {
    clearOutput();
    log('=== Запросы с использованием async/await ===\n');
    
    for (let i = 0; i < apis.length; i++) {
        const url = apis[i];
        log(`Отправка запроса ${i + 1}: ${url}`);
        
        try {
            const result = await requestPromise(url);
            log(`Запрос ${i + 1} (${result.url}):`);
            log(`Статус: ${result.status}`);
            log(`Ответ: ${result.data.substring(0, 100)}...\n`);
        } catch (error) {
            log(`Ошибка в запросе ${i + 1}: ${error.message}\n`);
        }
    }
    
    log('\n✓ Все запросы через async/await выполнены!');
}

document.getElementById('async-xhr-btn').addEventListener('click', makeAsyncRequests);