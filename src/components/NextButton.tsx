import { type Dispatch } from 'react';
import { AppAction } from '../store/questions-store.ts';

type NextQuestionProps = {
  nextQuestion: Dispatch<AppAction<number>>;
  selectedAnswer: number | null;
  currentQuestion: number;
  TotalQuestions: number;
};

function NextButton({
  nextQuestion,
  selectedAnswer,
  currentQuestion,
  TotalQuestions,
}: NextQuestionProps) {
  if (selectedAnswer === null) return null;

  if (currentQuestion < TotalQuestions - 1)
    return (
      <button
        className='btn btn-ui'
        onClick={() => nextQuestion({ type: 'nextQuestion' })}
      >
        Next
      </button>
    );

  if (currentQuestion === TotalQuestions - 1)
    return (
      <button
        className='btn btn-ui'
        onClick={() => nextQuestion({ type: 'finish' })}
      >
        Finish
      </button>
    );
}

export default NextButton;
