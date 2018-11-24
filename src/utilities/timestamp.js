/**
 * Returns timestamp of current time when called
 * @return {number}
 */
export function timestamp() {
  return Math.round((new Date()).getTime())
}
