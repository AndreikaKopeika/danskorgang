document.addEventListener('DOMContentLoaded', function() {
    const productItems = document.querySelectorAll('.product-item');
    const productModal = document.getElementById('productModal');
    const boostyInfoModal = document.getElementById('boostyInfoModal');
    const closeButtons = document.querySelectorAll('.modal .close-button');

    const modalProductName = document.getElementById('modalProductName');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const modalProductDetails = document.getElementById('modalProductDetails');
    const buyProductButton = document.getElementById('buyProductButton');

    let currentProductData = {}; // Для хранения данных текущего товара

    // Функция для открытия модального окна
    function openModal(modalElement) {
        if (modalElement) {
            modalElement.style.display = 'flex'; // Используем flex для центрирования
            setTimeout(() => { // Даем время для display:flex сработать перед анимацией
                modalElement.classList.add('active');
            }, 10);
            document.body.style.overflow = 'hidden'; // Запрещаем скролл фона
        }
    }

    // Функция для закрытия модального окна
    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.classList.remove('active');
            setTimeout(() => {
                modalElement.style.display = 'none';
            }, 300); // Должно совпадать с transition-duration в CSS
            document.body.style.overflow = 'auto'; // Возвращаем скролл фона
        }
    }

    // Обработчики кликов на товары
    productItems.forEach(item => {
        item.addEventListener('click', function() {
            currentProductData = {
                name: this.dataset.name,
                price: this.dataset.price,
                details: this.dataset.details
            };

            modalProductName.textContent = currentProductData.name;
            modalProductPrice.textContent = currentProductData.price;
            modalProductDetails.innerHTML = currentProductData.details.replace(/\n/g, '<br>'); // Заменяем переносы строк на <br>

            openModal(productModal);
        });
    });

    // Обработчик для кнопки "Купить" в первом модальном окне
    if (buyProductButton) {
        buyProductButton.addEventListener('click', function() {
            closeModal(productModal);
            // Небольшая задержка перед открытием второго окна для плавности
            setTimeout(() => {
                openModal(boostyInfoModal);
            }, 350); // Чуть больше чем анимация закрытия
        });
    }

    // Обработчики для кнопок закрытия
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Находим родительское модальное окно для текущей кнопки закрытия
            let modalToClose = this.closest('.modal');
            if (modalToClose) {
                closeModal(modalToClose);
            }
        });
    });

    // Закрытие модального окна при клике вне его содержимого
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal') && event.target.classList.contains('active')) {
            closeModal(event.target);
        }
    });

    // Закрытие модального окна по нажатию Esc
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const activeProductModal = document.querySelector('#productModal.active');
            const activeBoostyModal = document.querySelector('#boostyInfoModal.active');
            if (activeProductModal) {
                closeModal(activeProductModal);
            } else if (activeBoostyModal) {
                closeModal(activeBoostyModal);
            }
        }
    });
});
