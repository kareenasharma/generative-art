
// emojis
let emoji1 = "🌷".split(" ")
let emoji2 = "🌷 🌲".split(" ")


let simCount = 0
class Simulation {
	// Some number of grids
	constructor(mode) {
		// Mode can control various factors about the simulation

		this.price =.9
		this.mode = mode
		this.idNumber = simCount++
		this.noiseSeed = this.idNumber
		this.stepCount = 0
		
		// Set my size
		this.w = 40
		this.h = 18
		// But smaller if in emoji mode
		if (mode == "emoji") {
			this.w = 20
			this.h = 10
		}


		this.isWrapped = true
		this.isPaused = true
		this.selectedCell = undefined

		this.noiseScale = .3

		this.gameOfLifeGrid = new Grid(this.w, this.h, this.isWrapped)

		// You can make additional grids, too
		this.heightMap = new Grid(this.w, this.h, this.isWrapped)
		this.emojiGrid = new Grid(this.w, this.h, this.isWrapped)

		this.randomize()

	}

	randomize() {
		console.log("set to a random layout!!!")
		this.noiseSeed += 10
		
		this.heightMap.setAll((x,y) => noise(x*this.noiseScale, y*this.noiseScale + 100*this.noiseSeed))**4
		// if mode is continuous, use emoji board. Fill the emoji board with random flowers.
		// Otherwise, fill board with random 1 or 0 (colored squares).

		if (this.mode === "influencer")
			this.emojiGrid.setAll((x,y) => Math.random()>.95?"🌷":"")

		else if (this.mode === "originals") {
			this.emojiGrid.setAll((x,y) => Math.random()>.95?"✨":"")

		}
		else
			this.gameOfLifeGrid.setAll((x,y) =>Math.round(this.heightMap.get(x, y)))
		
	}

	step() {
		this.stepCount++

		// Make one step
		// Set all the next steps, then swap the buffers

		this.emojiGrid.setNext((x, y, currentValue) => {

			let value = this.emojiGrid.get(x,y)
			let neighbors = this.getNeighborPositions(x, y, true)
			let n0 = this.emojiGrid.get(x + 1, y)
			let n1 = this.emojiGrid.get(x - 1, y)
			let n2 = this.emojiGrid.get(x, y + 1)
			let n3 = this.emojiGrid.get(x, y - 1)


			if (n0 === "🌷" || n0 === "✨") {
				n0 = 1
			}
			else if (n0 === "🌲") {
				n0 = 1.5
			}
			else {
				n0 = 0
			}

			if (n1 === "🌷" || n1 === "✨") {
				n1 = 1
			}
			else if (n1 === "🌲") {
				n1 = 1.5
			}
			else {
				n1 = 0
			}

			if (n2 === "🌷" || n2 === "✨") {
				n2 = 1
			}
			else if (n2 === "🌲") {
				n2 = 1.5
			}
			else {
				n2 = 0
			}

			if (n3 === "🌷" || n3 === "✨") {
				n3 = 1
			}
			else if (n3 === "🌲") {
				n3 = 1.5
			}
			else {
				n3 = 0
			}

			let count = n0 + n1 + n2 + n3
			console.log(count)


			switch (this.mode) {
				case "originals": {
					let em = this.emojiGrid.get(x, y)

					// sparkes do not convert back
					if (value === "✨") {
						return "✨"
					}

					// small chance of converting back
					if (value === "🌷") {
						let probability = Math.random()
						if (probability <= 0.01) {
							return ""
						}
					}

					// convert non-followers 
					if (value === "") {
						let probability = Math.random()
						if (probability <= (0.3 * count)) {
							return "🌷"
						}
					}

					return ""
				}

				case "influencer": {

					// trees do not convert back
					if (value === "🌲") {
						return "🌲"
					}
					
					// possibility of turning into an influencer
					if (value === "🌷") {
						let probability = Math.random()
						if (probability <= 0.1) {
							return "🌲"
						}
					}

					// small chance of converting back
					if (value === "🌷") {
						let probability = Math.random()
						if (probability <= 0.01) {
							return ""
						}
					}

					// possibility of converting
					if (value === "") {
						let probability = Math.random()
						if (probability <= (0.5 * count)) {
							return "🌷"
						}
					}

					return ""

				}
			}

		})

		this.gameOfLifeGrid.setNext((x, y, currentValue) => {
			let neighbors = this.getNeighborPositions(x, y, true)
			let n0 = this.gameOfLifeGrid.get(x + 1, y)
			let n1 = this.gameOfLifeGrid.get(x - 1, y)
			let n2 = this.gameOfLifeGrid.get(x, y + 1)
			let n3 = this.gameOfLifeGrid.get(x, y - 1)
			let count = n0 + n1 + n2 + n3
			
			switch (this.mode) {
				case "simple": {

					// Proabability is 20% (there is a 20% probability that math.random() will result in a
					// value less than or equal to 0.2)

					if (currentValue == 0) {
						let probability = Math.random()
						if (probability <= (0.1 * count)) {
							currentValue = 1
							return currentValue
						}
					}
					return currentValue
				}

				
				case "unconvert": {

					// possibility of unconverting
					if (currentValue == 1) {
						let probability = Math.random()
						if (probability <= 0.01) {
							currentValue = 0
							return currentValue
						}
					}

					// influence from neighbors (increases with count)
					if (currentValue == 0) {
						let probability = Math.random()
						if (probability <= (0.2 * count)) {
							currentValue = 1
							return currentValue
						}
					}

					return currentValue

				}
				

				default: {
					if (x == 0 && y == 0)
						console.warn("unknown mode:", this.mode)
					// Just copy the current values
					return currentValue
				}

			}
		})	
	
		// Swap the new value buffer into the current value buffer
		this.emojiGrid.swap()
		this.gameOfLifeGrid.swap()
	}



	//==============
	// Draw a cell.  Add emoji or color it


	drawCell(p, x, y, cellX, cellY, cellW, cellH) {


		if (this.selectedCell && this.selectedCell[0] === x && this.selectedCell[1] === y) {
			p.strokeWeight(2)
			p.stroke("red")
		}
		else  {
			p.strokeWeight(1)
			p.stroke(0, 0, 0, .2)
		}

		let val = this.gameOfLifeGrid.get(x, y)

		p.fill(0, 0, (1 - val)*100, 1)
		p.rect(cellX, cellY, cellW, cellH)

		if (this.mode === "originals" || this.mode === "influencer") {
			let em = this.emojiGrid.get(x, y)
			p.text(em, cellX, cellY + cellH)
		}

	}

	//=====================================================
	// Mouse interactions

	select(x, y) {
		this.selectedCell = [x, y]
	}

	click(x, y) {
		// this.gameOfLifeGrid.set(x, y, 1)
	}



	//=====================================================
	// Utility functions

	
	getNeighborPositions(x1, y1, wrap) {
		let x0 = x1 - 1
		let x2 = x1 + 1
		let y0 = y1 - 1
		let y2 = y1 + 1
		if (wrap)  {
			x0 = (x0 + this.w)%this.w
			x2 = (x2 + this.w)%this.w
			y0 = (y0 + this.h)%this.h
			y2 = (y2 + this.h)%this.h
		}
		
		return [[x0,y0],[x1,y0],[x2,y0],[x2,y1],[x2,y2],[x1,y2],[x0,y2],[x0,y1]]
	}


}