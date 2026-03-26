import { LetterResult } from "./LetterResult"
import { Word } from "./types"

export class Attempt {
  constructor(
    public readonly word: Word,
    public readonly letters: LetterResult[]
  ) {}
}