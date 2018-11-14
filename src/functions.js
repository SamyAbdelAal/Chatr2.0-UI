export const change = date => {
  let time = "";
  if (date !== null) {
    time = `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}`;

    return {
      date: date,
      time: time
    };
  } else {
    return {
      date: date,
      time: ""
    };
  }
};
