import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Auth = {
  __typename?: 'Auth';
  /** JWT access token */
  accessToken: Scalars['String'];
  /** JWT refresh token */
  refreshToken: Scalars['String'];
  user: User;
};

export type Comment = {
  __typename?: 'Comment';
  body: Scalars['String'];
  children?: Maybe<Array<Comment>>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  parent?: Maybe<Comment>;
  post?: Maybe<Post>;
  postId: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  user?: Maybe<User>;
  userId: Scalars['String'];
};

export type CommentConnection = {
  __typename?: 'CommentConnection';
  edges?: Maybe<Array<CommentEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CommentCreateInput = {
  body: Scalars['String'];
  parentId?: Maybe<Scalars['String']>;
  postId?: Maybe<Scalars['String']>;
};

export type CommentEdge = {
  __typename?: 'CommentEdge';
  cursor: Scalars['String'];
  node: Comment;
};

export type CommentOrder = {
  direction: OrderDirection;
  field: CommentOrderField;
};

export enum CommentOrderField {
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  Votes = 'votes'
}


export type File = {
  __typename?: 'File';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  height: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  post?: Maybe<Post>;
  preview: Scalars['String'];
  size: Scalars['Int'];
  source: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  user?: Maybe<User>;
  width: Scalars['Int'];
};

export type MagicLinkDto = {
  __typename?: 'MagicLinkDto';
  listener: Scalars['String'];
  status: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateComment: Comment;
  addPost: Post;
  createAsset: File;
  sendMagicLink: MagicLinkDto;
  updateUserProfileInfo: User;
  updateVote: Vote;
};


export type MutationCreateCommentArgs = {
  input: CommentCreateInput;
};


export type MutationAddPostArgs = {
  post: PostCreateInput;
};


export type MutationCreateAssetArgs = {
  file: Scalars['Upload'];
};


export type MutationSendMagicLinkArgs = {
  email: Scalars['String'];
};


export type MutationUpdateUserProfileInfoArgs = {
  data: UpdateUserInput;
};


export type MutationUpdateVoteArgs = {
  input: UpvoteInput;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  body?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<Comment>>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  deleted: Scalars['Boolean'];
  id: Scalars['ID'];
  slug: Scalars['String'];
  status: PostStatus;
  tag?: Maybe<Array<Tag>>;
  title: Scalars['String'];
  totalComments: Scalars['Int'];
  totalVotes: Scalars['Int'];
  type: PostType;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  upvoteState: Scalars['String'];
  url: Scalars['String'];
  user: User;
  userId: Scalars['String'];
  votes?: Maybe<Array<Vote>>;
};

export type PostConnection = {
  __typename?: 'PostConnection';
  edges?: Maybe<Array<PostEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PostCreateInput = {
  body?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  type?: Maybe<PostType>;
  url?: Maybe<Scalars['String']>;
};

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor: Scalars['String'];
  node: Post;
};

export type PostOrder = {
  direction: OrderDirection;
  field: PostOrderFeild;
};

export enum PostOrderFeild {
  UpdatedAt = 'updatedAt',
  Votes = 'votes'
}

export enum PostStatus {
  Blocked = 'blocked',
  Draft = 'draft',
  Hidden = 'hidden',
  Published = 'published'
}

export enum PostType {
  Ask = 'ask',
  Job = 'job',
  Link = 'link'
}

export type Query = {
  __typename?: 'Query';
  getAuth: Auth;
  getComments: CommentConnection;
  getCommentsChildren: CommentConnection;
  getMeComments: CommentConnection;
  getMePosts: PostConnection;
  getPosts: PostConnection;
  getTags: TagConnection;
  getUsers: UserConnection;
  me?: Maybe<User>;
};


export type QueryGetCommentsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<CommentOrder>;
  postId?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetCommentsChildrenArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  commentId?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<CommentOrder>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetMeCommentsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<CommentOrder>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetMePostsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PostOrder>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetPostsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PostOrder>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetTagsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  contain?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetUsersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserOrder>;
  skip?: Maybe<Scalars['Int']>;
};

