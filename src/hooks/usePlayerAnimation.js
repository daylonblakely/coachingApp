import { useContext, useEffect } from 'react';
// import { Context as PlayContext } from '../context/PlayContext';

export default (playerPos, shouldAnimate, callback) => {
  //   const {
  //     state: { isAnimating },
  //     stopAnimating,
  //   } = useContext(PlayContext);

  useEffect(() => {
    if (shouldAnimate) {
      console.log('start animation');

      setTimeout(() => {
        callback();
        console.log('end animation');
      }, 5000);
    }
  }, [shouldAnimate]);
};
