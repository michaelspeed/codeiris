import { PostProps } from '../../../lib/common/props/PostProps';
import Image from 'next/image';
import Upvote from '../Upvote';
import Router from 'next/router';
import Avatar from '../atomic/avatar/Avatar';
import { useMutation } from '@apollo/client';

import {
  UpdateVoteDocument,
  UpdateVoteMutation,
  MutationUpdateVoteArgs,
} from 'gql';
import { skipper } from 'lib/accessToken';
import { useState } from 'react';
import { observer } from 'mobx-react-lite/src/observer';
import { useStore } from '../../store/StoreProvider';

//TODO due to build error the user part is disabled
function Post({
  title,
  body,
  upvotes = 0,
  totalComments = 0,
  user,
  id,
  updatedAt,
  upvoteState,
}: PostProps) {
  const store = useStore();
  const [upvotesLocal, setUpvotesLocal] = useState(upvotes);
  const [upvoteStateLocal, setUpvoteStateLocal] = useState(upvoteState);
  const [updateVote, { data, error, loading }] = useMutation<
    UpdateVoteMutation,
    MutationUpdateVoteArgs
  >(UpdateVoteDocument);
  const handleVoting = (postId: string, type: 'upvotes' | 'downvotes') => {
    updateVote({ variables: { postId: postId, type: type } })
      .then((data) => {
        if (type !== upvoteStateLocal) {
          setUpvotesLocal((prev) => (type === 'upvotes' ? prev + 1 : prev - 1));
          setUpvoteStateLocal(type);
        }
      })
      .catch((err) => console.log(err));
  };

  console.log(store);
  return (
    <div className="flex flex-row justify-between max-w-lg rounded-md shadow-lg mx-auto bg-white ">
      <Upvote
        upvotes={upvotesLocal}
        state={upvoteStateLocal}
        onDownvote={() => handleVoting(id, 'downvotes')}
        onUpvote={() => handleVoting(id, 'upvotes')}
      />

      <div
        className="flex-col cursor-pointer"
        onClick={() => Router.push(`/posts/${id}`)}
      >
        <div className="flex flex-row my-4 justify-between">
          <div className="flex flex-row">
            <div className="mx-2">
              <Avatar label={user ? user.firstName[0] : 'A'} size="small" />
            </div>
            <div className="text-base text-body">
              {user ? user.firstName + ' ' + user.lastName : 'Anonymous'}
            </div>
          </div>
          <div className="flex flex-row">
            <div className="mx-2">Published: </div>
            <div className="text-base text-body">{updatedAt}</div>
          </div>
        </div>
        <div className="font-bold text-xl mb-2 text-heading-dark capitalize text-center">
          {title}
        </div>
        <div
          className="text-base text-body-dark"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <div className="flex flex-row my-4 justify-between">
          <div className="flex flex-row">
            <div className="w-10 h-10 rounded-full text-body-dark">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
            </div>
            <div className="text-base text-body">{totalComments}</div>
          </div>
        </div>
      </div>
      <Image
        className="h-full w-10"
        src={`https://images.unsplash.com/photo-1618411610011-fb3b7695a765?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80`}
        alt="WildPhoto"
        width="100"
        height="auto"
      />
    </div>
  );
}

export default observer(Post);
