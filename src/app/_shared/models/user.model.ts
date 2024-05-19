export class User {
  id?: any;
  username?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNo: string | undefined;
  dob: Date;
  gender: string;
  isActive?: boolean;
  rating: number;  
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
  paymentAccNo: string;
  paymentAccBank: string;
  paymentAccName: string;
}
