import { TripItem } from "./trip-item.model";
import { TripMember } from "./trip-member.model";

export interface Trip {
  id: number;
  title: string;
  introduction: string;
  leaderName: string;
  cityName:string;
  cityId:number;
  highlights: string;
  tripLevel: string;
  fromAge: number;
  toAge: number;
  fromDate: string;
  toDate: string;
  groupSize: number;
  notes: string;
  budget: number;
  tripStatus: string;
  processedImg: any;
  items?: TripItem[];
  members?: TripMember[];
}
