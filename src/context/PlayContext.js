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
  }
);
