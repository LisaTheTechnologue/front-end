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
  imageByte: any;
  noOfTrips:number;
  paymentAccNo: string;
  paymentAccBank: string;
  paymentAccName: string;
  paymentAccBankShortName: string;
  isReported: boolean;
}
export interface Bank {
  name: string;
  shortName: string;
}