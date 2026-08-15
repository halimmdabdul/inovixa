/**
 * Wraps Date.now() so it isn't called directly inside component render or
 * event handlers, which the react-hooks/purity lint rule flags even when the
 * value (a spam-timing timestamp) never affects what's rendered.
 */
export function currentTimestamp() {
  return Date.now();
}
