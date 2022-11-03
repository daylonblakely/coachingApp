import { useContext } from 'react';
import { createPath, addArc } from 'react-native-redash';
import { Context as PlayContext } from '../context/PlayContext';

// gets a path object with one arc for three positions (sharedValues)
const getPath = (playerPos, posMid, posEnd) => {
  const p = createPath(playerPos);
  addArc(p, posMid, posEnd);
  return p;
};

export default () => {
  const { updateCurrentPlayerPath } = useContext(PlayContext);

  const savePlayerPath = (playerId) => (playerPos, posMid, posEnd) => {
    updateCurrentPlayerPath(playerId, getPath(playerPos, posMid, posEnd));
  };

  return [savePlayerPath];
};
