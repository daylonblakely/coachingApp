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
  [
    {
      id: 'alkjf',
      title: 'Shell Drill',
      description: 'description...',
      category: 'Defense',
      comments: 'comments...',
      userId: 'lakfjlsak',
      isIndvidual: false,
      tags: [],
      steps: [],
    },
    {
      id: 'alkjfsdv',
      title: '3 Man Shooting',
      description: 'description...',
      category: 'Shooting',
      comments: 'comments...',
      userId: 'lakfjlsak',
      isIndvidual: false,
      tags: ['three players', 'two balls'],
      steps: [],
    },
    {
      id: 'alkjaaaf',
      title: 'Weak Hand Passing',
      description: 'description...',
      category: 'Passing',
      comments: 'comments...',
      userId: 'lakfjlsak',
      isIndvidual: false,
      tags: ['2 players'],
      steps: [],
    },
    {
      id: 'alkjaaafae',
      title: 'Two Ball Dribbling',
      description: 'description...',
      category: 'Ball Handling',
      comments: 'comments...',
      userId: 'lakfjlsak',
      isIndvidual: true,
      tags: [
        '2 balls',
        'aslkfjsa',
        'alkfjaslk',
        'eijen',
        'aekljfawl',
        'aeljfal',
        'dkgjdk',
        'ejeje',
      ],
      steps: [],
    },
  ]
);
