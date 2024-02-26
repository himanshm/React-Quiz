import { Dispatch } from 'react';
import { AppAction } from '../store/questions-store';

type FinishScreenProps = {
  score: number;
  maxScore: number;
  highScore: number;
  restartQuiz: Dispatch<AppAction<number>>;
};

function FinishScreen({
  score,
  maxScore,
  highScore,
  restartQuiz,
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
      <button
        className='btn btn-ui'
        onClick={() => restartQuiz({ type: 'restart' })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
