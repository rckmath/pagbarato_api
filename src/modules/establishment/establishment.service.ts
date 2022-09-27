import { inject, injectable } from 'inversify';

import { IEstablishmentRepository, IEstablishmentService } from './establishment.interface';
import {
  EstablishmentCreateDto,
  EstablishmentDeleteDto,
  EstablishmentDto,
  EstablishmentFindManyDto,
  EstablishmentFindOneDto,
  EstablishmentUpdateDto,
} from './dtos';

import { TYPES } from '@shared/ioc/types.ioc';
import { NotFoundException } from '@shared/errors';

@injectable()
export class EstablishmentService implements IEstablishmentService {
  constructor(@inject(TYPES.IEstablishmentRepository) private readonly _repository: IEstablishmentRepository) {}

  async createOne(establishment: EstablishmentCreateDto): Promise<EstablishmentDto> {
    const response = await this._repository.create(establishment);
    return this.findOne({ id: response.id });
  }

  async findOne(establishment: EstablishmentFindOneDto): Promise<EstablishmentDto> {
    const foundEstablishment = await this._repository.findOne(establishment.id as string);
    if (!foundEstablishment) throw new NotFoundException('Establishment');
    return EstablishmentDto.from(foundEstablishment);
  }

  async findMany(searchParameters: EstablishmentFindManyDto): Promise<Array<EstablishmentDto>> {
    const foundEstablishments = await this._repository.find(searchParameters);
    return EstablishmentDto.fromMany(foundEstablishments);
  }

  async count(searchParameters: EstablishmentFindManyDto): Promise<number> {
    return this._repository.count(searchParameters);
  }

  async updateOne(establishment: EstablishmentUpdateDto): Promise<void> {
    await this.findOne({ id: establishment.id });
    return this._repository.update(establishment.id, establishment);
  }

  async delete(establishment: EstablishmentDeleteDto): Promise<void> {
    const idList = establishment.id as Array<string>;
    let establishmentList = [];
    if (!establishment.isBusinessesHours) establishmentList = await Promise.all(idList.map(async (id) => this._repository.findOne(id)));
    if (establishmentList.length || establishment.isBusinessesHours) await this._repository.delete(idList, establishment.isBusinessesHours);
  }
}
