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

    const placeMarker = (row, column, player) => {
        board[row][column].addMarker(player);
    };

    const printBoard = () => {
        const boardWithMarkers = board.map((row) => row.map((cell) => cell.getMarker()));
        console.log(boardWithMarkers);
    }


    return {getBoard, placeMarker, printBoard};
})();

function Cell() {
    let marker = "";

    const addMarker = (player) => {
        marker = player;
    }

    const getMarker = () => marker;

    return {addMarker, getMarker};
}

