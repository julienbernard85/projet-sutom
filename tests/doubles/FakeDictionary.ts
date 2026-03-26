import { Dictionary } from "../../src/game/Dictionary"
import { createWord } from "../../src/game/createWord"
import { Word } from "../../src/game/types"

export class FakeDictionary implements Dictionary {
  private readonly words: Word[]
  private readonly secret: Word

  constructor(words: string[], secret: string) {
    this.words = words.map((word) => createWord(word))
    this.secret = createWord(secret)
  }

  isValid(word: Word): boolean {
    return this.words.includes(word)
  }

  pickSecretWord(): Word {
    return this.secret
  }
}