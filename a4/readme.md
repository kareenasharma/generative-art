# Kate Compton - A4

Ok, this got complicated.
Lightmap is a *second P5 instance to hold any scents*

*PARTICLES*

Particle 1: Pedestrian
These pedestrians are shaped like stars, with the "legs" slightly longer than the rest of the stars' arms. The legs "flicker" to indicate
walking movement. Each pedestrian is generated with a different skin color (yay diversity!)
The pedestrians have forces applied from other particles in its "flock" -- as you increase "friendliness", they are attracted to each other.

Particle 2: Rain
Rain appears as semi-transparent ellipses and raincloud emojis. They have a gravity force on them which pulls them down. Users can adjust the
windForce slider which will apply a horizontal force, causing turbulence.

Particle 3: Lovebirds
These lovebirds are produced in pairs (each pair a different random color). They stick with their pair and move gently around the space. 
By increasing the drag slider, users can slow down the movement of the birds.

*UI CONTROLS*

Icons (from left to right):
- pause: stops velocity of particles (but does not stop animation)
- teardrop emoji: corresponds to 'Rain' particle system
- pedestrian emoji: corresponds to 'Pedestrian' particle system
- dove emoji: corresponds to 'Lovebirds' particle system

Sliders:
- friendliness: increasing friendliness will increase the attraction or cohesion between pedestrians
- drag: increasing drag will decrease the velocity of the lovebirds
- windForce: increasing windForce will cause turbulence in the rain (otherwise the particles will fall straight down due to gravity)

Credits:
I obtained code from Kate Compton and made adjustments to fit this assignment. 

