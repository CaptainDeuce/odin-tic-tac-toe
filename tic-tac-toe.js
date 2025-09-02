const gameboard = (function() {
    const rows = 3;
    const columns = 3;
    let board = [];

    // create a 2D array to model the game board
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const printBoard = () => {
        const boardWithMarkers = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithMarkers);
    }


    return {getBoard, printBoard};
})();

function Cell() {
    let marker = "";

    const addMarker = (player) => {
        marker = player;
    }

    const getMarker = () => marker;

    return {addMarker, getMarker};
}

