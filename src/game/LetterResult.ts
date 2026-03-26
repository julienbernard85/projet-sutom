import { LetterFeedback } from "./types"

export class LetterResult  {
  constructor(
    public readonly letter: string,
    public readonly feedback: LetterFeedback
  ) {}
}