import { describe, it, expect } from "vitest"
import { WordChecker } from "../src/game/WordChecker"

describe("WordChecker", () => {
  it("Given a correct guess, When it is evaluated, Then all letters should be CORRECT", () => {
    const evaluator = new WordChecker()

    const result = evaluator.evaluate("LIVRE", "LIVRE")

    expect(result.map((item) => item.feedback)).toEqual([
      "CORRECT",
      "CORRECT",
      "CORRECT",
      "CORRECT",
      "CORRECT",
    ])
  })

  it("Given a guess with absent letters, When it is evaluated, Then absent letters should be marked ABSENT", () => {
    const evaluator = new WordChecker()

    const result = evaluator.evaluate("ZZZZZ", "LIVRE")

    expect(result.map((item) => item.feedback)).toEqual([
      "ABSENT",
      "ABSENT",
      "ABSENT",
      "ABSENT",
      "ABSENT",
    ])
  })

  it("Given a guess with misplaced letters, When it is evaluated, Then matching letters in wrong positions should be marked MISPLACED", () => {
    const evaluator = new WordChecker()

    const result = evaluator.evaluate("ELVIR", "LIVRE")

    expect(result.map((item) => item.feedback)).toEqual([
      "MISPLACED",
      "MISPLACED",
      "CORRECT",
      "MISPLACED",
      "MISPLACED",
    ])
  })

  it("Given a guess with repeated letters, When the solution contains fewer occurrences, Then extra occurrences should be marked ABSENT", () => {
    const evaluator = new WordChecker()

    const result = evaluator.evaluate("RAMER", "LIVRE")

    expect(result.map((item) => item.feedback)).toEqual([
      "MISPLACED",
      "ABSENT",
      "ABSENT",
      "MISPLACED",
      "ABSENT",
    ])
  })
})