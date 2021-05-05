import moment from 'moment';
import { useState } from 'react';
import CommentsInput from './CommentsInput';
import { Transition } from '@headlessui/react';
import { useQuery } from '@apollo/client';
import {
  GetCommentsChildrenDocument,
  GetCommentsChildrenQuery,
  GetCommentsChildrenQueryVariables,
} from '../../../gql';
import Spinner from '../atomic/spinner';
import { SpinnerSize } from '../../../lib/common/props/SpinnerProps';
import clsx from 'clsx';
import Button from '../atomic/button';

interface CommentListItemProps {
  comment: any;
  child: boolean;
}
function CommentListItem({ comment, child }: CommentListItemProps) {
  const [add, setAdd] = useState(false);
  const [first, setFirst] = useState(1);
  const { data, loading, error } = useQuery<
    GetCommentsChildrenQuery,
    GetCommentsChildrenQueryVariables
  >(GetCommentsChildrenDocument, {
    variables: { comment: child ? comment.id : undefined, first },
    skip: !child,
    pollInterval: 3000,
  });
  if (comment === undefined) {
    return <div />;
  }
  console.log(data);
  return (
    <div
      className="w-full rounded rounded-lg overflow-hidden shadow-sm p-2 bg-white"
      key={comment.id}
    >
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={clsx({
            'text-blueGray-500 mr-5': true,
            'h-6 w-6': child,
            'h-4 w-4': !child,
          })}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <div>
          <div className="text-blueGray-700">{comment.body}</div>
          <div
            className="flex text-md text-blueGray-500"
            style={{ fontSize: 10 }}
          >
            {comment.user ? (
              <div>{comment.user.firstName}</div>
            ) : (
              <div>Anonymous</div>
            )}
            <span className="ml-1 mr-1">.</span>
            <div>
              <span>
                {moment(comment.createdAt).format('DD MMM YYYY: HH:mm')}
              </span>
            </div>
            <span className="ml-1 mr-1">.</span>
            {child && (
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setAdd(!add)}
              >
                {' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>{' '}
                Reply{' '}
              </div>
            )}
          </div>
        </div>
      </div>
      <Transition
        show={add}
        enter="transition-opacity duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div>
          <CommentsInput parentId={comment.id} />
        </div>
      </Transition>
      {loading && (
        <div className="flex justify-center items-center">
          <Spinner size={SpinnerSize.small} />
        </div>
      )}
      {data && data.getCommentsChildren.edges.length > 0 && (
        <div className="md:ml-10">
          {data.getCommentsChildren.edges.map((childcomments) => (
            <CommentListItem
              comment={childcomments.node}
              child={false}
              key={childcomments.node.id}
            />
          ))}
        </div>
      )}
      {data && data.getCommentsChildren.totalCount > first && (
        <div className="flex justify-center items-center">
          <Button
            loading={loading}
            disabled={loading}
            className="bg-white text-blueGray-500"
            loaderClass="bg-primary"
            onClick={() => {
              if (
                data.getCommentsChildren.totalCount + 10 >
                data.getCommentsChildren.totalCount
              ) {
                setFirst(first + 10);
              } else {
                setFirst(data.getCommentsChildren.totalCount);
              }
            }}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}

export default CommentListItem;
