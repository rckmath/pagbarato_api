export default class BasePaginationDto<T> {
  constructor(public readonly count: number = 0, public readonly page: number, public readonly records: Array<T>) {}
}
