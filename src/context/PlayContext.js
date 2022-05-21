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
    players: [
      { id: 1, label: 1 },
      { id: 2, label: 2 },
      { id: 3, label: 3 },
    ],
  }
);
