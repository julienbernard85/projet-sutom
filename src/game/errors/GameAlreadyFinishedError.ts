export class GameAlreadyFinishedError extends Error {
  constructor() {
    super("The game is already finished")
    this.name = "GameAlreadyFinishedError"
  }
}