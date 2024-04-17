export const groupBy = (values: [], keyFinder: any) => {
  return values.reduce((a: any, b: any) => {
    const key = typeof keyFinder === 'function' ? keyFinder(b) : b[keyFinder];

    if (!a[key]) {
      a[key] = [b];
    } else {
      a[key] = [...a[key], b];
    }

    return a;
  }, {});
};
