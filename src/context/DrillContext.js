import createDataContext from './createDataContext';
import coachingApi from '../api/coaching';

const drillReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_drills':
      return action.payload;
    default:
      return state;
  }
};

const fetchDrills = (dispatch) => async () => {
  try {
    const { data } = await coachingApi.get('/drills');
    dispatch({ type: 'fetch_drills', payload: data });
  } catch (error) {
    console.log(error);
  }
};
const createDrill = (dispatch) => async (drill) => {
  try {
    const { data } = await coachingApi.post('/drills', drill);
  } catch (error) {
    console.log(error);
  }
};

export const { Provider, Context } = createDataContext(
  drillReducer,
  { fetchDrills, createDrill },
  []
);
