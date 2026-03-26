import { Word } from "./types"

export interface Dictionary {
  isValid(word: Word): boolean
  pickSecretWord(): Word
}