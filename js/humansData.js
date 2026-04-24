// Модуль для генерации случайных данных о людях
export class Human {
    constructor(firstName, lastName, age, gender, address, phone) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.address = address;
        this.phone = phone;
    }
}

// Функция получения случайных данных через API
async function getRandomUserData() {
    try {
        const response = await fetch('https://random-data-api.com/api/v2/users?size=1');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return null;
    }
}

// Асинхронная функция getData(), возвращающая массив Human
export async function getData() {
    // Случайный размер массива от 5 до 15
    const size = Math.floor(Math.random() * 11) + 5;
    const humans = [];
    
    for (let i = 0; i < size; i++) {
        const userData = await getRandomUserData();
        
        if (userData) {
            const human = new Human(
                userData.first_name,
                userData.last_name,
                Math.floor(Math.random() * 80) + 1, // возраст 1-80
                userData.gender || (Math.random() > 0.5 ? 'Male' : 'Female'),
                `${userData.address.city}, ${userData.address.street_name}`,
                userData.phone_number
            );
            humans.push(human);
        }
    }
    
    return humans;
}