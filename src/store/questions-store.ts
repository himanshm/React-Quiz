import { type Reducer } from 'react';

export interface QuestionType {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
  id: string;
}

export interface AppState {
  questions: QuestionType[];
  status: string; // 'loading', 'error', 'ready', 'active', 'finished'
  currentQuestion: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
}

export const initialState = {
  questions: [],
  status: 'loading',
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
  if (action.type === 'dataReceived') {
    return { ...state, questions: action.payload, status: 'ready' };
  }

  if (action.type === 'dataFailed') {
    return { ...state, status: 'error' };
  }

  if (action.type === 'start') {
    return {
      ...state,
      status: 'active',
      secondsRemaining: state.questions.length * SECS_PER_QUESTION,
    };
  }

  if (action.type === 'newAnswer') {
    const question = state.questions.at(state.currentQuestion);

    return {
      ...state,
      answer: action.payload,
      points:
        action.payload === question?.correctOption
          ? state.points + question!.points
          : state.points,
    };
  }

  if (action.type === 'nextQuestion') {
    return {
      ...state,
      currentQuestion: state.currentQuestion + 1,
      answer: null,
    };
  }

  if (action.type === 'finish') {
    return {
      ...state,
      status: 'finished',
      highscore:
        state.points > state.highscore ? state.points : state.highscore,
    };
  }
  if (action.type === 'restart') {
    return { ...initialState, questions: state.questions, status: 'ready' };
  }

  if (action.type === 'tick') {
    return {
      ...state,
      secondsRemaining: state.secondsRemaining! - 1,
      status: state.secondsRemaining === 0 ? 'finished' : state.status,
    };
  }

  return { ...state, questions: state.questions || [] };
};
