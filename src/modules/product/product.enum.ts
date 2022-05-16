export const ProductUnitType: { [x: string]: 'G' | 'KG' | 'EA' | 'BOX' | 'DZ' } = {
  G: 'G',
  KG: 'KG',
  EA: 'EA',
  BOX: 'BOX',
  DZ: 'DZ',
};

export type ProductUnitType = typeof ProductUnitType[keyof typeof ProductUnitType];
