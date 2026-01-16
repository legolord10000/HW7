class MemoryButton {

    x = 50;
    y = 50;
    color;
    width = 100;
    height = 100;
    canvas;
    pencil;
    isFaceUp = false; 
    isMatched = false
    toolbox = new Toolbox();

    constructor(canvas, pencil, x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.pencil = pencil;
        this.canvas = canvas;
    }

draw() {
        if (this.isFaceUp || this.isMatched) {
            this.pencil.fillStyle = this.color;
            this.pencil.fillRect(this.x, this.y, this.width, this.height);

            this.pencil.strokeStyle = this.isMatched ? "gold" : "silver";
            this.pencil.lineWidth = 4;
            this.pencil.strokeRect(this.x + 4, this.y + 4, this.width - 8, this.height - 8);
        } else {
            this.pencil.strokeStyle = "silver";
            const inset = Math.max(6, Math.floor(Math.min(this.width, this.height) * 0.08));
            this.pencil.lineWidth = 10;
            this.pencil.strokeRect(this.x + inset, this.y + inset, this.width - inset * 2, this.height - inset * 2);
        }
    }
    
    onClick(event) {
        let clickX = event.offsetX;
        let clickY = event.offsetY;
        if (window.lockBoard) return;

        let isClickInButton = this.toolbox.isWithinRect(
            clickX, clickY, this.x, this.y, this.width, this.height
        );

        if(isClickInButton) {
            this.isFaceUp = !this.isFaceUp;
        }
    }

    
    
    



}

// expose globally so scripts work without modules when opened via file://
window.MemoryButton = MemoryButton;