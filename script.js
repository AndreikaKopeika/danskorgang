document.addEventListener('DOMContentLoaded', function() {
    const rotatingTextElement = document.getElementById('rotating-text');
    const words = [
        "Легко!",
        "Быстро!",
        "На развитие!",
        "Для GANG'а!",
        "От души!",
        "С любовью <3" // Немного измененные фразы
    ];
    let currentIndex = 0;
    const changeInterval = 2300; // Чуть быстрее смена текста
    const animationDuration = 350; // Должно совпадать с CSS transition duration для #rotating-text

    function changeText() {
        if (!rotatingTextElement) return; // Добавлена проверка
        rotatingTextElement.classList.remove('fade-in');
        rotatingTextElement.classList.add('fade-out');

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % words.length;
            rotatingTextElement.textContent = words[currentIndex];
            rotatingTextElement.classList.remove('fade-out');
            rotatingTextElement.classList.add('fade-in');
        }, animationDuration);
    }

    if (rotatingTextElement) {
        rotatingTextElement.textContent = words[currentIndex];
        rotatingTextElement.classList.add('fade-in');
        setInterval(changeText, changeInterval);
    }

    const container = document.querySelector('.container');
    if (container && window.innerWidth > 768) {
        document.body.addEventListener('mousemove', (e) => {
            // Уменьшаем силу параллакс-эффекта (делитель больше)
            const xAxis = (window.innerWidth / 2 - e.pageX) / 55; // Было /25 или /45
            const yAxis = (window.innerHeight / 2 - e.pageY) / 55; // Было /25 или /45
            container.style.transform = `rotateY(${xAxis}deg) rotateX(${-yAxis}deg) translateZ(3px)`; // Уменьшен translateZ
        });
        document.body.addEventListener('mouseleave', () => {
            container.style.transform = `rotateY(0deg) rotateX(0deg) translateZ(0px)`;
            // Плавный возврат transition уже есть в .container
        });
        // Убраны mouseenter/mouseleave для transition='none', т.к. transition в .container теперь короткий
    }
});
