import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

// list screens that do not need the parent's header
export default function displayParentHeader(route) {
  const routeName = getFocusedRouteNameFromRoute(route);

  switch (routeName) {
    case 'DrillCreate':
      return false;
    default:
      true;
  }
}
