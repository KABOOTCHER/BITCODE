  // Применение маски к полю телефона
  $("#phoneField").inputmask({
    mask: "+7 (999) 999-99-99",  // Маска телефонного номера
    removeMaskOnSubmit: true  // Удаление маски при отправке
});

// Обработчик для кнопки отправки основной формы
$("#formSendButton").on("click", function () {
    var name = $("#nameField").val().trim();
    var phone = $("#phoneField").val().trim();
    var email = $("#emailField").val().trim();

    // Валидация полей
    var nameValid = /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(name);
    var emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    var phoneValid = /^\+?[0-9\s\-()]+$/.test(phone) && phone.length >= 11;

    var errors = [];

    if (!nameValid) {
        errors.push("Введите корректное имя (только буквы и пробелы).");
    }
    if (!phoneValid) {
        errors.push("Введите корректный номер телефона (не менее 11 символов).");
    }
    if (!emailValid) {
        errors.push("Введите корректный адрес электронной почты.");
    }

    if (errors.length > 0) {
        // Показать каждую ошибку в отдельном уведомлении
        errors.forEach(function (error) {
            showNotification(error);  // Отправить каждую ошибку в отдельное уведомление
        });
    } else {
        showNotification("Форма успешно отправлена!");
        $("#nameField").val("");  // Очистка поля имени
        $("#phoneField").val("");  // Очистка поля телефона
        $("#emailField").val("");  // Очистка электронной почты
    }

});



function showNotification(message) {
    // Создаем основной div с классами
    var notification = document.createElement("div");
    notification.className = "window windowYellow notification"; // Классы из вашей структуры
    
    // Определяем все существующие уведомления
    var existingNotifications = document.querySelectorAll(".notification");
    
    // Устанавливаем позицию по вертикали для нового уведомления
    var baseOffset = 5; // Базовый отступ
    var notificationHeight = 10; // Высота каждого уведомления
    var topPosition = baseOffset + existingNotifications.length * (notificationHeight + 10); // Дополнительный промежуток между уведомлениями

    notification.style.position = "fixed"; // Фиксированное положение
    notification.style.top = topPosition + "%"; // Положение по вертикали
    notification.style.right = "10px"; // Положение по горизонтали
    
    // Добавляем внутреннюю структуру блока
    notification.innerHTML = `
        <div class="notificationNav">
            <img alt="" class="notificationIcon closeNotification" src="/img/navItems/crossWhite.png" alt="Закрыть"> 
        </div>
        <div class="windowInfo">
            <div class="windowWrap">
                <div class="windowSubtitle">
                    ${message}
                </div>
            </div>
        </div>
    `;

    // Добавляем уведомление в документ
    document.body.appendChild(notification);

    // Обработчик клика на иконку закрытия
    notification.querySelector(".closeNotification").addEventListener("click", function() {
        document.body.removeChild(notification); // Удаление уведомления при клике
    });
    
    // Плавное исчезновение и удаление уведомления через 5 секунд
    setTimeout(function () {
        notification.style.opacity = "0";  // Плавное исчезновение

        setTimeout(function () {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);  // Удаление уведомления через 1 секунду
            }
        }, 1000);
    }, 5000);  // Уведомление исчезает через 5 секунд
}

// Обработчик для кнопки отправки формы подписки на обновления
$("#emailSendButton").on("click", function () {
    var email = $("#contactEmailField").val().trim();

    // Проверка корректности адреса электронной почты
    var emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValid) {
        showNotification("Введите корректный адрес электронной почты.");  // Ошибка валидации
    } else {
        showNotification("Подписка на обновления успешно оформлена!");
        $("#contactEmailField").val("");  // Очистка поля электронной почты
    }
});