import createDataContext from './createDataContext';
// import { setNextPath } from '../utils/pathUtils';

const playReducer = (state, action) => {
  const playerIndex = action.payload?.playerId
    ? state.currentPlay.players.findIndex(
        ({ id }) => id === action.payload.playerId
      )
    : null;

  switch (action.type) {
    case 'start_play_animation':
      return { ...state, shouldAnimatePlay: true };
    case 'start_step_animation':
      return { ...state, shouldAnimateStep: true };
    case 'stop_play_animation':
      return { ...state, ...action.payload };
    case 'stop_step_animation':
      return {
        ...state,
        shouldAnimateStep: false,
        runStep: state.runStep + 1,
        currentPlay: {
          ...state.currentPlay,
          players: action.payload,
        },
      };
    case 'set_run_step':
      return { ...state, runStep: action.payload };
    case 'fetch_play':
      return { ...state, currentPlay: action.payload };
    case 'update_path':
      return {
        ...state,
        currentPlay: {
          ...state.currentPlay,
          players: [
            ...state.currentPlay.players.slice(0, playerIndex),
            {
              ...state.currentPlay.players[playerIndex],
              steps: [
                ...state.currentPlay.players[playerIndex].steps.slice(
                  0,
                  state.runStep
                ),
                {
                  ...state.currentPlay.players[playerIndex].steps[
                    state.runStep
                  ],
                  pathToNextPos: action.payload.path,
                },
              ],
            },
            ...state.currentPlay.players.slice(playerIndex + 1),
          ],
        },
      };
    default:
      return state;
  }
};

const runPlayAnimation = (dispatch) => () => {
  dispatch({ type: 'start_play_animation' });
};

const runStepAnimation = (dispatch) => () => {
  dispatch({ type: 'start_step_animation' });
};

const stopPlayAnimation = (dispatch) => (runStep, players) => {
  const nextStepExists = runStep !== players[0].steps.length - 1;

  const payload = nextStepExists
    ? { runStep: runStep + 1, shouldAnimatePlay: true }
    : { runStep: runStep + 1, shouldAnimatePlay: false };

  dispatch({ type: 'stop_play_animation', payload });
};

const stopStepAnimation = (dispatch) => (runStep, players) => {
  // if there is no path at the next run step, create a default one for each player
  const updatedPlayers = players.map((player) => {
    if (player.steps[runStep + 1]) {
      return player;
    } else {
      return {
        ...player,
        steps: [
          ...player.steps,
          { ...player.steps[runStep], pathToNextPos: null },
        ],
      };
      // return {
      //   ...player,
      //   steps: [
      //     ...player.steps.slice(0, runStep + 1),
      //     {
      //       ...player.steps[runStep],
      //       pathToNextPos: setNextPath(player.steps[runStep].pathToNextPos),
      //     },
      //     ...player.steps.slice(runStep + 2),
      //   ],
      // };
    }
  });

  dispatch({
    type: 'stop_step_animation',
    payload: updatedPlayers,
  });
};

const updateCurrentPlayerPath = (dispatch) => (playerId, path) => {
  console.log('updating path ', playerId);
  dispatch({ type: 'update_path', payload: { playerId, path } });
};

const fetchPlayById = (dispatch) => async (playId) => {
  try {
    console.log('fetching play ', playId);
    const data = {
      players: [
        {
          id: 1,
          label: '1',
          steps: [
            {
              hasBall: false,
              pathToNextPos: {
                close: false,
                curves: [
                  {
                    c1: {
                      x: 45.52826250344515,
                      y: 200.82778292894363,
                    },
                    c2: {
                      x: 129.6306822374463,
                      y: 97.47234910726547,
                    },
                    to: {
                      x: 241.95908892154694,
                      y: 97.04205894470215,
                    },
                  },
                ],
                move: {
                  x: 49.72498667240143,
                  y: 333.2830505371094,
                },
              },
            },
          ],
        },
        {
          id: 2,
          label: '2',
          steps: [
            {
              hasBall: false,
              pathToNextPos: {
                move: { y: 300, x: 100 },
                curves: [
                  {
                    c1: { y: 300, x: 100 },
                    c2: { y: 240, x: 300 },
                    to: { y: 240, x: 300 },
                  },
                ],
                close: false,
              },
            },
          ],
        },
        {
          id: 3,
          label: '3',
          steps: [
            {
              hasBall: false,
              pathToNextPos: {
                move: { y: 200, x: 300 },
                curves: [
                  {
                    c1: { y: 200, x: 300 }, //for a strait line this is the same as move
                    c2: { y: 340, x: 200 }, // this is the same as to
                    to: { y: 340, x: 200 },
                  },
                ],
                close: false,
              },
            },
          ],
        },
      ],
    };

    dispatch({ type: 'fetch_play', payload: data });
  } catch (error) {
    console.log(error);
  }
};

const setRunStep = (dispatch) => (runStep) => {
  dispatch({ type: 'set_run_step', payload: runStep });
};

export const { Provider, Context } = createDataContext(
  playReducer,
  {
    runPlayAnimation,
    runStepAnimation,
    stopPlayAnimation,
    stopStepAnimation,
    updateCurrentPlayerPath,
    fetchPlayById,
    setRunStep,
  },
  {
    isEditMode: true,
    shouldAnimatePlay: false,
    shouldAnimateStep: false,
    runStep: 0,
    plays: [
      { id: '1', title: 'test play 1' },
      { id: '2', title: 'test play 2' },
    ],
    currentPlay: null,
  }
);
