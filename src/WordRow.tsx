import { answerSelector, useStore, WORD_LENGTH } from './store';
import { LetterState } from './word-utils';

interface WordRowProps {
  word: string;
  result?: LetterState[];
  className?: string;
}
export default function WordRow({
  word = '',
  result = [],
  className = '',
}: WordRowProps) {
  const lettersRemaining = WORD_LENGTH - word.length;
  const letters = word.split('').concat(Array(lettersRemaining).fill(''));

  return (
    <div className={`grid grid-cols-5 gap-2 ${className}`}>
      {letters.map((char, index) => (
        <CharacterBox key={index} value={char} state={result[index]} />
      ))}
    </div>
  );
}

interface CharacterBoxProps {
  value?: string;
  state?: LetterState;
}

function CharacterBox({ value, state }: CharacterBoxProps) {
  const stateStyles =
    state == null
      ? "border-gray-500 text-black"
      : `${characterStateStyles[state]} text-white`;
  return (
    <span
      className={`inline-block border-2 border-gray-500 p-4 uppercase font-bold text-2xl text-center ${stateStyles}`}
    >
      {value}
    </span>
  );
}


const characterStateStyles ={
    [LetterState.Miss]: "bg-[#3a3a3c] border-[#3a3a3c]",
    [LetterState.Present]: "bg-[#b59f3b] border-[#b59f3b]",
    [LetterState.Match]: "bg-[#538d4e] border-[#538d4e]",
};
