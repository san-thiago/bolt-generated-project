export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  entryTime: Date;
  exitTime?: Date;
  paid: boolean;
}
