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

    const checkWinner = (board, marker) => {
        // check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0].getMarker() === marker && board[i][1].getMarker() === marker && board[i][2].getMarker() === marker) {
                return true;
            }
        }

        // check columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i].getMarker() === marker && board[1][i].getMarker() === marker && board[2][i].getMarker() === marker) {
                return true;
            }
        }

        // check diagonals
        if ((board[0][0].getMarker() === marker && board[1][1].getMarker() === marker && board[2][2].getMarker() === marker) ||
        (board[0][2].getMarker() === marker && board[1][1].getMarker() === marker && board[2][0].getMarker() === marker)) {
            return true;
        }

        return false;
    }

    const checkTie = (board) => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j].getMarker() === "") {
                    return false;
                }
            }
        }
        return true;
    }

    const playRound = (row, column) => {
        console.log(`Placing ${getCurrentPlayer().name}'s marker on location ${row}, ${column}...`);
        gameboard.placeMarker(row, column, getCurrentPlayer().marker);

        // check for a winner and handle that logic, such as a win message //
        if (checkWinner(gameboard.getBoard(), getCurrentPlayer().marker)) {
            console.log(`${getCurrentPlayer().name} has won the game!`);
            gameboard.printBoard();
            return;
        }
        if (checkTie(gameboard.getBoard())) {
            console.log("The game has ended in a tie.");
            gameboard.printBoard();
            return;
        }

        switchPlayerTurn();
        printNewRound();
    };

    // initial play game message
    printNewRound();

    return {playRound, getCurrentPlayer, getBoard: gameboard.getBoard()};
})();

const displayController = (function() {
    const playerTurnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");

    const updateScreen = () => {
        boardDiv.textContent = "";

        const board = gameController.getBoard();
        const currentPlayer = gameController.getCurrentPlayer();

        playerTurnDiv.textContent = `${currentPlayer}'s turn...`


        // board -> [[X X O], [O X O], [O O X]]


        board.forEach(row => {
            row.forEach((cell, column) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.row = row;
                cellButton.dataset.column = column;
                cellButton.textContent = cell.getMarker();
                boardDiv.appendChild(cellButton);
            })
        })
    }

    boardDiv.addEventListener("click", (e) => {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;
        if (!selectedRow || !selectedColumn) return;

        gameController.playRound(selectedRow, selectedColumn);
        updateScreen();
    })

    updateScreen();
})();

displayController();

// gameController.playRound(0, 0);
// gameController.playRound(1, 0);
// gameController.playRound(0, 1);
// gameController.playRound(0, 2);
// gameController.playRound(2, 0);
// gameController.playRound(1, 1);
// gameController.playRound(1, 2);
// gameController.playRound(2, 1);
// gameController.playRound(2, 2);