export class InvalidWordFormatError extends Error {
  constructor(value: string) {
    super(`"${value}" is not a valid word format`)
    this.name = "InvalidWordFormatError"
  }
}