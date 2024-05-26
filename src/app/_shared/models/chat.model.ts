export interface Message {
  id?: any;
  userId: number;
  username: string;
  tripId: number;
  content: string;
  createdAt: string;
  isMe: boolean;
}

export class GroupChat {
  id?: any;
  tripId: number;
  messages: Message[];
  groupChatStatus: string;
}
