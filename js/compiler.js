// Функция для скрытия всех текстовых областей ввода
function hideAllInputs() {
	document.getElementById('htmlArea').classList.add('hidden');
	document.getElementById('cssArea').classList.add('hidden');
	document.getElementById('jsArea').classList.add('hidden');
}
// Функция для отображения текстовой области ввода HTML
function showHtmlInput() {
	hideAllInputs(); // Сначала скрываем все текстовые области ввода
	document.getElementById('htmlArea').classList.remove('hidden'); // Затем отображаем текстовую область ввода HTML
	// Убираем свечение у других кнопок
	document.getElementById('screenBlue').classList.remove('glow-blue');
	document.getElementById('screenYellow').classList.remove('glow-yellow');
	// Добавляем свечение к кнопке HTML
	document.getElementById('screenOrange').classList.add('glow-orange');
}
// Функция для отображения текстовой области ввода CSS
function showCssInput() {
	hideAllInputs();
	document.getElementById('cssArea').classList.remove('hidden');
	// Убираем свечение у других кнопок
	document.getElementById('screenOrange').classList.remove('glow-orange');
	document.getElementById('screenYellow').classList.remove('glow-yellow');
	// Добавляем свечение к кнопке CSS
	document.getElementById('screenBlue').classList.add('glow-blue');
}
// Функция для отображения текстовой области ввода JS
function showJsInput() {
	hideAllInputs();
	document.getElementById('jsArea').classList.remove('hidden');
	// Убираем свечение у других кнопок
	document.getElementById('screenOrange').classList.remove('glow-orange');
	document.getElementById('screenBlue').classList.remove('glow-blue');
	// Добавляем свечение к кнопке JS
	document.getElementById('screenYellow').classList.add('glow-yellow');
}
// Назначаем обработчики событий для кнопок
document.getElementById('screenOrange').addEventListener('click', showHtmlInput);
document.getElementById('screenBlue').addEventListener('click', showCssInput);
document.getElementById('screenYellow').addEventListener('click', showJsInput);
// Показываем текстовую область ввода HTML после загрузки страницы
document.addEventListener('DOMContentLoaded', function () {
	showHtmlInput();
});

function updateResult() {
	var htmlCode = document.getElementById("htmlInput").value;
	var cssCode = document.getElementById("cssInput").value;
	var jsCode = document.getElementById("jsInput").value;
	var iframe = document.getElementById("resultScreen");
	var resultEmptyTitle = document.getElementById("resultEmptyTitle");
	var iframeDocument = iframe.contentWindow.document;
	if ((htmlCode == "")) {
		iframe.classList.add("hidden")
		resultEmptyTitle.classList.remove("hidden")
	} else {
		iframe.classList.remove("hidden")
		resultEmptyTitle.classList.add("hidden")
	}
	iframeDocument.open();
	iframeDocument.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Result</title>
                <style>${cssCode}</style>
                <script>
				document.addEventListener('DOMContentLoaded', () => {${jsCode} });
			
				
				</script>
            </head>
            <body>${htmlCode}</body>
            </html>
        `);
	iframeDocument.close();
}
setInterval(updateResult, 2000)