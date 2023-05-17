import { useState, useEffect } from 'react';

export default (shouldBlink) => {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    let intervalId;

    if (!shouldBlink) {
      setIsBlinking(false);
    } else {
      intervalId = setInterval(() => {
        setIsBlinking((prevIsBlinking) => !prevIsBlinking);
      }, 500);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isBlinking, shouldBlink]);

  return [isBlinking];
};
