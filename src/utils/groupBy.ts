type Item = any;
type Items = Array<Item>;
type CallbackFn = (item: Item) => any;
type CustomGroupBy = (items: Items, callbackFn: CallbackFn) => object;

export const CustomGroupBy: CustomGroupBy = (items: Items, callbackFn: CallbackFn) => {
  return items.reduce((a: any, b: any) => {
    const key = typeof callbackFn === 'function' ? callbackFn(b) : b[callbackFn];

    if (!a[key]) {
      a[key] = [b];
    } else {
      a[key] = [...a[key], b];
    }

    return a;
  }, {});
};
