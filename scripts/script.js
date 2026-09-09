/* Util */
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function fadeOutLoadingScreen() {
  let loadScreen = document.getElementById('load-screen');
  loadScreen.classList.add("faded-out");
}

function fadeInLoadingScreen() {
  let loadScreen = document.getElementById('load-screen');
  loadScreen.classList.add("faded-in");
}


/* Setting Up IFrame API */
let tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('ytplayer', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

/*
 * This Function Hides The Pause Button on Video On Start
 *  - This is stuck on start because of playlist/loop
 *  - Cannot remove via hide media url params in iframe
 * This Function Hides The Start When Video Stopped when Backgrounded
 *  - Same reasons apply above
 *  - Also this is an excuse for me to make a load screen
 */
async function changeScreen(playerStatus) {
  if (playerStatus === 1) {

    /* Showing Video on Start */
    // alert('Started in Callback');

    /* Ensuring playbutton exits */
    await sleep(4000);

    fadeOutLoadingScreen();
  } else if (playerStatus === 2) {

    /* Showing Loading Screen on Stop */
    // alert('Stopped in Callback');

    /* Ensuring playbutton exits */
    await sleep(4000);

    fadeInLoadingScreen();
  }
}

/* This function is a callback to video start/stop */
function onPlayerStateChange(event) {
  changeScreen(event.data);
}