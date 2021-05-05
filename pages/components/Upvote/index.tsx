import { UpvoteProps } from '../../../lib/common/props/UpvoteProps';
import Image from 'next/image';

//TODO due to build error the user part is disabled
function Upvote({ upvotes, state, onDownvote, onUpvote }: UpvoteProps) {
  return (
    <div className="m-2 self-center text-heading-light">
      <div className="cursor-pointer" onClick={onUpvote}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke={state === 'upvotes' ? '#5448C8' : 'currentColor'}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={4}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </div>
      <div className="text-center">{upvotes}</div>
      <div className="cursor-pointer" onClick={onDownvote}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke={state === 'downvotes' ? '#5448C8' : 'currentColor'}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={4}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}

export default Upvote;
