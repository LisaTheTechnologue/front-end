import { User } from 'src/app/_shared/models/user.model';

export interface Trip {
  id: number;
  title: string;
  summary: string;
  leaderId: number;
  cityName:string;
  cityId:number;
  tripLevel: string;
  minAge: number;
  maxAge: number;
  startDate: string;
  endDate: string;
  groupSize: number;
  notes: string;
  price: number;
  tripStatus: string;
  img: any;
  imageURL: string;
  imageURLs: string[];
  imageNames: string[];
  byteImgs: any[];
  byteImg: any;
  tripDays?: TripDay[];
  rating: number;
  cancelOneWeek: string;
  cancelOneMonth: string;
  cancelOneDay: string;
}

export interface Feedback {
  id?: any;
  createdBy: string;
  feedback: string;
  tripRating: number;
  leaderRating: number;
  createdDate: Date;
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
