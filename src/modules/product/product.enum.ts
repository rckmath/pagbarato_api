export const ProductUnitType: { [x: string]: 'G' | 'KG' | 'EA' | 'BOX' | 'DZ' } = {
  G: 'G',
  KG: 'KG',
  EA: 'EA',
  BOX: 'BOX',
  DZ: 'DZ',
};

export const PRODUCT_DEFAULT_SEARCH_RANGE_IN_KM = 5;

export type ProductUnitType = typeof ProductUnitType[keyof typeof ProductUnitType];
