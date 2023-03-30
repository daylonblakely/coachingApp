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
import { Context as PlayContext } from '../context/PlayContext';

export default (playerPos, posMid, posEnd, pathToNextPos) => {
  const {
    state: { isEditMode },
  } = useContext(PlayContext);

  const dribblePath = useSharedValue('');

  const squiggleLineWrapper = (path) => {
    dribblePath.value = squiggleLine(path);
  };

  useAnimatedReaction(
    () => getPath(playerPos.value, posMid.value, posEnd.value),
    (result) => {
      runOnJS(squiggleLineWrapper)(serialize(result));
    }
  );

  // moves arrow svg
  const animatedPropsArrow = useAnimatedProps(() => {
    const p = isEditMode
      ? getPath(playerPos.value, posMid.value, posEnd.value)
      : pathToNextPos;
    return { d: dribblePath.value };
    return { d: p ? serialize(p) : '' };
  }, [isEditMode, pathToNextPos]);

  const animatedPropsArrowHead = useAnimatedProps(() => {
    return {
      d: !(
        playerPos.value.x === posEnd.value.x &&
        playerPos.value.y === posEnd.value.y
      )
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
