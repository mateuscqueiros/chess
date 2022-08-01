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

        this.element.addEventListener("click", e => {

            if (window.selected) {
                if (this.isHighlighted || this.isCaptureHighlighted) {
                    if (this.isCaptureHighlighted) {
                        // Capturar
                        window.selected.piece.moveTo(this.column, this.row);
                        this.controller.turnHighlightOff();
                        window.selected = null;
                    } else {
                        // Mover
                        window.selected.piece.moveTo(this.column, this.row);
                        this.controller.turnHighlightOff();
                        window.selected = null;
                    }
                }
            } else {
                if (this.piece) {
                    // Selecionar
                    window.selected = this;
                    this.controller.turnHighlightOff();
                    this.addHighlight()
                    this.piece.highlightMovement();
                } else {
                    // Desselecionar
                    console.log("Desseleção")
                    window.selected = null;
                    this.controller.turnHighlightOff();
                }
            }
        })
    }

    toNotation() {
        const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

        return `${letters[this.coords[0]]}${this.coords[1] + 1}`;
    }

    selectElement() {
        const trs = document.querySelectorAll("table#chess-board > tr");
        const tds = trs[this.coords[1]].querySelectorAll("table#chess-board > tr > td");
        return tds[this.coords[0]];
    }

    toggleHighlight() {
        this.element.classList.toggle("h-move");
        this.isHighlighted = !this.isHighlighted;
    }
    removeHighlight() {
        this.element.classList.remove("h-move");
        this.isHighlighted = false;
    }

    addHighlight() {
        this.element.classList.add("h-move");
        this.isHighlighted = true;
    }

    toggleCapture() {
        this.element.classList.toggle("h-capture");
        this.isCaptureHighlighted = !this.isHighlighted;

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