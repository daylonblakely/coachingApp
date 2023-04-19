import { useContext } from 'react';
import {
  runOnJS,
  useSharedValue,
  useAnimatedProps,
  useAnimatedReaction,
} from 'react-native-reanimated';
import { serialize } from 'react-native-redash';
import { getPath } from '../utils/pathUtils';
import squiggleLine from '../utils/squiggleLine';
import {
  Context as PlayContext,
  ARROW_PATH_TYPE,
  DRIBBLE_PATH_TYPE,
  SCREEN_PATH_TYPE,
} from '../context/PlayContext';

export default (playerPos, posMid, posEnd, pathToNextPos, pathType) => {
  const {
    state: { isEditMode },
  } = useContext(PlayContext);

  const dribblePath = useSharedValue('');

  const squiggleLineWrapper = (path) => {
    dribblePath.value = path ? squiggleLine(path) : '';
  };

  useAnimatedReaction(
    () => getPath(playerPos.value, posMid.value, posEnd.value),
    (result) => {
      if (isEditMode) runOnJS(squiggleLineWrapper)(serialize(result));
    }
  );

  // moves arrow svg
  const animatedPropsArrow = useAnimatedProps(() => {
    const p = isEditMode
      ? getPath(playerPos.value, posMid.value, posEnd.value)
      : pathToNextPos;

    let d = 'M 0 0 L 0 0';

    if (pathType === ARROW_PATH_TYPE || pathType === SCREEN_PATH_TYPE) {
      d = serialize(p);
    } else if (pathType === DRIBBLE_PATH_TYPE) {
      d = dribblePath.value;
    }

    return { d };
  }, [isEditMode, pathToNextPos, pathType]);

  const animatedPropsArrowHead = useAnimatedProps(() => {
    let d = '';

    if (pathType === ARROW_PATH_TYPE || pathType === DRIBBLE_PATH_TYPE) {
      d = 'M 0 0 L 10 5 L 0 10 z';
    } else if (pathType === SCREEN_PATH_TYPE) {
      d = 'M 0 -10 L 0 20';
    }

    return { d };
  }, [pathToNextPos]);

  return {
    // arrow props
    animatedPropsArrow,
    animatedPropsArrowHead,
  };
};
