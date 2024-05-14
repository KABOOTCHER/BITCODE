function hideAllInputs() {
    document.getElementById('htmlArea').classList.add('hidden');
    document.getElementById('cssArea').classList.add('hidden');
    document.getElementById('jsArea').classList.add('hidden');
}

function showHtmlInput() {
    hideAllInputs();
    document.getElementById('htmlArea').classList.remove('hidden');

    document.getElementById('screenBlue').classList.remove('glow-blue');
    document.getElementById('screenYellow').classList.remove('glow-yellow');

    document.getElementById('screenOrange').classList.add('glow-orange');
}

function showCssInput() {
    hideAllInputs();
    document.getElementById('cssArea').classList.remove('hidden');

    document.getElementById('screenOrange').classList.remove('glow-orange');
    document.getElementById('screenYellow').classList.remove('glow-yellow');

    document.getElementById('screenBlue').classList.add('glow-blue');
}

function showJsInput() {
    hideAllInputs();
    document.getElementById('jsArea').classList.remove('hidden');

    document.getElementById('screenOrange').classList.remove('glow-orange');
    document.getElementById('screenBlue').classList.remove('glow-blue');

    document.getElementById('screenYellow').classList.add('glow-yellow');
}

document.getElementById('screenOrange').addEventListener('click', showHtmlInput);
document.getElementById('screenBlue').addEventListener('click', showCssInput);
document.getElementById('screenYellow').addEventListener('click', showJsInput);

document.addEventListener('DOMContentLoaded', function () {
    showHtmlInput();
});

document.getElementById('htmlInput').addEventListener('input', updateResult);
document.getElementById('cssInput').addEventListener('input', updateResult);
document.getElementById('jsInput').addEventListener('input', updateResult);

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
