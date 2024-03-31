type FinishScreenProps = {
  score: number;
  maxScore: number;
  highScore: number;
  onRestartQuiz: () => void;
};

function FinishScreen({
  score,
  maxScore,
  highScore,
  onRestartQuiz,
}: FinishScreenProps) {
  const percentage = (score / maxScore) * 100;

  let emoji: string | null = null;

  if (percentage === 100) emoji = '🏅';
  if (percentage >= 80 && percentage < 100) emoji = '🎉';
  if (percentage >= 80 && percentage < 100) emoji = '🙃';
  if (percentage >= 0 && percentage < 50) emoji = '🤨';
  if (percentage === 0) emoji = '🤦‍♂️';

  return (
    <>
      <p className='result'>
        <span>{emoji}</span> You scored <strong>{score}</strong> out of{' '}
        {maxScore} ({Math.ceil(percentage)}%)
      </p>
      <p className='highscore'>(Highscore: {highScore} points)</p>
      <button className='btn btn-ui' onClick={onRestartQuiz}>
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
