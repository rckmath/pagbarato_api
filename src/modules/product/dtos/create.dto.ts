import { MissingFieldException } from '@shared/errors';

export default class EstablishmentCreateDto {
  constructor(public readonly name: string) {}

  static from(body: Partial<EstablishmentCreateDto>) {
    if (!body.name) throw new MissingFieldException('name');
    return new EstablishmentCreateDto(body.name);
  }
}
