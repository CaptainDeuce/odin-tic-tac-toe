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

function createPlayer() {
    const name = prompt("Please enter a name: ");
    const marker = prompt("Please enter an X or O: ");

    return {name, marker};
}

const gameController = (function() {
    const players = [createPlayer(), createPlayer()];
    
    let currentPlayer = players[0];

    const switchPlayerTurn = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    const getCurrentPlayer = () => currentPlayer;

    const printNewRound = () => {
        gameboard.printBoard();
        console.log(`${getCurrentPlayer().name}'s turn.`);
    }

    const playRound = (row, column) => {
        console.log(`Placing ${getCurrentPlayer().name}'s marker on location ${row}, ${column}...`);
        gameboard.placeMarker(row, column, getCurrentPlayer().marker);

        // check for a winner and handle that logic, such as a win message //
        board = gameboard.getBoard();
        switch(board) {
            // the three rows winning
            case board[0][0] === getCurrentPlayer().marker && board[0][1] === getCurrentPlayer().marker && board[0][2] === getCurrentPlayer().marker:
            case board[1][0] === getCurrentPlayer().marker && board[1][1] === getCurrentPlayer().marker && board[1][2] === getCurrentPlayer().marker:
            case board[2][0] === getCurrentPlayer().marker && board[2][1] === getCurrentPlayer().marker && board[2][2] === getCurrentPlayer().marker:

            // the three columns winning
            case board[0][0] === getCurrentPlayer().marker && board[1][0] === getCurrentPlayer().marker && board[2][0] === getCurrentPlayer().marker:
            case board[0][1] === getCurrentPlayer().marker && board[1][1] === getCurrentPlayer().marker && board[2][1] === getCurrentPlayer().marker:
            case board[0][2] === getCurrentPlayer().marker && board[1][2] === getCurrentPlayer().marker && board[2][2] === getCurrentPlayer().marker:

            // the two diagonals winning
            case board[0][0] === getCurrentPlayer().marker && board[1][1] === getCurrentPlayer().marker && board[2][2] === getCurrentPlayer().marker:
            case board[0][2] === getCurrentPlayer().marker && board[1][1] === getCurrentPlayer().marker && board[2][0] === getCurrentPlayer().marker:
                console.log(`${getCurrentPlayer().name} has won the game!`);
                break;

            // a tie
            case board[0][0] === ("X" || "O") && board[0][1] === ("X" || "O") && board[0][2] === ("X" || "O") &&
                board[1][0] === ("X" || "O") && board[1][1] === ("X" || "O") && board[1][2] === ("X" || "O") &&
                board[2][0] === ("X" || "O") && board[2][1] === ("X" || "O") && board[2][2] === ("X" || "O"):
                console.log("The game has ended in a tie.");
                break;
            default:
        }



        switchPlayerTurn();
        printNewRound();
    };

    // initial play game message
    printNewRound();

    return {playRound, getCurrentPlayer};
})();

gameController.playRound(0, 1);
