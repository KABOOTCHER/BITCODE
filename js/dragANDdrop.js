document.addEventListener("DOMContentLoaded", function() {
    const floppyBlock = document.querySelector(".floppyBlock");
    const ejectButton = document.getElementById("ejectButton");
    const screenContent = document.querySelector(".screen.tv-screen-content");
    const screenTitle = document.querySelector(".screenTitle");
    let originalState = document.querySelector(".windowInfo").innerHTML;
    let blockAdded = false;
    let addedButton = null;

    function isTouchDevice() {
        return 'ontouchstart' in window || (navigator.maxTouchPoints > 25 && navigator.maxTouchPoints < 256);
    }

    function restoreOriginalState() {
        // Восстанавливаем первоначальное состояние
        document.querySelector(".windowInfo").innerHTML = originalState;

        // Удаляем все "advantage" из "floppyLine"
        const advantages = floppyBlock.querySelectorAll(".floppyLine .advantage");
        advantages.forEach(advantage => advantage.remove());

        // Очищаем контент в экране
        screenContent.innerHTML = '';

        // Восстанавливаем первоначальный заголовок
        screenTitle.textContent = "#NO_SIGNAL";
        screenTitle.classList.remove("biggerTitle");

        // Сбрасываем состояния
        blockAdded = false;
        addedButton = null;

        // Сбрасываем стили кнопки "Eject"
        ejectButton.classList.remove("glow-white");

        // Обновляем слушатели событий
        updateEventListeners();
    }

    ejectButton.addEventListener("click", restoreOriginalState);

    function dragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.id);
    }

    function clickEvent(event) {
        if (blockAdded) return;
        const target = event.currentTarget;
        const data = target.id;
        drop({
            preventDefault: function() {},
            dataTransfer: {
                getData: function() {
                    return data;
                },
            },
        });
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text/plain");
        const draggedElement = document.getElementById(data);
        if (!draggedElement || blockAdded) return;

        // Убедимся, что "floppyLine" существует
        let floppyLine = floppyBlock.querySelector(".floppyLine");
        if (!floppyLine) {
            floppyLine = document.createElement("hr");
            floppyLine.classList.add("floppyLine");
            floppyBlock.appendChild(floppyLine);
        }

        // Добавляем элемент к "floppyLine"
        floppyLine.appendChild(draggedElement);

        // Добавляем описание в экран
        const descBlock = document.createElement("p");
        descBlock.textContent = draggedElement.getAttribute("data-description");
        screenContent.appendChild(descBlock);

        // Добавляем кнопку для перехода к заданию
        addedButton = document.createElement("a");
        addedButton.classList.add("button", "blueButton");
        addedButton.textContent = "Перейти к заданию";
        const advantageLink = draggedElement.getAttribute("data-link");
        addedButton.href = `${advantageLink}.html#${draggedElement.id}`;
        screenContent.appendChild(addedButton);

        screenTitle.textContent = draggedElement.getAttribute("data-title").toUpperCase();
        if (window.innerWidth <= 500) {
            screenTitle.classList.add("biggerTitle");
        }

        // Обновляем флаг блокировки и состояние кнопки "Eject"
        blockAdded = true;
        ejectButton.classList.add("glow-white");
    }

    function updateEventListeners() {
        const advantages = document.querySelectorAll(".advantage");
        const touchDevice = isTouchDevice();

        advantages.forEach(advantage => {
            if (touchDevice) {
                advantage.removeEventListener("dragstart", dragStart);
                advantage.addEventListener("click", clickEvent);
            } else {
                advantage.removeEventListener("click", clickEvent);
                advantage.addEventListener("dragstart", dragStart);
            }
        });
    }

    // Добавляем события "dragover" и "drop" на "floppyBlock"
    floppyBlock.addEventListener("dragover", dragOver);
    floppyBlock.addEventListener("drop", drop);

    // Начальная установка слушателей
    updateEventListeners();

    // Обновляем слушатели при изменении размера окна
    window.addEventListener("resize", updateEventListeners);
});
