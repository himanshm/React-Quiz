type NextQuestionProps = {
  onNextQuestion: () => void;
  onFinish: () => void;
  selectedAnswer: number | null;
  currentQuestion: number;
  TotalQuestions: number;
};

function NextButton({
  onNextQuestion,
  onFinish,
  selectedAnswer,
  currentQuestion,
  TotalQuestions,
}: NextQuestionProps) {
  if (selectedAnswer === null) return null;

  if (currentQuestion < TotalQuestions - 1)
    return (
      <button className='btn btn-ui' onClick={onNextQuestion}>
        Next
      </button>
    );

  if (currentQuestion === TotalQuestions - 1)
    return (
      <button className='btn btn-ui' onClick={onFinish}>
        Finish
      </button>
    );
}

export default NextButton;
