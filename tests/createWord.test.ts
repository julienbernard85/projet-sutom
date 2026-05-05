import { describe, it, expect } from "vitest"
import { createWord } from "../src/game/createWord"
import { InvalidWordFormatError } from "../src/game/errors/InvalidWordFormatError"

describe("createWord", () => {
  it("Given a lowercase word, When it is created, Then it should be normalized in uppercase", () => {
    // Given
    const input = "ramer"

    // When
    const result = createWord(input)

    // Then
    expect(result).toBe("RAMER")
  })

  it("Given a word with accents, When it is created, Then it should remove accents", () => {
    // Given
    const input = "océan"

    // When
    const result = createWord(input)

    // Then
    expect(result).toBe("OCEAN")
  })

  it("Given a word with invalid characters, When it is created, Then it should throw an InvalidWordFormatError", () => {
    // Given
    const input = "abc12"

    // When
    const action = () => createWord(input)

    // Then
    expect(action).toThrow(InvalidWordFormatError)
  })

  it("Given a word with spaces, When it is created, Then it should throw an InvalidWordFormatError", () => {
    // Given
    const input = "ab cd"

    // When
    const action = () => createWord(input)

    // Then
    expect(action).toThrow(InvalidWordFormatError)
  })

  it("Given a word with punctuation, When it is created, Then it should throw an InvalidWordFormatError", () => {
    // Given
    const input = "ab.cd"

    // When
    const action = () => createWord(input)

    // Then
    expect(action).toThrow(InvalidWordFormatError)
  })
})