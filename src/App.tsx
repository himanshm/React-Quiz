import { useEffect, useReducer, type Reducer } from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import Footer from './components/Footer';
import Timer from './components/Timer';

import {
  AppState,
  AppAction,
  initialState,
  reducer,
  QuestionType,
} from './store/questions-store';
import FinishScreen from './components/FinishScreen';

function App() {
  const [
    {
      questions,
      status,
      currentQuestion,
      answer,
      points,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer<Reducer<AppState, AppAction<number>>>(reducer, initialState);

  const numQuestions: number = questions.length;
  const maxPossiblePoints: number = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

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
          <>
            <Progress
              currentQuestion={currentQuestion}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              selectedAnswer={answer}
            />
            <Question
              questionObj={questions[currentQuestion]}
              onAnswer={dispatch}
              selectedAnswer={answer}
            />

            <Footer>
              <Timer runTimer={dispatch} timeLeft={secondsRemaining} />
              <NextButton
                nextQuestion={dispatch}
                selectedAnswer={answer}
                currentQuestion={currentQuestion}
                TotalQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            score={points}
            maxScore={maxPossiblePoints}
            highScore={highscore}
            restartQuiz={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
