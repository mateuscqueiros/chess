class PiecesController {
    constructor(c) {
        this.pieces = [];
        this.board = c.board;

        this.anotations = [];
    }

    findByPosition(x, y) {
        let p = this.board.filter(el => {
            return el.column === x && el.row === y;
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
                    piece = new Pawn("Peão preto", "images/black/black_pawn.png", color, square, this.board, this, "pawn");
                }
                if (color === "white") {
                    piece = new Pawn("Peão branco", "images/white/white_pawn.png", color, square, this.board, this, "pawn");
                }
                this.pieces.push(piece)
                return piece;
            case "rook":
                if (color === "black") {
                    piece = new Rook("Torre preta", "images/black/black_rook.png", color, square, this.board, this, "rook");
                }
                if (color === "white") {
                    piece = new Rook("Torre branca", "images/white/white_rook.png", color, square, this.board, this, "rook");
                }
                this.pieces.push(piece)
                return piece;
            case "horse":
                if (color === "black") {
                    piece = new Horse("Cavalo preto", "images/black/black_horse.png", color, square, this.board, this, "horse");
                }
                if (color === "white") {
                    piece = new Horse("Cavalo branco", "images/white/white_horse.png", color, square, this.board, this, "horse");
                }
                this.pieces.push(piece)
                return piece;
            case "bishop":
                if (color === "black") {
                    piece = new Bishop("Bispo preto", "images/black/black_bishop.png", color, square, this.board, this, "bishop");
                }
                if (color === "white") {
                    piece = new Bishop("Bispo branco", "images/white/white_bishop.png", color, square, this.board, this, "bishop");
                }
                this.pieces.push(piece)
                return piece;
            case "queen":
                if (color === "black") {
                    piece = new Queen("Rainha preta", "images/black/black_queen.png", color, square, this.board, this, "queen");
                }
                if (color === "white") {
                    piece = new Queen("Rainha branca", "images/white/white_queen.png", color, square, this.board, this, "queen");
                }
                this.pieces.push(piece)
                return piece;
            case "king":
                if (color === "black") {
                    piece = new King("Rei preto", "images/black/black_king.png", color, square, this.board, this, "king");
                }
                if (color === "white") {
                    piece = new King("Rei branco", "images/white/white_king.png", color, square, this.board, this, "king");
                }
                this.pieces.push(piece)
                return piece;
        }
    }

    addAnotation(piece, square) {
        let note = `${piece.typeNotation + square.toNotation()}`;
        this.anotations.push(note);
        this.anotations.forEach(note => {
            console.log(note)
        })
    }
}

