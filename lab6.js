// Пункт a: sin(x)
let a = prompt("Задание 1. Введите значение x:");
let sinX = Math.sin(Number(a));
alert("Задание 1. sin(" + a + ") = " + sinX);
document.getElementById("task-a").innerHTML = "sin(" + a + ") = " + sinX;

// Пункт b: принадлежность точки квадрату
let b1 = prompt("Задание 2. Введите x1 (первая вершина квадрата):");
let b2 = prompt("Задание 2. Введите y1 (первая вершина квадрата):");
let b3 = prompt("Задание 2. Введите x2 (вторая вершина квадрата):");
let b4 = prompt("Задание 2. Введите y2 (вторая вершина квадрата):");
let b5 = prompt("Задание 2. Введите x точки:");
let b6 = prompt("Задание 2. Введите y точки:");

b1 = Number(b1);
b2 = Number(b2);
b3 = Number(b3);
b4 = Number(b4);
b5 = Number(b5);
b6 = Number(b6);

let minX = Math.min(b1, b3);
let maxX = Math.max(b1, b3);
let minY = Math.min(b2, b4);
let maxY = Math.max(b2, b4);

let inside = (b5 >= minX && b5 <= maxX && b6 >= minY && b6 <= maxY);

if (inside) {
    alert("Задание 2. Точка (" + b5 + ", " + b6 + ") принадлежит квадрату");
    document.getElementById("task-b").innerHTML = "Точка (" + b5 + ", " + b6 + ") принадлежит квадрату";
} else {
    alert("Задание 2. Точка (" + b5 + ", " + b6 + ") не принадлежит квадрату");
    document.getElementById("task-b").innerHTML = "Точка (" + b5 + ", " + b6 + ") не принадлежит квадрату";
}

// Пункт c: сумма двух квадратов натуральных чисел
let c = prompt("Задание 3. Введите натуральное число:");
c = Number(c);
let found = false;
let result = "";

for (let i = 1; i * i <= c; i++) {
    for (let j = 1; j * j <= c; j++) {
        if (i * i + j * j == c) {
            found = true;
            result = c + " = " + i + "^2 + " + j + "^2";
            break;
        }
    }
    if (found) break;
}

if (found) {
    alert("Задание 3. " + result);
    document.getElementById("task-c").innerHTML = result;
} else {
    alert("Задание 3. Число " + c + " нельзя представить в виде суммы двух квадратов натуральных чисел");
    document.getElementById("task-c").innerHTML = "Число " + c + " нельзя представить в виде суммы двух квадратов натуральных чисел";
}

// Пункт d: проверка email на @
let d = prompt("Задание 4. Введите адрес электронной почты:");
if (d.indexOf("@") == -1) {
    alert("Задание 4. Предупреждение: адрес электронной почты не содержит символ @");
    document.getElementById("task-d").innerHTML = "Адрес: " + d + " - не содержит символ @";
} else {
    alert("Задание 4. Адрес электронной почты содержит символ @");
    document.getElementById("task-d").innerHTML = "Адрес: " + d + " - содержит символ @";
}

// Пункт e: доля латинских букв в строке
let e = prompt("Задание 5. Введите строку:");
let latinCount = 0;
for (let i = 0; i < e.length; i++) {
    let char = e[i];
    if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
        latinCount++;
    }
}
let percent = (latinCount / e.length) * 100;
alert("Задание 5. Доля латинских букв: " + percent.toFixed(2) + "%");
document.getElementById("task-e").innerHTML = "Доля латинских букв: " + percent.toFixed(2) + "%";

// Пункт f: удаление повторных вхождений слов
let f = prompt("Задание 6. Введите строку со словами:");
let words = f.split(" ").filter(word => word != "");
let uniqueWords = [];
for (let i = 0; i < words.length; i++) {
    if (uniqueWords.indexOf(words[i]) == -1) {
        uniqueWords.push(words[i]);
    }
}
let resultString = uniqueWords.join(" ");
alert("Задание 6. Результат: " + resultString);
document.getElementById("task-f").innerHTML = resultString;

// Пункт g: массив случайных чисел
let g = prompt("Задание 7. Введите количество чисел n:");
g = Number(g);
let arr = [];
for (let i = 0; i < g; i++) {
    arr.push(Math.floor(Math.random() * 100));
}
arr.reverse();
let output = "";
for (let i = 0; i < arr.length; i++) {
    output += arr[i] + " ";
    if ((i + 1) % 5 == 0) {
        output += "\n";
    }
}
alert("Задание 7. Массив в обратном порядке по 5 чисел в строке:\n" + output);
document.getElementById("task-g").innerHTML = "Массив в обратном порядке:<br>" + output.replace(/\n/g, "<br>");

// Пункт h: квадратная матрица
let h = prompt("Задание 8. Введите порядок матрицы n:");
h = Number(h);
let matrix = [];
for (let i = 0; i < h; i++) {
    matrix[i] = [];
    for (let j = 0; j < h; j++) {
        matrix[i][j] = Math.floor(Math.random() * 100);
    }
}

let diagonalElements = [];
for (let i = 0; i < h; i++) {
    diagonalElements.push(matrix[i][i]);
    if (i != h - 1 - i) {
        diagonalElements.push(matrix[i][h - 1 - i]);
    }
}

let maxDiag = Math.max(...diagonalElements);
let minDiag = Math.min(...diagonalElements);

for (let i = 0; i < h; i++) {
    if (matrix[i][i] != maxDiag && matrix[i][i] != minDiag) {
        matrix[i][i] = 0;
    }
    if (matrix[i][h - 1 - i] != maxDiag && matrix[i][h - 1 - i] != minDiag) {
        matrix[i][h - 1 - i] = 0;
    }
}

let matrixOutput = "";
for (let i = 0; i < h; i++) {
    for (let j = 0; j < h; j++) {
        matrixOutput += matrix[i][j] + "\t";
    }
    matrixOutput += "\n";
}
alert("Задание 8. Матрица после замены диагоналей:\n" + matrixOutput);
document.getElementById("task-h").innerHTML = "Матрица после замены:<br>" + matrixOutput.replace(/\n/g, "<br>").replace(/\t/g, "&nbsp;&nbsp;");

// Пункт i: прибавить n дней к текущей дате
let i = prompt("Задание 9. Введите количество дней n:");
i = Number(i);
let currentDate = new Date();
let newDate = new Date(currentDate);
newDate.setDate(currentDate.getDate() + i);
alert("Задание 9. Текущая дата: " + currentDate.toLocaleDateString() + "\nДата через " + i + " дней: " + newDate.toLocaleDateString());
document.getElementById("task-i").innerHTML = "Текущая дата: " + currentDate.toLocaleDateString() + "<br>Дата через " + i + " дней: " + newDate.toLocaleDateString();

// Пункт j: месяцев до 1 сентября
let current = new Date();
let year = current.getFullYear();
let septemberFirst = new Date(year, 8, 1);

if (current > septemberFirst) {
    septemberFirst = new Date(year + 1, 8, 1);
}

let months = (septemberFirst.getFullYear() - current.getFullYear()) * 12 + (septemberFirst.getMonth() - current.getMonth());
alert("Задание 10. До 1 сентября осталось " + months + " месяцев");
document.getElementById("task-j").innerHTML = "До 1 сентября осталось " + months + " месяцев";