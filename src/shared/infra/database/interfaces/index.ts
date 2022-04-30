export interface IRead<T> {
  find(item: T): Promise<T[]>;
  findOne(id: string): Promise<T>;
}

export interface IWrite<T> {
  create(item: T): Promise<T>;
  update(id: string, item: T): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
