import { Dictionary } from "../../src/game/Dictionary"

export class FakeDictionary implements Dictionary {
  constructor(
    private readonly words: string[],
    private readonly secretWord: string
  ) {}

  isValid(word: string): boolean {
    return this.words.includes(word)
  }

  pickSecretWord(): string {
    return this.secretWord
  }
}