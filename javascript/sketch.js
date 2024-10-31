let d = 50;
let x = 200;
let y = 200;
let player1, player2, player3, player4;
let currentPlayer = null;
let audioStarted = false;
let startButton;

function preload() {
  // Load audio files with fadeIn and fadeOut times
  player1 = new Tone.Player({
    url: "./samples/drone-1.mp3",
    fadeIn: 0.5,
    fadeOut: 0.5
  }).toDestination();

  player2 = new Tone.Player({
    url: "./samples/drone-2.mp3",
    fadeIn: 0.5,
    fadeOut: 0.5
  }).toDestination();

  player3 = new Tone.Player({
    url: "./samples/drone-3.mp3",
    fadeIn: 0.5,
    fadeOut: 0.5
  }).toDestination();

  player4 = new Tone.Player({
    url: "./samples/drone-4.mp3",
    fadeIn: 0.5,
    fadeOut: 0.5
  }).toDestination();
}

function setup() {
  createCanvas(400, 400);

  // Create a start/stop button to toggle audio
  startButton = createButton('Start Audio');
  startButton.position(20, 20);
  startButton.mousePressed(toggleAudio);
}

function draw() {
  background(220);

  if (audioStarted) {
    if (mouseY < 100) {
      // speed *= -1;
      fill(255, 0, 0);
      circle(random(0, 400), random(0, 100), 20);
      switchPlayer(player1);
    }  
    
    else if (mouseY < 200 && mouseY > 100) {
      fill(200, 255, 0);
      circle(random(0, 400), random(100, 200), 20);
      switchPlayer(player2);
    } 
    
    else if (mouseY < 300 && mouseY > 200) {
      fill(200, 10, 255);
      circle(random(0, 400), random(200, 300), 20);
      switchPlayer(player3);
    } 
    
    else if (mouseY < 400 && mouseY > 300){
      fill(20, 10, 255);
      circle(random(0, 400), random(300, 400), 20);
      switchPlayer(player4);
    } 
  }
  
}

function switchPlayer(newPlayer) {
  if (currentPlayer !== newPlayer) {
    if (currentPlayer) {
      currentPlayer.stop();  // Fade out the current player
    }
    newPlayer.start();  // Fade in the new player
    currentPlayer = newPlayer;
  }
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
    stopAllPlayers();
    audioStarted = false;
    startButton.html('Start Audio');
  }
}

// Stop all players when stopping the audio
function stopAllPlayers() {
  if (player1) player1.stop();
  if (player2) player2.stop();
  if (player3) player3.stop();
  if (player4) player4.stop();
  currentPlayer = null;
}