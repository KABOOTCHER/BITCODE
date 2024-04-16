document.addEventListener("DOMContentLoaded", function() {
	const floppyBlock = document.querySelector(".floppyBlock");
	const screenTitle = document.querySelector(".screenTitle");
	const screenContent = document.querySelector(".screen.tv-screen-content");
	const ejectButton = document.getElementById("ejectButton");
	let originalState = null;
	let addedButton = null;
	let blockAdded = false;
	// Save original state
	originalState = document.querySelector(".windowInfo").innerHTML;
	// Restore original state function
	function restoreOriginalState() {
		if (originalState) {
			document.querySelector(".windowInfo").innerHTML = originalState;
			blockAdded = false;
			updateAdvantageEventListeners(); // Reattach event listeners
		}
		// Remove attached advantages from floppyLine
		const attachedAdvantages = document.querySelectorAll(".floppyLine .advantage");
		attachedAdvantages.forEach(advantage => {
			advantage.remove();
		});
		// Remove added button and text blocks
		if (addedButton) {
			addedButton.remove();
		}
		const createdTextBlocks = document.querySelectorAll(".screen.tv-screen-content p");
		createdTextBlocks.forEach(block => {
			block.remove();
		});
		screenTitle.textContent = "#NO_SIGNAL";
		screenTitle.classList.remove("biggerTitle");
	}
	// Eject button event listener
	ejectButton.addEventListener("click", function() {
		restoreOriginalState();
	});
	// Click event handler for mobile devices
	function clickEvent(event) {
		if (window.innerWidth <= 900 && !blockAdded) {
			const target = event.currentTarget;
			const data = target.id;
			const draggedElement = document.getElementById(data);
			drop({
				preventDefault: function() {},
				dataTransfer: {
					getData: function() {
						return data;
					}
				}
			});
		}
	}
	// Drag start event handler
	function dragStart(event) {
		event.dataTransfer.setData("text/plain", event.target.id);
	}
	// Drag over event handler
	function dragOver(event) {
		event.preventDefault();
	}
	// Drop event handler
	function drop(event) {
		event.preventDefault();
		const data = event.dataTransfer.getData("text/plain");
		const draggedElement = document.getElementById(data);
		if (blockAdded) {
			return;
		}
		const parentAdvantage = draggedElement.parentElement;
		if (parentAdvantage.classList.contains("windowInfo")) {
			if (floppyBlock.querySelector(".floppyLine")) {
				floppyBlock.querySelector(".floppyLine").appendChild(draggedElement);
			} else {
				const floppyLine = document.createElement("hr");
				floppyLine.classList.add("floppyLine");
				floppyBlock.appendChild(floppyLine);
				floppyLine.appendChild(draggedElement);
			}
			const advantageTitle = draggedElement.getAttribute("data-title");
			const advantageDescription = draggedElement.getAttribute("data-description");
			const advantageId = draggedElement.id;
			// Create text block and add to screenContent
			const descriptionBlock = document.createElement("p");
			descriptionBlock.textContent = advantageDescription;
			screenContent.appendChild(descriptionBlock);
			// Create button
			addedButton = document.createElement("a");
			addedButton.classList.add("button", "blueButton");
			addedButton.textContent = "Перейти к заданию  #" + advantageTitle;
			addedButton.setAttribute("href", "task.html#" + advantageId);
			screenContent.appendChild(addedButton);
			screenTitle.textContent = advantageTitle.toUpperCase();
			if (window.innerWidth <= 500) {
				screenTitle.classList.add('biggerTitle');
			}
			blockAdded = true;
		}
	}
	// Add event listeners for floppyBlock
	floppyBlock.addEventListener("dragover", dragOver);
	floppyBlock.addEventListener("drop", drop);
	// Add event listeners for advantages
	function updateAdvantageEventListeners() {
		const advantages = document.querySelectorAll(".advantage");
		advantages.forEach(advantage => {
			if (window.innerWidth > 900) {
				advantage.removeEventListener("click", clickEvent);
				advantage.addEventListener("dragstart", dragStart);
			} else {
				advantage.removeEventListener("dragstart", dragStart);
				advantage.addEventListener("click", clickEvent);
			}
		});
	}
	// Initial call to update advantage event listeners based on window width
	updateAdvantageEventListeners();
	// Update advantage event listeners when window is resized
	window.addEventListener("resize", updateAdvantageEventListeners);
});