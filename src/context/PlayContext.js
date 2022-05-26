import createDataContext from './createDataContext';

const playReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const { Provider, Context } = createDataContext(
  playReducer,
  {},
  {
    isEditMode: true,
    runStep: 0,
    plays: [
      {
        id: '1',
        players: [
          {
            id: '1',
            label: '1',
            initialPos: { x: 100, y: 100 },
            steps: [
              {
                hasBall: false,
                path: {
                  move: { y: 100, x: 100 },
                  curves: [
                    {
                      c1: { y: 100, x: 100 },
                      c2: { y: 140, x: 100 },
                      to: { y: 140, x: 100 },
                    },
                  ],
                  close: false,
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
                  move: { y: 200, x: 300 },
                  curves: [
                    {
                      c1: { y: 200, x: 300 },
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
                  move: { y: 300, x: 200 },
                  curves: [
                    {
                      c1: { y: 300, x: 200 },
                      c2: { y: 340, x: 200 },
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
