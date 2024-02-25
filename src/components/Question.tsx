import { QuestionType } from '../App';
import { type Dispatch } from 'react';
import { QuestionAction } from '../App.tsx';

type QuestionProps = {
  questionObj: QuestionType;
  onAnswer: Dispatch<QuestionAction<number>>;
  selectedAnswer: number | null;
};

function Question({ questionObj, onAnswer, selectedAnswer }: QuestionProps) {
  console.log(questionObj);
  const hasAnswered = selectedAnswer != null;

  return (
    <div>
      <h4>{questionObj.question}</h4>

      <div className='options'>
        {questionObj.options.map((option, index) => (
          <button
            key={option}
            disabled={hasAnswered}
            className={`btn btn-option ${
              index === selectedAnswer ? 'answer' : ''
            } ${
              hasAnswered
                ? index === questionObj.correctOption
                  ? 'correct'
                  : 'wrong'
                : ''
            }`}
            onClick={() => onAnswer({ type: 'newAnswer', payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
