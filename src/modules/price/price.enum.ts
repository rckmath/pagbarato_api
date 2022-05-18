export const PriceType: { [x: string]: 'COMMON' | 'DEAL' } = {
  COMMON: 'COMMON',
  DEAL: 'DEAL',
};

export type PriceType = typeof PriceType[keyof typeof PriceType];
