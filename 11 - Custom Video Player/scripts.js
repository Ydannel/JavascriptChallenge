/* selectors del video player */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');

const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */
//aterna las funciones
// metodo a usar, si se le dio play, se pone el pause
//dependiendo de, llamara al metodo en el video player
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

// mostrara el icono en el reproductor dependiendo de 
//la accion del usuario 
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}
//adelantar o atrasar el video usando 
//el atributo de dataset.skip
function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}

//toma los valores del volumen y la velocidad del video
function handleRangeUpdate() {
  video[this.name] = this.value;
}

//toma el valor de cuanto es el progreso del video
//con este se muestra la duracion del video y de cuanto
//le queda para finalizar 
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
// clickea para avanzar el progress del video 
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Hook up the event listeners */

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

//actualiza el volumen y velocidad del video
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

//
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
