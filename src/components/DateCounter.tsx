import { useReducer, type Reducer, type ChangeEvent } from 'react';

interface CounterState {
  count: number;
  step: number;
}

interface CounterAction {
  type: string;
  payload?: number;
}

const reducer: Reducer<CounterState, CounterAction> = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case 'dec':
      return { ...state, count: state.count - state.step };
    case 'inc':
      return { ...state, count: state.count + state.step };
    case 'setCount':
      if (action.payload !== undefined) {
        return { ...state, count: action.payload };
      }
      break;
    case 'setStep':
      if (action.payload !== undefined) {
        return { ...state, step: action.payload };
      }
      break;
    case 'reset':
      return { count: 0, step: 1 };
    default:
      return {
        ...state,
        count: state.count, // Maintain the current count if unrecognized action
      };
  }
  return state;
};

function DateCounter() {
  const [state, dispatch] = useReducer<Reducer<CounterState, CounterAction>>(
    reducer,
    { count: 0, step: 1 }
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
