import useQuestions from '../store/useQuestions';

import Loader from '../components/Loader';
import Error from '../components/Error';
import StartScreen from '../components/StartScreen';
import Question from '../components/Question';
import NextButton from '../components/NextButton';
import Progress from '../components/Progress';
import Footer from '../components/Footer';
import Timer from '../components/Timer';
import FinishScreen from '../components/FinishScreen';

function Quiz() {
  const { state, dispatch } = useQuestions();
  const {
    questions,
    status,
    currentQuestion,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;
  const numQuestions: number = questions.length;
  const maxPossiblePoints: number = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  const handleStartQuiz = () => dispatch({ type: 'start' });

  const handleAnswerSelection = (answer: number) => {
    dispatch({ type: 'newAnswer', payload: answer });
  };

  const handleTimer = () => dispatch({ type: 'tick' });

  const handleNext = () => dispatch({ type: 'nextQuestion' });
  const handleFinish = () => dispatch({ type: 'finish' });

  const handleRestartQuiz = () => dispatch({ type: 'restart' });

  return (
    <>
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
      {status === 'ready' && (
        <StartScreen
          totalQuestions={numQuestions}
          onStartQuiz={handleStartQuiz}
        />
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
            onAnswer={handleAnswerSelection}
            selectedAnswer={answer}
          />

          <Footer>
            <Timer runTimer={handleTimer} timeLeft={secondsRemaining} />
            <NextButton
              onNextQuestion={handleNext}
              onFinish={handleFinish}
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
          onRestartQuiz={handleRestartQuiz}
        />
      )}
    </>
  );
}

export default Quiz;
