class Square {
    constructor(x, y, position, controller, board) {
        this.coords = [x, y];
        this.board = board;
        this.controller = controller;
        this.position = position;
        this.id = parseInt(this.coords.join(""));
        this.column = x;
        this.row = y;
        this.element = this.selectElement(x, y);
        this.notation = this.toNotation();
        this.img = "";
        this.isOcuppied = false;
        this.piece = null;
        this.isHighlighted = false;
        this.isCaptureHighlighted = false;
        this.notation = this.toNotation();

        this.element.addEventListener("click", e => {
            if (this.board.selected) {
                if (this.isHighlighted || this.isCaptureHighlighted) {
                    if (this.isCaptureHighlighted) {
                        // Captura
                        if (
                            this.board.selected.piece.type === "pawn" // É peão que está atacando?
                            && !this.controller.findByPosition(this.column, this.row - 1)?.piece // Existem peças no destino?
                            && this.piece.type === "pawn" // A peça na casa atacada é peão?
                            && this.piece.square.row === this.board.selected.piece.square.row // A peça atacada está ao lado?
                            && this.board.selected.piece.color === 'white') { // A peça é branca?
                            // en passant branco
                            this.board.selected.piece.capturePieceAt(this.column, this.row);
                            this.board.selected.piece.moveTo(this.column, this.row - 1);
                            this.controller.turnHighlightOff();
                        } else if (
                            this.board.selected.piece.type === "pawn" // É peão que está atacando?
                            && !this.controller.findByPosition(this.column, this.row + 1)?.piece // Existem peças no destino?
                            && this.piece.type === "pawn" // A peça na casa atacada é peão?
                            && this.piece.square.row === this.board.selected.piece.square.row // A peça atacada está ao lado?
                            && this.board.selected.piece.color === 'black') {
                            // en passant preto
                            this.board.selected.piece.capturePieceAt(this.column, this.row);
                            this.board.selected.piece.moveTo(this.column, this.row + 1);
                            this.controller.turnHighlightOff();
                        } else {
                            this.board.selected.piece.moveTo(this.column, this.row);
                            this.controller.turnHighlightOff();
                            this.board.selected = null;
                        }

                    } else {
                        // Mover
                        this.board.selected.piece.moveTo(this.column, this.row);
                        this.controller.turnHighlightOff();
                        this.board.selected = null;
                    }
                } else {
                    if (this.piece) {
                        this.board.selected = this;
                        this.controller.turnHighlightOff();
                        this.addHighlight();
                        this.piece.highlightMovement();
                    } else {
                        this.controller.turnHighlightOff();
                    }
                }
            } else {
                if (this.piece) {
                    // Selecionar
                    this.board.selected = this;
                    this.controller.turnHighlightOff();
                    this.addHighlight()
                    this.piece.highlightMovement();
                    console.log(this.board.selected.piece)
                } else {
                    // Desselecionar
                    this.board.selected = null;
                    this.controller.turnHighlightOff();
                }
            }
        })
    }

    toNotation() {
        const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

        return `${letters[this.column]}${7 - this.row + 1}`;
    }

    selectElement() {
        const trs = document.querySelectorAll("table#chess-board > tr");
        const tds = trs[this.coords[1]].querySelectorAll("table#chess-board > tr > td");
        return tds[this.coords[0]];
    }

    removeHighlight() {
        this.element.classList.remove("h-move");
        this.isHighlighted = false;
    }

    addHighlight() {
        this.element.classList.add("h-move");
        this.isHighlighted = true;
    }

    removeCapture() {
        this.element.classList.remove("h-capture");
        this.isCaptureHighlighted = false;
    }

    addCapture() {
        this.element.classList.add("h-capture");
        this.isCaptureHighlighted = true;
    }

    removePiece() {
        this.isOcuppied = false;
        this.piece = null;
        this.image = null;
    }

    addPiece(piece, img) {
        this.isOcuppied = true;
        this.piece = piece;
        this.image = img;
    }


    set image(img) {
        this.img = img;
        this.element.style.backgroundImage = `url(${img})`;
    }

    get image() {
        return this.img
    }
}