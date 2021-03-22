

let lovebirdCount = 0


let Lovebird = class {
	constructor(flock, position, velocity, color, partner) {
		this.flock = flock

		// Each lovebird gets a unique number, 
		//  useful for giving each one its own behavior or label
		this.idNumber = lovebirdCount++ 

		// Catch errors in case I pass something silly as an argument
		if (!Array.isArray(position))
			throw("position needs to be an array, got: " + position)
		if (!Array.isArray(velocity))
			throw("velocity needs to be an array, got:  " + velocity)
		

		this.position = position
		this.velocity = velocity
		this.color = color
		console.log(this.color)
		if (partner){
			this.partner = partner
			partner.partner = this
		}


		// What forces does this lovebird have?
		// Have as many empty vectors as there are types of forces
		// Because this is where we will store them

		this.forces = {
			// cohesion: new Vector(0, 0),
			// alignment: new Vector(0, 0),
			// separation: new Vector(0, 0),
			selfPropulsion: new Vector(0, 0),
		}


	
	}

	toString() {
		return `Lovebird${this.idNumber} p:(${this.position.toFixed(2)})  v:(${this.velocity.toFixed(2)})`
	}

	calculateForces(t, dt) {


		// This force pulls the lovebird toward the center of the flock
		// this.forces.cohesion
		// 	.setToDifference(this.position, Vector.average(this.position, this.partner.position))
		// 	.mult(-.07* SLIDERS.lovebirdCohesion.value())

		// The addition of all forces relative to other lovebirds
		// this.forces.separation.mult(0)
		// this.flock.lovebirds.forEach(lovebird => {
		// 	if (lovebird !== this) {
		// 		let offset = Vector.getDifference(this.position, lovebird.position)
		// 		let d = offset.magnitude
		// 		let range = 50
		// 		// How close am I to this lovebird?

		// 		if (d < range) {		
		// 			let pushStrength = -90*(range - d)/range		
		// 			offset.normalize().mult(pushStrength)
		// 			this.forces.separation.add(offset)
		// 		}
		// 	}
		// })


		// // The lovebird gets a boost in the direction of the flocks average speed
		// this.forces.alignment.copy(this.flock.averageVelocity).mult(.5)

		// // It also gets a boost in its own direction
		// this.forces.selfPropulsion.setToPolar(20, this.velocity.angle)
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
 			this.velocity.addMultiples(300*force, dt)
 		}

 		// Clamp the maximum speed, to keep the lovebirds from running too fast (or too slow)
		this.velocity.clampMagnitude(20, 300)

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
		let flap = Math.sin(p.millis()*.007 + this.idNumber) 
		let length = 10 	// How big is this lovebird?
		let wingWidth = 5 + 1*flap	// How wide is this lovebird?
	
		p.stroke(this.color, 100, 80)
		p.fill(this.color, 100, 80)
		

		// bookmark the matrix position before we move to draw this
		p.push()
		
		p.translate(...this.position)
		p.rotate(this.velocity.angle)

		p.beginShape()
		p.vertex(0, 0)					// front of the lovebird
		p.vertex(-length*(1.2 - .2*flap), wingWidth)	// Wingtip
		p.vertex(-length, 0)				// back of the lovebird
		p.vertex(-length*(1.2 - .2*flap), -wingWidth)
		p.endShape(p.CLOSE)

		// return to the original drawing position
		p.pop()

	}
};