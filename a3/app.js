
// Outermost scope, 
// You can access these variables from *anywhere*, in fxns, or in html
let myP5 = undefined
let mode = "thread"
let mousePositions = []

function clearCanvas() {
	myP5.background("white")
}

function rainbowClearCanvas() {
	myP5.background(Math.random()*360, 80, 80)
}


document.addEventListener("DOMContentLoaded", function(){
	console.log("KatePix")

	function randPoint(p) {
		return[p.width*Math.random(), p.height*Math.random()]
	}

	// create pts array for "pencil" 
	let pts = [];
	// create second pts array for "thread" 
	let pts2 = [];

	// Add a processing instance


	// Create the processing instance, and store it in myP5, 
	// where we can access it anywhere in the code
	let element = document.getElementById("main")
	myP5 = new p5(


		// Run after processing is initialized
		function(p) {


			let colorPicker;
			p.setup = () => {

				console.log("Do setup", p)

				p.createCanvas(300, 300);

				colorPicker = p.createColorPicker('#ed225d');
				colorPicker.position(40, 430);
				  
				p.colorMode(p.HSL);
				
				// Hue, Sat, Light
				// (0-360,0-100,0-100)
				p.background("white")
				pts = [randPoint(p),randPoint(p),randPoint(p),randPoint(p)]
				pts2 = [randPoint(p),randPoint(p),randPoint(p),randPoint(p)]

			}

			p.mouseDragged = () => {
				let t = p.millis()*.001

				// Save this current mouse position in an array
				// .... but what will you do with an array of vectors?
				mousePositions.push([p.mouseX, p.mouseY])
				pts[0] = [p.mouseX, p.mouseY]
				pts2[0] = [p.mouseX, p.mouseY]
				

				switch(mode) {
					case "paws":
						let speed = Math.sqrt(p.movedX*p.movedX + p.movedY*p.movedY)

						let emoji = ["🐾"]
						
						// Draw the emoji at the mouse
						p.textSize(3*speed + 15)

						// Try out some blend modes
						p.blendMode(p.MULTIPLY);

						p.text(emoji, p.mouseX, p.mouseY)
						// Turn back to normal
						p.blendMode(p.BLEND);
						break;


					case "vertical symmetry":
						// Draw scattered circles
						p.noStroke()
						p.fill((Math.random()*30 + t*40)%360, 100, 50 + Math.random()*30)
						p.circle(p.mouseX + Math.random()*10, p.mouseY + Math.random()*10, 3 + Math.random())
						p.circle(p.height - (p.mouseX + Math.random()*10), p.mouseY + Math.random()*10, 3 + Math.random())
						break;

					case "worm":
							
						for (var i = 0; i < 10; i++) {

							p.noStroke()
							p.fill((Math.random()*30 + t*40)%360, 100, 50 + Math.random()*30)

							p.circle((pts2[0])[0], (pts2[0])[1], 10)
							p.circle((pts2[1])[0], (pts2[1])[1], 10)
							p.circle((pts2[2])[0], (pts2[2])[1], 10)
							p.circle((pts2[3])[0], (pts2[3])[1], 10)
					
		
							p.strokeWeight(1+Math.random())

							// Randomness in the strokes for variety
							p.stroke((t*30)%360, 100, 20+Math.random()*40, Math.random()*.4 + .3)
							p.bezier(pts2[0], pts2[1], pts2[2], pts2[3])
							smearPixels(p);
						}
						break;

					// case "mountains":
					// 	drawBeziers(p, mousePositions)
					// 	break;

					case "pencil":
						const currentTime = p.millis()*.001

						let pt0 = pts[0]
						let cpt0 = pts[1]
						let cpt1 = pts[2]
						let pt1 = pts[3]
	
						let count = 30
						for (var i = 0; i < count; i++) {
							let t = ((i/count) + .05*currentTime) % 1
							
							let bp = bezierAtTime(...pts, t)

						}

						mousePositions = mousePositions.slice(mousePositions.length - 100)

						for (var i = 0; i < 6; i++) {
							let somePoints = mousePositions.filter((mp, index) => {
								// Return true or false
								return index%6 == i
							})
		
							p.beginShape()
							p.noFill()
							// p.stroke(0,0,0)
							// let hue = colorPicker.color()
							//let hue = p.color(colorPicker.value())
							//hue.setAlpha(0.5)
							// let hue = colorPicker.Color()
							p.stroke(colorPicker.value())
							somePoints.forEach(mp => p.curveVertex(...mp))
		
							p.endShape()
							}

						break;

					case "horizontal symmetry":
						// p.noStroke()
						p.fill((Math.random()*30 + t*40)%360, 100, 10 + Math.random()*30)
						p.circle(p.mouseX + Math.random()*10, p.mouseY + Math.random()*10, 3 + Math.random())
						p.circle(p.mouseX + Math.random()*10, p.height - (p.mouseY + Math.random()*10), 3 + Math.random())
				
					default: 
						console.warn("UNKNOWN TOOL:" + mode)
				}
				
			}

			p.draw = () => {
				// Not updating the background

				let t = p.millis()*.001
	
				// Smear pixels continuously, even when not drawing
				if (mode == "thread") {
					smearPixels(p)
				}

				// Draw the text box to label the tool (OPTIONAL)
				p.noStroke()
				p.fill("white")
				p.rect(0, 0, 90, 30)
				p.fill("black")
				p.textSize(10)
				p.text("TOOL " + mode, 5, 20)
					
					
			}
		}, 

		// A place to put the canvas
		element);
})


