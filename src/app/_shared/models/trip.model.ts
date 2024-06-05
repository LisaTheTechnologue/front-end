import { User } from 'src/app/_shared/models/user.model';
import { TripLevel, TripStatus } from './enum.model';

export interface Trip {
  id: number;
  title: string;
  summary: string;
  leaderId: number;
  cityName:string;
  cityId:number;
  tripLevel: TripLevel;
  minAge: number;
  maxAge: number;
  startDate: Date;
  endDate: Date;
  groupSize: number;
  notes: string;
  price: number;
  tripStatus: string;
  img: any;
  // imageURL: string;
  // imageURLs: string[];
  imageNames: string[];
  imageBytes: any[];
  imageByte: any;
  tripDays?: TripDay[];
  joiners:TripMember[];
  rating: number;
  cancelOneWeek: string;
  cancelOneMonth: string;
  cancelOneDay: string;
  vacantNumber:number;
}

export interface Feedback {
  id?: any;
  fullName:string;
  createdBy: string;
  feedback: string;
  tripRating: number;
  leaderRating: number;
  createdDate: Date;
  imageByte: string;
}

// export interface TripDay {
//   id: any;
//   dayNo: number;
//   title: string;
//   description: string;
// }
export interface TripDay {
  id?: any;
  dayNo: number;
  activities: Activity[];
}

export interface Activity {
  id?: any;
  title: string;
  description: string;
}

export interface TripMember {
  id: any;
  userId: number;
  tripId:number;
}
export interface TripStatusPostDTO {
  tripId: number;
  status: string;
  message:string;
}
