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
}

export class PublicProfile {
  id?: any;
  fname: string;
  lname: string;
  email: string;
  profilepicurl: string | null;
  rating: number;
  dob: Date;
}
