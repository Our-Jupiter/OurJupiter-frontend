export function getFormatDate(date: Date) {
  const year = date.getFullYear(); //yyyy
  const month = 1 + date.getMonth(); //M
  const day = date.getDate(); //d
  return (
    year +
    '-' +
    (month >= 10 ? month : '0' + month) +
    '-' +
    (day >= 10 ? day : '0' + day)
  );
}
