import * as ls from './localstorage';

const AudioContext = window.AudioContext || window.webkitAudioContext;

let audio = null; // eslint-disable-line

if (AudioContext) {
  const context = new AudioContext();
  audio = context.createBufferSource();
  const gain = context.createGain();
  gain.connect(context.destination);

  fetch('/ticking.wav').then((resp) => resp.arrayBuffer().then((buffer) => {
    context.decodeAudioData(buffer, (decoded) => {
      audio.buffer = decoded;
      audio.connect(gain);
    });
  }));

  audio.loop = true;
  audio.setVolume = (value) => {
    gain.gain.value = value;
  };

  audio.setVolume(ls.get(ls.VOLUME, 1));
}

export default audio;
