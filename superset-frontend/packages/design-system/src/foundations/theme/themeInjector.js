/*
 * Utility function to add replaceable CSS.
 * @param {string} styleString
 */
export const addStyle = (() => {
  const style = document.createElement('style');
  document.head.append(style);
  return styleString => (style.textContent = styleString);
})();
