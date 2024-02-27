import { QuestionType, AppAction } from '../store/questions-store.ts';
import { type Dispatch } from 'react';

type QuestionProps = {
  questionObj: QuestionType;
  onAnswer: Dispatch<AppAction>;
  selectedAnswer: number | null;
};

function Question({ questionObj, onAnswer, selectedAnswer }: QuestionProps) {
  const hasAnswered = selectedAnswer != null;

  const getClassNames = (index: number) => {
    let className = 'btn btn-option'; // Base class

    if (index === selectedAnswer) {
      className += ' answer';
    }

    if (hasAnswered) {
      if (index === questionObj.correctOption) {
        className += ' correct';
      } else {
        className += ' wrong';
      }
    }

    return className;
  };

  return (
    <div>
      <h4>{questionObj.question}</h4>

      <div className='options'>
        {questionObj.options.map((option, index) => (
          <button
            key={option}
            disabled={hasAnswered}
            className={getClassNames(index)}
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
