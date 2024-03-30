import { TripItem } from "./trip-item.model";

export interface Trip {
  _id: string;
  title: string;
  highlights: string;
  noOfParticipants: number;
  budget: number;
  processedImg: any;
  items?: TripItem[];
}
