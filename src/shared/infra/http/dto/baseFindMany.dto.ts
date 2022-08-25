export default class BaseFindManyDto {
  public readonly skip: number;

  constructor(
    public page: number = 1,
    public pageSize: number = 20,
    public orderBy: string = 'updatedAt',
    public orderDescending: boolean = true,
    public fromDate?: Date,
    public toDate?: Date
  ) {
    this.skip = (page - 1) * pageSize;
  }
}
