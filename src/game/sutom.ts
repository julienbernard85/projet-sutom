import { Dictionary } from "./Dictionary"
import { GameStatus } from "./types"
import { normalizeWord } from "./normalizeWord"
import { FeedbackEvaluator } from "./FeedbackEvaluator"
import { GuessResult } from "./GuessResult"
import { InvalidGuessLengthError } from "./errors/InvalidGuessLengthError"
import { InvalidWordError } from "./errors/InvalidWordError"
import { GameAlreadyFinishedError } from "./errors/GameAlreadyFinishedError"

export class Sutom {
  solution: string
  grid: (string | null)[][]
  status: GameStatus

  private readonly feedbackEvaluator: FeedbackEvaluator

  constructor(private readonly dictionary: Dictionary) {
    this.solution = normalizeWord(this.dictionary.pickSecretWord())
    this.grid = this.createGrid(this.solution.length)
    this.status = "IN_PROGRESS"
    this.feedbackEvaluator = new FeedbackEvaluator()
  }

  play(guess: string): GuessResult {
    this.ensureGameIsStillPlayable()

    const normalizedGuess = this.normalizeGuess(guess)

    this.ensureGuessHasValidLength(normalizedGuess)
    this.ensureWordExistsInDictionary(normalizedGuess)

    const emptyRowIndex = this.findFirstEmptyRow()

    if (emptyRowIndex === -1) {
      throw new GameAlreadyFinishedError()
    }

    this.grid[emptyRowIndex] = normalizedGuess.split("")

    const feedbacks = this.feedbackEvaluator.evaluate(
      normalizedGuess,
      this.solution
    )

    this.updateStatus(normalizedGuess)

    return new GuessResult(normalizedGuess, feedbacks)
  }

  private normalizeGuess(guess: string): string {
    return normalizeWord(guess)
  }

  private ensureGameIsStillPlayable(): void {
    if (this.status !== "IN_PROGRESS") {
      throw new GameAlreadyFinishedError()
    }
  }

  private ensureGuessHasValidLength(guess: string): void {
    if (guess.length !== this.solution.length) {
      throw new InvalidGuessLengthError(this.solution.length, guess.length)
    }
  }

  private ensureWordExistsInDictionary(guess: string): void {
    if (!this.dictionary.isValid(guess)) {
      throw new InvalidWordError(guess)
    }
  }

  private findFirstEmptyRow(): number {
    return this.grid.findIndex((row) => row.every((cell) => cell === null))
  }

  private updateStatus(guess: string): void {
    if (guess === this.solution) {
      this.status = "WON"
      return
    }

    if (this.findFirstEmptyRow() === -1) {
      this.status = "LOST"
    }
  }

  private createGrid(wordLength: number): (string | null)[][] {
    return Array.from({ length: 6 }, () =>
      Array.from({ length: wordLength }, () => null)
    )
  }
}