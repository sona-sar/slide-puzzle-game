let rows = 3;
let columns = 3;

let curTile = [null, null, null];
let otherTile = [null, null, null];

let score = [0, 0, 0]; // Scores for both boards

let imgOrder1 = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];
let imgOrder2 = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];
let imgOrder3 = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

window.onload = function() {
    initializeBoard("board1", imgOrder1, "images/blueThing/", 0);
    initializeBoard("board2", imgOrder2, "images/rickMorty/", 1);
    initializeBoard("board3", imgOrder3, "images/up/", 2);
};

function initializeBoard(boardId, imgOrder, basePath, boardIndex) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let tile = document.createElement("img");
            tile.id = boardId + "-" + i.toString() + "-" + j.toString();
            tile.src = basePath + imgOrder.shift() + ".jpg";
            tile.draggable = true;

   
            tile.addEventListener("dragstart", function(e) { dragStart(e, boardIndex); });
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", function(e) { dragDrop(e, boardIndex); });
            tile.addEventListener("dragend", function() { dragEnd(boardIndex); });

            document.getElementById(boardId).append(tile);
        }
    }
}

function dragStart(e, boardIndex) {
    curTile[boardIndex] = e.target;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop(e, boardIndex) {
    e.preventDefault();
    otherTile[boardIndex] = e.target;
}

function dragEnd(boardIndex) {
    // Ensure the dragEnd logic only runs if the other tile exists
    if (!otherTile[boardIndex]) return;

    // Checking for a specific image on the other tile before swapping
    if (!otherTile[boardIndex].src.includes("3.jpg")) {
        return;
    }

    let curCoords = curTile[boardIndex].id.split("-").slice(1).map(Number);
    let otherCoords = otherTile[boardIndex].id.split("-").slice(1).map(Number);

    // Calculate if tiles are adjacent
    let isAdjacent = Math.abs(curCoords[0] - otherCoords[0]) + Math.abs(curCoords[1] - otherCoords[1]) === 1;

    if (isAdjacent) {
        // Swap tiles
        let tempSrc = curTile[boardIndex].src;
        curTile[boardIndex].src = otherTile[boardIndex].src;
        otherTile[boardIndex].src = tempSrc;

        // Update score and display it
        score[boardIndex]++;
        document.getElementById("turns" + (boardIndex + 1)).innerText = score[boardIndex];
    }
}
