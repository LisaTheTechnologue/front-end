export class User {
  id?: any;
  username?: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNo: string | undefined;
  dob: Date;
  active?: boolean;
  rating: number;
  accNo: string;
  accBank: string;
  accName: string;
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
  phoneNo: string | undefined;
  img: any;
  imageURL: string;
  byteImg: any;
  noOfTrips:number;
}
export class PaymentProfile {
  accNo: string;
  accBank: string;
  accName: string;
}
