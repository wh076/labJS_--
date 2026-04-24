// Альтернативные API, которые работают без прокси
const RANDOM_NAME_APIS = [
    'https://randomuser.me/api/',
    'https://api.namefake.com/'
];

const ANIMAL_APIS = {
    cat: {
        fact: 'https://catfact.ninja/fact',
        image: 'https://api.thecatapi.com/v1/images/search'
    },
    dog: {
        fact: 'https://dog-api.kinduff.com/api/facts',
        image: 'https://dog.ceo/api/breeds/image/random'
    },
    fox: {
        fact: 'https://randomfox.ca/floof/', // API не предоставляет факты отдельно
        image: 'https://randomfox.ca/floof/'
    }
};

// Глобальные переменные
let currentAnimal = '';
let currentFact = '';

// Функция для получения случайного имени (используем несколько источников)
async function getRandomName() {
    // Пробуем первый API
    try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const name = data.results[0].name.first;
        console.log('Имя получено через randomuser.me:', name);
        return name;
    } catch (error) {
        console.warn('Первый API не сработал, пробуем второй...');
    }
    
    // Пробуем второй API
    try {
        const response = await fetch('https://api.namefake.com/');
        const data = await response.json();
        const name = data.name;
        console.log('Имя получено через namefake.com:', name);
        return name;
    } catch (error) {
        console.warn('Второй API тоже не сработал');
    }
    
    // Если все API не работают, генерируем локально
    const localNames = [
        'Александр', 'Мария', 'Дмитрий', 'Анна', 'Сергей', 
        'Елена', 'Иван', 'Ольга', 'Максим', 'Татьяна',
        'John', 'Emma', 'Michael', 'Sophia', 'William'
    ];
    const randomName = localNames[Math.floor(Math.random() * localNames.length)];
    console.log('Имя сгенерировано локально:', randomName);
    return randomName;
}

// Функция для получения факта о животном
async function getAnimalFact(animal) {
    try {
        let url = '';
        let fact = '';
        
        switch(animal) {
            case 'cat':
                url = 'https://catfact.ninja/fact';
                const catResponse = await fetch(url);
                const catData = await catResponse.json();
                fact = catData.fact;
                break;
                
            case 'dog':
                url = 'https://dog-api.kinduff.com/api/facts';
                const dogResponse = await fetch(url);
                const dogData = await dogResponse.json();
                fact = dogData.facts[0];
                break;
                
            case 'fox':
                // Для лисы используем заранее заготовленные факты
                const foxFacts = [
                    'Foxes are members of the dog family.',
                    'A female fox is called a vixen.',
                    'Foxes have whiskers on their legs and face to help them navigate.',
                    'Foxes can make more than 40 different sounds.',
                    'Foxes are solitary animals, unlike their relatives, wolves and dogs.',
                    'A group of foxes is called a skulk or leash.',
                    'Foxes have excellent hearing and can hear a watch ticking 40 yards away.',
                    'The red fox is the most common fox species.',
                    'Foxes use the Earth\'s magnetic field to hunt.',
                    'Arctic foxes don\'t shiver until the temperature drops to -70°C.'
                ];
                fact = foxFacts[Math.floor(Math.random() * foxFacts.length)];
                break;
        }
        
        console.log(`Факт о ${animal}:`, fact);
        return fact || 'Интересный факт временно недоступен';
        
    } catch (error) {
        console.error(`Ошибка при получении факта о ${animal}:`, error);
        return 'Интересный факт временно недоступен';
    }
}

// Функция для получения изображения животного
async function getAnimalImage(animal) {
    try {
        let url = '';
        let imageUrl = '';
        
        switch(animal) {
            case 'cat':
                url = 'https://api.thecatapi.com/v1/images/search';
                const catResponse = await fetch(url);
                const catData = await catResponse.json();
                imageUrl = catData[0].url;
                break;
                
            case 'dog':
                url = 'https://dog.ceo/api/breeds/image/random';
                const dogResponse = await fetch(url);
                const dogData = await dogResponse.json();
                imageUrl = dogData.message;
                break;
                
            case 'fox':
                url = 'https://randomfox.ca/floof/';
                const foxResponse = await fetch(url);
                const foxData = await foxResponse.json();
                imageUrl = foxData.image;
                break;
        }
        
        console.log(`Изображение ${animal}:`, imageUrl);
        return imageUrl;
        
    } catch (error) {
        console.error(`Ошибка при получении изображения ${animal}:`, error);
        // Запасные изображения
        const fallbackImages = {
            cat: 'https://placekitten.com/400/300',
            dog: 'https://placedog.net/400/300',
            fox: 'https://placekitten.com/400/300' // Заглушка
        };
        return fallbackImages[animal];
    }
}

