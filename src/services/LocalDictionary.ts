import { Dictionary } from "../game/Dictionary"
import { createWord } from "../game/createWord"
import { Word } from "../game/types"

export class LocalDictionary implements Dictionary {
  private readonly words: Word[]

  constructor(words: string[]) {
    this.words = words.map((word) => createWord(word))

    if (this.words.length === 0) {
      throw new Error("Dictionary cannot be empty")
    }
  }

  isValid(word: Word): boolean {
    return this.words.includes(word)
  }

  pickSecretWord(): Word {
    const i = Math.floor(Math.random() * this.words.length)
    return this.words[i]
  }
} 