import { useReducer, type Reducer, type ChangeEvent } from 'react';

interface CounterState {
  count: number;
  step: number;
}

type CounterAction =
  | { type: 'dec' | 'inc' | 'reset' }
  | { type: 'setCount' | 'setStep'; payload: number };

const reducer: Reducer<CounterState, CounterAction> = (state, action) => {
  switch (action.type) {
    case 'dec':
      return { ...state, count: state.count - state.step };
    case 'inc':
      return { ...state, count: state.count + state.step };
    case 'setCount':
      return { ...state, count: action.payload };
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return { count: 0, step: 1 };
    default:
      return state;
  }
};

const initialState = { count: 0, step: 1 };

function DateCounter() {
  const [state, dispatch] = useReducer<Reducer<CounterState, CounterAction>>(
    reducer,
    initialState
  );

  const { count, step } = state;

  const calculateDisplayDate = (): Date => {
    const baseDate = new Date();
    const modifiedDate = new Date(baseDate.getTime()); // Clone to avoid mutation
    modifiedDate.setDate(baseDate.getDate() + count);
    return modifiedDate;
  };

  const dec = function () {
    dispatch({ type: 'dec' });
  };

  const inc = function () {
    dispatch({ type: 'inc' });
  };

  const defineCount = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'setCount', payload: Number(e.target.value) });
  };

  const defineStep = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'setStep', payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: 'reset' });
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

      <p>{calculateDisplayDate().toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
