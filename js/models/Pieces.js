class PiecesController {
    constructor(c) {
        this.pieces = [];
        this.board = c.board;

        this.anotations = [];
    }

    findByPosition(x, y) {
        let p = this.board.filter(el => {
            return el.coords[0] === x && el.coords[1] === y;
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
        let p = this.board.filter(el => {
            return el.id === id;
        })[0];

        let q = this.board.indexOf(p);

        return q;
    }

    createNewPiece(type, color, position) {
        let piece = null;
        let square = this.findByPosition(position[1], position[0]);
        square.position = this.findPositionById(square.id);

        switch (type) {
            case "pawn":
                if (color === "black") {
                    piece = new Pawn("Peão preto", "images/black/black_pawn.png", color, square, this.board, this);
                }
                if (color === "white") {
                    piece = new Pawn("Peão branco", "images/white/white_pawn.png", color, square, this.board, this);
                }
                this.pieces.push(piece)
                return piece;
            case "rook":
                if (color === "black") {
                    piece = new Rook("Torre preta", "images/black/black_rook.png", color, square, this.board, this);
                }
                if (color === "white") {
                    piece = new Rook("Torre branca", "images/white/white_rook.png", color, square, this.board, this);
                }
                this.pieces.push(piece)
                return piece;
            case "horse":
                if (color === "black") {
                    piece = new Horse("Cavalo preto", "images/black/black_horse.png", color, square, this.board, this);
                }
                if (color === "white") {
                    piece = new Horse("Cavalo branco", "images/white/white_horse.png", color, square, this.board, this);
                }
                this.pieces.push(piece)
                return piece;
            case "bishop":
                if (color === "black") {
                    piece = new Bishop("Bispo preto", "images/black/black_bishop.png", color, square, this.board, this);
                }
                if (color === "white") {
                    piece = new Bishop("Bispo branco", "images/white/white_bishop.png", color, square, this.board, this);
                }
                this.pieces.push(piece)
                return piece;
            case "queen":
                if (color === "black") {
                    piece = new Queen("Rainha preta", "images/black/black_queen.png", color, square, this.board, this);
                }
                if (color === "white") {
                    piece = new Queen("Rainha branca", "images/white/white_queen.png", color, square, this.board, this);
                }
                this.pieces.push(piece)
                return piece;
            case "king":
                if (color === "black") {
                    piece = new King("Rei preto", "images/black/black_king.png", color, square, this.board, this);
                }
                if (color === "white") {
                    piece = new King("Rei branco", "images/white/white_king.png", color, square, this.board, this);
                }
                this.pieces.push(piece)
                return piece;
        }
    }
}

class PiecesMovements {
    static pawn = (self) => {
        // Verificar se está na primeira fileira
        // Se tiver casa diagonal para captura destacar
        // Mover uma se não tiver
        // Promover se chegar ao final
        // en passant

        let c = self.square.column;
        let r = self.square.row;

        if (self.color === "white") {
            var s1 = r - 1;
            var s2 = r - 2;
            var s3 = 6;
        }

        if (self.color === "black") {
            var s1 = r + 1;
            var s2 = r + 2;
            var s3 = 1;
        }

        let r1 = !self.squareAt(c, s1)?.piece;
        let r2 = !self.squareAt(c, s2)?.piece;

        if (r === s3) {
            if (r1) {
                self.squareAt(c, s1).addHighlight();
            }
            if (r2 && r1) {
                self.squareAt(c, s2).addHighlight();
            }
        } else {
            if (r1 && self.squareAt(c, r - 1)) {
                self.squareAt(c, s1).addHighlight();
            }
        }

        let r3Side1 = self.squareAt(c + 1, s1);
        let r3Side2 = self.squareAt(c - 1, s1);
        let r4Side1 = self.squareAt(c + 1, r);
        let r4Side2 = self.squareAt(c - 1, r);

        r3Side1?.piece && r3Side1.piece?.color !== self.color ? r3Side1.addCapture() : null;
        r3Side2?.piece && r3Side2.piece?.color !== self.color ? r3Side2.addCapture() : null;

        if (r4Side1?.piece && r4Side1.piece?.color !== self.color && r4Side1?.piece?.type === "pawn" && !r3Side1?.piece) {
            r4Side1.addCapture()
        }

        if (r4Side2?.piece && r4Side2.piece?.color !== self.color && r4Side2.piece?.type === "pawn" && !r3Side2.piece) {
            r4Side2.addCapture()
        }

        // Marcar peão como capturada
        // Zerar square
        // Mover para nova casa
    }
    static queen = (self) => {
        self.controller.turnHighlightOff();
        self.square.toggleHighlight();
    }
    static horse = (self) => {
        let c = self.square.column;
        let r = self.square.row;
        let p = [
            self.squareAt(c - 2, r - 1),
            self.squareAt(c - 1, r - 2),
            self.squareAt(c + 1, r - 2),
            self.squareAt(c + 2, r - 1),
            self.squareAt(c + 2, r + 1),
            self.squareAt(c + 1, r + 2),
            self.squareAt(c - 1, r + 2),
            self.squareAt(c - 2, r + 1)
        ]

        let positions = [];

        p.forEach(pos => {
            if (pos) {
                positions.push(pos)
            }
        })

        for (let p = 0; p < positions.length; p++) {
            let pos = positions[p]
            if (pos.piece?.color !== self.color) {
                // O square existe
                if (pos.piece && pos.piece.color !== self.color) {
                    // Se existir e forem de cores diferentes
                    pos.addCapture();
                } else {
                    // Casa vazia
                    pos.addHighlight();
                }
            }
        }
    }
    static rook = (self) => {

    }
    static bishop = (self) => {

    }
    static king = (self) => {

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
        this.hasMoved = false;


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
        this.hasMoved = true;
        if (newSquare.piece) {
            // Tem peça amiga
            if (newSquare.piece?.color === this.color) {

            } else {
                this.capturePieceAt(x, y);
                this.moveTo(x, y);
            }
        } else {
            // Não tem peça
            this.square.removePiece();
            this.square = newSquare;
            this.square.addPiece(this, this.image);
        }
        if (this.type === "pawn") {
            if (this.color === "white" && this.square.row === 0) {
                this.promote()
            }
            if (this.color === "black" && this.square.row === 7) {
                this.promote()
            }
        }
    }
    capturePieceAt(x, y) {
        let captured = this.squareAt(x, y);
        console.log("Captura de", captured.piece.name, "em", captured.toNotation(), "por", this.name, "de", this.square.toNotation());
        captured.piece.isCaptured = true;
        captured.removePiece();
    }

}

class Queen extends Piece {
    constructor(pieceName, img, color, square, board, controller) {
        super(pieceName, img, color, square, board, controller);
        this.highlightMovement = () => PiecesMovements.queen(this);
    }
    // highlightMovement() {
    //     this.controller.turnHighlightOff();
    //     this.square.toggleHighlight();
    // }
}

class Horse extends Piece {
    constructor(pieceName, img, color, square, board, controller) {
        super(pieceName, img, color, square, board, controller);

        this.highlightMovement = () => PiecesMovements.horse(this);

    }
}

class Pawn extends Piece {
    constructor(pieceName, img, color, square, board, controller) {
        super(pieceName, img, color, square, board, controller);
        this.type = "pawn";
        this.highlightMovement = () => PiecesMovements.pawn(this);

    }
    promote() {
        console.log("Promovido")
    }
}

class Rook extends Piece {
    constructor(pieceName, img, color, square, board, controller) {
        super(pieceName, img, color, square, board, controller);
        this.highlightMovement = () => PiecesMovements.pawn(this);
    }
}

class Bishop extends Piece {
    constructor(pieceName, img, color, square, board, controller) {
        super(pieceName, img, color, square, board, controller);
        this.highlightMovement = () => PiecesMovements.pawn(this);
    }
}

class King extends Piece {
    constructor(pieceName, img, color, square, board, controller) {
        super(pieceName, img, color, square, board, controller);
        this.highlightMovement = () => PiecesMovements.pawn(this);
    }
}

