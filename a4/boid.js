

let boidCount = 0


let Boid = class {
	constructor(flock, position, velocity, color) {
		this.flock = flock

		// Each boid gets a unique number, 
		//  useful for giving each one its own behavior or label
		this.idNumber = boidCount++ 

		// Catch errors in case I pass something silly as an argument
		if (!Array.isArray(position))
			throw("position needs to be an array, got: " + position)
		if (!Array.isArray(velocity))
			throw("velocity needs to be an array, got:  " + velocity)
		

		this.position = position
		this.velocity = velocity
		this.color = color


		// What forces does this boid have?
		// Have as many empty vectors as there are types of forces
		// Because this is where we will store them

		this.forces = {
			cohesion: new Vector(0, 0),
			alignment: new Vector(0, 0),
			separation: new Vector(0, 0),
			selfPropulsion: new Vector(0, 0),
		}


	
	}

	toString() {
		return `Boid${this.idNumber} p:(${this.position.toFixed(2)})  v:(${this.velocity.toFixed(2)})`
	}

	calculateForces(t, dt) {


		// This force pulls the boid toward the center of the flock
		this.forces.cohesion
			.setToDifference(this.position, this.flock.center)
			.mult(-.07* SLIDERS.friendliness.value())

		// The addition of all forces relative to other boids
		this.forces.separation.mult(0)
		this.flock.boids.forEach(boid => {
			if (boid !== this) {
				let offset = Vector.getDifference(this.position, boid.position)
				let d = offset.magnitude
				let range = 50
				// How close am I to this boid?

				if (d < range) {		
					let pushStrength = -90*(range - d)/range		
					offset.normalize().mult(pushStrength)
					this.forces.separation.add(offset)
				}
			}
		})


		// The boid gets a boost in the direction of the flocks average speed
		this.forces.alignment.copy(this.flock.averageVelocity).mult(.5)

		// It also gets a boost in its own direction
		this.forces.selfPropulsion.setToPolar(20, this.velocity.angle)
	}


	// dt: 	How much time has elapsed? 
	// t: 	What is the current time
	update(t, dt) {
		dt = Math.min(1, dt) // Don't ever update more than 1 second at a time, things get too unstable
		

		// Position2 = Position1 + (Elapsed time)*Velocity
 		this.position.addMultiples(this.velocity, dt)

 		// Add up all the forces
 		// Velocity2 = Velocity1 + (Elapsed time)*Force
 		for (let forceKey in this.forces) {
 			let force = this.forces[forceKey]
 			this.velocity.addMultiples(force, dt)
 		}

 		// Clamp the maximum speed, to keep the boids from running too fast (or too slow)
		this.velocity.clampMagnitude(4, 100)

 		// Apply some drag.  This keeps them from getting a runaway effect
 		let drag = 1 - SLIDERS.Drag.value()
 		this.velocity.mult(drag)

 		// Wrap around
 		this.position[0] = (this.position[0] + simulationWidth)%simulationWidth
		this.position[1] = (this.position[1] + simulationHeight)%simulationHeight
		
 	}

	debugDraw(p) {

		let forceDisplayMultiple = 1

		// Get a list of all force names, then 
		// for each one, draw the force
		Object.keys(this.forces).map((forceKey, index) => {
			let force = this.forces[forceKey]
 			force.drawArrow({
 				p:p,
 				arrowSize: 6,
 				center: this.position,
 				multiple: forceDisplayMultiple,
 				color: [index*30 + 240, 100, 70, 1],
 			})
		})
	}

	
	draw(p) {
		// let flap = Math.sin(p.millis()*.007 + this.idNumber) 
		// let length = 10 	// How big is this boid?
		// let wingWidth = 5 + 1*flap	// How wide is this boid?
		let t = p.millis() * .001
		let index = 7
		let loopLength = 6
		// let maxColor = (Math.random() * (100 - 0)) + 0

		let agePct = ((2.9 + t) % loopLength) / loopLength
		// console.log(agePct)
		// for (i = 0, i < 10, i++) {
		// 	if (index == 10) {
		// 		index = 0
		// 	}
		// 	index += i
		// }
	
		// bookmark the matrix position before we move to draw this
		p.push()
		
		p.translate(...this.position)
		
		p.rotate(-Math.PI/3)

		// p.stroke(0, 8, maxColor)
		// p.fill("white")
		// p.beginShape()
		// p.vertex(0, 0)					// front of the boid
		// p.vertex(-length*(1.2 - .2*flap), wingWidth)	// Wingtip
		// p.vertex(-length, 0)				// back of the boid
		// p.vertex(-length*(1.2 - .2*flap), -wingWidth)
		// p.endShape(p.CLOSE)

		// let fade = Math.sin(Math.random()*Math.PI)
		let fade = Math.sin(agePct * Math.PI)
		p.beginShape()
		let starPts = 10
		let r = 0
  
		for (var i = 0; i < starPts; i++) {
			// console.log(this.color)
		p.stroke(0, 8, this.color)
		p.fill(0, 8, this.color)
			
		  let theta = Math.PI * 2 * i / starPts
		  // Use noise to ascillate the length of the star's "arms"
		  // for a twinkling effect

		if ((i == 3) || (i == 5)) {
			// r = 10*(fade * 20 * (i % 2 + .2) * p.noise(i + index, 5))
			r = fade * 70 * (i % 2 + .2) * p.noise(i , 10 * agePct)
			// console.log("legs:",r)
		}
		else{
			// r = 20 * (i % 2 + .2) * p.noise(i + index, 5)
			r = 0.2 * 50 * (i % 2 + .2)
			// console.log(r)
		}


		
		p.vertex(r * Math.cos(theta), r * Math.sin(theta))
		}

		p.endShape()

		// return to the original drawing position
		p.pop()

	}
};