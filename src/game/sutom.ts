import { Dictionary } from "./Dictionary"
import { GameStatus, Word } from "./types"
import { createWord } from "./createWord"
import { WordChecker } from "./WordChecker"
import { Attempt } from "./Attempt"
import { InvalidGuessLengthError } from "./errors/InvalidGuessLengthError"
import { InvalidWordError } from "./errors/InvalidWordError"
import { GameAlreadyFinishedError } from "./errors/GameAlreadyFinishedError"

export class Sutom {
  solution: Word
  attempts: Attempt[]
  status: GameStatus

  private readonly checker: WordChecker
  private static readonly MAX_TRIES = 6

  constructor(private readonly dict: Dictionary) {
    this.solution = this.dict.pickSecretWord()
    this.attempts = []
    this.status = "IN_PROGRESS"
    this.checker = new WordChecker()
  }

  get remainingTries(): number {
    return Sutom.MAX_TRIES - this.attempts.length
  }

  get wordLength(): number {
    return this.solution.length
  }
  
  play(input: string): Attempt {
    this.ensurePlayable()

    const guess = createWord(input)

    this.validateGuess(guess)

    const marks = this.checker.evaluate(guess, this.solution)
    const result = new Attempt(guess, marks)

    this.attempts.push(result)
    this.updateGameStatus(guess)

    return result
  }


  private validateGuess(guess: Word): void {
    this.checkLength(guess)
    this.checkWord(guess)
  }

  private ensurePlayable(): void {
    if (this.status !== "IN_PROGRESS") {
      throw new GameAlreadyFinishedError()
    }
  }

  private checkLength(guess: Word): void {
    if (guess.length !== this.solution.length) {
      throw new InvalidGuessLengthError(this.solution.length, guess.length)
    }
  }

  private checkWord(guess: Word): void {
    if (!this.dict.isValid(guess)) {
      throw new InvalidWordError(guess)
    }
  }

  private updateGameStatus(guess: Word): void {
    if (guess === this.solution) {
      this.status = "WON"
      return
    }

    if (this.attempts.length >= Sutom.MAX_TRIES) {
      this.status = "LOST"
    }
  }
}