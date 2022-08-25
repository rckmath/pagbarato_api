import { kmToMeters } from "@shared/utils";

export default class PriceFindManyByRangeDto {
  constructor(
    public radius: number,
    public latitude: number,
    public longitude: number,
    public productIdList: Array<string>,
    public lowestOnly: boolean = true,
  ) {}

  static from(body: PriceFindManyByRangeDto) {
    body.radius = kmToMeters(body.radius);
    return new PriceFindManyByRangeDto(body.radius, body.latitude, body.longitude, body.productIdList, body.lowestOnly);
  }
}
