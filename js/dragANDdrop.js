document.addEventListener("DOMContentLoaded", function() {
    const floppyBlock = document.querySelector(".floppyBlock");
    const screenTitle = document.querySelector(".screenTitle");
    const screenContent = document.querySelector(".screen.tv-screen-content");
    const ejectButton = document.getElementById("ejectButton");
    let originalState = null;
    let addedButton = null;
    let blockAdded = false;

    originalState = document.querySelector(".windowInfo").innerHTML;

  
    function restoreOriginalState() {
        if (originalState) {
            document.querySelector(".windowInfo").innerHTML = originalState;
            blockAdded = false;
            updateAdvantageEventListeners();
        }

      
        const attachedAdvantages = document.querySelectorAll(".floppyLine .advantage");
        attachedAdvantages.forEach(advantage => {
            advantage.remove();
        });

      
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

   
    ejectButton.addEventListener("click", function() {
        restoreOriginalState();
    });


    function clickEvent(event) {
        if (blockAdded) {
            return;
        }

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


    function dragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.id);
    }


    function dragOver(event) {
        event.preventDefault();
    }

  
    function drop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text/plain");
        const draggedElement = document.getElementById(data);
        if (!draggedElement || blockAdded) {
            return;
        }
        const parentAdvantage = draggedElement.parentElement;
        if (!parentAdvantage || !parentAdvantage.classList.contains("windowInfo")) {
            return;
        }
        if (floppyBlock.querySelector(".floppyLine")) {
            floppyBlock.querySelector(".floppyLine").appendChild(draggedElement);
        } else {
            const floppyLine = document.createElement("hr");
            floppyLine.classList.add("floppyLine");
            floppyBlock.appendChild(floppyLine);
            floppyLine.appendChild(draggedElement);
        }
        const advantageTitle = draggedElement.getAttribute("data-title");
        const advantageLink = draggedElement.getAttribute("data-link");
        const advantageDescription = draggedElement.getAttribute("data-description");
        const advantageId = draggedElement.id;

       
        const descriptionBlock = document.createElement("p");
        descriptionBlock.textContent = advantageDescription;
        screenContent.appendChild(descriptionBlock);

        
        addedButton = document.createElement("a");
        addedButton.classList.add("button", "blueButton");
        addedButton.textContent = "Перейти к заданию";
        addedButton.setAttribute("href",advantageLink +".html#" + advantageId);
        screenContent.appendChild(addedButton);
        screenTitle.textContent = advantageTitle.toUpperCase();
        
        if (window.innerWidth <= 500) {
            screenTitle.classList.add('biggerTitle');
        }
        blockAdded = true;
   
    }

  
    floppyBlock.addEventListener("dragover", dragOver);
    floppyBlock.addEventListener("drop", drop);

    
    function updateAdvantageEventListeners() {
        const advantages = document.querySelectorAll(".advantage");
        advantages.forEach(advantage => {
            if ('ontouchstart' in window ||  (navigator.maxTouchPoints > 25 & navigator.maxTouchPoints < 256)) {
               
                advantage.removeEventListener("dragstart", dragStart);
                advantage.addEventListener("click", clickEvent);
                
            } else {
              
                advantage.removeEventListener("click", clickEvent);
                advantage.addEventListener("dragstart", dragStart);
                
            }
        });
    }

    updateAdvantageEventListeners();


    window.addEventListener("resize", updateAdvantageEventListeners);


    const isTouchDevice = 'ontouchstart' in window || (navigator.maxTouchPoints > 25 & navigator.maxTouchPoints < 256);

 
    if (isTouchDevice) {
        updateAdvantageEventListeners();
    }
});