export class User {
  id?: any;
  username?: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneno: string | undefined;
  dob: Date;
  active?: boolean;
  rating: number;
  accno: string;
  accbank: string;
  accname: string;
  img: any;
  imageURL: string;
  byteImg: any;
}

export class PublicProfile {
  id?: any;
  fullName: string;
  email: string;
  rating: number;
  dob: Date;
  username?: string;
  phoneno: string | undefined;
  img: any;
  imageURL: string;
  byteImg: any;
  noOfTrips:number;
}
