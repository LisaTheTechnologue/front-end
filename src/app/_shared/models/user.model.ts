export class User {
  id?: any;
  username?: string;
  fname: string;
  lname: string;
  email: string;
  phoneno: string | undefined;
  profilepicurl: string | null;
  dob: Date;
  active?: boolean;
  rating: number;
  accno: string;
  accbank: string;
  accname: string;
}

export class PublicProfile {
  id?: any;
  fullname: string;
  email: string;
  profilepicurl: string | null;
  rating: number;
  dob: Date;
  username?: string;
  phoneno: string | undefined;
}
