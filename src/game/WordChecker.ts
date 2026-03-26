import { LetterResult  } from "./LetterResult"

export class WordChecker {
  evaluate(guess: string, solution: string): LetterResult[] {
    const guessLetters = guess.split("")
    const solutionLetters = solution.split("")

    const usedPositions = new Array(solution.length).fill(false)
    const result: Array<LetterResult | null> = new Array(guess.length).fill(null)

    this.markCorrect(guessLetters, solutionLetters, usedPositions, result)
    this.markRemaining(guessLetters, solutionLetters, usedPositions, result)

    return result.filter((r): r is LetterResult => r !== null)
  }

  private markCorrect(
    guess: string[],
    solution: string[],
    used: boolean[],
    result: Array<LetterResult | null>
  ): void {
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === solution[i]) {
        result[i] = new LetterResult(guess[i], "CORRECT")
        used[i] = true
      }
    }
  }

  private markRemaining(
    guess: string[],
    solution: string[],
    used: boolean[],
    result: Array<LetterResult | null>
  ): void {
    for (let i = 0; i < guess.length; i++) {
      if (result[i] !== null) continue

      const index = this.findAvailableIndex(guess[i], solution, used)

      if (index !== -1) {
        result[i] = new LetterResult(guess[i], "MISPLACED")
        used[index] = true
      } else {
        result[i] = new LetterResult(guess[i], "ABSENT")
      }
    }
  }

  private findAvailableIndex(
    letter: string,
    solution: string[],
    used: boolean[]
  ): number {
    for (let i = 0; i < solution.length; i++) {
      if (solution[i] === letter && !used[i]) {
        return i
      }
    }

    return -1
  }
}