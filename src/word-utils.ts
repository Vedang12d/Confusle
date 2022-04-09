import { Result } from "postcss";
import wordBank from "./word-bank.json";

export const LETTER_LENGTH = 5

const word = getRandomWord()

export function getRandomWord(): string {
    return wordBank.valid[Math.floor(Math.random() * wordBank.valid.length)];
  }

export function isValidWord(word: string): boolean {
    return wordBank.valid.concat(wordBank.invalid).includes(word);
  }

export enum LetterState {
  Miss,
  Present,
  Match,
}

export function computeGuess(
  guess: string,
  answerString: string
): LetterState[] {
  const result: LetterState[] = [];

  if (guess.length !== answerString.length) {
    return result;
  }

  const answer = answerString.split("");

  const guessAsArray = guess.split("");

  const guessLetterCount: Record<string, number> = {};

  // alternative approaches to this logic
  // https://github.com/rauchg/wordledge/blob/main/pages/_middleware.ts#L46-L69

  answer.forEach((letter, index) => {
    const currentGuessLetter = guessAsArray[index];

    guessLetterCount[currentGuessLetter] = guessLetterCount[
      currentGuessLetter
    ]
      ? guessLetterCount[currentGuessLetter] + 1
      : 1;

    if (currentGuessLetter === letter) {
      result.push(LetterState.Match);
    } else if (guessAsArray.includes(letter)) {
      result.push(LetterState.Present);
    } else {
      result.push(LetterState.Miss);
    }
  });

  result.forEach((curResult, resultIndex) => {
    if (curResult !== LetterState.Present) {
      return;
    }

    const answerLetter = answer[resultIndex];

    guessAsArray.forEach((currentGuessLetter, guessIndex) => {
      if (currentGuessLetter !== answerLetter) {
        return;
      }

      if (result[guessIndex] === LetterState.Match) {
        result[resultIndex] = LetterState.Miss;
      }

      if (guessLetterCount[answerLetter] <= 0) {
        result[resultIndex] = LetterState.Miss;
      }
    });

    guessLetterCount[answerLetter]--;
  });

  return result;
}