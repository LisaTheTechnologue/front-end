import { TripItem } from "./trip-item.model";

export interface Trip {
  _id: string;
  title: string;
  introduction: string;
  highlights: string;
  tripLevel: string;
  fromAge: number;
  toAge: number;
  fromDate: string;
  toDate: string;
  groupSize: number;
  budget: number;
  processedImg: any;
  items?: TripItem[];
}
