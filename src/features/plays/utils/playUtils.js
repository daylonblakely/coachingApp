export const stepHasArrows = (currentPlay, currentStep) =>
  currentPlay.players.some((p) => p?.steps[currentStep]?.pathType) ||
  currentPlay?.passes?.[currentStep];

export const isLastStep = (players, currentStep) =>
  currentStep === players[0].steps.length - 1;

export const numberOfSteps = (currentPlay) => {
  let count = 0;
  while (stepHasArrows(currentPlay, count)) {
    count++;
  }
  return count + 1;
};
