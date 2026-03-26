export class InvalidGuessLengthError extends Error {
  constructor(expectedLength: number, actualLength: number) {
    super(`Invalid guess length: expected ${expectedLength}, got ${actualLength}`)
    this.name = "InvalidGuessLengthError"
  }
}