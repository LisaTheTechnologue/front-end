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
  imageURL: any;
  byteImg: any;
}

export class PublicProfile {
  id?: any;
  fullname: string;
  email: string;
  rating: number;
  dob: Date;
  username?: string;
  phoneno: string | undefined;
  imageURL: any;
  byteImg: any;
}
