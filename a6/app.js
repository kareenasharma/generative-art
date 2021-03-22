

let paused = false
document.addEventListener('keyup', function(e){
	if(e.keyCode == 32){
		paused = !paused
	}
	if(e.keyCode == 78){
		sim.step()
	}
});  


// let simplex = new SimplexNoise()
// function noise() {
// 	if (arguments.length === 1)
// 		return simplex.noise2D(arguments[0])
// 	if (arguments.length === 2)
// 		return simplex.noise2D(arguments[0], arguments[1])
// 	if (arguments.length === 3)
// 		return simplex.noise3D(arguments[0], arguments[1], arguments[2])
	
// }


let noise = new p5().noise
console.log(noise)
let sim = new Simulation()

document.addEventListener("DOMContentLoaded", function(){
	new Vue({
		el : "#app",
		template: `<div id="app">
			

			<simulation mode="simple"/>

			<p style = "color: white">
			Black squares represent followers (converted), and white squares are people who have not converted. In this first simulation, the more neighbors you (a white sqaure) have that are converted, the higher the possibility that you convert. Over time, most likely everyone becomes a converter. This is meant to illustrate the power of word of mouth.
			</p>
			
			<simulation mode="unconvert"/>
			
			<p style = "color: white">
			Building on the previous iteration, those that have converted (black squares) now have a very small possibility of unconverting (back to a white square). The result is a graph mostly full of converters, but which is never fully stable (there will most likely always be some white squares).
			</p>

			<simulation mode="originals"/>
			
			<p style = "color: white">
			Now add emojis! Here, the sparkles are the original steadfast followers, meaning that they cannot back. The sparkles are a special case of "black squares" from the previous cases. The general "black squares" in the emoji case are the flowers, which do have a small possibility of converting back. Flowers and sparkles have the same influence, and the more flowers / sparkles you (a white square) has as a neighbor, the higher the possibility of you converting to a flower. Over time, the graph is mostly filled with flowers (with a couple of sparkles), but most likely some white spaces will always exist.
			</p>

			<simulation mode="influencer"/>
			
			<p style = "color: white">
			In this version, I have introduced the concept of influencers, which are basically neighbors that have more control on the surrounding squares. You can only become an influencer if you are a flower, and once you are you cannot change. Eventually, most of the squares are filled with trees. This was my favorite mode for me because of all the different elements involved.
			</p>


		</div>`,
		
	}) 
})