export type Tag = {
  __typename?: 'Tag';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  name: Scalars['String'];
  post?: Maybe<Array<Post>>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
};

export type TagConnection = {
  __typename?: 'TagConnection';
  edges?: Maybe<Array<TagEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TagEdge = {
  __typename?: 'TagEdge';
  cursor: Scalars['String'];
  node: Tag;
};

export type UpdateUserInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
};


export type UpvoteInput = {
  postId: Scalars['String'];
  type: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  role: UserRole;
  status: UserStatus;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges?: Maybe<Array<UserEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export type UserOrder = {
  direction: OrderDirection;
  field: UserOrderField;
};

export enum UserOrderField {
  Email = 'email',
  FirstName = 'firstName',
  LastName = 'lastName',
  MiddleName = 'middleName'
}

export enum UserRole {
  Admin = 'admin',
  Moderator = 'moderator',
  User = 'user'
}

export enum UserStatus {
  Active = 'active',
  Blocked = 'blocked',
  Inactive = 'inactive'
}

export type Vote = {
  __typename?: 'Vote';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  post: Post;
  type: VoteType;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  user: User;
};

export enum VoteType {
  Downvotes = 'downvotes',
  Upvotes = 'upvotes'
}

export type SendMagicLinkMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendMagicLinkMutation = (
  { __typename?: 'Mutation' }
  & { sendMagicLink: (
    { __typename?: 'MagicLinkDto' }
    & Pick<MagicLinkDto, 'status' | 'listener'>
  ) }
);

export type UpdateUserProfileInfoMutationVariables = Exact<{
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
}>;


export type UpdateUserProfileInfoMutation = (
  { __typename?: 'Mutation' }
  & { updateUserProfileInfo: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type CreateCommentMutationVariables = Exact<{
  postId?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  body: Scalars['String'];
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { CreateComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'id'>
  ) }
);

export type UpdateVoteMutationVariables = Exact<{
  postId: Scalars['String'];
  type: Scalars['String'];
}>;


export type UpdateVoteMutation = (
  { __typename?: 'Mutation' }
  & { updateVote: (
    { __typename?: 'Vote' }
    & Pick<Vote, 'id'>
  ) }
);

export type AddPostMutationVariables = Exact<{
  title: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  type?: Maybe<PostType>;
}>;


export type AddPostMutation = (
  { __typename?: 'Mutation' }
  & { addPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id'>
  ) }
);

export type CreateAssetMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type CreateAssetMutation = (
  { __typename?: 'Mutation' }
  & { createAsset: (
    { __typename?: 'File' }
    & Pick<File, 'id'>
  ) }
);

export type GetPostsQueryVariables = Exact<{
  after: Scalars['String'];
  first: Scalars['Int'];
}>;


export type GetPostsQuery = (
  { __typename?: 'Query' }
  & { getPosts: (
    { __typename?: 'PostConnection' }
    & { edges?: Maybe<Array<(
      { __typename?: 'PostEdge' }
      & { node: (
        { __typename?: 'Post' }
        & Pick<Post, 'id' | 'body' | 'title' | 'updatedAt' | 'upvoteState' | 'totalVotes' | 'totalComments'>
        & { user: (
          { __typename?: 'User' }
          & Pick<User, 'firstName' | 'lastName'>
        ) }
      ) }
    )>> }
  ) }
);

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'middleName' | 'role' | 'email' | 'status'>
  )> }
);

export type GetMeCommentsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeCommentsCountQuery = (
  { __typename?: 'Query' }
  & { getMeComments: (
    { __typename?: 'CommentConnection' }
    & Pick<CommentConnection, 'totalCount'>
  ) }
);

export type GetMePostsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMePostsCountQuery = (
  { __typename?: 'Query' }
  & { getMePosts: (
    { __typename?: 'PostConnection' }
    & Pick<PostConnection, 'totalCount'>
  ) }
);

export type GetCommentsQueryVariables = Exact<{
  post?: Maybe<Scalars['String']>;
  first: Scalars['Int'];
}>;


