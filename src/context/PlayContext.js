import createDataContext from './createDataContext';

const playReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const { Provider, Context } = createDataContext(playReducer, {}, [
  {
    id: 1,
    name: 'Mixer',
    createdTimestamp: '',
    players: [
      {
        id: 1,
        positions: [
          { x: 200, y: 200 },
          { x: 250, y: 250 },
          { x: 150, y: 150 },
        ],
        label: 'pg',
      },
    ],
  },
]);
