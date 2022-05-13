export const isDefined = <T>(val: T | undefined | null): val is T => {
  return val !== undefined && val !== null;
};

export const isValidUUID = (val: string | undefined | null): boolean => {
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  if (!val) return false;
  return regexExp.test(val);
};
