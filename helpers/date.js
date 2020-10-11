exports.dateToString = (date) => {
  console.log(date);
  const newDate = new Date(date).toISOString();
  console.log(newDate);
  return newDate;
};
