export const UserRoleType: { [x: string]: 'CONSUMER' | 'ADMIN' } = {
  CONSUMER: 'CONSUMER',
  ADMIN: 'ADMIN',
};

export type UserRoleType = typeof UserRoleType[keyof typeof UserRoleType];
