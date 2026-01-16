window.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById("myCanvas");
    if (!canvas) return;
    let pencil = canvas.getContext("2d");
    let toolbox = new Toolbox();

    const xValues = [25, 175, 325, 475];
    const yValues = [25, 150, 275];

    // build locations
    function makeLocations() {
        let location = [];
        for (const y of yValues) {
            for (const x of xValues) {
                location.push({ x, y });
            }
        }
        return location;
    }

    // game state
    let location = makeLocations();
    location = toolbox.shuffleArray(location);

    // create 6 random colors and assign pairs to shuffled positions
    let color1 = toolbox.getRandomColor();
    let card1a = new MemoryButton(canvas, pencil, location[0].x, location[0].y, color1);
    let card1b = new MemoryButton(canvas, pencil, location[1].x, location[1].y, color1);

    let color2 = toolbox.getRandomColor();
    let card2a = new MemoryButton(canvas, pencil, location[2].x, location[2].y, color2);
    let card2b = new MemoryButton(canvas, pencil, location[3].x, location[3].y, color2);

    let color3 = toolbox.getRandomColor();
    let card3a = new MemoryButton(canvas, pencil, location[4].x, location[4].y, color3);
    let card3b = new MemoryButton(canvas, pencil, location[5].x, location[5].y, color3);

    let color4 = toolbox.getRandomColor();
    let card4a = new MemoryButton(canvas, pencil, location[6].x, location[6].y, color4);
    let card4b = new MemoryButton(canvas, pencil, location[7].x, location[7].y, color4);

    let color5 = toolbox.getRandomColor();
    let card5a = new MemoryButton(canvas, pencil, location[8].x, location[8].y, color5);
    let card5b = new MemoryButton(canvas, pencil, location[9].x, location[9].y, color5);

    let color6 = toolbox.getRandomColor();
    let card6a = new MemoryButton(canvas, pencil, location[10].x, location[10].y, color6);
    let card6b = new MemoryButton(canvas, pencil, location[11].x, location[11].y, color6);

    // collect buttons for easier management
    const buttons = [
        card1a, card1b,
        card2a, card2b,
        card3a, card3b,
        card4a, card4b,
        card5a, card5b,
        card6a, card6b
    ];

    let checkingPair = null; 

    // central click handling (delegated)
    canvas.addEventListener('click', (e) => {
        const clickX = e.offsetX;
        const clickY = e.offsetY;
        if (window.lockBoard) return;
        for (const btn of buttons) {
            btn.onClick(e);
        }
    });

    // Play Again resets by recreating randomized locations and new MemoryButton instances
    const playBtn = document.getElementById('playAgain');
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            // reinitialize positions and card instances
            location = makeLocations();
            location = toolbox.shuffleArray(location);

            // assign new colors/instances in same original order
            color1 = toolbox.getRandomColor();
            card1a = new MemoryButton(canvas, pencil, location[0].x, location[0].y, color1);
            card1b = new MemoryButton(canvas, pencil, location[1].x, location[1].y, color1);

            color2 = toolbox.getRandomColor();
            card2a = new MemoryButton(canvas, pencil, location[2].x, location[2].y, color2);
            card2b = new MemoryButton(canvas, pencil, location[3].x, location[3].y, color2);

            color3 = toolbox.getRandomColor();
            card3a = new MemoryButton(canvas, pencil, location[4].x, location[4].y, color3);
            card3b = new MemoryButton(canvas, pencil, location[5].x, location[5].y, color3);

            color4 = toolbox.getRandomColor();
            card4a = new MemoryButton(canvas, pencil, location[6].x, location[6].y, color4);
            card4b = new MemoryButton(canvas, pencil, location[7].x, location[7].y, color4);

            color5 = toolbox.getRandomColor();
            card5a = new MemoryButton(canvas, pencil, location[8].x, location[8].y, color5);
            card5b = new MemoryButton(canvas, pencil, location[9].x, location[9].y, color5);

            color6 = toolbox.getRandomColor();
            card6a = new MemoryButton(canvas, pencil, location[10].x, location[10].y, color6);
            card6b = new MemoryButton(canvas, pencil, location[11].x, location[11].y, color6);

            // update buttons array
            buttons.length = 0; // clear
            buttons.push(
                card1a, card1b,
                card2a, card2b,
                card3a, card3b,
                card4a, card4b,
                card5a, card5b,
                card6a, card6b
            );
            checkingPair = null;
        });
    }

    function gameLoop() {

        pencil.clearRect(0,0, canvas.width, canvas.height);

        if (!checkingPair) {
            const faceUpUnmatched = buttons.filter(b => b.isFaceUp && !b.isMatched);
            if (faceUpUnmatched.length === 2) {
                const [a, b] = faceUpUnmatched;
                if (a.color === b.color) {
                    a.isMatched = true;
                    b.isMatched = true;
                } else {
                    checkingPair = { a, b };
                    setTimeout(() => {
                        a.isFaceUp = false;
                        b.isFaceUp = false;
                        checkingPair = null;
                    }, 1000);
                }
            }
        }

        // draw all buttons
        for (const btn of buttons) {
            btn.draw();
        }

        // win text
        if (buttons.length > 0 && buttons.every(b => b.isMatched)) {
            pencil.fillStyle = 'black';
            pencil.font = '48px sans-serif';
            pencil.textAlign = 'center';
            pencil.fillText('You win!', canvas.width / 2, canvas.height / 2);
        }

    }

    setInterval(gameLoop, 50);
});
