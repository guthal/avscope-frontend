export const getEllipsedText = (text, trimLength) => {
  if (text.length <= trimLength || text.length < 4) return text;
  return `${text.substring(0, trimLength - 3)}...`;
};