export type GetCommentsQuery = (
  { __typename?: 'Query' }
  & { getComments: (
    { __typename?: 'CommentConnection' }
    & Pick<CommentConnection, 'totalCount'>
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'endCursor' | 'hasNextPage'>
    ), edges?: Maybe<Array<(
      { __typename?: 'CommentEdge' }
      & { node: (
        { __typename?: 'Comment' }
        & Pick<Comment, 'id' | 'body' | 'createdAt' | 'updatedAt'>
        & { user?: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'firstName'>
        )>, post?: Maybe<(
          { __typename?: 'Post' }
          & Pick<Post, 'id'>
        )> }
      ) }
    )>> }
  ) }
);

export type GetCommentsChildrenQueryVariables = Exact<{
  comment?: Maybe<Scalars['String']>;
  first: Scalars['Int'];
}>;


export type GetCommentsChildrenQuery = (
  { __typename?: 'Query' }
  & { getCommentsChildren: (
    { __typename?: 'CommentConnection' }
    & Pick<CommentConnection, 'totalCount'>
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'endCursor' | 'hasNextPage'>
    ), edges?: Maybe<Array<(
      { __typename?: 'CommentEdge' }
      & { node: (
        { __typename?: 'Comment' }
        & Pick<Comment, 'id' | 'body' | 'createdAt'>
        & { user?: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'firstName'>
        )> }
      ) }
    )>> }
  ) }
);


export const SendMagicLinkDocument = gql`
    mutation sendMagicLink($email: String!) {
  sendMagicLink(email: $email) {
    status
    listener
  }
}
    `;
export type SendMagicLinkMutationFn = Apollo.MutationFunction<SendMagicLinkMutation, SendMagicLinkMutationVariables>;

/**
 * __useSendMagicLinkMutation__
 *
 * To run a mutation, you first call `useSendMagicLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMagicLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMagicLinkMutation, { data, loading, error }] = useSendMagicLinkMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendMagicLinkMutation(baseOptions?: Apollo.MutationHookOptions<SendMagicLinkMutation, SendMagicLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMagicLinkMutation, SendMagicLinkMutationVariables>(SendMagicLinkDocument, options);
      }
export type SendMagicLinkMutationHookResult = ReturnType<typeof useSendMagicLinkMutation>;
export type SendMagicLinkMutationResult = Apollo.MutationResult<SendMagicLinkMutation>;
export type SendMagicLinkMutationOptions = Apollo.BaseMutationOptions<SendMagicLinkMutation, SendMagicLinkMutationVariables>;
export const UpdateUserProfileInfoDocument = gql`
    mutation updateUserProfileInfo($firstName: String, $lastName: String, $middleName: String) {
  updateUserProfileInfo(
    data: {firstName: $firstName, lastName: $lastName, middleName: $middleName}
  ) {
    id
  }
}
    `;
export type UpdateUserProfileInfoMutationFn = Apollo.MutationFunction<UpdateUserProfileInfoMutation, UpdateUserProfileInfoMutationVariables>;

/**
 * __useUpdateUserProfileInfoMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileInfoMutation, { data, loading, error }] = useUpdateUserProfileInfoMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      middleName: // value for 'middleName'
 *   },
 * });
 */
export function useUpdateUserProfileInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProfileInfoMutation, UpdateUserProfileInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserProfileInfoMutation, UpdateUserProfileInfoMutationVariables>(UpdateUserProfileInfoDocument, options);
      }
