import { TripItem } from "./trip-item";

export interface Trip {
  id: number;
  title: string;
  highlights: string;
  status: string;
  items: TripItem[];
}
