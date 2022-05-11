export const msToTime = (seconds: number) => {
  const h = Math.floor(seconds / (60 * 60));
  const m = Math.floor((seconds % (60 * 60)) / 60);
  const s = Math.floor(seconds % 60);

  return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
};
