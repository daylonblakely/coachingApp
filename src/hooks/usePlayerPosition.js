import { useContext, useEffect, useState } from 'react';
import {
  runOnJS,
  useSharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';
import { serialize } from 'react-native-redash';
import useDraggable from './useDraggable';
import {
  getInitialPositions,
  getPath,
  isStraight,
  setPlayerArrowPositions,
} from '../utils/pathUtils';
import { Context as PlayContext } from '../context/PlayContext';

export default (playerId, pathToNextPos) => {
  const {
    state: { runStep, isEditMode, shouldAnimatePlay, shouldAnimateStep },
    updateCurrentPlayerPath,
  } = useContext(PlayContext);

  const shouldEdit = isEditMode && !shouldAnimatePlay && !shouldAnimateStep;

  //   initial values for position shared values
  const [{ initPlayerX, initPlayerY, initEndX, initEndY, initMidX, initMidY }] =
    useState(() => getInitialPositions(pathToNextPos));

  const playerPos = useSharedValue({
    x: initPlayerX,
    y: initPlayerY,
  });
  const posMid = useSharedValue({ x: initMidX, y: initMidY });
  const posEnd = useSharedValue({ x: initEndX, y: initEndY });

  // setCurrentPath is a helper to update the state with current paths onEnd drag for player/position
  // https://docs.swmansion.com/react-native-reanimated/docs/api/miscellaneous/runOnJS/
  const updatePathWrapper = (path, shouldPreserveSubsequent) =>
    updateCurrentPlayerPath(playerId, path, shouldPreserveSubsequent);
  const setCurrentPath = () => {
    'worklet';
    if (shouldEdit) {
      runOnJS(updatePathWrapper)(
        getPath(playerPos.value, posMid.value, posEnd.value),
        false
      );
    }
  };

  const setCurrentPathMid = () => {
    'worklet';
    if (shouldEdit) {
      runOnJS(updatePathWrapper)(
        getPath(playerPos.value, posMid.value, posEnd.value),
        true
      );
    }
  };
  // useDraggable returns gesture handlers for dragging positions
  const [gestureHandlerPlayer, animatedStylePlayer] = useDraggable(
    playerPos,
    shouldEdit && runStep === 0,
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
    shouldEdit,
    (pos) => {
      'worklet';
      // snap position to middle if line is almost straight
      if (isStraight(playerPos.value, posEnd.value, pos.value) && shouldEdit) {
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
    shouldEdit,
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

  // updates the player/arrow positions when the run step changes
  // this happens when the animation ends at the current step
  useEffect(() => {
    console.log('step changed...');
    if (pathToNextPos) {
      setPlayerArrowPositions(playerPos, posMid, posEnd, pathToNextPos);
    }
  }, [runStep]);

  // moves arrow svg
  const animatedPropsArrow = useAnimatedProps(() => {
    if (!pathToNextPos) return { d: undefined }; //hides SVG
    else if (shouldAnimatePlay) {
      return { d: serialize(pathToNextPos) };
    } else if (!shouldEdit) return {};
    else {
      const p = getPath(playerPos.value, posMid.value, posEnd.value);
      return { d: serialize(p) };
    }
  }, [shouldEdit, pathToNextPos]);

  const animatedPropsArrowHead = useAnimatedProps(() => {
    return { d: pathToNextPos ? 'M 0 0 L 10 5 L 0 10 z' : undefined };
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
