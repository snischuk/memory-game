import backgroundMusicFile from '../assets/breaking_bad.mp3';
import cardFlipSoundFile from '../assets/sound-flip-card.mp3';
import cardFlipBackSoundFile from '../assets/sound-flip-back-card.mp3';

const backgroundMusic = new Audio(backgroundMusicFile);
backgroundMusic.loop = true;
backgroundMusic.volume = 0.1;

const cardFlipSound = new Audio(cardFlipSoundFile);
cardFlipSound.volume = 0.5;

const cardFlipBackSound = new Audio(cardFlipBackSoundFile);
cardFlipBackSound.volume = 0.5;

export function startBackgroundMusic() {
  backgroundMusic.play();
}

export function playCardFlipSound() {
  cardFlipSound.currentTime = 0;
  cardFlipSound.play();
}

export function playCardFlipBackSound() {
  cardFlipBackSound.currentTime = 0;
  cardFlipBackSound.play();
}
