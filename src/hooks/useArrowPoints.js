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

    switch (pathType) {
      case ARROW_PATH_TYPE:
        d = serialize(p);
        break;
      case DRIBBLE_PATH_TYPE:
        d = dribblePath.value;
        break;
    }

    return { d };
  }, [isEditMode, pathToNextPos, pathType]);

  const animatedPropsArrowHead = useAnimatedProps(() => {
    return {
      d:
        !(
          playerPos.value.x === posEnd.value.x &&
          playerPos.value.y === posEnd.value.y
        ) && pathType
          ? 'M 0 0 L 10 5 L 0 10 z'
          : '',
    };
  }, [pathToNextPos]);

  return {
    // arrow props
    animatedPropsArrow,
    animatedPropsArrowHead,
  };
};
