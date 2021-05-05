import { useQuery } from '@apollo/client';
import { GetPostsDocument, GetPostsQuery, QueryGetPostsArgs } from 'gql';
import { PostProps } from 'lib/common/props/PostProps';
import React, { useEffect, useState } from 'react';
// This is not to be imported form prisma client
// import { Post as PostData } from '.prisma/client';
import Post from '../Post';

export interface PostListProps {
  initialPosts?: PostProps[];
}
const PostList: React.FC<PostListProps> = ({ initialPosts = [] }) => {
  const [posts, setPosts] = useState<PostProps[]>(initialPosts);
  const [cursor, setCursor] = useState(
    initialPosts.length > 0 ? initialPosts[initialPosts.length - 1].id : '',
  );
  const { loading, data, error } = useQuery<GetPostsQuery, QueryGetPostsArgs>(
    GetPostsDocument,
    {
      variables: {
        after: cursor,
        first: 10,
      },
    },
  );
  useEffect(() => {
    if (!loading) {
      if (!!data) {
        const length = data.getPosts.edges.length;
        if (length < 1) return;
        setCursor(data.getPosts.edges[length - 1].node.id);
        const newPosts = data.getPosts.edges.map((ele) => ({
          id: ele.node.id,
          title: ele.node.title,
          body: ele.node.body,
          user: {
            firstName: ele.node.user.firstName,
            lastName: ele.node.user.lastName,
          },
          upvoteState: ele.node.upvoteState,
          upvotes: ele.node.totalVotes,
          totalComments: ele.node.totalComments,
        }));
        // setPosts((prev) => [...prev, ...newPosts]);
      }
    }
  }, [loading, data, error]);
  return (
    <div className="container">
      {posts.map((ele) => (
        <div className="my-10">
          <Post
            id={ele.id}
            title={ele.title}
            body={ele.body}
            upvotes={ele.upvotes}
            upvoteState={ele.upvoteState}
            user={ele.user}
            totalComments={ele.totalComments}
          />
        </div>
      ))}
    </div>
  );
};

export default PostList;
