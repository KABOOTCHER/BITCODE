var applyTextStroke = function(className, color, width) {
	var r = width;
	var n = Math.ceil(2 * Math.PI * r); /* number of shadows */
	var str = '';
	for (var i = 0; i < n; i++) /* append shadows in n evenly distributed directions */ {
		var theta = 2 * Math.PI * i / n;
		str += (r * Math.cos(theta)) + "px " + (r * Math.sin(theta)) + "px 0 " + color + (i == n - 1 ? "" : ",");
	}
	var arr = document.getElementsByClassName(className);
	for (var dom of arr) {
		dom.style.textShadow = str;
	}
};

if (window.innerWidth > 750) {
	applyTextStroke("glowFillTitle", "var(--lightPrimaryColor)", 4);
	applyTextStroke("glowPurple", "var(--purpleColor)", 4);
	applyTextStroke("glowYellow", "var(--yellowColor)", 4);
	applyTextStroke("glowOrange", "var(--orangeColor)", 4);
	applyTextStroke("glowBeige", "var(--lightPrimaryColor)", 4);
	applyTextStroke("glowBlue", "var(--lightBlueColor)", 4);



	
	applyTextStroke("logoFooter ", "var(--orangeColor)", 4);
	applyTextStroke("logo", "var(--lightBlueColor)", 4);
} else {
	applyTextStroke("glowFillTitle", "var(--lightPrimaryColor)", 1.5);

	
	applyTextStroke("logoFooter", "var(--orangeColor) !important", 1.5);
	applyTextStroke("logo", "var(--lightBlueColor)", 1.5);
	applyTextStroke("logoFooter ", "var(--orangeColor)", 1.5);

	applyTextStroke("glowPurple", "var(--purpleColor)", 1.5);
	applyTextStroke("glowYellow", "var(--yellowColor)", 1.5);
	applyTextStroke("glowOrange", "var(--orangeColor)", 1.5);
	applyTextStroke("glowBlue", "var(--lightBlueColor)", 1.5);
}