class PiecesMovements {
    static pawn = (self) => {

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

        // Fileira a frente não tem peça
        let r1 = !self.squareAt(c, s1)?.piece;
        // Fileira duas a frente não tem peça
        let r2 = !self.squareAt(c, s2)?.piece;

        if (r === s3) {
            // Está na primeira linha
            if (r1) {
                // Movimento único
                self.movements.push(self.squareAt(c, s1));
            }
            if (r1 && r2) {
                // Movimento inicial duplo
                self.movements.push(self.squareAt(c, s2));
            }
        } else {
            // Não está na primeira fileira e não há peça na frente
            if (r1 && self.squareAt(c, r - 1)) {
                self.movements.push(self.squareAt(c, s1));
            }
        }

        // Quadrado ao lado e a frente
        let r3Side1 = self.squareAt(c + 1, s1);
        // Quadrado ao lado e a frente
        let r3Side2 = self.squareAt(c - 1, s1);
        //Quadrado ao lado
        let r4Side1 = self.squareAt(c + 1, r);
        // Quadrado ao lado
        let r4Side2 = self.squareAt(c - 1, r);

        // 
        r3Side1?.piece && r3Side1.piece?.color !== self.color ? self.movements.push(r3Side1) : null;
        r3Side2?.piece && r3Side2.piece?.color !== self.color ? self.movements.push(r3Side2) : null;

        if (r4Side1?.piece && r4Side1.piece?.color !== self.color && r4Side1?.piece?.type === "pawn" && !r3Side1?.piece) {
            self.movements.push(r4Side1)
        }

        if (r4Side2?.piece && r4Side2.piece?.color !== self.color && r4Side2.piece?.type === "pawn" && !r3Side2.piece) {
            self.movements.push(r4Side2)
        }

        // Marcar peão como capturada
        // Zerar square
        // Mover para nova casa
    }
    static queen = (self) => {

        let initialPositions = [
            (square) => {
                return self.squareAt(square.column - 1, square.row - 1);
            },
            (square) => {
                return self.squareAt(square.column + 1, square.row - 1);
            },
            (square) => {
                return self.squareAt(square.column + 1, square.row + 1);
            },
            (square) => {
                return self.squareAt(square.column - 1, square.row + 1);
            },
            (square) => {
                return self.squareAt(square.column, square.row - 1)
            },
            (square) => {
                return self.squareAt(square.column + 1, square.row)
            },
            (square) => {
                return self.squareAt(square.column, square.row + 1)
            },
            (square) => {
                return self.squareAt(square.column - 1, square.row)
            }
        ]

        initialPositions.forEach((p, index) => {
            let obsSquare = p(self.square);
            while (obsSquare) {
                self.movements.push(obsSquare);
                let nextSquare = self.squareAt(p(obsSquare)?.column, p(obsSquare)?.row);
                if (obsSquare.piece) {
                    obsSquare = null;
                } else {
                    obsSquare = nextSquare;
                }

            }
        })
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

        p.forEach(pos => {
            if (pos) {
                self.movements.push(pos)
            }
        })
    }
    static rook = (self) => {

        let initialPositions = [
            (square) => {
                return self.squareAt(square.column, square.row - 1)
            },
            (square) => {
                return self.squareAt(square.column + 1, square.row)
            },
            (square) => {
                return self.squareAt(square.column, square.row + 1)
            },
            (square) => {
                return self.squareAt(square.column - 1, square.row)
            },
        ]

        initialPositions.forEach((p, index) => {
            let obsSquare = p(self.square);
            while (obsSquare) {
                self.movements.push(obsSquare);
                let nextSquare = self.squareAt(p(obsSquare)?.column, p(obsSquare)?.row);
                if (obsSquare.piece) {
                    obsSquare = null;
                } else {
                    obsSquare = nextSquare;
                }

            }
        })
    }
    static bishop = (self) => {

        let initialPositions = [
            (square) => {
                return self.squareAt(square.column - 1, square.row - 1);
            },
            (square) => {
                return self.squareAt(square.column + 1, square.row - 1);
            },
            (square) => {
                return self.squareAt(square.column + 1, square.row + 1);
            },
            (square) => {
                return self.squareAt(square.column - 1, square.row + 1);
            },
        ]

        initialPositions.forEach((p, index) => {
            let obsSquare = p(self.square);
            while (obsSquare) {
                self.movements.push(obsSquare);
                let nextSquare = self.squareAt(p(obsSquare)?.column, p(obsSquare)?.row);
                if (obsSquare.piece) {
                    obsSquare = null;
                } else {
                    obsSquare = nextSquare;
                }

            }
        })
    }
    static king = (self) => {
        // Checar se não estará em cheque
        // Checar se movimento estará próximo do rei
        // Checar possibilidade de roque
        let c = self.square.column;
        let r = self.square.row;
        let p = [
            self.squareAt(c - 1, r - 1),
            self.squareAt(c, r - 1),
            self.squareAt(c + 1, r - 1),
            self.squareAt(c + 1, r),
            self.squareAt(c + 1, r + 1),
            self.squareAt(c, r + 1),
            self.squareAt(c - 1, r + 1),
            self.squareAt(c - 1, r)
        ]

        p.forEach(pos => {
            if (pos) {
                self.movements.push(pos);
            }
        })

    }
}

class Piece {
    constructor(pieceName, img, color, square, board, controller, type) {
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
        this.type = type;
        this.movements = [];
        this.isTargetedBy = [];
        this.isTargeted = false;
        this.isTargeting = [];

        this.square.isOcuppied = true;
        this.movements = [];
    }

