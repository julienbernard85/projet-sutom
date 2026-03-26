import { describe, it, expect } from "vitest"
import { createWord } from "../src/game/createWord"
import { InvalidWordFormatError } from "../src/game/errors/InvalidWordFormatError"

describe("createWord", () => {
  it("Given a lowercase word, When it is created, Then it should be normalized in uppercase", () => {
    const word = createWord("ramer")

    expect(word).toBe("RAMER")
  })

  it("Given a word with accents, When it is created, Then it should remove accents", () => {
    const word = createWord("océan")

    expect(word).toBe("OCEAN")
  })

  it("Given a word with invalid characters, When it is created, Then it should throw an InvalidWordFormatError", () => {
    expect(() => createWord("abc12")).toThrow(InvalidWordFormatError)
  })

  it("Given a word with spaces, When it is created, Then it should throw an InvalidWordFormatError", () => {
    expect(() => createWord("ab cd")).toThrow(InvalidWordFormatError)
  })

  it("Given a word with punctuation, When it is created, Then it should throw an InvalidWordFormatError", () => {
    expect(() => createWord("ab.cd")).toThrow(InvalidWordFormatError)
  })
})