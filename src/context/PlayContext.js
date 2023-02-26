import createDataContext from './createDataContext';

const playReducer = (state, action) => {
  const playerIndex = action.payload?.playerId
    ? state.currentPlay.players.findIndex(
        ({ id }) => id === action.payload.playerId
      )
    : null;

  switch (action.type) {
    case 'start_play_animation':
      return {
        ...state,
        shouldAnimatePlay: true,
        isEditMode: false,
      };
    case 'start_step_animation':
      return {
        ...state,
        shouldAnimateStep: true,
        isEditMode: false,
      };
    case 'stop_play_animation':
      return {
        ...state,
        shouldAnimatePlay: action.payload.shouldAnimatePlay,
        isEditMode: action.payload.isEditMode,
        currentStep: action.payload.currentStep,
        currentPlay: {
          ...state.currentPlay,
          players: action.payload.players,
        },
      };
    case 'stop_step_animation':
      return {
        ...state,
        shouldAnimateStep: false,
        isEditMode: true,
        currentStep: state.currentStep + 1,
        currentPlay: {
          ...state.currentPlay,
          players: action.payload,
        },
      };
    case 'set_current_step':
      return {
        ...state,
        currentStep: action.payload,
      };
    case 'set_current_play':
      return {
        ...state,
        currentStep: 0,
        shouldAnimatePlay: false,
        shouldAnimateStep: false,
        currentPlay: action.payload,
      };
    case 'update_path':
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
                  state.currentStep
                ),
                {
                  ...state.currentPlay.players[playerIndex].steps[
                    state.currentStep
                  ],
                  pathToNextPos: action.payload.path,
                },
                ...(action.payload.shouldPreserveSubsequent
                  ? state.currentPlay.players[playerIndex].steps.slice(
                      state.currentStep + 1
                    )
                  : []),
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

const addBlankStepToAllPlayers = (currentStep, players) => {
  // add a new step to each player with no path
  return players.map((player) => {
    return {
      ...player,
      steps: [
        ...player.steps,
        { ...player.steps[currentStep], pathToNextPos: null },
      ],
    };
  });
};

//////////// ACTIONS ///////////////
const runPlayAnimation = (dispatch) => () => {
  dispatch({ type: 'start_play_animation' });
};

const currentStepAnimation = (dispatch) => () => {
  dispatch({ type: 'start_step_animation' });
};

const stopPlayAnimation = (dispatch) => (currentStep, players) => {
  const isLastStep = currentStep === players[0].steps.length - 1;
  const stepHasArrows = isLastStep
    ? players.some((p) => p.steps[currentStep].pathToNextPos !== null)
    : true;

  dispatch({
    type: 'stop_play_animation',
    payload: {
      shouldAnimatePlay: !isLastStep,
      isEditMode: isLastStep,
      currentStep:
        !isLastStep || (isLastStep && stepHasArrows)
          ? currentStep + 1
          : currentStep,
      players:
        isLastStep && stepHasArrows // end play on a blank step, add one if needed
          ? addBlankStepToAllPlayers(currentStep, players)
          : players,
    },
  });
};

const stopStepAnimation = (dispatch) => (currentStep, players) => {
  // if there is no path at the next run step, create a default one for each player
  const isLastStep = currentStep === players[0].steps.length - 1;

  const updatedPlayers = isLastStep
    ? addBlankStepToAllPlayers(currentStep, players)
    : players;

  dispatch({
    type: 'stop_step_animation',
    payload: updatedPlayers,
  });
};

const updateCurrentPlayerPath =
  (dispatch) =>
  (playerId, path, shouldPreserveSubsequent = false) => {
    console.log('updating path ', playerId);
    console.log('preserve subsequent steps ', shouldPreserveSubsequent);
    dispatch({
      type: 'update_path',
      payload: { playerId, path, shouldPreserveSubsequent },
    });
  };

const fetchPlayById = (dispatch) => async (playId) => {
  try {
    console.log('fetching play ', playId);
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
          ],
        },
        {
          id: 3,
          label: '3',
          steps: [
            {
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
    };

    dispatch({ type: 'set_current_play', payload: data });
  } catch (error) {
    console.log(error);
  }
};

const clearCurrentPlay = (dispatch) => () => {
  dispatch({ type: 'set_current_play', payload: null });
};

const setCurrentStep = (dispatch) => (currentStep) => {
  dispatch({ type: 'set_current_step', payload: currentStep });
};

export const { Provider, Context } = createDataContext(
  playReducer,
  {
    runPlayAnimation,
    currentStepAnimation,
    stopPlayAnimation,
    stopStepAnimation,
    updateCurrentPlayerPath,
    fetchPlayById,
    clearCurrentPlay,
    setCurrentStep,
  },
  {
    isEditMode: true,
    shouldAnimatePlay: false,
    shouldAnimateStep: false,
    currentStep: 0,
    plays: [
      { id: '1', title: 'test play 1' },
      { id: '2', title: 'test play 2' },
    ],
    currentPlay: null,
  }
);
