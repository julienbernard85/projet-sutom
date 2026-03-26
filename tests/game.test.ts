import { describe, it, expect } from "vitest"
import { Sutom } from "../src/game/sutom"
import { InvalidGuessLengthError } from "../src/game/errors/InvalidGuessLengthError"
import { GameAlreadyFinishedError } from "../src/game/errors/GameAlreadyFinishedError"
import { InvalidWordError } from "../src/game/errors/InvalidWordError"
import { FakeDictionary } from "./doubles/FakeDictionary"

describe("Game initialization", () => {
  it("Given a dictionary, When a game is created, Then it should create a grid of 6 rows", () => {
    const dictionary = new FakeDictionary(["LIVRE", "RAMER"], "LIVRE")

    const game = new Sutom(dictionary)

    expect(game.grid.length).toBe(6)
  })

  it("Given a dictionary, When a game is created, Then each row should have the correct number of columns", () => {
    const dictionary = new FakeDictionary(["LIVRE", "RAMER"], "LIVRE")

    const game = new Sutom(dictionary)

    game.grid.forEach((row) => {
      expect(row.length).toBe(5)
    })
  })

  it("Given a dictionary, When a game is created, Then it should use the secret word provided by the dictionary", () => {
    const dictionary = new FakeDictionary(["LIVRE", "RAMER"], "LIVRE")

    const game = new Sutom(dictionary)

    expect(game.solution).toBe("LIVRE")
  })
})

describe("Playing guesses", () => {
  it("Given a game, When the player plays a word, Then it should be added to the first empty row", () => {
    const dictionary = new FakeDictionary(["LIVRE", "RAMER"], "LIVRE")
    const game = new Sutom(dictionary)

    game.play("RAMER")

    expect(game.grid[0]).toEqual(["R", "A", "M", "E", "R"])
  })

  it("Given a game, When the player plays multiple words, Then each word should fill the next row", () => {
    const dictionary = new FakeDictionary(["LIVRE", "RAMER", "SALUT"], "LIVRE")
    const game = new Sutom(dictionary)

    game.play("RAMER")
    game.play("SALUT")

    expect(game.grid[0]).toEqual(["R", "A", "M", "E", "R"])
    expect(game.grid[1]).toEqual(["S", "A", "L", "U", "T"])
  })

  it("Given a game, When the player plays a word with an invalid length, Then it should throw an InvalidGuessLengthError", () => {
    const dictionary = new FakeDictionary(["LIVRE", "CHAT"], "LIVRE")
    const game = new Sutom(dictionary)

    expect(() => game.play("CHAT")).toThrow(InvalidGuessLengthError)
  })

  it("Given a game, When the player plays a word that is not in the dictionary, Then it should throw an InvalidWordError", () => {
    const dictionary = new FakeDictionary(["LIVRE", "RAMER"], "LIVRE")
    const game = new Sutom(dictionary)

    expect(() => game.play("SALUT")).toThrow(InvalidWordError)
  })

  it("Given a game, When the player plays a lowercase word, Then it should store it in uppercase", () => {
    const dictionary = new FakeDictionary(["LIVRE", "RAMER"], "LIVRE")
    const game = new Sutom(dictionary)

    game.play("ramer")

    expect(game.grid[0]).toEqual(["R", "A", "M", "E", "R"])
  })

  it("Given a game, When the player plays a word with accents, Then it should store it without accents and in uppercase", () => {
    const dictionary = new FakeDictionary(["OCEAN"], "OCEAN")
    const game = new Sutom(dictionary)

    game.play("océan")

    expect(game.grid[0]).toEqual(["O", "C", "E", "A", "N"])
  })
})

describe("Game status", () => {
  it("Given a new game, When it is created, Then its status should be IN_PROGRESS", () => {
    const dictionary = new FakeDictionary(["LIVRE"], "LIVRE")
    const game = new Sutom(dictionary)

    expect(game.status).toBe("IN_PROGRESS")
  })

  it("Given a game, When the player finds the secret word, Then the status should be WON", () => {
    const dictionary = new FakeDictionary(["LIVRE"], "LIVRE")
    const game = new Sutom(dictionary)

    game.play("LIVRE")

    expect(game.status).toBe("WON")
  })

  it("Given a game already won, When the player tries to play again, Then it should throw a GameAlreadyFinishedError", () => {
    const dictionary = new FakeDictionary(["LIVRE", "RAMER"], "LIVRE")
    const game = new Sutom(dictionary)

    game.play("LIVRE")

    expect(() => game.play("RAMER")).toThrow(GameAlreadyFinishedError)
  })

  it("Given a game, When the player uses all 6 attempts without finding the secret word, Then the status should be LOST", () => {
    const dictionary = new FakeDictionary(
      ["LIVRE", "RAMER", "SALUT", "MOTIF", "TABLE", "CHIEN", "POMME"],
      "LIVRE"
    )
    const game = new Sutom(dictionary)

    game.play("RAMER")
    game.play("SALUT")
    game.play("MOTIF")
    game.play("TABLE")
    game.play("CHIEN")
    game.play("POMME")

    expect(game.status).toBe("LOST")
  })

  it("Given a lost game, When the player tries to play again, Then it should throw a GameAlreadyFinishedError", () => {
    const dictionary = new FakeDictionary(
      ["LIVRE", "RAMER", "SALUT", "MOTIF", "TABLE", "CHIEN", "POMME"],
      "LIVRE"
    )
    const game = new Sutom(dictionary)

    game.play("RAMER")
    game.play("SALUT")
    game.play("MOTIF")
    game.play("TABLE")
    game.play("CHIEN")
    game.play("POMME")

    expect(() => game.play("LIVRE")).toThrow(GameAlreadyFinishedError)
  })

  it("Given a valid guess, When the player plays, Then it should return the played word and its feedback", () => {
  const dictionary = new FakeDictionary(["LIVRE", "RAMER"], "LIVRE")
  const game = new Sutom(dictionary)

  const result = game.play("RAMER")

  expect(result.guess).toBe("RAMER")
  expect(result.feedbacks.map((item) => item.feedback)).toEqual([
    "MISPLACED",
    "ABSENT",
    "ABSENT",
    "MISPLACED",
    "ABSENT",
  ])
})

it("Given a lowercase guess with accents, When the player plays, Then it should return the normalized word", () => {
  const dictionary = new FakeDictionary(["OCEAN"], "OCEAN")
  const game = new Sutom(dictionary)

  const result = game.play("océan")

  expect(result.guess).toBe("OCEAN")
  expect(result.feedbacks.map((item) => item.letter)).toEqual([
    "O",
    "C",
    "E",
    "A",
    "N",
  ])
})
})