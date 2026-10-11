import backgroundMusicFile from '@/assets/breaking_bad.mp3'
import cardFlipBackSoundFile from '@/assets/sound-flip-back-card.mp3'
import cardFlipSoundFile from '@/assets/sound-flip-card.mp3'

import {
  BACKGROUND_MUSIC_VOLUME,
  CARD_FLIP_SOUND_VOLUME,
  INITIAL_AUDIO_PLAYBACK_TIME
} from './game-audio.constants.js'

function playAudio(audio) {
  let playResult

  try {
    playResult = audio.play()
  } catch {
    playResult = undefined
  }

  if (playResult && typeof playResult.catch === 'function') {
    playResult.catch(() => undefined)
  }
}

export class GameAudioService {
  #isMuted

  constructor(isMuted = false, createAudio = source => new Audio(source)) {
    this.backgroundMusic = createAudio(backgroundMusicFile)
    this.cardFlipSound = createAudio(cardFlipSoundFile)
    this.cardFlipBackSound = createAudio(cardFlipBackSoundFile)
    this.#isMuted = isMuted

    this.backgroundMusic.loop = true
    this.backgroundMusic.volume = BACKGROUND_MUSIC_VOLUME
    this.cardFlipSound.volume = CARD_FLIP_SOUND_VOLUME
    this.cardFlipBackSound.volume = CARD_FLIP_SOUND_VOLUME
  }

  startBackgroundMusic() {
    if (!this.#isMuted) {
      playAudio(this.backgroundMusic)
    }
  }

  playCardFlipSound() {
    if (this.#isMuted) {
      return
    }

    this.cardFlipSound.currentTime = INITIAL_AUDIO_PLAYBACK_TIME
    playAudio(this.cardFlipSound)
  }

  playCardFlipBackSound() {
    if (this.#isMuted) {
      return
    }

    this.cardFlipBackSound.currentTime = INITIAL_AUDIO_PLAYBACK_TIME
    playAudio(this.cardFlipBackSound)
  }

  toggleAudio() {
    this.#isMuted = !this.#isMuted

    if (this.#isMuted) {
      this.backgroundMusic.pause()
    } else {
      playAudio(this.backgroundMusic)
    }

    return this.#isMuted
  }

  get isMuted() {
    return this.#isMuted
  }
}
