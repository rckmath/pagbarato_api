import BusinessHoursDto from '@business_hours/dtos/businessHours.dto';
import { IEstablishment } from '../establishment.interface';

export default class EstablishmentDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly createdAt: Date,
    public readonly updatedAt?: Date,
    public readonly businessesHours?: Array<BusinessHoursDto>
  ) {}

  static from(establishment: IEstablishment) {
    const businessesHours = establishment.businessesHours?.length ? BusinessHoursDto.fromMany(establishment.businessesHours) : [];

    return new EstablishmentDto(
      establishment.id,
      establishment.name,
      establishment.latitude.toNumber(),
      establishment.longitude.toNumber(),
      establishment.createdAt,
      establishment.updatedAt,
      businessesHours
    );
  }

  static fromAdmin(establishment: IEstablishment) {
    const businessesHours = establishment.businessesHours?.length ? BusinessHoursDto.fromMany(establishment.businessesHours) : [];

    return new EstablishmentDto(
      establishment.id,
      establishment.name,
      establishment.latitude.toNumber(),
      establishment.longitude.toNumber(),
      establishment.createdAt,
      establishment.updatedAt,
      businessesHours
    );
  }

  static fromMany(establishments: Array<IEstablishment>) {
    return establishments.map((establishment) => EstablishmentDto.fromAdmin(establishment));
  }
}
