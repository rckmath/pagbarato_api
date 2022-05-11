export const UserRoleType = {
  CONSUMER: 'CONSUMER',
  ADMIN: 'ADMIN'
};

export type UserRoleType = (typeof UserRoleType)[keyof typeof UserRoleType]