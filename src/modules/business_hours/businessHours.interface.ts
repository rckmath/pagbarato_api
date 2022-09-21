import { DaysOfWeekType } from "./businessHours.enum";

export interface IBusinessHours {
  id: string;
  establishmentId: string | null;
  day: DaysOfWeekType;
  openingAt: Date | null;
  closureAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
