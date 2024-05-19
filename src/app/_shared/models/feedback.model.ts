export class Feedback {
    constructor(
     private id: any,
     private userId: number,
     private tripId: number,
     private leaderRating: number,
     private tripRating: number,
     private feedback: string,    )
    { }
}