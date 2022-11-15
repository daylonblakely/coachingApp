import createDataContext from './createDataContext';

const playReducer = (state, action) => {
  switch (action.type) {
    case 'start_animating':
      return { ...state, shouldAnimate: true };
    case 'stop_animating':
      return { ...state, shouldAnimate: false, runStep: state.runStep + 1 };
    case 'fetch_play':
      return { ...state, currentPlay: action.payload };
    case 'update_path':
      const runStep = state.runStep;
      const playerIndex = state.currentPlay.players.findIndex(
        ({ id }) => id === action.payload.playerId
      );

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
                  runStep
                ),
                {
                  ...state.currentPlay.players[playerIndex].steps[runStep],
                  pathToNextPos: action.payload.path,
                },
                ...state.currentPlay.players[playerIndex].steps.slice(
                  runStep + 1
                ),
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

const startAnimating = (dispatch) => () => {
  dispatch({ type: 'start_animating' });
};

const stopAnimating = (dispatch) => () => {
  dispatch({ type: 'stop_animating' });
};

const updateCurrentPlayerPath = (dispatch) => (playerId) => (path) => {
  console.log('updating path ', playerId);
  dispatch({ type: 'update_path', payload: { playerId, path } });
};

const fetchPlayById = (dispatch) => async (playId) => {
  try {
    console.log('fetching play');
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
            {
              playerId: 2,
              hasBall: false,
              pathToNextPos: {
                move: { y: 97.04205894470215, x: 241.95908892154694 },
                curves: [
                  {
                    c1: { y: 97.04205894470215, x: 241.95908892154694 }, //for a strait line this is the same as move
                    c2: { y: 340, x: 200 }, // this is the same as to
                    to: { y: 340, x: 200 },
                  },
                ],
                close: false,
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
            {
              playerId: 2,
              hasBall: false,
              pathToNextPos: {
                move: { y: 240, x: 300 },
                curves: [
                  {
                    c1: { y: 240, x: 300 }, //for a strait line this is the same as move
                    c2: { y: 340, x: 200 }, // this is the same as to
                    to: { y: 340, x: 200 },
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
              playerId: 3,
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
            {
              playerId: 3,
              hasBall: false,
              pathToNextPos: {
                move: { y: 340, x: 200 },
                curves: [
                  {
                    c1: { y: 340, x: 200 }, //for a strait line this is the same as move
                    c2: { y: 440, x: 200 }, // this is the same as to
                    to: { y: 440, x: 200 },
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

export const { Provider, Context } = createDataContext(
  playReducer,
  { startAnimating, stopAnimating, updateCurrentPlayerPath, fetchPlayById },
  {
    isEditMode: true,
    shouldAnimate: false,
    runStep: 0,
    plays: [
      { id: '1', name: 'test play 1' },
      { id: '2', name: 'test play 2' },
    ],
    currentPlay: null,
  }
);
