import { QuestionType } from '../store/useQuestions.ts';

type QuestionProps = {
  questionObj: QuestionType;
  onAnswer: (answerIndex: number) => void;
  selectedAnswer: number | null;
};

function Question({ questionObj, onAnswer, selectedAnswer }: QuestionProps) {
  const hasAnswered = selectedAnswer !== null;

  const getClassNames = (index: number) => {
    // let className = 'btn btn-option'; // Base class

    // if (index === selectedAnswer) {
    //   className += ' answer';
    // }

    // if (hasAnswered) {
    //   if (index === questionObj.correctOption) {
    //     className += ' correct';
    //   } else {
    //     className += ' wrong';
    //   }
    // }

    return `btn btn-option ${index === selectedAnswer ? 'answer' : ''}
      ${
        hasAnswered
          ? index === questionObj.correctOption
            ? 'correct'
            : 'wrong'
          : ''
      }`.trim();
  };

  return (
    <div>
      <h4>{questionObj.question}</h4>

      <div className='options'>
        {questionObj.options.map((option, index) => (
          <button
            key={`${option}-${index}`}
            disabled={hasAnswered}
            className={getClassNames(index)}
            onClick={() => onAnswer(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
