import { QuestionType } from '../App';

type QuestionProps = {
  questionObj: QuestionType;
};

function Question({ questionObj }: QuestionProps) {
  console.log(questionObj);
  return (
    <div>
      <h4>{questionObj.question}</h4>

      <div className='options'>
        {questionObj.options.map((option) => (
          <button key={option} className='btn btn-option'>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
