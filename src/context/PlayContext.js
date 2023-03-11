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
    case 'add_player':
      return {
        ...state,
        currentPlay: {
          ...state.currentPlay,
          players: [
            ...state.currentPlay.players,
            {
              id: state.currentPlay.players.length + 1,
              label: state.currentPlay.players.length + 1 + '',
              steps: [
                {
                  hasBall: false,
                },
              ],
            },
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
    ? players.some((p) => p.steps[currentStep]?.pathToNextPos !== null)
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
    // TODO - get play from API

    dispatch({ type: 'set_current_play', payload: { players: [] } });
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

const addPlayer = (dispatch) => () => {
  dispatch({ type: 'add_player' });
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
    addPlayer,
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
