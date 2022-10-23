import createDataContext from './createDataContext';

const playReducer = (state, action) => {
  switch (action.type) {
    case 'start_animating':
      return { ...state, isAnimating: true };
    case 'stop_animating':
      return { ...state, isAnimating: false };
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

export const { Provider, Context } = createDataContext(
  playReducer,
  { startAnimating, stopAnimating },
  {
    isEditMode: true,
    isAnimating: false,
    runStep: 0,
    plays: [
      {
        id: '1',
        players: [
          {
            id: '1',
            label: '1',
            initialPos: { x: 49.72498667240143, y: 333.2830505371094 },
            steps: [
              {
                hasBall: false,
                path: {
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
            id: '2',
            label: '2',
            initialPos: { x: 100, y: 300 },
            steps: [
              {
                hasBall: false,
                path: {
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
            id: '3',
            label: '3',
            initialPos: { x: 300, y: 200 },
            steps: [
              {
                hasBall: false,
                path: {
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
        // steps: [
        //   [
        //     { player: '1', hasBall: false, initialPos: { x: 100, y: 100 } },
        //     { player: '2', hasBall: false, initialPos: { x: 200, y: 200 } },
        //     { player: '3', hasBall: false, initialPos: { x: 300, y: 300 } },
        //   ],
        // ],
      },
    ],
  }
);
