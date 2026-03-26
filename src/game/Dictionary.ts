export interface Dictionary {
  isValid(word: string): boolean
  pickSecretWord(): string
}