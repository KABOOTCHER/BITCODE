


// Объект с названиями и описаниями заданий
const tasks = {
    BaseHTML: {
        title: "Основы HTML",
        description: "Создай простую веб-страницу, которая будет содержать в себе несколько простых элементов, например: <br> Заголовок H1, Параграф с текстом и изображение <img> <br> информацию о том, как правильно писать теги, можешь посмотреть в `<a> справочнике </a>"
    },
    BaseCSS: {
        title: "Основы CSS",
        description: "Добавь несколько HTML элементов на страницу, а потом задай им стили через тег, класс или ID. Можешь посмотреть как различные стили влияют на те или иные блоки, открыв справочник."
    },
    TextForm: {
        title: "Текст",
        description: "Напиши несколько текстовых элементов на странице, например заголовок <H1> и параграф <p>, а затем используй стили для изменения текста. Например color для смены цвета текста или font-size для изменения размеров. Другие стили можешь посмотреть в справочнике."
    },
    Links: {
        title: "Ссылки",
        description: "Cсылки <a> представляют собой текстовые элементы, при клике на которые будет происходить переход на другие страницы или сайты. Попробуй переписать предустановленные для этого тега стили для обычного состояния, состояния при наведении и при нажатии (a, a:hover, a:active)"
    },
    Pictures: {
        title: "Изображения",
        description: "Добавь несколько изображений на страницу используя тег <img>. Добавь к изображению несколлько стилей, чтобы сделать обводку и скруглённые рамки."
    },
    Lists: {
        title: "Списки",
        description: "В этом задании тебе нужно создать упорядоченный и неупорядоченный списки, изменить первый элемент списка используя ::first-child и изменить расстояние между пунктами."
    },
    MarkUp: {
        title: "Разметка блоков",
        description: "Создай несколько блоков div, внутри которого будет ещё несколько элементов (например текст или картинки). К одному из них примени display:flex и выровняй содержимое вертикально и  по высоте родительского блока, а к другому примени display:grid и создай две колонки из двух элементов равных по размеру."
    },
    Positioning: {
        title: "Положение",
        description: "Используя position:absolute и position:relative попробуй создать два блока и наложить их друг на друга в любом месте экрана."
    }
};
function updateTask(taskId) {
    const titleElements = document.querySelectorAll('.taskTitle');
    const descriptionElement = document.getElementById('taskDescription');

    if (tasks[taskId]) {
        titleElements.forEach(element => {
            element.textContent = tasks[taskId].title;
            element.setAttribute('data-text', tasks[taskId].title);
        });
        descriptionElement.textContent = tasks[taskId].description;
        document.title = tasks[taskId].title;
    } else {
        titleElements.forEach(element => {
            element.textContent = "Задание не найдено";
        });
        descriptionElement.textContent = "Описание задания не доступно";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const hash = window.location.hash.substr(1);
    if (hash) {
        updateTask(hash);
    }

    document.querySelectorAll('.taskButtons a').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const taskId = button.getAttribute('href').substr(1);
            updateTask(taskId);
            history.replaceState(null, null, '#' + taskId);

            const currentTaskIndex = Object.keys(tasks).indexOf(taskId);
            const prevTaskId = currentTaskIndex === 0 ? Object.keys(tasks)[Object.keys(tasks).length - 1] : Object.keys(tasks)[currentTaskIndex - 1];
            const nextTaskId = currentTaskIndex === Object.keys(tasks).length - 1 ? Object.keys(tasks)[0] : Object.keys(tasks)[currentTaskIndex + 1];
            const prevButton = button.parentElement.querySelector('a:first-child');
            const nextButton = button.parentElement.querySelector('a:last-child');

            prevButton.href = `#${prevTaskId}`;
            nextButton.href = `#${nextTaskId}`;
        });
    });

    const currentTaskIndex = Object.keys(tasks).indexOf(hash);
    const prevTaskId = currentTaskIndex === 0 ? Object.keys(tasks)[Object.keys(tasks).length - 1] : Object.keys(tasks)[currentTaskIndex - 1];
    const nextTaskId = currentTaskIndex === Object.keys(tasks).length - 1 ? Object.keys(tasks)[0] : Object.keys(tasks)[currentTaskIndex + 1];
    const prevButton = document.querySelector('.taskButtons a:first-child');
    const nextButton = document.querySelector('.taskButtons a:last-child');

    prevButton.href = `#${prevTaskId}`;
    nextButton.href = `#${nextTaskId}`;
});
