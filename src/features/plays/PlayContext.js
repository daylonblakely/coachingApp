import createDataContext from '../../context/createDataContext';
import { isLastStep, stepHasArrows } from './utils/playUtils';
import {
  ARROW_PATH_TYPE,
  DRIBBLE_PATH_TYPE,
  SCREEN_PATH_TYPE,
} from './constants';

const INITIAL_PLAY = {
  id: null,
  title: null,
  players: [null, null, null, null, null],
  passes: null,
};

const playReducer = (state, action) => {
  switch (action.type) {
    case 'start_play_animation':
      return {
        ...state,
        shouldAnimatePlay: true,
        isEditMode: false,
      };
    case 'start_step_animation':
      return {
        ...state,
        shouldAnimateStep: true,
        isEditMode: false,
      };
    case 'stop_play_animation':
      return {
        ...state,
        shouldAnimatePlay: action.payload.shouldAnimatePlay,
        isEditMode: action.payload.isEditMode,
        passFromPosSharedVal: null,
        passToPosSharedVal: null,
        currentStep: action.payload.currentStep,
        currentPlay: {
          ...state.currentPlay,
          players: action.payload.players,
        },
      };
    case 'stop_step_animation':
      return {
        ...state,
        shouldAnimateStep: false,
        isEditMode: true,
        passFromPosSharedVal: null,
        passToPosSharedVal: null,
        currentStep: state.currentStep + 1,
        currentPlay: {
          ...state.currentPlay,
          players: action.payload,
        },
      };
    case 'set_current_step':
      return {
        ...state,
        currentStep: action.payload,
      };
    case 'set_current_play':
      return {
        ...state,
        currentStep: 0,
        shouldAnimatePlay: false,
        shouldAnimateStep: false,
        passFromPosSharedVal: null,
        passToPosSharedVal: null,
        currentPlay: action.payload,
      };
    case 'update_path':
      return {
        ...state,
        currentPlay: {
          ...state.currentPlay,
          players: [
            ...state.currentPlay.players.slice(0, action.payload.playerId),
            {
              ...state.currentPlay.players[action.payload.playerId],
              steps: [
                ...state.currentPlay.players[
                  action.payload.playerId
                ].steps.slice(0, state.currentStep),
                {
                  ...state.currentPlay.players[action.payload.playerId].steps[
                    state.currentStep
                  ],
                  pathToNextPos: action.payload.path,
                  pathType: action.payload.pathType,
                },
                ...(action.payload.shouldPreserveSubsequent
                  ? state.currentPlay.players[
                      action.payload.playerId
                    ].steps.slice(state.currentStep + 1)
                  : []),
              ],
            },
            ...state.currentPlay.players.slice(action.payload.playerId + 1),
          ],
        },
      };
    case 'update_player':
      return {
        ...state,
        currentStep: 0,
        currentPlay: {
          ...state.currentPlay,
          players: [
            ...state.currentPlay.players.slice(0, action.payload.playerId),
            action.payload.player,
            ...state.currentPlay.players.slice(action.payload.playerId + 1),
          ],
        },
      };
    case 'update_hasBall':
      return {
        ...state,
        currentPlay: {
          ...state.currentPlay,
          players: [
            ...state.currentPlay.players.slice(0, action.payload.playerId),
            {
              ...state.currentPlay.players[action.payload.playerId],
              steps: [
                ...state.currentPlay.players[
                  action.payload.playerId
                ].steps.slice(0, state.currentStep),
                {
                  ...state.currentPlay.players[action.payload.playerId].steps[
                    state.currentStep
                  ],
                  hasBall: action.payload.hasBall,
                  pathToNextPos: null,
                  pathType: null,
                },
              ],
            },
            ...state.currentPlay.players.slice(action.payload.playerId + 1),
          ],
        },
      };
    case 'update_pendingPassFromId':
      return { ...state, pendingPassFromId: action.payload };
    case 'update_passAtCurrentStep':
      return {
        ...state,
        currentPlay: {
          ...state.currentPlay,
          players: state.currentPlay.players.map((player) => {
            return player
              ? {
                  ...player,
                  steps: [
                    ...player.steps.slice(0, state.currentStep),
                    {
                      ...player.steps[state.currentStep],
                      passesBall: player.id === state.pendingPassFromId,
                      receivesBall: player.id === action.payload,
                      ...(player.id === state.pendingPassFromId ||
                      player.id === action.payload
                        ? {
                            pathToNextPos: null,
                            pathType: null,
                          }
                        : {}),
                    },
                  ],
                }
              : player;
          }),
          passes: {
            ...state.currentPlay.passes,
            [state.currentStep]: {
              from: state.pendingPassFromId,
              to: action.payload,
            },
          },
        },
        pendingPassFromId: null,
      };
    case 'update_passFromPosSharedVal':
      return { ...state, passFromPosSharedVal: action.payload };
    case 'update_passToPosSharedVal':
      return { ...state, passToPosSharedVal: action.payload };
    default:
      return state;
  }
};

