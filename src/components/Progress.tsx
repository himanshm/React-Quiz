type ProgressProps = {
  currentQuestion: number;
  numQuestions: number;
  points: number;
  maxPossiblePoints: number;
  selectedAnswer: number | null;
};

function Progress({
  currentQuestion,
  numQuestions,
  points,
  maxPossiblePoints,
  selectedAnswer,
}: ProgressProps) {
  return (
    <header className='progress'>
      <progress
        max={numQuestions}
        value={currentQuestion + Number(selectedAnswer !== null)}
      />
      <p>
        Question <strong>{currentQuestion + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
