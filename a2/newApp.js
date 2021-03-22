// Utility functions
// Given a processing object, a loop length, a radius, and an offset (optional)

function getLoopingNoise({
    p,
    loopLength,
    radius,
    offset = 0
  }) {
    let t = p.millis()
  
  
  
    // This number should go from 0 to 1 every loopLength seconds
    // And PI*2 radians every loopLength seconds
    let noiseScale = 1
    let loopPct = (t * .001 / loopLength) % 1
  
    let theta = 2 * Math.PI * loopPct
  
    // Place to sample the noise from
    let x = radius * Math.cos(theta)
    let y = radius * Math.sin(theta)
  
    let noiseVal = p.noise(x * noiseScale, y * noiseScale, offset)
    return noiseVal
  }
  
  
  function getP5Element(index) {
    let element = document.getElementById("drawing" + index).getElementsByClassName("drawing-p5holder")[0]
    return element
  }
  
  
  //======================================================================================================================

  const WIDTH = 300
const HEIGHT = 300

// Run this function after the page is loaded
document.addEventListener("DOMContentLoaded", function() {
  console.log("Hello, animation!")

  // Rename your drawing here if you want
  let drawingTitles = ["Stormy Seas",
    "Intergalactic Rocketships",
    "Sunrise Over Mountains"
  ]
  let mainElement = document.getElementById("main")

  // Ignore this section if you want
  // This is me adding a label and a canvas-holder to each swatch
  // For each drawing
  for (var i = 0; i < 3; i++) {
    let el = document.createElement("div")
    el.className = "drawing"
    el.id = "drawing" + i
    mainElement.append(el)


    // Add a label
    let label = document.createElement("div")
    label.className = "drawing-label"
    label.innerHTML = "Drawing #" + i + ": " + drawingTitles[i]
    el.append(label)

    // Add a div to hold the canvas (so we can resize it independently of the outer frame)
    let canvasHolder = document.createElement("div")
    canvasHolder.className = "drawing-p5holder"
    canvasHolder.style = `width:${WIDTH};height:${HEIGHT}`
    el.append(canvasHolder)
  }

  // Comment out these lines to not draw each
  setupDrawing0()
  setupDrawing1()
  setupDrawing2()
  // setupDrawing3()
  // setupDrawing4()
  // setupDrawing5()
  // setupDrawing6()
  // setupDrawing7()
  // setupDrawing8()

});

    // Set the color mode
    // P5 has lots of ways to express colors
    // I like to use HSL mode, because it's also in CSS,
    // and because I find it easy to do colors:
    // p.fill(180,100,10)	// Very dark blue
    // p.fill(180,100,50)	// Medium blue
    // p.fill(180,100,90)	// Very pale blue
    // p.fill(180,50,50)	// Desaturated blue
    // p.fill(170,50,50)	// greener-blue
    // p.fill(190,50,50)	// purpler-blue

 //======================================================================================================================

 function setupDrawing0() {
    function setup(p) {
      // Create the canvas in the right dimension
      p.createCanvas(WIDTH, HEIGHT);
      p.colorMode(p.HSL);
      // Set the background to black
      p.background(0);
    }
  
    // Draw (or do) things *each frame*
    function draw(p) {
      let x = 0
      let y = 0
      let objs = []
      let t = p.millis()*.001

                  p.background(220, 70, 20)
  
                  // Add a thing
                  if (Math.random() > .5) {
                      objs.push({
                          start: t,
                          x: Math.random()*p.width/2,
                          y: Math.random()*p.height/8,
                          hue: Math.random()*360
                      })
          }
          
          p.noStroke(0)
  
                  let count = 5
                  for (var i = 0; i < count; i++) {
                      p.fill(i*10 + 180, 50, 80 - 20*i, .8)
                      p.beginShape()
                      let xCount = 300; 
  
                      for (var j = 0; j < xCount; j++) {
                          let pctX = j/xCount;
                          let x = pctX*p.width
                          let n = p.noise(pctX*.5, i + 0.4*t)*2 - 1.5
  
  
                          let y = (150 - 60*i)*Math.abs(n) + i*50
                          p.vertex(x, y)
                          
                      }
                      p.vertex(p.width, p.height)
                      p.vertex(0, p.height)
                      p.endShape()
                  }
    }
    // Setup a P5 instance with these draw and setup functions
    // Yes, this code is very weird.  You can ignore it
    let element = getP5Element(0) // My function to get the element for this index
    let myP5 = new p5(function(p) {
      p.setup = () => setup(p)
      p.draw = () => draw(p)
    }, element);
  }

//======================================================================================================================

