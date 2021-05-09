export const getEllipsedText = (text, trimLength) => {
  if (text.length <= trimLength || text.length < 4) return text;
  return `${text.substring(0, trimLength - 3)}...`;
};

export const trimDatetoHumanReadable = (date) => {
  const dateSplitArray = date.split(" ");
  return `${dateSplitArray[0]}, ${dateSplitArray[1]} ${dateSplitArray[2]} ${dateSplitArray[3]}, ${dateSplitArray[4]}`;
};
