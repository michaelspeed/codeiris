export interface UpvoteProps {
  upvotes: Number;
  state: 'notvoted' | 'upvotes' | 'downvotes' | 'disabled';
  onUpvote: () => void;
  onDownvote: () => void;
}
