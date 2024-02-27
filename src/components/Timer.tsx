import { useEffect } from 'react';
import { type Dispatch } from 'react';
import { AppAction } from '../store/questions-store';

type TimerProps = {
  runTimer: Dispatch<AppAction>;
  timeLeft: number | null;
};

function Timer({ runTimer, timeLeft }: TimerProps) {
  const mins = Math.floor(timeLeft! / 60);
  const secs = timeLeft! % 60;
  useEffect(() => {
    const timer = setInterval(() => {
      runTimer({ type: 'tick' });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [runTimer]);
  return (
    <div className='timer'>
      {mins < 10 && '0'}
      {mins}: {secs < 10 && '0'}
      {secs}
    </div>
  );
}

export default Timer;
