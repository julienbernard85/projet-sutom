import { GuessFeedback } from "./GuessFeedback"

export class FeedbackEvaluator {
  evaluate(guess: string, solution: string): GuessFeedback[] {
    const secret = solution.split("")
    const guessArr = guess.split("")
    const used = Array.from({ length: solution.length }, () => false)
    const marks = Array.from<GuessFeedback | null>({ length: guess.length }).fill(null)

    this.markCorrectLetters(guessArr, secret, used, marks)
    this.markRemainingLetters(guessArr, secret, used, marks)

    return marks.filter((mark): mark is GuessFeedback => mark !== null)
  }

  private markCorrectLetters(
    guessArr: string[],
    secret: string[],
    used: boolean[],
    marks: Array<GuessFeedback | null>
  ): void {
    for (let i = 0; i < guessArr.length; i++) {
      if (guessArr[i] === secret[i]) {
        marks[i] = new GuessFeedback(guessArr[i], "CORRECT")
        used[i] = true
      }
    }
  }

  private markRemainingLetters(
    guessArr: string[],
    secret: string[],
    used: boolean[],
    marks: Array<GuessFeedback | null>
  ): void {
    for (let i = 0; i < guessArr.length; i++) {
      if (marks[i] !== null) {
        continue
      }

      const foundIndex = this.findUnusedLetterIndex(guessArr[i], secret, used)

      if (foundIndex !== -1) {
        marks[i] = new GuessFeedback(guessArr[i], "MISPLACED")
        used[foundIndex] = true
      } else {
        marks[i] = new GuessFeedback(guessArr[i], "ABSENT")
      }
    }
  }

  private findUnusedLetterIndex(
    letter: string,
    secret: string[],
    used: boolean[]
  ): number {
    for (let i = 0; i < secret.length; i++) {
      if (secret[i] === letter && !used[i]) {
        return i
      }
    }

    return -1
  }
}