export type UpdateUserProfileInfoMutationHookResult = ReturnType<typeof useUpdateUserProfileInfoMutation>;
export type UpdateUserProfileInfoMutationResult = Apollo.MutationResult<UpdateUserProfileInfoMutation>;
export type UpdateUserProfileInfoMutationOptions = Apollo.BaseMutationOptions<UpdateUserProfileInfoMutation, UpdateUserProfileInfoMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($postId: String, $parentId: String, $body: String!) {
  CreateComment(input: {postId: $postId, parentId: $parentId, body: $body}) {
    id
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      parentId: // value for 'parentId'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const UpdateVoteDocument = gql`
    mutation updateVote($postId: String!, $type: String!) {
  updateVote(input: {postId: $postId, type: $type}) {
    id
  }
}
    `;
export type UpdateVoteMutationFn = Apollo.MutationFunction<UpdateVoteMutation, UpdateVoteMutationVariables>;

/**
 * __useUpdateVoteMutation__
 *
 * To run a mutation, you first call `useUpdateVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVoteMutation, { data, loading, error }] = useUpdateVoteMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useUpdateVoteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVoteMutation, UpdateVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVoteMutation, UpdateVoteMutationVariables>(UpdateVoteDocument, options);
      }
export type UpdateVoteMutationHookResult = ReturnType<typeof useUpdateVoteMutation>;
export type UpdateVoteMutationResult = Apollo.MutationResult<UpdateVoteMutation>;
export type UpdateVoteMutationOptions = Apollo.BaseMutationOptions<UpdateVoteMutation, UpdateVoteMutationVariables>;
export const AddPostDocument = gql`
    mutation addPost($title: String!, $body: String, $url: String, $type: PostType) {
  addPost(post: {title: $title, body: $body, url: $url, type: $type}) {
    id
  }
}
    `;
export type AddPostMutationFn = Apollo.MutationFunction<AddPostMutation, AddPostMutationVariables>;

