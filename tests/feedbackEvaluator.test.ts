import { describe, it, expect } from "vitest"
import { WordChecker } from "../src/game/WordChecker"

describe("WordChecker", () => {
  it("Given a correct guess, When it is evaluated, Then all letters should be CORRECT", () => {
    // Given
    const evaluator = new WordChecker()
    const guess = "LIVRE"
    const solution = "LIVRE"

    // When
    const result = evaluator.evaluate(guess, solution)

    // Then
    expect(result.map((item) => item.feedback)).toEqual([
      "CORRECT",
      "CORRECT",
      "CORRECT",
      "CORRECT",
      "CORRECT",
    ])
  })

  it("Given a guess with absent letters, When it is evaluated, Then absent letters should be marked ABSENT", () => {
    // Given
    const evaluator = new WordChecker()
    const guess = "ZZZZZ"
    const solution = "LIVRE"

    // When
    const result = evaluator.evaluate(guess, solution)

    // Then
    expect(result.map((item) => item.feedback)).toEqual([
      "ABSENT",
      "ABSENT",
      "ABSENT",
      "ABSENT",
      "ABSENT",
    ])
  })

  it("Given a guess with misplaced letters, When it is evaluated, Then matching letters in wrong positions should be marked MISPLACED", () => {
    // Given
    const evaluator = new WordChecker()
    const guess = "ELVIR"
    const solution = "LIVRE"

    // When
    const result = evaluator.evaluate(guess, solution)

    // Then
    expect(result.map((item) => item.feedback)).toEqual([
      "MISPLACED",
      "MISPLACED",
      "CORRECT",
      "MISPLACED",
      "MISPLACED",
    ])
  })

  it("Given a guess with repeated letters, When the solution contains fewer occurrences, Then extra occurrences should be marked ABSENT", () => {
    // Given
    const evaluator = new WordChecker()
    const guess = "RAMER"
    const solution = "LIVRE"

    // When
    const result = evaluator.evaluate(guess, solution)

    // Then
    expect(result.map((item) => item.feedback)).toEqual([
      "MISPLACED",
      "ABSENT",
      "ABSENT",
      "MISPLACED",
      "ABSENT",
    ])
  })
})