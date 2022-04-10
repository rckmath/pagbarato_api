export class BaseEntity {
  constructor(public id?: string, public createdAt?: Date, public updatedAt?: Date, public deletedAt?: Date) {}
}
