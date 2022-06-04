export default class PriceFindManyByRangeDto {
  constructor(public radius: number, public productIdList?: string | Array<string>) {}

  static from(body: PriceFindManyByRangeDto) {
    return new PriceFindManyByRangeDto(body.radius, body.productIdList);
  }
}
