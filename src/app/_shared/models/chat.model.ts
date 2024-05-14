import { PublicProfile } from "./user.model";

export class Message {
  id?: any;
  user: PublicProfile;
  tripId: number;
  content: string;
}

export class GroupChat {
  id?: any;
  tripId: number;
  messages: Message[];
  groupChatStatus: string;
}
