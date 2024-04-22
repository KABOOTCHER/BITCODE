// Объект с названиями и описаниями заданий
const tasks = {
	square: {
		title: "Площадь рамы",
		description: "Ты должен написать функцию, которая будет принимать в качестве аргументов две стороны прямоугольника: длину и ширину. После написания функции, протестируй её с разными значениями длины и ширины, чтобы убедиться, что она работает правильно."
	},
	evenNum: {
		title: "Четность числа",
		description: "Напиши функцию, которая будет принимать число в качестве аргумента и проверять, является ли оно четным. Если число четное, функция должна возвращать true. Если число нечетное, функция должна возвращать false.  Подсказка: Четное число делится на 2 без остатка. Используй оператор остатка % для проверки."
	},
	array: {
		title: "Калькулятор",
		description: "В этом задании нужно создать базовый калькулятор, способный выполнять четыре основных арифметических операции: сложение, вычитание, умножение и деление. Калькулятор должен содержать два поля ввода для чисел и меню для выбора операции. Результат вычисления должен отображаться после нажатия кнопки 'Рассчитат'. "
	},
	objects: {
		title: "Объекты",
		description: "Тебе нужно создать объект, который будет представлять твою карточку с информацией о себе. Объект должен содержать свойства, такие как имя, возраст, любимое хобби и другие, которые считаешь нужным. Подсказка: Объекты в JavaScript состоят из пар 'ключ-значение'. Используй точечную нотацию для доступа к свойствам объекта."
	},
	cycle: {
		title: "Циклы",
		description: "Разработай функцию для расчёта факториала числа. Факториал, обозначаемый как n!, представляет собой произведение всех целых чисел от 1 до n. "
	},
	strings: {
		title: "Строки",
		description: "напиши функцию, которая принимает строку в качестве аргумента и возвращает ее в обратном порядке. Например, при вводе 'hello' функция должна вернуть 'olleh'. "
	},
	events: {
		title: "Обработка событий",
		description: "Напиши код, который будет выполнять определенное действие при клике на кнопку. Создай кнопку на веб-странице и добавь обработчик события click. Когда кнопка будет нажата, пусть она выводит сообщение в консоль или меняет текст на странице. Используй метод addEventListener() для добавления обработчика события."
	},
	animate: {
		title: "Анимация",
		description: "Напиши функцию, которая будет принимать объект и имя свойства, которое нужно изменить. Функция должна принимать также новое значение для этого свойства. После изменения, функция должна возвращать обновленный объект."
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
document.addEventListener('DOMContentLoaded', function() {
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