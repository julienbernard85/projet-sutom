import { describe, it, expect } from "vitest"
import { LocalDictionary } from "../src/services/LocalDictionary"
import { createWord } from "../src/game/createWord"

describe("LocalDictionary", () => {
  it("Given a local dictionary, When a known word is checked, Then it should return true", () => {
    const dict = new LocalDictionary(["LIVRE", "RAMER"])

    expect(dict.isValid(createWord("LIVRE"))).toBe(true)
  })

  it("Given a local dictionary, When an unknown word is checked, Then it should return false", () => {
    const dict = new LocalDictionary(["LIVRE", "RAMER"])

    expect(dict.isValid(createWord("SALUT"))).toBe(false)
  })

  it("Given a local dictionary, When a lowercase or accented word is checked, Then it should still be recognized once normalized", () => {
    const dict = new LocalDictionary(["OCEAN", "RAMER"])

    expect(dict.isValid(createWord("océan"))).toBe(true)
  })

  it("Given a local dictionary, When a secret word is picked, Then it should come from the available words", () => {
    const dict = new LocalDictionary(["LIVRE", "RAMER"])

    const secret = dict.pickSecretWord()

    expect(["LIVRE", "RAMER"]).toContain(secret)
  })
})