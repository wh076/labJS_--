// Функция для анимации загрузки
function startLoader() {
    const progressBar = document.getElementById('progress-bar');
    const loaderSection = document.getElementById('loader-section');
    const mainContent = document.getElementById('main-content');
    
    let width = 0;
    const interval = setInterval(function() {
        if (width >= 100) {
            clearInterval(interval);
            // Скрываем лоадер и показываем основной контент
            loaderSection.style.display = 'none';
            mainContent.style.display = 'flex';
        } else {
            width++;
            progressBar.style.width = width + '%';
        }
    }, 20);
}

// Запускаем лоадер при загрузке страницы
window.addEventListener('load', startLoader);