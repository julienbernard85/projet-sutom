import { LetterFeedback } from "./types"

export class GuessFeedback {
  constructor(
    public readonly letter: string,
    public readonly feedback: LetterFeedback
  ) {}
}