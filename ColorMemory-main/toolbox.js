class Toolbox {

    //gets a random number 0 -> array.length, given an array.
    getRandomIndex(array) {
        return Math.floor(
            Math.random() * array.length
        );
    }

    //gets a random item from an array
    getRandomItem(array) {
        let randomIndex = this.getRandomIndex(array);
        return array[randomIndex];
    }

    shuffleArray(array) {
        let shuffled = [];

        let howManyTimesToPush = array.length;

        for(let i = 0; i < howManyTimesToPush; i++) {
            let randomIndex = this.getRandomIndex(array);
            let removed = array.splice(randomIndex , 1 ) //start position, lenth.
            
            shuffled.push(removed[0]);
        }
        return shuffled;
    }

    getRandomColor() {
        let characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
        let color = "#";
        for(let i = 0; i < 6; i++) {
            color += this.getRandomItem(characters);
        }
        return color;
    }

    isWithinRect(pointX, pointY, rectX, rectY, rectW, rectH) {
        if(pointX > rectX + rectW) {
            return false; //too far right
        } else if(pointX < rectX) {
            return false; //too far left
        } else if(pointY < rectY) {
            return false; //too far up
        } else if(pointY > rectY + rectH) {
            return false;
        } 
        else return true;
    }
}

// expose globally so scripts work without modules when opened via file://
window.Toolbox = Toolbox;
