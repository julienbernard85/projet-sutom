import { describe, it, expect } from "vitest"
import { Sutom } from "../src/game/sutom"
import { InvalidGuessLengthError } from "../src/game/errors/InvalidGuessLengthError"
import { GameAlreadyFinishedError } from "../src/game/errors/GameAlreadyFinishedError"
import { InvalidWordError } from "../src/game/errors/InvalidWordError"
import { FakeDictionary } from "./doubles/FakeDictionary"

describe("Game initialization", () => {
  it("Given a dictionary, When a game is created, Then it should start with no attempts", () => {
    // Given
    const dict = new FakeDictionary(["LIVRE", "RAMER"], "LIVRE")

    // When
    const game = new Sutom(dict)

    // Then
    expect(game.attempts).toHaveLength(0)
  })

  it("Given a dictionary, When a game is created, Then it should use the secret word provided by the dictionary", () => {
    // Given
    const dict = new FakeDictionary(["LIVRE", "RAMER"], "LIVRE")

    // When
    const game = new Sutom(dict)

    // Then
    expect(game.solution).toBe("LIVRE")
  })

  it("Given a new game, When it is created, Then its status should be IN_PROGRESS", () => {
    // Given
    const dict = new FakeDictionary(["LIVRE"], "LIVRE")

    // When
    const game = new Sutom(dict)

    // Then
    expect(game.status).toBe("IN_PROGRESS")
  })
})

describe("Playing words", () => {
  it("Given a valid word, When the player plays, Then the result should be stored in attempts", () => {
    // Given
    const dict = new FakeDictionary(["LIVRE", "RAMER"], "LIVRE")
    const game = new Sutom(dict)

    // When
    game.play("RAMER")

    // Then
    expect(game.attempts).toHaveLength(1)
    expect(game.attempts[0].word).toBe("RAMER")
    expect(game.attempts[0].letters.map((item) => item.feedback)).toEqual([
      "MISPLACED",
      "ABSENT",
      "ABSENT",
      "MISPLACED",
      "ABSENT",
    ])
  })

  it("Given multiple valid words, When the player plays, Then all results should be stored in attempts", () => {
    // Given
    const dict = new FakeDictionary(["LIVRE", "RAMER", "SALUT"], "LIVRE")
    const game = new Sutom(dict)

    // When
    game.play("RAMER")
    game.play("SALUT")

    // Then
    expect(game.attempts).toHaveLength(2)
    expect(game.attempts[0].word).toBe("RAMER")
    expect(game.attempts[1].word).toBe("SALUT")
  })

  it("Given a game, When the player plays a word with an invalid length, Then it should throw an InvalidGuessLengthError", () => {
    // Given
    const dict = new FakeDictionary(["LIVRE", "CHAT"], "LIVRE")
    const game = new Sutom(dict)

    // When
    const action = () => game.play("CHAT")

    // Then
    expect(action).toThrow(InvalidGuessLengthError)
    expect(game.attempts).toHaveLength(0)
  })

  it("Given a game, When the player plays a word that is not in the dictionary, Then it should throw an InvalidWordError", () => {
    // Given
    const dict = new FakeDictionary(["LIVRE", "RAMER"], "LIVRE")
    const game = new Sutom(dict)

    // When
    const action = () => game.play("SALUT")

    // Then
    expect(action).toThrow(InvalidWordError)
    expect(game.attempts).toHaveLength(0)
  })

  it("Given a game, When the player plays a lowercase word, Then it should store it in uppercase", () => {
    // Given
    const dict = new FakeDictionary(["LIVRE", "RAMER"], "LIVRE")
    const game = new Sutom(dict)

    // When
    const result = game.play("ramer")

    // Then
    expect(result.word).toBe("RAMER")
    expect(game.attempts[0].word).toBe("RAMER")
  })

  it("Given a game, When the player plays a word with accents, Then it should store it without accents and in uppercase", () => {
    // Given
    const dict = new FakeDictionary(["OCEAN"], "OCEAN")
    const game = new Sutom(dict)

    // When
    const result = game.play("océan")

    // Then
    expect(result.word).toBe("OCEAN")
    expect(result.letters.map((item) => item.letter)).toEqual([
      "O",
      "C",
      "E",
      "A",
      "N",
    ])
  })

  it("Given a valid word, When the player plays, Then it should return the played word and its feedback", () => {
    // Given
    const dict = new FakeDictionary(["LIVRE", "RAMER"], "LIVRE")
    const game = new Sutom(dict)

    // When
    const result = game.play("RAMER")

    // Then
    expect(result.word).toBe("RAMER")
    expect(result.letters.map((item) => item.feedback)).toEqual([
      "MISPLACED",
      "ABSENT",
      "ABSENT",
      "MISPLACED",
      "ABSENT",
    ])
  })
})

describe("Game status", () => {
  it("Given a game, When the player finds the secret word, Then the status should be WON", () => {
    // Given
    const dict = new FakeDictionary(["LIVRE"], "LIVRE")
    const game = new Sutom(dict)

    // When
    game.play("LIVRE")

    // Then
    expect(game.status).toBe("WON")
  })

  it("Given a game already won, When the player tries to play again, Then it should throw a GameAlreadyFinishedError", () => {
    // Given
    const dict = new FakeDictionary(["LIVRE", "RAMER"], "LIVRE")
    const game = new Sutom(dict)

    game.play("LIVRE")

    // When
    const action = () => game.play("RAMER")

    // Then
    expect(action).toThrow(GameAlreadyFinishedError)
  })

  it("Given a game, When the player uses all 6 attempts without finding the secret word, Then the status should be LOST", () => {
    // Given
    const dict = new FakeDictionary(
      ["LIVRE", "RAMER", "SALUT", "MOTIF", "TABLE", "CHIEN", "POMME"],
      "LIVRE"
    )
    const game = new Sutom(dict)

    // When
    game.play("RAMER")
    game.play("SALUT")
    game.play("MOTIF")
    game.play("TABLE")
    game.play("CHIEN")
    game.play("POMME")

    // Then
    expect(game.status).toBe("LOST")
  })

  it("Given a lost game, When the player tries to play again, Then it should throw a GameAlreadyFinishedError", () => {
    // Given
    const dict = new FakeDictionary(
      ["LIVRE", "RAMER", "SALUT", "MOTIF", "TABLE", "CHIEN", "POMME"],
      "LIVRE"
    )
    const game = new Sutom(dict)

    game.play("RAMER")
    game.play("SALUT")
    game.play("MOTIF")
    game.play("TABLE")
    game.play("CHIEN")
    game.play("POMME")

    // When
    const action = () => game.play("LIVRE")

    // Then
    expect(action).toThrow(GameAlreadyFinishedError)
  })
})