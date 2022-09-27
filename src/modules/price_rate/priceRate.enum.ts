export const ThumbsType: { [x: string]: 'UP' | 'DOWN' } = {
  UP: 'UP',
  DOWN: 'DOWN',
};

export type ThumbsType = typeof ThumbsType[keyof typeof ThumbsType];
