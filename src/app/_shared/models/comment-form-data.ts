export interface CommentFormData {
  content: string;
  postId: number;
  parentCommentId: number | undefined;
}
