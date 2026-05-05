import { describe, it, expect } from "vitest"
import { LocalDictionary } from "../src/services/LocalDictionary"
import { createWord } from "../src/game/createWord"

describe("LocalDictionary", () => {
  it("Given a local dictionary, When a known word is checked, Then it should return true", () => {
    // Given
    const dict = new LocalDictionary(["LIVRE", "RAMER"])
    const word = createWord("LIVRE")

    // When
    const result = dict.isValid(word)

    // Then
    expect(result).toBe(true)
  })

  it("Given a local dictionary, When an unknown word is checked, Then it should return false", () => {
    // Given
    const dict = new LocalDictionary(["LIVRE", "RAMER"])
    const word = createWord("SALUT")

    // When
    const result = dict.isValid(word)

    // Then
    expect(result).toBe(false)
  })

  it("Given a local dictionary, When a lowercase or accented word is checked, Then it should still be recognized once normalized", () => {
    // Given
    const dict = new LocalDictionary(["OCEAN", "RAMER"])
    const word = createWord("océan")

    // When
    const result = dict.isValid(word)

    // Then
    expect(result).toBe(true)
  })

  it("Given a local dictionary, When a secret word is picked, Then it should come from the available words", () => {
    // Given
    const dict = new LocalDictionary(["LIVRE", "RAMER"])
    const availableWords = ["LIVRE", "RAMER"]

    // When
    const secret = dict.pickSecretWord()

    // Then
    expect(availableWords).toContain(secret)
  })
})