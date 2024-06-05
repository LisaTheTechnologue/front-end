export enum TripStatus {
    PENDING = 'Chờ duyệt',
    APPROVED = 'Đang nhận khách',
    REJECTED = 'Từ chối',
    CANCEL = 'Cancel',
    END = 'Kết thúc'
}
function getKeyName(value: TripStatus) {
    return TripStatus[value];
}
// export enum TripStatus {
//     PENDING ,
//     APPROVED ,
//     REJECTED ,
//     CANCEL,
//     END
// }
export enum TripLevel {
    MASTER = 'Chuyên gia',
    MODERATE = 'Trung bình',
    EASY = 'Dễ'
}

// export class TripStatus {
//     static readonly PENDING  = new TripStatus('PENDING', 'Chờ duyệt');
//     static readonly APPROVED = new TripStatus('APPROVED', 'Đang nhận khách');
//     static readonly REJECTED  = new TripStatus('REJECTED', 'Từ chối');
//     static readonly CANCEL = new TripStatus('CANCEL', 'Huỷ');
//     static readonly END  = new TripStatus('END', 'Kết thúc');
  
//     // private to disallow creating other instances of this type
//     private constructor(private readonly key: string, public readonly value: any) {
//     }
  
//     toString() {
//       return this.key;
//     }
//   }
 