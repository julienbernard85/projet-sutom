// Le feedback pour une lettre donnée
export type LetterFeedback = "CORRECT" | "MISPLACED" | "ABSENT";

// Un mot valide garanti de 5 lettres
export type Word = string & { readonly _brand: "Word" };

// Status du jeu
export type GameStatus = "IN_PROGRESS" | "WON" | "LOST"