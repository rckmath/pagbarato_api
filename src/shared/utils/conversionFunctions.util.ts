import { InvalidFieldException } from '@shared/errors';

export const msToTime = (seconds: number) => {
  const h = Math.floor(seconds / (60 * 60));
  const m = Math.floor((seconds % (60 * 60)) / 60);
  const s = Math.floor(seconds % 60);
  return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
};

export const arraySplitter = <T>(val: T | string | string[] | undefined) => {
  let toReturn: string[] | T[] = [];
  if (val && typeof val == 'string') toReturn = val.split(',');
  return toReturn as Array<T>;
};

export const stringToNumber = (
  val: string | number | undefined | null,
  toFloat?: boolean,
  minimumValue?: number,
  fieldName?: string
) => {
  if (!val) return;
  if (typeof val == 'string') val = toFloat ? parseFloat(val) : parseInt(val);
  if (minimumValue && val < minimumValue) throw new InvalidFieldException(`${fieldName}`, val);
  return val;
};

export const kmToMeters = (km: number | string) => {
  if (!km) return 0;
  if (typeof km == 'string') km = parseFloat(km);
  return km * 1000;
};
