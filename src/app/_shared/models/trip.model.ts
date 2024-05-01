import { PublicProfile } from "./user.model";

export interface Trip {
  id: number;
  title: string;
  introduction: string;
  leaderId: number;
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
  rating: number;
  feedbacks?: Feedback[];
}

export interface Feedback {
  id?: any;
  createdBy: string;
  feedback: string;
  tripRating: number;
  leaderRating: number;
  createdDate: Date;
}

export interface TripItem {
  _id: string;
  dayNo: number;
  title: string;
  description: string;
}

export interface TripMember {
  tripId: number;
  userId: number;
  userName: string;
}
