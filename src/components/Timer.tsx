import { useEffect } from 'react';

type TimerProps = {
  runTimer: () => void;
  timeLeft: number | null;
};

function Timer({ runTimer, timeLeft }: TimerProps) {
  const safeTimeLeft = timeLeft ?? 0;
  const mins = Math.floor(safeTimeLeft / 60);
  const secs = safeTimeLeft % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      runTimer();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [runTimer]);

  return (
    <div className='timer'>
      {`${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`}
    </div>
  );
}

export default Timer;
