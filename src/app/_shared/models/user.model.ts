export class User {
  id?: any;
  username?: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneno: string | undefined;
  avatar: string | null;
  avatarImg: string;
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
  avatar: string | null;
  avatarImg: string;
  rating: number;
  dob: Date;
  username?: string;
  phoneno: string | undefined;
}
