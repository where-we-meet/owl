export const sortDate = (dates: any[]) => {
  const temp = dates.map((date) => new Date(date));
  temp.sort((a: any, b: any) => a - b);
  return temp;
};
