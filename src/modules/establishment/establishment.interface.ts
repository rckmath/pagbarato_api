import { IBusinessHours } from '@business_hours/businessHours.interface';
import { Prisma } from '@prisma/client';
import {
  EstablishmentCreateDto,
  EstablishmentFindManyDto,
  EstablishmentFindOneDto,
  EstablishmentDeleteDto,
  EstablishmentUpdateDto,
  EstablishmentDto,
} from './dtos';

export interface IEstablishment {
  id: string;
  name: string;
  latitude: Prisma.Decimal;
  longitude: Prisma.Decimal;
  createdAt: Date;
  updatedAt: Date;
  businessesHours?: Array<IBusinessHours>;
}

export interface IEstablishmentService {
  createOne(item: EstablishmentCreateDto): Promise<EstablishmentDto>;
  findOne(item: EstablishmentFindOneDto): Promise<EstablishmentDto>;
  findMany(searchParameters: EstablishmentFindManyDto): Promise<Array<EstablishmentDto>>;
  updateOne(item: EstablishmentUpdateDto): Promise<void>;
  delete(item: EstablishmentDeleteDto): Promise<void>;
  count(searchParameters: EstablishmentFindManyDto): Promise<number>;
}

export interface IEstablishmentRepository {
  create(item: EstablishmentCreateDto): Promise<IEstablishment>;
  find(searchParameters: EstablishmentFindManyDto): Promise<Array<IEstablishment>>;
  findOne(id: IEstablishment['id']): Promise<IEstablishment | null>;
  update(id: string, item: EstablishmentUpdateDto): Promise<void>;
  delete(idList: Array<string>, isBusinessesHours: boolean): Promise<void>;
  count(searchParameters: EstablishmentFindManyDto): Promise<number>;
}