function setupDrawing1() {

    let hue = Math.random() * 360
    let loopLength = 6
  
    function setup(p) {
      p.createCanvas(WIDTH, HEIGHT);
      p.colorMode(p.HSL);
      p.background(0);
    }
  
    function draw(p) {
      p.background(0, 0, 0)
      let t = p.millis() * .001
  
      p.push()
      p.translate(p.width , p.height / 2)
  
    //   Gradient background
      for (var i = 0; i < 10; i++) {
        p.fill(140 + i * 15, 100, 20, .1)
        let r = 1 + .2 * i
        p.ellipse(0, 0, r * 200, r * 140)
      }
      for (var i = 0; i < 10; i++) {
          p.fill(180 + i * 10, 100, 20, .1)
          let r = 1 + .2 * i
          p.ellipse(-200, -80, r * 200, r * 140)
        }

        for (var i = 0; i < 10; i++) {
            p.fill(200 + i * 15, 100, 20, .1)
            let r = 1 + .2 * i
            p.ellipse(-160, 150, r * 200, r * 140)
        }

      let hue = (t * 100) % 360

    // You'll use lots of loops for this assignment
    // This one draws 10 circles
    // Change it to 100, and see how it changes
    let count = 30
    for (var i = 0; i < count; i++) {

      // It's convenient to save the percentage of where in the count we are
      // That gives you a number you *know* goes from 0 to 1
      let pct = i / count


      // In HSL, the lightness of the color goes from 0-100,
      // So we can set it to our pct*100
      // so the first circle is black and the last one is white
      // and the middle circles are brightly-colored
      p.fill(hue, 100, pct * 100)

      // A stroke (outline) aound the circle will be slightly darker
      // than the main color (pct*100 - 20)
      // p.strokeWeight(10)
      p.stroke(hue, 100, pct * 100 - 20)

      // Where are we going to draw a circle?
      // Set x to the pct (from 0 to 1),
      //   multiplied by with width of the canvas
      // That way, the first circle with be on the left,
      //   and the last one will be on the right
      let x = pct * p.width/2 - 220

      // Try switching between these values for y
      // One of them just uses the pct but no time, so it won't animate
      // The other one uses *time*
      // let y = pct*HEIGHT
      let y = (Math.sin(t * .5 + i * 1)) * p.height
      // Try changing the "1"s in this to ".1" ....what happens?

      // Draw the ellipse.  The last two parameters are its width and height
      // Try changing them

      p.ellipse(x, y, 10, 40)

      // You can add text with P5 too, for debugging or for style
      // Uncomment these to label the circles with a number
      // p.noStroke()
      // p.fill(0)
      // p.text("Circle" + i, x - 20, y)
    }
}
  
  
    let element = getP5Element(1) // <- Make sure to change this to the right index
    let myP5 = new p5(function(p) {
      p.setup = () => setup(p)
      p.draw = () => draw(p)
    }, element);
  }

//======================================================================================================================

  function setupDrawing2() {

    function setup(p) {
      p.createCanvas(WIDTH, HEIGHT);
      p.colorMode(p.HSL);
      p.background(0);
    }
  
    function draw(p) {
  
      // Draw the background, but only transparently
      //  and only every 5 frames
      // This lets you leave trails by not fully erasing the previous frame
      if (p.frameCount % 4 === 0)
        p.background(0, 0, 0, .05);
  
      // Now lets make this loop
      // Make a percent that goes from 0-1 every 6 seconds
      let t = p.millis() * .001
    //   let hue = (t * 100) % 360
      let hue = 10;
      let loopPct = (t / 6) % 1
  
      // Go all the way across the screen for each loop
      let x = loopPct * p.width;

  
      // Noise (sometimes "Perlin Noise" or "Simplex Noise")
      // is a function that takes 1-3 parameters and returns
      // a value that is *continuous, but non-repeating*
      // It looks a little like a graph of the stock market or a mountain range
      // In P5, it goes from 0 to 1 (but mostly stays around the middle .5)
  
      // Here I'm setting two different noiseDetail settings
      // to get two feelings of Noise, and multiplying them
      // by 30, 90, and 150 pixels to see them at different scales
  
      // Crinkly noise in green
      p.noiseDetail(3, .3)
  
      let noiseY = p.noise(loopPct * 5)
      p.fill(hue, 100, 50)
      p.stroke(hue, 100, 70)
    //   p.circle(30 * noiseX, -y + 300, 1)
    //   p.circle(90* noiseX, -y + 300, 5)
    //   p.circle(150*noiseX, -y + 300, 5)

      for (var i = 0; i < 300; i ++) {
        //   p.circle((30+i)*noise, -y + 300, 1);
          p.circle(x, (70+i)*noiseY - 40, 1);
      }
  

    }
  
  
    let element = getP5Element(2) // <- Make sure to change this to the right index
    let myP5 = new p5(function(p) {
      p.setup = () => setup(p)
      p.draw = () => draw(p)
    }, element);
  }
  