const addBlankStepToAllPlayers = (currentStep, players) => {
  // add a new step to each player with no path
  return players.map((player) => {
    return player
      ? {
          ...player,
          // TODO setup a default player object
          steps: [
            ...player.steps,
            {
              ...player.steps[currentStep],
              pathToNextPos: null,
              pathType: null,
              hasBall: player.steps[currentStep].passesBall
                ? false
                : player.steps[currentStep].hasBall ||
                  player.steps[currentStep].receivesBall,
              receivesBall: false,
              passesBall: false,
            },
          ],
        }
      : null;
  });
};

//////////// ACTIONS ///////////////
const runPlayAnimation = (dispatch) => () => {
  dispatch({ type: 'start_play_animation' });
};

const currentStepAnimation = (dispatch) => () => {
  dispatch({ type: 'start_step_animation' });
};

const stopPlayAnimation = (dispatch) => (currentStep, currentPlay) => {
  const { players } = currentPlay;
  const animationShouldEnd = isLastStep(players, currentStep);
  const shouldAddBlankStep = stepHasArrows(currentPlay, currentStep);

  dispatch({
    type: 'stop_play_animation',
    payload: {
      shouldAnimatePlay: !animationShouldEnd,
      isEditMode: animationShouldEnd,
      currentStep:
        !animationShouldEnd || (animationShouldEnd && shouldAddBlankStep)
          ? currentStep + 1
          : currentStep,
      players:
        animationShouldEnd && shouldAddBlankStep // end play on a blank step, add one if needed
          ? addBlankStepToAllPlayers(currentStep, players)
          : players,
    },
  });
};

const stopStepAnimation = (dispatch) => (currentStep, players) => {
  // if there is no path at the next run step, create a default one for each player
  const updatedPlayers = isLastStep(players, currentStep)
    ? addBlankStepToAllPlayers(currentStep, players)
    : players;

  dispatch({
    type: 'stop_step_animation',
    payload: updatedPlayers,
  });
};

const updateCurrentPlayerPath =
  (dispatch) =>
  (playerId, path, shouldPreserveSubsequent = false, pathType = null) => {
    dispatch({
      type: 'update_path',
      payload: { playerId, path, shouldPreserveSubsequent, pathType },
    });
  };

const addArrow = (dispatch) => (playerId, path) => {
  updateCurrentPlayerPath(dispatch)(playerId, path, false, ARROW_PATH_TYPE);
};

const addDribble = (dispatch) => (playerId, path) => {
  updateCurrentPlayerPath(dispatch)(playerId, path, false, DRIBBLE_PATH_TYPE);
};

const addScreen = (dispatch) => (playerId, path) => {
  updateCurrentPlayerPath(dispatch)(playerId, path, false, SCREEN_PATH_TYPE);
};

const fetchPlayById = (dispatch) => async (playId) => {
  try {
    console.log('fetching play ', playId);
    // TODO - get play from API

    dispatch({ type: 'set_current_play', payload: INITIAL_PLAY });
  } catch (error) {
    console.log(error);
  }
};

const clearCurrentPlay = (dispatch) => () => {
  dispatch({ type: 'set_current_play', payload: INITIAL_PLAY });
};

const setCurrentStep = (dispatch) => (currentStep) => {
  dispatch({ type: 'set_current_step', payload: currentStep });
};

const addPlayer = (dispatch) => (playerId) => {
  dispatch({
    type: 'update_player',
    payload: {
      playerId,
      player: {
        id: playerId,
        label: playerId + 1 + '',
        steps: [
          {
            hasBall: false,
            pathType: null,
          },
        ],
      },
    },
  });
};

const removePlayer = (dispatch) => (playerId) => {
  dispatch({ type: 'update_player', payload: { playerId, player: null } });
};

const addBall = (dispatch) => (playerId) => {
  dispatch({ type: 'update_hasBall', payload: { playerId, hasBall: true } });
};

const setPendingPassFromId = (dispatch) => (playerId) => {
  dispatch({ type: 'update_pendingPassFromId', payload: playerId });
};

const setPassAtCurrentStep = (dispatch) => (playerId) => {
  dispatch({ type: 'update_passAtCurrentStep', payload: playerId });
};

const setPassFromPosSharedVal = (dispatch) => (pos) => {
  dispatch({ type: 'update_passFromPosSharedVal', payload: pos });
};

const setPassToPosSharedVal = (dispatch) => (pos) => {
  dispatch({ type: 'update_passToPosSharedVal', payload: pos });
};

export const { Provider, Context } = createDataContext(
  playReducer,
  {
    runPlayAnimation,
    currentStepAnimation,
    stopPlayAnimation,
    stopStepAnimation,
    updateCurrentPlayerPath,
    fetchPlayById,
    clearCurrentPlay,
    setCurrentStep,
    addPlayer,
    removePlayer,
    addArrow,
    addDribble,
    addScreen,
    addBall,
    setPendingPassFromId,
    setPassAtCurrentStep,
    setPassFromPosSharedVal,
    setPassToPosSharedVal,
  },
  {
    isEditMode: true,
    shouldAnimatePlay: false,
    shouldAnimateStep: false,
    currentStep: 0,
    pendingPassFromId: null,
    passFromPosSharedVal: null,
    passToPosSharedVal: null,
    plays: [
      { id: '1', title: 'test play 1' },
      { id: '2', title: 'test play 2' },
    ],
    currentPlay: INITIAL_PLAY,
  }
);
