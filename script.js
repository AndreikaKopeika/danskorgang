document.addEventListener('DOMContentLoaded', function() {
    const rotatingTextElement = document.getElementById('rotating-text');
    const words = [
        "Легко!",
        "Быстро!",
        "Анонимно!",
        "На развитие!",
        "Для GANG'а!",
        "С душой <3"
    ];
    let currentIndex = 0;
    const changeInterval = 2500; // мс, как часто менять текст
    const animationDuration = 400; // мс, должно совпадать с CSS transition duration

    function changeText() {
        rotatingTextElement.classList.remove('fade-in');
        rotatingTextElement.classList.add('fade-out');

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % words.length;
            rotatingTextElement.textContent = words[currentIndex];
            rotatingTextElement.classList.remove('fade-out');
            rotatingTextElement.classList.add('fade-in');
        }, animationDuration);
    }

    // Устанавливаем начальный текст и класс для первой анимации
    if (rotatingTextElement) {
        rotatingTextElement.textContent = words[currentIndex];
        rotatingTextElement.classList.add('fade-in'); // Чтобы первый текст тоже появился плавно
        setInterval(changeText, changeInterval);
    }

    // Небольшой параллакс эффект для контейнера при движении мыши (опционально)
    const container = document.querySelector('.container');
    if (container && window.innerWidth > 768) { // Только на десктопах
        document.body.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25; // Делитель управляет "силой" эффекта
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            container.style.transform = `rotateY(${xAxis}deg) rotateX(${-yAxis}deg) translateZ(5px)`;
            // Добавим небольшой сдвиг и тени для фона, если хотите
            // document.querySelector('.background-shapes').style.transform = `translateX(${-xAxis/2}px) translateY(${-yAxis/2}px)`;
        });
        document.body.addEventListener('mouseleave', () => {
            container.style.transform = `rotateY(0deg) rotateX(0deg) translateZ(0px)`;
            container.style.transition = 'transform 0.5s ease';
            // document.querySelector('.background-shapes').style.transform = 'translateX(0px) translateY(0px)';
        });
         // Сброс transition после того как мышь ушла, чтобы движение было мгновенным
        document.body.addEventListener('mouseenter', () => {
            container.style.transition = 'none';
        });
    }
});
