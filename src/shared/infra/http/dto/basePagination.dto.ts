export default class BasePaginationDto<T> {
  constructor(
    public readonly count: number,
    public readonly page: number,
    public readonly records: Array<T>,
  ) {}
}
