import { DaysOfWeekType } from '../businessHours.enum';
import { IBusinessHours } from '../businessHours.interface';

export default class BusinessHoursDto {
  constructor(
    public readonly id: string,
    public readonly establishmentId: string | null,
    public readonly day: DaysOfWeekType,
    public readonly openingAt: Date | null,
    public readonly closureAt: Date | null
  ) {}

  static from(businessHour: IBusinessHours) {
    return new BusinessHoursDto(
      businessHour.id,
      businessHour.establishmentId,
      businessHour.day,
      businessHour.openingAt,
      businessHour.closureAt
    );
  }

  static fromAdmin(businessHour: IBusinessHours) {
    return new BusinessHoursDto(
      businessHour.id,
      businessHour.establishmentId,
      businessHour.day,
      businessHour.openingAt,
      businessHour.closureAt
    );
  }

  static fromMany(businessHours: Array<IBusinessHours>) {
    return businessHours.map((businessHour) => BusinessHoursDto.fromAdmin(businessHour));
  }
}
