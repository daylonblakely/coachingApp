import { useContext, useEffect } from 'react';
import {
  runOnJS,
  useSharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';
import { serialize } from 'react-native-redash';
import useDraggable from './useDraggable';
import {
  getPath,
  isStraight,
  setPlayerArrowPositions,
} from '../utils/pathUtils';
import { Context as PlayContext } from '../context/PlayContext';

export default (playerId, pathToNextPos) => {
  const {
    state: { currentStep, isEditMode },
    updateCurrentPlayerPath,
  } = useContext(PlayContext);
  const playerPos = useSharedValue({ x: 0, y: 0 });
  const posMid = useSharedValue({ x: 0, y: 0 });
  const posEnd = useSharedValue({ x: 0, y: 0 });

  // updates the player/arrow positions when the run step changes
  // this happens when the animation ends at the current step
  useEffect(() => {
    console.log('step changed... ', currentStep);
    const { x, y } = playerPos.value;
    if (pathToNextPos) {
      setPlayerArrowPositions(playerPos, posMid, posEnd, pathToNextPos);
    } else {
      // TODO - do this after animation!
      posMid.value = { x, y };
      posEnd.value = { x, y };
    }
  }, [currentStep]);

  // setCurrentPath is a helper to update the state with current paths onEnd drag for player/position
  // https://docs.swmansion.com/react-native-reanimated/docs/api/miscellaneous/runOnJS/
  const updatePathWrapper = (path, shouldPreserveSubsequent) =>
    updateCurrentPlayerPath(playerId, path, shouldPreserveSubsequent);
  const setCurrentPath = () => {
    'worklet';
    if (isEditMode) {
      runOnJS(updatePathWrapper)(
        getPath(playerPos.value, posMid.value, posEnd.value),
        false
      );
    }
  };

  const setCurrentPathMid = () => {
    'worklet';
    if (isEditMode) {
      runOnJS(updatePathWrapper)(
        getPath(playerPos.value, posMid.value, posEnd.value),
        true
      );
    }
  };
  // useDraggable returns gesture handlers for dragging positions
  const [gestureHandlerPlayer, animatedStylePlayer] = useDraggable(
    playerPos,
    isEditMode && currentStep === 0,
    setCurrentPath
  );

  // move midpoint on player drag
  gestureHandlerPlayer.onChange(() => {
    'worklet';
    posMid.value = {
      x: (playerPos.value.x + posEnd.value.x) / 2,
      y: (playerPos.value.y + posEnd.value.y) / 2,
    };
  });

  const [gestureHandlerMid, animatedStyleMid] = useDraggable(
    posMid,
    isEditMode,
    (pos) => {
      'worklet';
      // snap position to middle if line is almost straight
      if (isStraight(playerPos.value, posEnd.value, pos.value) && isEditMode) {
        pos.value = {
          ...pos.value,
          x: (playerPos.value.x + posEnd.value.x) / 2,
          y: (playerPos.value.y + posEnd.value.y) / 2,
        };
      }

      setCurrentPathMid();
    }
  );

  const [gestureHandlerEnd, animatedStyleEnd] = useDraggable(
    posEnd,
    isEditMode,
    setCurrentPath
  );

  // move midpoint on end drag
  gestureHandlerEnd.onChange(() => {
    'worklet';
    posMid.value = {
      x: (playerPos.value.x + posEnd.value.x) / 2,
      y: (playerPos.value.y + posEnd.value.y) / 2,
    };
  });

  // moves arrow svg
  const animatedPropsArrow = useAnimatedProps(() => {
    const p = isEditMode
      ? getPath(playerPos.value, posMid.value, posEnd.value)
      : pathToNextPos;

    return !p ||
      (playerPos.value.x === posEnd.value.x &&
        playerPos.value.y === posEnd.value.y)
      ? { d: undefined }
      : { d: serialize(p) };
  }, [isEditMode, pathToNextPos]);

  const animatedPropsArrowHead = useAnimatedProps(() => {
    return {
      d: !(
        playerPos.value.x === posEnd.value.x &&
        playerPos.value.y === posEnd.value.y
      )
        ? 'M 0 0 L 10 5 L 0 10 z'
        : undefined,
    };
  }, [pathToNextPos]);

  return {
    // position shared values
    playerPos,
    posMid,
    posEnd,
    // gesture handlers
    gestureHandlerPlayer,
    gestureHandlerEnd,
    gestureHandlerMid,
    // animated styles/props
    animatedStylePlayer,
    animatedStyleMid,
    animatedStyleEnd,
    // arrow props
    animatedPropsArrow,
    animatedPropsArrowHead,
  };
};
