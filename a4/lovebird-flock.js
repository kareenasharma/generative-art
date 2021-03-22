// Track a bunch of lovebirds

class LovebirdFlock {
	constructor() {

		this.lovebirds = []
		this.current
		this.averageVelocity = new Vector(0, 0)
		this.center = new Vector(0, 0)

		if (this.lovebirds.length < 2) {
			this.addLovebird()
		}

		else {

		}

		// for (var i = 0; i < lovebirdParticlesStartCount; i++) {
		// 	this.addLovebird()
		// }

	}

	// Create a lovebird at this position (or if none, )
	addLovebird(position, velocity,color) {
		if (!position)
			position = Vector.random([0,simulationWidth],[0,simulationHeight])

		let velocity1 = Vector.randomPolar(50)
		let velocity2 = Vector.randomPolar(50)
		if (!color)
			color = (Math.random() * (100 - 0)) + 0

		let lovebird1 = new Lovebird(this, position, velocity1, color)
		let lovebird2 = new Lovebird(this, position, velocity2, color, lovebird1)
		this.lovebirds.push(lovebird1)
		this.lovebirds.push(lovebird2)
	}


	update(t, dt) {


		// Update the flock data 
		
		// Set the center to the average of all lovebirds, for cohesion

		this.center = Vector.average(this.lovebirds.map(b => b.position))

		// Set the average velocity (add them all up, divide by the size)
		this.averageVelocity = Vector.average(this.lovebirds.map(b => b.velocity))

		// // The lovebirds need their flock in order to calculate forces
		this.lovebirds.forEach(b => b.calculateForces(t, dt))

		// // Update each lovebird
		this.lovebirds.forEach(b => b.update(t, dt))
	}

	draw(p) {
		this.lovebirds.forEach(lovebird => lovebird.draw(p))
		
	}

	debugDraw(p) {
		// Flock data
		p.noFill()
		p.stroke(0, 100, 40)
		p.circle(...this.center, 5)

		p.strokeWeight(5)
		this.averageVelocity.drawArrow({
			p:p,
			arrowSize: 14,
			color: [0, 100, 20, .3],
			multiple: 4,
			center: this.center
		})

		p.strokeWeight(1)
		this.lovebirds.forEach(b => b.debugDraw(p))
	}

}

