export const getEllipsedText = (text, trimLength) => {
  if (text.length <= trimLength || text.length < 4) return text;
  return `${text.substring(0, trimLength - 3)}...`;
};

export const trimDatetoHumanReadable = date => {
  const dateSplitArray = date.split(" ");
  return `${dateSplitArray[0]}, ${dateSplitArray[1]} ${dateSplitArray[2]} ${dateSplitArray[3]}, ${dateSplitArray[4]}`;
};

export const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const getQueryVariable = (query, variable) => {
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
};

export const getAge = dateString => {
  const today = new Date();
  const birthDate = new Date(dateString);
  const age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  return age;
};
