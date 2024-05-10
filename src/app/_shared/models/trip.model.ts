import { User } from 'src/app/_shared/models/user.model';
import { PublicProfile } from "./user.model";

export interface Trip {
  id: number;
  title: string;
  summary: string;
  leaderId: number;
  cityName:string;
  cityId:number;
  highlights: string;
  tripLevel: string;
  minAge: number;
  maxAge: number;
  startDate: string;
  endDate: string;
  groupSize: number;
  notes: string;
  price: number;
  tripStatus: string;
  // imageURL: any;
  img: any;
  imageURL: string;
  byteImg: any;
  tripDays?: TripDay[];
  // members?: TripMember[];
  rating: number;
  // feedbacks?: Feedback[];
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
  id: any;
  dayNo: number;
  title: string;
  description: string;
}

export interface TripMember {
  id: any;
  userId: number;
  tripId:number;
}
