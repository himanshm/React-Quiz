import { ChangeEvent, useState } from 'react';

function DateCounter() {
  const [count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function (): void {
    setCount((prevCount) => prevCount - step);
  };

  const inc = function (): void {
    setCount((prevCount) => prevCount + step);
  };

  const defineCount = function (event: ChangeEvent<HTMLInputElement>) {
    setCount(Number(event.target.value));
  };

  const defineStep = function (event: ChangeEvent<HTMLInputElement>) {
    setStep(Number(event.target.value));
  };

  const reset = function (): void {
    setCount(0);
    setStep(1);
  };

  return (
    <div className='counter'>
      <div>
        <input
          type='range'
          min='0'
          max='10'
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default DateCounter;
