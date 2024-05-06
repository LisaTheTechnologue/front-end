import { User } from 'src/app/_shared/models/user.model';
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
  byteImg: any;
  tripDays?: TripDay[];
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

export interface TripDay {
  _id: string;
  dayNo: number;
  title: string;
  description: string;
}

export interface TripMember {
  participant: PublicProfile;
}
