class Fish {
	// Create a branching system  Each branch can hold other branches
	constructor(aof) {
		
		this.aof = aof;
		this.center = new Vector();
        this.offset = new Vector();
        
	}


	update(t, dt) {
        // radius, angle
        //this.offset.setToPolar(50, t);
        let speed = this.aof.get("speed") + 0.1;
        this.offset.setToPolar(50, 70*noise(t * speed * 0.3 , this.aof.idNumber));

        // slider to control motion

        // this.center += (1,1)
		// let hue = this.aof.get("flowerHue")
		// // Update this with the current value of the AOF and any other parameters, like time
		// this.root.energy = this.aof.energy
		// this.root.start.orientation = -Math.PI/2
		// this.root.update(t, dt)

		// this.flowerColor.setTo((300*hue + 100)%360, 100, 80)

	}

	draw(p) {
		p.push();
        p.translate(...this.offset.coords)
		
		// Draw the root (and recursively, all the branches)
		p.noStroke();
		p.strokeWeight(1);
		p.stroke(0,0,0);

        // color
		let hue = this.aof.get("hue")*360;
		p.fill(hue, 50, 40);

        // body
		let width = this.aof.get("width") *180 + 80;
        let height = this.aof.get("height")*80  + 60;
        let roundness = this.aof.get("roundness") *50 ;
        p.noStroke();
        p.rect(0,0, width, height, roundness);

        // eye
        p.fill(hue, 50, 100);
        p.noStroke();
        p.rect(width*0.2, height *0.3, 0.2*width, 0.2*height, roundness * 20);
        p.fill(hue, 50, 0);
        p.ellipse(width*0.25, height *0.4, 0.05*width, 0.05*width);

        // lips
        p.ellipse(0, height *0.5, 0.05*width, 0.03*width);
        p.ellipse(0, height *0.55, 0.05*width, 0.03*width)

        // tail
        p.quad(width, height * 0.66, width, height * 0.33, width * 1.2, height * 0.2, width * 1.2, height * 0.8)
        //p.triangle(width, height * 0.5, width * 1.2, height, width * 1.2, height *0.1)


		// p.ellipse(width * .5, height *.2, width * 0.5, height *0.5)		
		
		
		p.pop()
	}
}


// Static properties for this class
Fish.landmarks = {
	"Eel": [1, 0.1, 0.607, 0.1, 0.8],
	"Minnow": [0.01, 0.03, 0.676, 0, 0.2],
	"Puffers": [0.05, 0.5, 0.88, 1, 0.1],
	"Sailfish": [1, 0.8, 0.4, 0, 1],
	"Goldfish": [0.2, 0.1, 1, 0.5, 0.3]
}

// Fish.labels = ["size", "hue", "aspect"]
Fish.labels = ["width", "height", "hue", "roundness", "speed"]