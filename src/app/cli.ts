import { createInterface } from "node:readline/promises"
import { stdin as input, stdout as output } from "node:process"
import { Sutom } from "../game/sutom"
import { LocalDictionary } from "../services/LocalDictionary"
import { words } from "../services/words"
import { InvalidGuessLengthError } from "../game/errors/InvalidGuessLengthError"
import { InvalidWordError } from "../game/errors/InvalidWordError"
import { InvalidWordFormatError } from "../game/errors/InvalidWordFormatError"
import { GameAlreadyFinishedError } from "../game/errors/GameAlreadyFinishedError"
import { Attempt } from "../game/Attempt"
import { LetterFeedback } from "../game/types"

async function startCli(): Promise<void> {
  const rl = createInterface({ input, output })

  const dict = new LocalDictionary(words)
  const game = new Sutom(dict)

  console.log("=== SUTOM ===")
  console.log(`Mot à trouver : ${game.wordLength} lettres`)
  console.log("Tu as 6 tentatives.")
  console.log("")

  while (true) {
    try {
      const answer = await rl.question("Proposition : ")
      const result = game.play(answer)

      printResult(result)
      printAttemptsLeft(game)

      if (game.status === "WON") {
        console.log("Bravo !")
        break
      }

      if (game.status === "LOST") {
        console.log(`Perdu. Mot : ${game.solution}`)
        break
      }
    } catch (error) {
      printError(error)
    }

    console.log("")
  }

  rl.close()
}

function printResult(result: Attempt): void {
  const line = result.letters
    .map((letter) => `${letter.letter}:${toSymbol(letter.feedback)}`)
    .join(" ")

  console.log(line)
}

function toSymbol(state: LetterFeedback): string {
  if (state === "CORRECT") {
    return "🟩"
  }

  if (state === "MISPLACED") {
    return "🟨"
  }

  return "⬛"
}

function printAttemptsLeft(game: Sutom): void {
  console.log(`Tentatives restantes : ${game.remainingTries}`)
}

function printError(error: unknown): void {
  if (error instanceof InvalidGuessLengthError) {
    console.log("Longueur invalide.")
    return
  }

  if (error instanceof InvalidWordError) {
    console.log("Mot absent du dictionnaire.")
    return
  }

  if (error instanceof InvalidWordFormatError) {
    console.log("Mot invalide. Utilise uniquement des lettres.")
    return
  }

  if (error instanceof GameAlreadyFinishedError) {
    console.log("La partie est déjà terminée.")
    return
  }

  console.log("Erreur inattendue.")
}

startCli().catch(() => {
  console.log("Impossible de lancer la CLI.")
})