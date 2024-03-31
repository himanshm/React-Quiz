import { type Reducer, useReducer, useEffect } from 'react';

enum Status {
  Loading = 'loading',
  Error = 'error',
  Ready = 'ready',
  Active = 'active',
  Finished = 'finished',
}

export interface QuestionType {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
  id: string;
}

export interface AppState {
  questions: QuestionType[];
  status: Status; // 'loading', 'error', 'ready', 'active', 'finished'
  currentQuestion: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
}

export const initialState = {
  questions: [],
  status: Status.Loading,
  currentQuestion: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

type dataReceivedAction = {
  type: 'dataReceived';
  payload: QuestionType[];
};

type dataFailedAction = {
  type: 'dataFailed';
};

type startAction = {
  type: 'start';
};

type newAnswerAction = {
  type: 'newAnswer';
  payload: number | null;
};

type nextQuestionAction = {
  type: 'nextQuestion';
};

type finishAction = {
  type: 'finish';
};

type restartAction = {
  type: 'restart';
};

type tickAction = {
  type: 'tick';
};

export type AppAction =
  | dataReceivedAction
  | dataFailedAction
  | startAction
  | newAnswerAction
  | nextQuestionAction
  | finishAction
  | restartAction
  | tickAction;

const SECS_PER_QUESTION = 10;

export const reducer: Reducer<AppState, AppAction> = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: Status.Ready };

    case 'dataFailed':
      return { ...state, status: Status.Error };

    case 'start':
      return {
        ...state,
        status: Status.Active,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case 'newAnswer': {
      const question = state.questions[state.currentQuestion];
      if (!question) return state; // Handle undefined question
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }

    case 'nextQuestion':
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        answer: null,
      };

    case 'finish':
      return {
        ...state,
        status: Status.Finished,
        highscore: Math.max(state.points, state.highscore),
      };

    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: Status.Ready,
        highscore: state.highscore,
      };

    case 'tick': {
      const newSecondsRemaining = Math.max(
        0,
        (state.secondsRemaining ?? 0) - 1
      ); // Ensure secondsRemaining doesn't go below 0
      return {
        ...state,
        secondsRemaining: newSecondsRemaining,
        status: newSecondsRemaining <= 0 ? Status.Finished : state.status,
      };
    }
    default:
      return state;
  }
};

function useQuestions() {
  const [state, dispatch] = useReducer<Reducer<AppState, AppAction>>(
    reducer,
    initialState
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

  return { state, dispatch };
}

export default useQuestions;
