export const PriceType: { [x: string]: 'COMMON' | 'DEAL' } = {
  COMMON: 'COMMON',
  DEAL: 'DEAL',
};

export type PriceType = typeof PriceType[keyof typeof PriceType];

export const TrustingType: { [x: string]: 'VERY_LOW' | 'LOW' | 'NEUTRAL' | 'HIGH' | 'VERY_HIGH' } = {
  VERY_LOW: 'VERY_LOW',
  LOW: 'LOW',
  NEUTRAL: 'NEUTRAL',
  HIGH: 'HIGH',
  VERY_HIGH: 'VERY_HIGH',
};

export type TrustingType = typeof TrustingType[keyof typeof TrustingType];