/**
 * __useAddPostMutation__
 *
 * To run a mutation, you first call `useAddPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPostMutation, { data, loading, error }] = useAddPostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      body: // value for 'body'
 *      url: // value for 'url'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useAddPostMutation(baseOptions?: Apollo.MutationHookOptions<AddPostMutation, AddPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPostMutation, AddPostMutationVariables>(AddPostDocument, options);
      }
export type AddPostMutationHookResult = ReturnType<typeof useAddPostMutation>;
export type AddPostMutationResult = Apollo.MutationResult<AddPostMutation>;
export type AddPostMutationOptions = Apollo.BaseMutationOptions<AddPostMutation, AddPostMutationVariables>;
export const CreateAssetDocument = gql`
    mutation createAsset($file: Upload!) {
  createAsset(file: $file) {
    id
  }
}
    `;
export type CreateAssetMutationFn = Apollo.MutationFunction<CreateAssetMutation, CreateAssetMutationVariables>;

/**
 * __useCreateAssetMutation__
 *
 * To run a mutation, you first call `useCreateAssetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssetMutation, { data, loading, error }] = useCreateAssetMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useCreateAssetMutation(baseOptions?: Apollo.MutationHookOptions<CreateAssetMutation, CreateAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAssetMutation, CreateAssetMutationVariables>(CreateAssetDocument, options);
      }
export type CreateAssetMutationHookResult = ReturnType<typeof useCreateAssetMutation>;
export type CreateAssetMutationResult = Apollo.MutationResult<CreateAssetMutation>;
export type CreateAssetMutationOptions = Apollo.BaseMutationOptions<CreateAssetMutation, CreateAssetMutationVariables>;
export const GetPostsDocument = gql`
    query getPosts($after: String!, $first: Int!) {
  getPosts(after: $after, first: $first) {
    edges {
      node {
        id
        body
        title
        updatedAt
        user {
          firstName
          lastName
        }
        upvoteState
        totalVotes
        totalComments
      }
    }
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const GetMeDocument = gql`
    query getMe {
  me {
    id
    firstName
    lastName
    middleName
    role
    email
    status
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetMeCommentsCountDocument = gql`
    query getMeCommentsCount {
  getMeComments {
    totalCount
  }
}
    `;

/**
 * __useGetMeCommentsCountQuery__
 *
 * To run a query within a React component, call `useGetMeCommentsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeCommentsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeCommentsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeCommentsCountQuery(baseOptions?: Apollo.QueryHookOptions<GetMeCommentsCountQuery, GetMeCommentsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeCommentsCountQuery, GetMeCommentsCountQueryVariables>(GetMeCommentsCountDocument, options);
      }
export function useGetMeCommentsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeCommentsCountQuery, GetMeCommentsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeCommentsCountQuery, GetMeCommentsCountQueryVariables>(GetMeCommentsCountDocument, options);
        }
export type GetMeCommentsCountQueryHookResult = ReturnType<typeof useGetMeCommentsCountQuery>;
export type GetMeCommentsCountLazyQueryHookResult = ReturnType<typeof useGetMeCommentsCountLazyQuery>;
export type GetMeCommentsCountQueryResult = Apollo.QueryResult<GetMeCommentsCountQuery, GetMeCommentsCountQueryVariables>;
export const GetMePostsCountDocument = gql`
    query getMePostsCount {
  getMePosts {
    totalCount
  }
}
    `;

/**
 * __useGetMePostsCountQuery__
 *
 * To run a query within a React component, call `useGetMePostsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMePostsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMePostsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMePostsCountQuery(baseOptions?: Apollo.QueryHookOptions<GetMePostsCountQuery, GetMePostsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMePostsCountQuery, GetMePostsCountQueryVariables>(GetMePostsCountDocument, options);
      }
export function useGetMePostsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMePostsCountQuery, GetMePostsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMePostsCountQuery, GetMePostsCountQueryVariables>(GetMePostsCountDocument, options);
        }
export type GetMePostsCountQueryHookResult = ReturnType<typeof useGetMePostsCountQuery>;
export type GetMePostsCountLazyQueryHookResult = ReturnType<typeof useGetMePostsCountLazyQuery>;
export type GetMePostsCountQueryResult = Apollo.QueryResult<GetMePostsCountQuery, GetMePostsCountQueryVariables>;
export const GetCommentsDocument = gql`
    query getComments($post: String, $first: Int!) {
  getComments(
    postId: $post
    first: $first
    orderBy: {direction: asc, field: createdAt}
  ) {
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
    edges {
      node {
        id
        body
        createdAt
        updatedAt
        user {
          id
          firstName
        }
        post {
          id
        }
      }
    }
  }
}
    `;

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a React component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsQuery({
 *   variables: {
 *      post: // value for 'post'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useGetCommentsQuery(baseOptions: Apollo.QueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
      }
export function useGetCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
        }
export type GetCommentsQueryHookResult = ReturnType<typeof useGetCommentsQuery>;
export type GetCommentsLazyQueryHookResult = ReturnType<typeof useGetCommentsLazyQuery>;
export type GetCommentsQueryResult = Apollo.QueryResult<GetCommentsQuery, GetCommentsQueryVariables>;
export const GetCommentsChildrenDocument = gql`
    query getCommentsChildren($comment: String, $first: Int!) {
  getCommentsChildren(
    commentId: $comment
    first: $first
    orderBy: {direction: desc, field: createdAt}
  ) {
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
    edges {
      node {
        id
        body
        createdAt
        user {
          id
          firstName
        }
      }
    }
  }
}
    `;

/**
 * __useGetCommentsChildrenQuery__
 *
 * To run a query within a React component, call `useGetCommentsChildrenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsChildrenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsChildrenQuery({
 *   variables: {
 *      comment: // value for 'comment'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useGetCommentsChildrenQuery(baseOptions: Apollo.QueryHookOptions<GetCommentsChildrenQuery, GetCommentsChildrenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentsChildrenQuery, GetCommentsChildrenQueryVariables>(GetCommentsChildrenDocument, options);
      }
export function useGetCommentsChildrenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsChildrenQuery, GetCommentsChildrenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentsChildrenQuery, GetCommentsChildrenQueryVariables>(GetCommentsChildrenDocument, options);
        }
export type GetCommentsChildrenQueryHookResult = ReturnType<typeof useGetCommentsChildrenQuery>;
export type GetCommentsChildrenLazyQueryHookResult = ReturnType<typeof useGetCommentsChildrenLazyQuery>;
export type GetCommentsChildrenQueryResult = Apollo.QueryResult<GetCommentsChildrenQuery, GetCommentsChildrenQueryVariables>;