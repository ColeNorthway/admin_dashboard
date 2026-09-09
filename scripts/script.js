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

function changeScreen(playerStatus) {
  if (playerStatus === 1) {

    /* Showing Video on Start */
    alert('Started in Callback');
  } else if (playerStatus === 2) {

    /* Showing Loading Screen on Stop */
    alert('Stopped in Callback');
  }
}

function onPlayerStateChange(event) {
  changeScreen(event.data);
}