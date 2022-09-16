export const DaysOfWeekType: { [x: string]: 'SUN' | 'MON' | 'TUES' | 'WED' | 'THURS' | 'FRI' | 'SAT' | 'HOLIDAYS' } = {
  SUN: 'SUN',
  MON: 'MON',
  TUES: 'TUES',
  WED: 'WED',
  THURS: 'THURS',
  FRI: 'FRI',
  SAT: 'SAT',
  HOLIDAYS: 'HOLIDAYS',
};

export type DaysOfWeekType = typeof DaysOfWeekType[keyof typeof DaysOfWeekType];
