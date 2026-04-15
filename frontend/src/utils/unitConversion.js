// Converting to milliseconds
export const convertMs = (seconds) => seconds * 1000;

// Formatting milliseconds
export const formatMs = (seconds) => {
  return `${(seconds * 1000).toFixed(3)} ms`;
};