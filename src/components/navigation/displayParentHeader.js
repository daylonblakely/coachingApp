import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

// list screens that do not need the parent's header
export default function displayParentHeader(route) {
  const routeName = getFocusedRouteNameFromRoute(route);

  switch (routeName) {
    case 'DrillList':
      return false;
    case 'DrillCreate':
      return false;
    case 'DrillDetail':
      return false;
    case 'PracticeCreate':
      return false;
    case 'PracticeDetail':
      return false;
    case 'PlayCreate':
      return false;

    default:
      true;
  }
}
