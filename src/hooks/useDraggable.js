import {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

export default ({ initX, initY }, isDraggable) => {
  const pos = useSharedValue({ x: initX, y: initY });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = pos.value.x;
      ctx.startY = pos.value.y;
    },
    onActive: (event, ctx) => {
      if (isDraggable) {
        pos.value = {
          ...pos.value,
          x: ctx.startX + event.translationX,
          y: ctx.startY + event.translationY,
        };
      }
    },
    onEnd: (_) => {
      //   pos.value = { x: 50, y: 100 };
      console.log('end drag');
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: pos.value.x }, { translateY: pos.value.y }],
    };
  });

  return [pos, gestureHandler, animatedStyle];
};