// Функция для перевода текста (упрощенная версия)
async function translateText(text, from = 'en', to = 'ru') {
    try {
        // Используем бесплатный API перевода
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.responseData && data.responseData.translatedText) {
            return data.responseData.translatedText;
        }
        throw new Error('Translation failed');
        
    } catch (error) {
        console.error('Ошибка при переводе:', error);
        // Простой словарь для базового перевода
        const translations = {
            'cat': 'кошка',
            'dog': 'собака',
            'fox': 'лиса',
            'The': '',
            'the': '',
            'a': '',
            'is': '',
            'are': '',
            'can': 'может',
            'have': 'имеют',
            'has': 'имеет'
        };
        
        let translated = text;
        for (const [eng, rus] of Object.entries(translations)) {
            translated = translated.replace(new RegExp(`\\b${eng}\\b`, 'gi'), rus);
        }
        return translated.trim() || 'Перевод недоступен';
    }
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Страница загружена, начинаем инициализацию...');
    
    // Получаем начальное случайное имя
    const initialName = await getRandomName();
    document.getElementById('random-name').textContent = initialName;
    document.getElementById('user-name').textContent = initialName;
    console.log('Начальное имя установлено:', initialName);

    // Обработчик кнопки "Другое имя"
    document.getElementById('change-name-btn').addEventListener('click', async () => {
        console.log('Запрос нового имени...');
        const button = document.getElementById('change-name-btn');
        button.disabled = true;
        button.textContent = 'Загрузка...';
        
        const newName = await getRandomName();
        document.getElementById('random-name').textContent = newName;
        document.getElementById('user-name').textContent = newName;
        
        button.disabled = false;
        button.textContent = 'Другое имя';
        console.log('Новое имя установлено:', newName);
    });

    // Обработчик кнопки "Далее"
    document.getElementById('next-btn').addEventListener('click', () => {
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('animal-select-screen').style.display = 'block';
    });

    // Обработчики кнопок выбора животного
    document.querySelectorAll('.animal-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            currentAnimal = e.target.dataset.animal;
            console.log('Выбрано животное:', currentAnimal);
            
            // Показываем экран с информацией
            document.getElementById('animal-select-screen').style.display = 'none';
            document.getElementById('animal-info-screen').style.display = 'block';
            
            // Показываем индикатор загрузки
            document.getElementById('animal-fact').textContent = 'Загрузка факта...';
            document.getElementById('animal-fact-ru').textContent = 'Перевод...';
            document.getElementById('animal-image').src = '';
            
            // Загружаем данные о животном
            try {
                const [image, fact] = await Promise.all([
                    getAnimalImage(currentAnimal),
                    getAnimalFact(currentAnimal)
                ]);
                
                // Устанавливаем изображение
                document.getElementById('animal-image').src = image;
                document.getElementById('animal-image').onerror = function() {
                    this.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                };
                
                // Устанавливаем факт
                document.getElementById('animal-fact').textContent = fact;
                
                // Переводим факт
                const translatedFact = await translateText(fact);
                document.getElementById('animal-fact-ru').textContent = `Перевод: ${translatedFact}`;
                
                console.log('Данные о животном загружены успешно');
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
                document.getElementById('animal-fact').textContent = 'Не удалось загрузить информацию';
                document.getElementById('animal-fact-ru').textContent = '';
            }
        });
    });

    // Обработчик кнопки "Назад"
    document.getElementById('back-btn').addEventListener('click', () => {
        document.getElementById('animal-info-screen').style.display = 'none';
        document.getElementById('animal-select-screen').style.display = 'block';
    });
    
    console.log('Инициализация завершена');
});