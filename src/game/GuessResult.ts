import { GuessFeedback } from "./GuessFeedback"

export class GuessResult {
  constructor(
    public readonly guess: string,
    public readonly feedbacks: GuessFeedback[]
  ) {}
}