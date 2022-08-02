class Controller {
    constructor() {
        this.board = [];
        this.selected = null;
        this.piecesController = new PiecesController(this);
        this.createNewBoard();
        this.populateNewBoard();
    }

    // Check if King is checked
    // Roque

    createNewBoard() {
        const table = document.querySelector("table#chess-board");
        let tableHeadNumber = 8;
        let tableHeadLetter = 0;
        const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
        let count = 0;
        for (let i = 0; i < 8; i++) {
            table.appendChild(document.createElement("tr"));
        }
        const trs = document.querySelectorAll("table#chess-board > tr");
        for (let i = 0; i < 8; i++) {
            let t = trs[i];
            for (let j = 0; j < 8; j++) {
                let td = document.createElement("td");
                t.appendChild(td);
                if (j === 0) {
                    let span = document.createElement("span");
                    span.innerHTML = tableHeadNumber;
                    span.classList.add("head-number-span");
                    td.classList.add("head-number");
                    td.appendChild(span);
                    tableHeadNumber -= 1;
                }
                if (i === 7) {
                    let span = document.createElement("span");
                    span.innerHTML = letters[tableHeadLetter];
                    span.classList.add("head-letter-span");
                    td.classList.add("head-letter");
                    td.appendChild(span);
                    tableHeadLetter += 1;
                }
                let square = new Square(j, i, count, this.piecesController, this.board);
                this.board.push(square);
            }
        }
    }

    populateNewBoard() {
        this.piecesController.createNewPiece("king", "white", [7, 3]);
        this.piecesController.createNewPiece("queen", "white", [7, 4]);
        this.piecesController.createNewPiece("bishop", "white", [7, 5]);
        this.piecesController.createNewPiece("horse", "white", [7, 6]);
        this.piecesController.createNewPiece("rook", "white", [7, 7]);

        this.piecesController.createNewPiece("rook", "white", [7, 0]);
        this.piecesController.createNewPiece("horse", "white", [7, 1]);
        this.piecesController.createNewPiece("bishop", "white", [7, 2]);

        for (let i = 0; i <= 7; i++) {
            this.piecesController.createNewPiece("pawn", "white", [6, i]);
        }

        this.piecesController.createNewPiece("king", "black", [0, 4]);
        this.piecesController.createNewPiece("queen", "black", [0, 3]);
        this.piecesController.createNewPiece("bishop", "black", [0, 5]);
        this.piecesController.createNewPiece("horse", "black", [0, 6]);
        this.piecesController.createNewPiece("rook", "black", [0, 7]);
        this.piecesController.createNewPiece("rook", "black", [0, 0]);
        this.piecesController.createNewPiece("horse", "black", [0, 1]);
        this.piecesController.createNewPiece("bishop", "black", [0, 2]);

        for (let i = 0; i <= 7; i++) {
            this.piecesController.createNewPiece("pawn", "black", [1, i]);
        }

    }

}