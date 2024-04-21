export interface Comment {
  id: number;
  tripId: number;
  content: string;
  author?: string; // Optional, based on your user management
  createdAt?: Date; // Optional
  userEmail: string;
}
