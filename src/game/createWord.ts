import { Word } from "./types"
import { normalizeWord } from "./normalizeWord"
import { InvalidWordFormatError } from "./errors/InvalidWordFormatError"

export function createWord(value: string): Word {
  const word = normalizeWord(value)

  if (!/^[A-Z]+$/.test(word)) {
    throw new InvalidWordFormatError(value)
  }

  return word as Word
}