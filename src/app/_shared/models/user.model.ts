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
  noOfTrips:number;
  paymentAccNo: string;
  paymentAccBank: string;
  paymentAccName: string;
  paymentAccBankShortName: string;
  status: string;
}
export interface Bank {
  name: string;
  shortName: string;
}