// Use the Pixel buffer to "smudge" pixels by 
// linearly interpolating their colors with some other color
function smearPixels(p) {
	// Smear the pixels down from here
	// console.log("smudge2")
	p.loadPixels();

	// Get the current mouse position
	let x = Math.floor(p.mouseX)
	let y = Math.floor(p.mouseY)

	for (var i = 0; i < 10; i++) {
		let x2 = x + i
		
		let lastColor = p.get(x2, y)


		let dripDistance = Math.random()* Math.random()*150
		for (var j = 0; j < dripDistance; j++) {
			let dripPct = j/dripDistance

			let y2 = y + j

			// Get the current color and blend it with the last color
			let pixelColor = p.get(x2, y2)
			let finalColor = vector.lerp(pixelColor, lastColor, 1 - dripPct)
			
			if (x2 > 0 && x2 < p.width && y2 > 0 && y2 < p.height)
				p.set(x2, y2, finalColor)
			
			// Save this color to blend with later pixels
			lastColor = finalColor

		}
	}
	p.updatePixels();
}

// // Using a lot of mouse positions to do... something
// function drawBeziers(p, mousePositions) {
// 	// Draw some vectors
	
// 	// Get every 7th point in the array
// 	let everyOther = mousePositions.filter((element, index) => {
// 		return (mousePositions.length - index) % 7 === 0;
// 	})

// 	// Take the last N positions
// 	let count = 2
// 	let pts = everyOther.slice(everyOther.length - count)

// 	// Now we have 5 points, sampled every 7th point, starting at the end
// 	// So we can draw "backward" from the end

// 	if (pts.length > 0) {
// 		p.stroke(0)
// 		p.fill(Math.random()*360, 100, 50, .2)

// 		p.beginShape()
// 		p.vertex(...pts[0])
		
// 		// Draw each segment of a bezier curve 
// 		// (start at index=1!)
// 		for (var i = 1; i < pts.length; i++) {
// 			// For this segment, we draw between 2 pts
// 			let pt0 = pts[i - 1]
// 			let pt1 = pts[i]
// 			let d = vector.getSub(pt1, pt0)
// 			let mag = vector.magnitude(d)
// 			let n = [-d[1], d[0]]

// 			let cp0 = pt0.slice(0)
// 			let cp1 = pt1.slice(0)
// 			cp0[1] -= mag
// 			cp1[1] -= mag
			
// 			// vector.addTo(cp1, n)


// 			p.bezierVertex(...cp0, ...cp1, ...pt1)
// 		}

// 		p.endShape()
// 	}
// }

// Bezier curve for the pencil feature

function drawBeziers(p, mousePositions) {
	


}

function bezierAtTime(pt0, cpt0, cpt1, pt1, t) {

	// Get a POINT?

	// DeCasteljau
	//P = (1−t)3P1 + 3(1−t)2tP2 +3(1−t)t2P3 + t3P4
	let x = (1 - t)**3 * pt0[0]
		  + 3*(1 - t)**2 * t * cpt0[0]
		  + 3*(1 - t)* t**2  * cpt1[0]
		  + t**3 * pt1[0]

	let y = (1 - t)**3 * pt0[1]
		  + 3*(1 - t)**2 * t * cpt0[1]
		  + 3*(1 - t)* t**2  * cpt1[1]
		  + t**3 * pt1[1]

					
	return [x, y]
}