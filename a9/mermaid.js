class MermaidMask {
    constructor() { this.hueSeed = 360;}


	draw(p, t) {
		p.background(360, 0, 0);
        p.clear()
        // p.background()
		p.noStroke()

        var i;

        // HEADDRESS
        face.sideOrder.forEach(side => {
		
            let ring0 = side.eyeRings[4]
            let ring1 = side.eyeRings[1]
            let vOuter = new Vector(0,0)
            let cp0 = new Vector(0,0)
            let cp1 = new Vector(0,0)
            let cp0a = new Vector(0,0)
            let cp1a = new Vector(0,0)
            let dir = new Vector(0,0)
            let n = new Vector(0,0)
            let offset = new Vector(1,0)
    
            let eyeDir = new Vector()
            eyeDir.setToDifference(face.center, side.eye)
    
            function drawFeather(index, pct) {
                // let ft = t*.2
                p.strokeWeight(1)
    
                let v0 = ring0[index]
                let v1 = ring0[index + 3]
                let v2 = ring1[index + 2]
    
                let radius = (2 + (18*SLIDER.featherLength) + 6*pct**2 )*(1 + .5*Math.sin(t*.2 + index + pct))
                let wave = 5*pct + 2*t
                let waveStrength = (pct)* side.index*100
                let waveOffset = 1
                let pctControl0 = .2
                let pctControl1 = .4
                vOuter.setToLerp(v0, v2, radius)
                offset.setToDifference(v0, vOuter)
                offset.coords[1] += .01
                dir.setToDifference(v1, v0)
                n.setToNormal(offset)
    
                cp0.setToLerp(v0, vOuter, pctControl0)
                    .addMultiples(n,.5*waveStrength*Math.sin(wave))
                cp1.setToLerp(v0, vOuter, pctControl1)
                    .addMultiples(n, waveStrength*Math.sin(wave + waveOffset))
                
                cp0a.setToLerp(v1, vOuter, pctControl0)
                    .addMultiples(n, .5*waveStrength*Math.sin(wave))
                cp1a.setToLerp(v1, vOuter, pctControl1)
                    .addMultiples(n, 1.8*waveStrength*Math.sin(wave + waveOffset))
                
                vOuter.addMultiples(n, .5*waveStrength*Math.sin(wave + waveOffset*1.2))
                    
                
                p.noStroke()
                p.noFill()
                let hue = (190 + 60*index + 170*noise(1*t + 4*pct))%360
                p.fill(237 + (SLIDER.color*100), 100, 30 + 60*noise(index + 1.2*t + 3*pct), .5)
    
                p.beginShape()
                v0.vertex(p)
                vOuter.bezierVertex(p, cp0, cp1)
                v1.bezierVertex(p, cp1a, cp0a)
                p.endShape(p.CLOSE)
               // p.fill(237, 100, 30*noise(index + 2*t + 3*pct), .5)
               p.fill(237, 100, 20)
            
            }
    
            let featherCount = 10
            for (var i = 1; i < 10; i++) {
                for (var k = 0; k < featherCount; k++) {
                    let pct = 1 - k/featherCount
                    drawFeather(i, pct)
                }
            }

            // EARS
            // Draw the three ear points
            p.noStroke()
            face.sideOrder.forEach((side) => {
            side.ear.forEach((earPos, earIndex) => {
                // p.fill(earIndex*30 + 200, 100, 50)
                // p.fill(earIndex*30 + 200, 100, 50)
                p.fill(earIndex*30 + (200 + (SLIDER.color*100)), 100, 50)
                earPos.draw(p, (10 + -earIndex*2 + 20*noise(earIndex, t*4))*face.scale*2 + (80*SLIDER.earSize))
            })

            p.fill(237 + (SLIDER.color * 100), 100, 20, .5)
            side.ear[1].draw(p, 20*face.scale + (40*SLIDER.earSize))
            side.ear[1].draw(p, 20*face.scale + (30*SLIDER.earSize))
            side.ear[1].draw(p, 30*face.scale + (80*SLIDER.earSize))
            side.ear[1].draw(p, 20*face.scale + (40*SLIDER.earSize))
            side.ear[1].draw(p, 20*face.scale + (30*SLIDER.earSize))
            })

            // FACE COLOR
            for (i = 0; i < 3; i++) {
            p.fill(237 + (SLIDER.color*100), 100, 15 - (5*i))
            drawContour(p, face.sideOrder[0].faceRings[i]);
            drawContour(p, face.sideOrder[1].faceRings[i]);
            }

            // EYES
            for (i = 0; i < 5; i++) {
            p.fill(237 + (SLIDER.color*100), 100, (10*i))
            drawContour(p, face.sideOrder[0].eyeRings[i]);
            drawContour(p, face.sideOrder[1].eyeRings[i]);
            }

            // NOSE
            for (i = 0; i < 2; i++) {
                drawNeonContour(p, face.sideOrder[0].nose[i], [237 + (SLIDER.color*100),100,10], 3, false)
                drawNeonContour(p, face.sideOrder[1].nose[i], [237 + (SLIDER.color*100),100,10], 3, false)
            }

            // MOUTH
            face.mouth.forEach((mouthLine,mouthIndex) => {
                if (mouthIndex > 2) {
                    if (mouthIndex === 4) {
                        p.fill(0)
                        p.noStroke()
                        drawContour(p, mouthLine, true)
                    }
                    let i = 10 * mouthIndex
                    
                    // Neon style
                    drawNeonContour(p, mouthLine, [237 + (SLIDER.color*100), 100, i], 5, true)
                
                }
            })

            // FINGERS
            
            let fingerTrails = [[[],[],[],[],[]], [[],[],[],[],[]]]

            hand.forEach((h,handIndex) => {

                h.fingers.forEach((finger,fingerIndex) => {
                    let fingerHue = (fingerIndex*20 + 150 + t*100) %360
        
                    // Leave a trail? Make an 8-point trail
                    let trail = fingerTrails[handIndex][fingerIndex]
                    addToTrail(trail, finger[3], 8)
                    
                    p.noStroke()
                    p.fill(fingerHue, 100, 50, 1)
                    drawRibbon(p, trail, (pct, side) => {
                        return 10*pct
                    })
        
                    // Draw each bone of the finger
                    for (var i = 0; i < finger.length - 1; i++) {
                        let hue = (fingerHue + i*10)%360
                        // p.fill(hue, 100, 50)
                        p.fill(200 + (i*10), 100, 60)
                        p.noStroke()
        
                        // What angle is this finger bone?
                        let joint0 = finger[i]
                        let joint1 = finger[i + 1]
                        let radius0 = getFingerSize(fingerIndex, i)
                        let radius1 = getFingerSize(fingerIndex, i)
                        let boneAngle = joint0.angleTo(joint1) 
        
                        
                        p.beginShape(p.circle())
                        // joint0.polarOffsetVertex(p, radius0, boneAngle + Math.PI/2)
                        // joint0.polarOffsetVertex(p, radius0, boneAngle - Math.PI/2)
                        // joint1.polarOffsetVertex(p, radius1, boneAngle - Math.PI/2)
                        // joint1.polarOffsetVertex(p, radius1, boneAngle + Math.PI/2)
                        p.endShape()
        
                        p.fill(hue, 100, 70)
                        p.beginShape(p.circle())
                        joint0.polarOffsetVertex(p, radius0*.3, boneAngle + Math.PI/2)
                        joint0.polarOffsetVertex(p, radius0*.7, boneAngle - Math.PI/2)
                        // joint1.polarOffsetVertex(p, radius1*.7, boneAngle - Math.PI/2)
                        // joint1.polarOffsetVertex(p, radius1*.3, boneAngle + Math.PI/2)
                        p.endShape()
        
        
                        p.fill(hue, 100, 40)
                        joint1.draw(p, radius1)
                        p.fill(hue, 100, 70)
                        joint1.draw(p, radius1*.8)
                    }
                })
            })
    
    
            function getFingerSize(fingerIndex, index) {
                let r = 0.8 + .3*Math.sin(1*fingerIndex - .5)
                // Make the thumb bigger
                if (fingerIndex == 0)
                    r *= 1.6
                r *= 12
                // Taper the fingers a bit
                r *= (1 - .06*index)
                return r
            }   


        // drawTestFacePoints(p);
        // drawTestHandPoints(p);
    })

    }
		
		
		
	

	update(t, dt) {
		
	}

}

masks.mermaid = MermaidMask