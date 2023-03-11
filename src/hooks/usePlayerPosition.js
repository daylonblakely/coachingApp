import { useContext } from 'react';
import {
  runOnJS,
  useSharedValue,
  useAnimatedProps,
  useAnimatedReaction,
} from 'react-native-reanimated';
import { serialize } from 'react-native-redash';
import useDraggable from './useDraggable';
import { getPath, isStraight, getInitialPositions } from '../utils/pathUtils';
import { Context as PlayContext } from '../context/PlayContext';

const DEFAULT_PLAYER_COORDS = { x: 100, y: 100 };

export default (playerId, pathToNextPos) => {
  const {
    state: { currentStep, isEditMode },
    updateCurrentPlayerPath,
  } = useContext(PlayContext);
  const { initPlayerX, initPlayerY, initEndX, initEndY, initMidX, initMidY } =
    pathToNextPos
      ? getInitialPositions(pathToNextPos)
      : {
          initPlayerX: DEFAULT_PLAYER_COORDS.x,
          initPlayerY: DEFAULT_PLAYER_COORDS.y,
          initEndX: DEFAULT_PLAYER_COORDS.x,
          initEndY: DEFAULT_PLAYER_COORDS.y,
          initMidX: DEFAULT_PLAYER_COORDS.x,
          initMidY: DEFAULT_PLAYER_COORDS.y,
        };

  const playerPos = useSharedValue({ x: initPlayerX, y: initPlayerY });
  const posMid = useSharedValue({ x: initMidX, y: initMidY });
  const posEnd = useSharedValue({ x: initEndX, y: initEndY });

  // updates the player/arrow positions when the run step changes
  // this happens when the animation ends at the current step
  useAnimatedReaction(
    () => {},
    () => {
      if (pathToNextPos) {
        playerPos.value = { x: initPlayerX, y: initPlayerY };
        posMid.value = { x: initMidX, y: initMidY };
        posEnd.value = { x: initEndX, y: initEndY };
      } else {
        const { x, y } = playerPos.value;
        posMid.value = { x, y };
        posEnd.value = { x, y };
      }
    },
    [currentStep]
  );

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
