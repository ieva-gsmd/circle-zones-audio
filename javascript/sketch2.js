let d = 50;
let x = 200;
let y = 200;

let synth;
let audioStarted = false;
let startButton;

// Frequency range for mapping
const minFreq = 200; // Lowest frequency
const maxFreq = 1000; // Highest frequency




function setup() {
  createCanvas(400, 400);
  frameRate(20)
  synth = new Tone.Synth().toDestination();

  // Create a start/stop button to toggle audio
  startButton = createButton('Start Audio');
  startButton.position(20, 20);
  startButton.mousePressed(toggleAudio);
}

function draw() {
  background(220);

  if (audioStarted) {   //if audio has started

    //set random x position
    let xPos = random(0, width);
    let yPos; //set the y position variable

      if (mouseY < 100) {
        fill(255, 0, 0);
        yPos = random(0, 100);  //set the yPosition
      } else if (mouseY < 200 && mouseY > 100) {
        fill(200, 255, 0);
        yPos = random(100, 200);
      } else if (mouseY < 300 && mouseY > 200) {
        fill(200, 10, 255);
        yPos = random(200, 300);
      } else if (mouseY < 400 && mouseY > 300) {
        fill(20, 10, 255);
        yPos = random(300, 400);
      }
      //trigger the function that draws a circle and sonifies its frequency
      drawCircleAndPlayFrequency(xPos, yPos);
  }
  
}

function drawCircleAndPlayFrequency(xPos, yPos) {
    // Draw the circle
    circle(xPos, yPos, 20);
  
    // Map the y-position of the circle to the frequency range
    const frequency = map(yPos, 0, height, maxFreq, minFreq);
  
    // Play the note with the mapped frequency
    synth.triggerAttackRelease(frequency, "8n");
}



// Function to toggle audio on or off
function toggleAudio() {
  if (!audioStarted) {
    // Start the audio context on user gesture
    Tone.start().then(() => {
      audioStarted = true;
      startButton.html('Stop Audio');
    });
    
  } else {
    // Stop all audio and reset
    if (synth) synth.disconnect();
    audioStarted = false;
    startButton.html('Start Audio');

    synth.toDestination();
  }
}

