import { IEstablishment } from '../establishment.interface';

export default class EstablishmentDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly createdAt: Date,
    public readonly updatedAt?: Date
  ) {}

  static from(establishment: IEstablishment) {
    return new EstablishmentDto(
      establishment.id,
      establishment.name,
      establishment.latitude.toNumber(),
      establishment.longitude.toNumber(),
      establishment.createdAt,
      establishment.updatedAt
    );
  }

  static fromAdmin(establishment: IEstablishment) {
    return new EstablishmentDto(
      establishment.id,
      establishment.name,
      establishment.latitude.toNumber(),
      establishment.longitude.toNumber(),
      establishment.createdAt,
      establishment.updatedAt
    );
  }

  static fromMany(establishments: Array<IEstablishment>) {
    return establishments.map((establishment) => EstablishmentDto.fromAdmin(establishment));
  }
}
