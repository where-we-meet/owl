export const objectValidate = (object: { [key: string]: string | undefined | null }) => {
  const result = Object.values(object).every((el) => el);
  return result;
};
