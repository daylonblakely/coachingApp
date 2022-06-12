import {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

export default ({ initX, initY }, isDraggable, onEnd) => {
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
      if (onEnd) {
        onEnd(pos);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: pos.value.x }, { translateY: pos.value.y }],
    };
  });

  return [pos, gestureHandler, animatedStyle];
};
