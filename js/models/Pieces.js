class PiecesController {
    constructor() {
        this.pieces = [];
        this.board = window.board;

        this.anotations = [];
    }

    findByPosition(x, y) {
        let p = window.board.filter(el => {
            return el.coords[1] === x && el.coords[0] === y;
        })[0]

        return p;
    }

    turnHighlightOff() {
        this.board.forEach(el => {
            el.removeHighlight();
            el.removeCapture();
        })
    }

    findPositionById(id) {
        let p = window.board.filter(el => {
            return el.id === id;
        })[0];

        let q = this.board.indexOf(p);

        return q;
    }

    createNewPiece(type, color, position) {
        let piece = null;
        let square = this.findByPosition(position[0], position[1]);
        square.position = this.findPositionById(square.id);

        switch (type) {
            case "pawn":
                if (color === "black") {
                    piece = new Pawn("Peão preto", "/images/black/black_pawn.png", color, square, window.board, this);
                }
                if (color === "white") {
                    piece = new Pawn("Peão branco", "/images/white/white_pawn.png", color, square, window.board, this);
                }
                this.pieces.push(piece)
                return piece;
            case "rook":
                if (color === "black") {
                    piece = new Rook("Torre preta", "/images/black/black_rook.png", color, square, window.board, this);
                }
                if (color === "white") {
                    piece = new Rook("Torre branca", "/images/white/white_rook.png", color, square, window.board, this);
                }
                this.pieces.push(piece)
                return piece;
            case "horse":
                if (color === "black") {
                    piece = new Horse("Cavalo preto", "/images/black/black_horse.png", color, square, window.board, this);
                }
                if (color === "white") {
                    piece = new Horse("Cavalo branco", "/images/white/white_horse.png", color, square, window.board, this);
                }
                this.pieces.push(piece)
                return piece;
            case "bishop":
                if (color === "black") {
                    piece = new Bishop("Bispo preto", "/images/black/black_bishop.png", color, square, window.board, this);
                }
                if (color === "white") {
                    piece = new Bishop("Bispo branco", "/images/white/white_bishop.png", color, square, window.board, this);
                }
                this.pieces.push(piece)
                return piece;
            case "queen":
                if (color === "black") {
                    piece = new Queen("Rainha preta", "/images/black/black_queen.png", color, square, window.board, this);
                }
                if (color === "white") {
                    piece = new Queen("Rainha branca", "/images/white/white_queen.png", color, square, window.board, this);
                }
                this.pieces.push(piece)
                return piece;
            case "king":
                if (color === "black") {
                    piece = new King("Rei preto", "/images/black/black_king.png", color, square, window.board, this);
                }
                if (color === "white") {
                    piece = new King("Rei branco", "/images/white/white_king.png", color, square, window.board, this);
                }
                this.pieces.push(piece)
                return piece;
        }
    }
}

class Piece {
    constructor(pieceName, img, color, square, board, controller) {
        this.name = pieceName;
        this.image = img;
        this.color = color;
        this.board = board;
        this.controller = controller;
        this.square = this.board[square.position];
        this.square.image = img;
        this.square.piece = this;
        this.isCaptured = false;

        let f = e => {
            this.square.toggleHighlight();
        }
        this.clickEvent = f;

        // this.addEvents(f);
        // this.removeEvents(f);

        this.square.isOcuppied = true;
    }

    squareAt(x, y) {
        let p = this.board.filter(el => {
            return el.column === x && el.row === y;
        })[0];

        return p;
    }

    findById(id) {
        let p = this.board.filter(el => {
            return el.id === id;
        })[0];

        let q = this.board.indexOf(p);

        return q;
    }

    moveTo(x, y) {
        let newSquare = this.squareAt(x, y);
        if (newSquare.piece) {
            // Tem peça amiga
            if (newSquare.piece?.color === this.color) {
                console.log("Peça de mesma cor ou já selecionada");
            } else {
                let captured = this.squareAt(x, y);
                let piece = captured.piece;
                console.log(captured.piece.name, "foi capturado");
                piece.isCaptured = true;
                captured.removePiece();
                this.moveTo(x, y);
            }
        } else {
            // Não tem peça
            this.square.removePiece();
            this.square = newSquare;
            this.square.addPiece(this, this.image);
        }
    }

}

class Queen extends Piece {
    constructor(img, color, square, board, controller) {
        super(img, color, square, board, controller);
    }
    highlightMovement() {
        this.controller.turnHighlightOff();
        this.square.toggleHighlight();
    }
}

class Horse extends Piece {
    constructor(img, color, square, board, controller) {
        super(img, color, square, board, controller);
    }
    highlightMovement() {
        let c = this.square.column;
        let r = this.square.row;
        let p = [
            this.squareAt(c - 2, r - 1),
            this.squareAt(c - 1, r - 2),
            this.squareAt(c + 1, r - 2),
            this.squareAt(c + 2, r - 1),
            this.squareAt(c + 2, r + 1),
            this.squareAt(c + 1, r + 2),
            this.squareAt(c - 1, r + 2),
            this.squareAt(c - 2, r + 1)
        ]

        let positions = [];

        p.forEach(pos => {
            if (pos) {
                positions.push(pos)
            }
        })

        for (let p = 0; p < positions.length; p++) {
            let pos = positions[p]
            if (pos.piece?.color !== this.color) {
                // O square existe
                if (pos.piece && pos.piece.color !== this.color) {
                    // Se existir e forem de cores diferentes
                    pos.addCapture();
                } else {
                    // Casa vazia
                    pos.addHighlight();
                }
            }
        }
    }
}

class Pawn extends Piece {
    constructor(img, color, square, board, controller) {
        super(img, color, square, board, controller);
    }
    highlightMovement() {
        this.controller.turnHighlightOff();
        this.square.toggleHighlight();
    }
}

class Rook extends Piece {
    constructor(img, color, square, board, controller) {
        super(img, color, square, board, controller);
    }
    highlightMovement() {
        console.log(this.controller)
        this.controller.turnHighlightOff();
        this.square.toggleHighlight();
    }
}

class Bishop extends Piece {
    constructor(img, color, square, board, controller) {
        super(img, color, square, board, controller);
    }
    highlightMovement() {
        this.controller.turnHighlightOff();
        this.square.toggleHighlight();
    }
}

class King extends Piece {
    constructor(img, color, square, board, controller) {
        super(img, color, square, board, controller);
    }
    highlightMovement() {
        this.controller.turnHighlightOff();
        this.square.toggleHighlight();
    }
}

