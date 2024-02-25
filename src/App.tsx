import { useEffect, useReducer, type Reducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';

export interface QuestionType {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
  id: string;
}

interface QuestionState {
  questions: QuestionType[];
  status: string; // 'loading', 'error', 'ready', 'active', 'finished'
  currentQuestion: number;
}

export interface QuestionAction {
  type: string;
  payload?: QuestionType[];
}

const initialState = {
  questions: [],
  status: 'loading',
  currentQuestion: 0,
};

const reducer: Reducer<QuestionState, QuestionAction> = (state, action) => {
  if (action.type === 'dataReceived') {
    return { ...state, questions: action.payload, status: 'ready' };
  }

  if (action.type === 'dataFailed') {
    return { ...state, status: 'error' };
  }

  if (action.type === 'start') {
    return { ...state, status: 'active' };
  }

  return { ...state, questions: state.questions };
};

function App() {
  const [{ questions, status, currentQuestion }, dispatch] = useReducer<
    Reducer<QuestionState, QuestionAction>
  >(reducer, initialState);

  const numQuestions = questions.length;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:8000/questions');
        const data: QuestionType[] = await res.json();
        dispatch({ type: 'dataReceived', payload: data });
      } catch (error) {
        dispatch({ type: 'dataFailed' });
      }
    }

    fetchData();
  }, []);

  return (
    <div className='app'>
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen totalQuestions={numQuestions} onStartQuiz={dispatch} />
        )}
        {status === 'active' && (
          <Question questionObj={questions[currentQuestion]} />
        )}
      </Main>
    </div>
  );
}

export default App;
