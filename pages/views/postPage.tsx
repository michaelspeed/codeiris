import DefaultLayout from '../layouts/defaultLayout';
import React, { useState } from 'react';
import { NextPageContext } from 'next';
import superjson from 'superjson';
import Heading, { HeadingSize } from '../components/atomic/typography';
import moment from 'moment';
import CommentsInput from '../components/Comments/CommentsInput';
import { useQuery } from '@apollo/client';
import {
  GetCommentsDocument,
  GetCommentsQuery,
  GetCommentsQueryVariables,
} from '../../gql';
import CommentListItem from '../components/Comments/CommentListItem';
import Button from "../components/atomic/button";
import Spinner from "../components/atomic/spinner";
import { SpinnerSize } from "../../lib/common/props/SpinnerProps";

interface Props {
  postData: string;
}

function PostPage({ postData }: Props) {
  const [first, setFirst] = useState(10);
  const post: any = superjson.parse(postData);
  const { data, loading, error } = useQuery<
    GetCommentsQuery,
    GetCommentsQueryVariables
  >(GetCommentsDocument, {
    variables: { post: post.id, first },
    pollInterval: 3000,
  });
  console.log(data);
  return (
    <div className="container mx-auto px-4 mt-10 mb-10">
      <div>
        <Heading
          size={HeadingSize.H600}
          className="text-blueGray-500"
          style={{ fontSize: 40 }}
        >
          {post.title}
        </Heading>
        <div>
          <Heading size={HeadingSize.H300} className="text-blueGray-700">
            {moment(post.createdAt).format('DD MMM YYYY')}
          </Heading>
        </div>
      </div>
      <div className="w-full rounded rounded-lg overflow-hidden shadow-lg p-7 bg-white mt-5">
        <div
          dangerouslySetInnerHTML={{ __html: post.body }}
          className="text-blueGray-700"
        ></div>
      </div>
      <div className="w-full rounded rounded-lg overflow-hidden shadow-lg p-7 bg-white mt-5">
        <div className="flex items-center text-lg text-blueGray-600 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-5"
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
          </svg>{' '}
          Comments <span className="ml-5">[{post._count.comments}]</span>
        </div>
        <CommentsInput postId={post.id} />
        {loading && (
          <div className="flex justify-center items-center">
            <Spinner size={SpinnerSize.small} />
          </div>
        )}
        <div className="mt-5">
          {!loading && !error && data && (
            <div>
              {data.getComments.edges.map((comments) => (
                <CommentListItem comment={comments.node} child={true} />
              ))}
            </div>
          )}
        </div>
        {data && data.getComments.totalCount > first && (
          <div className="flex justify-center items-center">
            <Button
              loading={loading}
              disabled={loading}
              className="bg-white text-blueGray-500"
              loaderClass="bg-primary"
              onClick={() => {
                if (
                  data.getComments.totalCount + 10 >
                  data.getComments.totalCount
                ) {
                  setFirst(first + 10);
                } else {
                  setFirst(data.getComments.totalCount);
                }
              }}
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

PostPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export async function getServerSideProps(ctx: NextPageContext) {
  return {
    props: {
      postData: ctx.query.data as string,
    },
  };
}

export default PostPage;
