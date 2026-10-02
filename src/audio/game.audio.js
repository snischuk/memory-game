import backgroundMusicFile from '../assets/breaking_bad.mp3';
import cardFlipSoundFile from '../assets/sound-flip-card.mp3';
import cardFlipBackSoundFile from '../assets/sound-flip-back-card.mp3';

const backgroundMusic = new Audio(backgroundMusicFile);
const cardFlipSound = new Audio(cardFlipSoundFile);
const cardFlipBackSound = new Audio(cardFlipBackSoundFile);

const AUDIO_MUTE_STORAGE_KEY = 'memory-game-audio-muted';
let isAudioMuted = localStorage.getItem(AUDIO_MUTE_STORAGE_KEY) === 'true';

backgroundMusic.loop = true;
backgroundMusic.volume = 0.1;
cardFlipSound.volume = 0.5;
cardFlipBackSound.volume = 0.5;

export function startBackgroundMusic() {
  if (isAudioMuted) {
    return;
  }

  backgroundMusic.play();
}

export function playCardFlipSound() {
  if (isAudioMuted) {
    return;
  }

  cardFlipSound.currentTime = 0;
  cardFlipSound.play();
}

export function playCardFlipBackSound() {
  if (isAudioMuted) {
    return;
  }

  cardFlipBackSound.currentTime = 0;
  cardFlipBackSound.play();
}

export function toggleAudio() {
  isAudioMuted = !isAudioMuted;
  localStorage.setItem(AUDIO_MUTE_STORAGE_KEY, isAudioMuted);

  if (isAudioMuted) {
    backgroundMusic.pause();
  } else {
    backgroundMusic.play();
  }

  return isAudioMuted;
}

export function getAudioMutedState() {
  return isAudioMuted;
}
