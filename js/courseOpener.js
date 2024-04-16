

document.addEventListener("DOMContentLoaded", function () {
   const buttons = document.querySelectorAll('.button');
   const closeIcons = document.querySelectorAll('.closeIcon');

   buttons.forEach(button => {
       button.addEventListener('click', function (event) {
           const href = this.getAttribute('href'); // Получаем значение атрибута href

           // Проверяем наличие ссылки
           if (href) {
               // Перенаправляем пользователя по ссылке
               window.location.href = href;
           } else {
               event.preventDefault();

               const courseId = this.getAttribute('id').replace('button', 'course');
               const course = document.getElementById(courseId);
               const windowsWrapper = document.querySelector('.windowsWrapper');

               if (course && windowsWrapper) {
                   windowsWrapper.style.display = 'none';
                   course.classList.remove('hidden');
               }
           }
       });
   });

   closeIcons.forEach(icon => {
       icon.addEventListener('click', function () {
           const windowsWrapper = document.querySelector('.windowsWrapper');
           const course = this.closest('.window');

           if (course && windowsWrapper) {
               course.parentElement.classList.add('hidden');
               windowsWrapper.style.display = 'flex';
           }
       });
   });
});

