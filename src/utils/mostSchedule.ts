export const mostSchedule = (userSchedules: any) => {
  const result = Object.groupBy(userSchedules, ({ start_date }: { start_date: string }) => start_date || 'not-setting');
  const sortResult = Object.entries(result).sort((a, b) => {
    const aLength = a[1] ? a[1].length : 0;
    const bLength = b[1] ? b[1].length : 0;
    return bLength - aLength;
  });

  let maxLength = 0;
  let maxDates: string[] = [];

  sortResult.forEach(([date, array]) => {
    const length = Array.isArray(array) ? array.length : 0;
    if (length > maxLength) {
      maxLength = length;
      maxDates = [date];
    } else if (length === maxLength) {
      maxDates.push(date);
    }
  });

  return { maxDates, maxLength };
};
