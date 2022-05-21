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
    plays: [
      {
        id: '1',
        players: [
          {
            id: '1',
            label: '1',
            steps: [{ hasBall: false, initialPos: { x: 100, y: 100 } }],
          },
          {
            id: '2',
            label: '2',
            steps: [{ hasBall: false, initialPos: { x: 200, y: 300 } }],
          },
          {
            id: '3',
            label: '3',
            steps: [{ hasBall: false, initialPos: { x: 300, y: 200 } }],
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
