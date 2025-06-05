document.addEventListener('DOMContentLoaded', function() {
    const productItems = document.querySelectorAll('.product-item');
    const productModal = document.getElementById('productModal');
    const boostyInfoModal = document.getElementById('boostyInfoModal');
    
    // --- НОВОЕ: Получаем элементы нового модального окна ---
    const newFeatureLohModal = document.getElementById('newFeatureLohModal');
    const continueShoppingButton = document.getElementById('continueShoppingButton');
    const tryNewLohFeatureButton = document.getElementById('tryNewLohFeatureButton');
    // --- КОНЕЦ НОВОГО ---

    const closeButtons = document.querySelectorAll('.modal .close-button');

    const modalProductNameElement = document.getElementById('modalProductName');
    const modalProductPriceElement = document.getElementById('modalProductPrice');
    const modalProductDetailsElement = document.getElementById('modalProductDetails');
    const buyProductButton = document.getElementById('buyProductButton');

    let currentProductColorClass = '';

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
        if (modalElement && modalElement.classList.contains('active')) { // Проверяем, что окно активно
            modalElement.classList.remove('active');
            setTimeout(() => {
                modalElement.style.display = 'none';
                if (modalElement === productModal && currentProductColorClass) {
                    modalProductNameElement.classList.remove(currentProductColorClass);
                }
            }, 350);
            document.body.style.overflow = 'auto';
        }
    }

    productItems.forEach(item => {
        item.addEventListener('click', function() {
            const productName = this.dataset.name;
            const productPrice = this.dataset.price;
            const productDetails = this.dataset.details;
            const productColorClass = this.dataset.colorClass;

            modalProductNameElement.textContent = productName;
            modalProductPriceElement.textContent = productPrice;
            modalProductDetailsElement.innerHTML = productDetails.replace(/\n/g, '<br>');

            if (currentProductColorClass) {
                modalProductNameElement.classList.remove(currentProductColorClass);
            }
            if (productColorClass) {
                modalProductNameElement.classList.add(productColorClass);
                currentProductColorClass = productColorClass;
            } else {
                currentProductColorClass = '';
            }
            openModal(productModal);
        });
    });

    if (buyProductButton) {
        buyProductButton.addEventListener('click', function() {
            closeModal(productModal);
            setTimeout(() => {
                openModal(boostyInfoModal);
            }, 370);
        });
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
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

    // --- НОВОЕ: Логика для модального окна "для лохов" ---
    if (newFeatureLohModal) {
        // Показываем модальное окно при загрузке страницы
        // Можно добавить условие, чтобы не показывать каждый раз, например, с помощью sessionStorage
        // if (!sessionStorage.getItem('lohFeatureModalShown')) {
        //     openModal(newFeatureLohModal);
        //     sessionStorage.setItem('lohFeatureModalShown', 'true');
        // }
        openModal(newFeatureLohModal); // Пока показываем всегда

        if (continueShoppingButton) {
            continueShoppingButton.addEventListener('click', function() {
                closeModal(newFeatureLohModal);
            });
        }

        if (tryNewLohFeatureButton) {
            tryNewLohFeatureButton.addEventListener('click', function() {
                // Действие для "Опробовать" - перенаправление на сайт "РазводЛохов"
                window.location.href = 'https://andreikakopeika.github.io/RazvodLoxov/';
            });
        }
    }
    // --- КОНЕЦ НОВОГО ---
});
