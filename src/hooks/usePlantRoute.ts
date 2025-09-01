import { useLocation } from 'react-router';

/**
 * Custom hook to extract the plantId and active route segment from the current URL pathname.
 *
 * Example:
 *   For a URL like /123/indirect-costs,
 *   - plantId will be '123'
 *   - activeRoute will be 'indirect-costs'
 *
 * Returns:
 *   { plantId, activeRoute }
 */
export function usePlantRoute() {
  const location = useLocation();
  const segments = location.pathname.split('/');

  const plantId = segments[1] || '';
  const activeRoute = segments.pop() ?? '';

  return { plantId, activeRoute };
}
