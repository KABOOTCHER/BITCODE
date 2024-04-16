document.addEventListener('DOMContentLoaded', function () {
    const burgerBtn = document.querySelector('.burger-btn');
    const menu = document.querySelector('.menu');

    burgerBtn.addEventListener('click', function () {
      burgerBtn.classList.toggle('open'); // Переключаем класс open у кнопки
      menu.classList.toggle('show'); // Переключаем класс show у меню
    });


 });