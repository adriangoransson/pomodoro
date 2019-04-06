const AudioContext = window.AudioContext || window.webkitAudioContext;

let audio = null; // eslint-disable-line

if (AudioContext) {
  const context = new AudioContext();
  audio = context.createBufferSource();

  fetch('/ticking.wav').then(resp => resp.arrayBuffer().then((buffer) => {
    context.decodeAudioData(buffer, (decoded) => {
      audio.buffer = decoded;
      audio.connect(context.destination);
    });
  }));

  audio.loop = true;
}

export default audio;
