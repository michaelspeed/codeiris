import { UserProps } from './UserProps';

export interface PostProps {
  id: string;
  title?: string;
  body?: string;
  upvotes?: number;
  user?: UserProps;
  totalComments?: number;
  updatedAt: string;
  upvoteState?: 'upvotes' | 'downvotes' | 'notvoted' | 'disabled';
}
