export const extractFileNameFromURL = (url: string) => {
  const fileName = url.substring(url.lastIndexOf('/') + 1);
  return fileName;
};
