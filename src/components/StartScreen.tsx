import { type Dispatch } from 'react';
import { AppAction } from '../store/questions-store.ts';

type StartScreenProps = {
  totalQuestions: number;
  onStartQuiz: Dispatch<AppAction<number>>;
};

function StartScreen({ totalQuestions, onStartQuiz }: StartScreenProps) {
  return (
    <div className='start'>
      <h2>Welcome to the React Quiz!</h2>
      <h3>{totalQuestions} questions to test your React mastery!</h3>
      <button
        className='btn btn-ui'
        onClick={() => onStartQuiz({ type: 'start' })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
