import { PublicProfile } from "./user.model";

export class Message {
  id?: any;
  userId: number;
  username: string;
  tripId: number;
  content: string;
  createdDate: string;
  isMe: boolean;
}

export class GroupChat {
  id?: any;
  tripId: number;
  messages: Message[];
  groupChatStatus: string;
}