    checkDangerousSquares() {

        this.isTargeted = false;
        this.isTargetedBy = [];

        const opponentPieces = this.controller.pieces.filter(p => {
            return p.color !== this.color && !p.isCaptured;
        });

        opponentPieces.forEach(opPiece => {
            opPiece.movements.forEach(opMov => {
                if (opMov.id === this.square.id) {
                    console.log("[", this.color.toUpperCase(), "]", this.name, "em", this.square.toNotation(), "ameaçado por", opPiece.name, "de", opPiece.square.toNotation());
                    this.isTargeted = true;
                    this.isTargetedBy.push(opPiece);
                    opPiece.isTargeting.push(this);
                }
            })
        })
    }

    highlightMovement() {

        if (this.movements.length > 0) {
            this.movements.forEach(mov => {
                if (mov.piece) {
                    // Se existir e forem de cores diferentes
                    if (mov.piece.color !== this.color) {
                        mov.addCapture();
                    }
                } else {
                    // Casa vazia
                    mov.addHighlight();
                }
            })
        }
    }

    moveTo(x, y) {
        let newSquare = this.squareAt(x, y);
        this.hasMoved = true;
        if (newSquare.piece) {
            // Tem peça amiga
            if (newSquare.piece?.color !== this.color) {
                this.capturePieceAt(x, y);
                this.moveTo(x, y);
                this.recalculateAllPieces();
            }
        } else {
            // Não tem peça
            this.square.removePiece();
            this.square = newSquare;
            this.square.addPiece(this, this.image);
            this.recalculateAllPieces();
        }
        if (this.type === "pawn") {
            // Check is pawn is promoted
            if (this.color === "white" && this.square.row === 0) {
                this.promote();
            }
            if (this.color === "black" && this.square.row === 7) {
                this.promote();
            }
        }
    }

    capturePieceAt(x, y) {
        let captured = this.squareAt(x, y);
        let piece = captured.piece;
        console.log("Captura de", captured.piece.name, "em", captured.toNotation(), "por", this.name, "de", this.square.toNotation());
        captured.piece.isCaptured = true;
        captured.removePiece();
        piece.square = null;
    }

    recalculateAllPieces() {
        this.controller.pieces.forEach(piece => {
            if (piece.square) {
                piece.movements = [];
                piece.calculateMovements();
                piece.isTargeting = [];
            }
        })
        this.controller.pieces.forEach(piece => {
            if (piece.square) {
                piece.checkDangerousSquares();
            }
        })
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

}


class King extends Piece {
    constructor(pieceName, img, color, square, board, controller, type) {
        super(pieceName, img, color, square, board, controller, type);
        this.typeNotation = "K";
        this.calculateMovements = () => PiecesMovements.king(this);
        this.calculateMovements();
    }
}

class Queen extends Piece {
    constructor(pieceName, img, color, square, board, controller, type) {
        super(pieceName, img, color, square, board, controller, type);
        this.typeNotation = "Q";
        this.calculateMovements = () => PiecesMovements.queen(this);
        this.calculateMovements();
    }
}

class Horse extends Piece {
    constructor(pieceName, img, color, square, board, controller, type) {
        super(pieceName, img, color, square, board, controller, type);
        this.typeNotation = "N";
        this.calculateMovements = () => PiecesMovements.horse(this);
        this.calculateMovements();
    }
}

class Pawn extends Piece {
    constructor(pieceName, img, color, square, board, controller, type) {
        super(pieceName, img, color, square, board, controller, type);
        this.typeNotation = "";
        this.calculateMovements = () => PiecesMovements.pawn(this);
        this.calculateMovements();
    }
    promote() {
        console.log("Promovido")
    }
}

class Rook extends Piece {
    constructor(pieceName, img, color, square, board, controller, type) {
        super(pieceName, img, color, square, board, controller, type);
        this.typeNotation = "R";
        this.calculateMovements = () => PiecesMovements.rook(this);
        this.calculateMovements();
    }
}

class Bishop extends Piece {
    constructor(pieceName, img, color, square, board, controller, type) {
        super(pieceName, img, color, square, board, controller, type);
        this.typeNotation = "B";
        this.calculateMovements = () => PiecesMovements.bishop(this);
        this.calculateMovements();
    }
}

