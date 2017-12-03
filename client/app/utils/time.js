
/**
 * formatMilliseconds - Format milliseconds to a string
 *
 * @param {number} milliseconds The milliseconds
 *
 * @return {string} A formatted string
 */
export function formatMilliseconds(milliseconds) {
  const hours = Math.floor(milliseconds / 3600000);
  milliseconds %= 3600000;

  const minutes = Math.floor(milliseconds / 60000);
  milliseconds %= 60000;

  const seconds = Math.floor(milliseconds / 1000);
  milliseconds = Math.floor(milliseconds % 1000);

  return `${(minutes < 10 ? '0' : '') + minutes}:${
    seconds < 10 ? '0' : ''}${seconds}`;
}
