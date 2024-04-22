// Объект с названиями и описаниями заданий
const tasks = {
	anotherArray: {
		title: "Поиск наибольшего",
		description: "заполни массив случайными числами, используя функцию Math.random() для генерации случайных чисел. Затем напиши функцию, которая будет проходить по массиву и находить наибольшее число. Используй переменную, чтобы хранить текущее максимальное значение, и обновляй ее при обнаружении большего числа."
	},
	poly: {
		title: "Палиндром",
		description: "Палиндром — это слово или фраза, которая читается одинаково как слева направо, так и справа налево (например, 'казак'). Тебе нужно написать функцию, которая принимает строку и определяет, является ли она палиндромом. Функция должна вернуть true, если строка палиндром, и false, если нет. Сначала очисти строку от пробелов и знаков препинания, затем сравни обрезанную строку с её перевернутой версией."
	},
	sort: {
		title: "Сортировщик",
		description: "Напиши функцию, которая принимает массив и возвращает его отсортированным. Используй метод sort() с функцией сравнения, чтобы корректно отсортировать массив по возрастанию."
	},
	timer: {
		title: "Таймер",
		description: "Напиши функцию, которая принимает время в секундах и выводит сообщение через указанный промежуток времени. Используй функцию setTimeout() для установки таймера. Сделай возможность возможность указать время таймера в интерфейса, а после истечения времени выведи сообщение, например, 'Время вышло!'."
	},
	planner: {
		title: "Планировщик",
		description: "Создай объект, представляющий планировщик событий. В этом планировщике можно будет добавлять и удалять задания. Напиши функции addEvent() для добавления задания и removeEvent() для удаления задания по его имени. Планировщик должен хранить задания в виде массива объектов, в каждом из которых будет имя задания и его описание."
	},
	colorGenerator: {
		title: "Генератор цвета",
		description: "Создай функцию, которая будет генерировать случайный цвет в формате RGB или HEX. Для RGB используй три случайных числа в диапазоне от 0 до 255, а для HEX — случайное шестнадцатеричное значение. Функция должна возвращать строку с сгенерированным цветом."
	},
	password: {
		title: "Генератор паролей",
		description: "Напиши функцию, которая генерирует случайные пароли. Пользователь должен иметь возможность указать длину пароля, наличие специальных символов и букв разного регистра. Используй массивы символов, цифр и специальных знаков, чтобы собирать пароли, а затем перемешивай их для дополнительной случайности."
	},
	cesar: {
		title: "Шифр Цезаря",
		description: "Шифр Цезаря — это один из простых методов шифрования, при котором каждая буква смещается на определенное количество позиций в алфавите. Напиши функцию, которая принимает строку и величину сдвига, а затем возвращает зашифрованную строку. Убедись, что сдвиг работает по кольцу, то есть после буквы 'z' должен идти 'a', и аналогично с заглавными буквами."
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