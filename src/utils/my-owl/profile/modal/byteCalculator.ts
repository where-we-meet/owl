export const byteCalculator = (byte: number) => {
  const KB = byte / 1024;
  const MB = KB / 1024;
  const GB = MB / 1024;
  const TB = GB / 1024;

  if (TB >= 1) {
    return `${TB.toFixed(2)} TB`;
  } else if (GB >= 1) {
    return `${GB.toFixed(2)} GB`;
  } else if (MB >= 1) {
    return `${MB.toFixed(2)} MB`;
  } else if (KB >= 1) {
    return `${KB.toFixed(2)} KB`;
  } else {
    return `${byte} bytes`;
  }
};
