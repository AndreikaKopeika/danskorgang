document.addEventListener('DOMContentLoaded', function() {
    const productItems = document.querySelectorAll('.product-item');
    const productModal = document.getElementById('productModal');
    const boostyInfoModal = document.getElementById('boostyInfoModal');
    const closeButtons = document.querySelectorAll('.modal .close-button'); // Теперь ищем все кнопки закрытия в модалках

    const modalProductNameElement = document.getElementById('modalProductName');
    const modalProductPriceElement = document.getElementById('modalProductPrice');
    const modalProductDetailsElement = document.getElementById('modalProductDetails');
    const buyProductButton = document.getElementById('buyProductButton');

    let currentProductColorClass = ''; // Для хранения класса цвета

    function openModal(modalElement) {
        if (modalElement) {
            modalElement.style.display = 'flex';
            setTimeout(() => {
                modalElement.classList.add('active');
            }, 10);
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.classList.remove('active');
            setTimeout(() => {
                modalElement.style.display = 'none';
                // Сбрасываем класс цвета с заголовка при закрытии
                if (modalElement === productModal && currentProductColorClass) {
                    modalProductNameElement.classList.remove(currentProductColorClass);
                }
            }, 350); // Длительность анимации из CSS
            document.body.style.overflow = 'auto';
        }
    }

    productItems.forEach(item => {
        item.addEventListener('click', function() {
            const productName = this.dataset.name;
            const productPrice = this.dataset.price;
            const productDetails = this.dataset.details;
            const productColorClass = this.dataset.colorClass; // Получаем класс цвета

            modalProductNameElement.textContent = productName;
            modalProductPriceElement.textContent = productPrice;
            modalProductDetailsElement.innerHTML = productDetails.replace(/\n/g, '<br>');

            // Удаляем предыдущий класс цвета, если он был
            if (currentProductColorClass) {
                modalProductNameElement.classList.remove(currentProductColorClass);
            }
            // Добавляем новый класс цвета и сохраняем его
            if (productColorClass) {
                modalProductNameElement.classList.add(productColorClass);
                currentProductColorClass = productColorClass;
            } else {
                currentProductColorClass = ''; // Если класса нет, сбрасываем
            }


            openModal(productModal);
        });
    });

    if (buyProductButton) {
        buyProductButton.addEventListener('click', function() {
            closeModal(productModal);
            setTimeout(() => {
                openModal(boostyInfoModal);
            }, 370); // Чуть больше анимации закрытия
        });
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // closest('.modal') найдет ближайший родительский элемент с классом .modal
            const modalToClose = this.closest('.modal');
            if (modalToClose) {
                closeModal(modalToClose);
            }
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal') && event.target.classList.contains('active')) {
            closeModal(event.target);
        }
    });

    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
});
