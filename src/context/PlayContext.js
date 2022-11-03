import createDataContext from './createDataContext';

const playReducer = (state, action) => {
  switch (action.type) {
    case 'start_animating':
      return { ...state, shouldAnimate: true };
    case 'stop_animating':
      return { ...state, shouldAnimate: false };
    case 'update_path':
      const runStep = state.runStep;
      const playerIndex = state.currentPlay.steps[runStep].players.findIndex(
        ({ id }) => id === action.payload.playerId
      );

      return {
        ...state,
        currentPlay: {
          ...state.currentPlay,
          steps: [
            ...state.currentPlay.steps.slice(0, runStep),
            {
              ...state.currentPlay.steps[runStep],
              players: [
                ...state.currentPlay.steps[runStep].players.slice(
                  0,
                  playerIndex
                ),
                {
                  ...state.currentPlay.steps[runStep].players[playerIndex],
                  pathToNextPos: action.payload.path,
                },
                ...state.currentPlay.steps[runStep].players.slice(
                  playerIndex + 1
                ),
              ],
            },
            ...state.currentPlay.steps.slice(runStep + 1),
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

export const { Provider, Context } = createDataContext(
  playReducer,
  { startAnimating, stopAnimating, updateCurrentPlayerPath },
  {
    isEditMode: true,
    shouldAnimate: false,
    runStep: 0,
    plays: [
      { id: '1', name: 'test play 1' },
      { id: '2', name: 'test play 2' },
    ],
    currentPlay: {
      steps: [
        {
          players: [
            {
              id: 1,
              label: '1',
              initialPos: { x: 49.72498667240143, y: 333.2830505371094 },
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
              id: 2,
              label: '2',
              initialPos: { x: 100, y: 300 },
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
              id: 3,
              label: '3',
              initialPos: { x: 300, y: 200 },
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
    },
  }
);
