export class InvalidWordError extends Error {
  constructor(word: string) {
    super(`"${word}" is not a valid word`)
    this.name = "InvalidWordError"
  }
}