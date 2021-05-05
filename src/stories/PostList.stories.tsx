import React from 'react';
import { Story, Meta } from '@storybook/react';
import PostList, { PostListProps } from '../../pages/components/PostList';

export default {
  title: 'Post/PostList',
  component: PostList,
} as Meta;

const Template: Story<PostListProps> = (args) => <PostList {...args} />;

export const Sample = Template.bind({});
Sample.args = {
  initialPosts: [
    {
      head: 'test header 1',
      body: `Amet enim cupidatat dolor consectetur laborum. Enim minim nostrud et nostrud elit culpa et culpa adipisicing veniam. Officia incididunt enim elit incididunt dolor ut et aliqua nisi enim laborum cillum eiusmod proident. Consectetur nostrud et velit ad id cupidatat cillum ex ullamco aliquip.

Irure non veniam aliqua cillum ut excepteur est excepteur eiusmod sint dolor cillum ullamco. Non mollit esse aute anim officia enim consequat ex nostrud ex aute quis irure exercitation. Excepteur ipsum nostrud exercitation in proident magna laboris proident aliquip exercitation veniam duis. Ipsum incididunt ea aute commodo ad ipsum proident voluptate minim ullamco ex aliqua. Quis dolor eu consequat nulla ullamco. Aliquip occaecat dolor proident velit irure ut in do.`,
      user: {
        email: 'some@some.com',
        firstName: 'some',
        middleName: '',
        lastName: 'speed',
        status: 'active',
        role: 'user',
      },
    },
    {
      head: 'test header 2',
      body: `Amet enim cupidatat dolor consectetur laborum. Enim minim nostrud et nostrud elit culpa et culpa adipisicing veniam. Officia incididunt enim elit incididunt dolor ut et aliqua nisi enim laborum cillum eiusmod proident. Consectetur nostrud et velit ad id cupidatat cillum ex ullamco aliquip.
  
  Irure non veniam aliqua cillum ut excepteur est excepteur eiusmod sint dolor cillum ullamco. Non mollit esse aute anim officia enim consequat ex nostrud ex aute quis irure exercitation. Excepteur ipsum nostrud exercitation in proident magna laboris proident aliquip exercitation veniam duis. Ipsum incididunt ea aute commodo ad ipsum proident voluptate minim ullamco ex aliqua. Quis dolor eu consequat nulla ullamco. Aliquip occaecat dolor proident velit irure ut in do.`,
      user: {
        email: 'some@some.com',
        firstName: 'some',
        middleName: '',
        lastName: 'speed',
        status: 'active',
        role: 'user',
      },
    },
    {
      head: 'test header 3',
      body: `Amet enim cupidatat dolor consectetur laborum. Enim minim nostrud et nostrud elit culpa et culpa adipisicing veniam. Officia incididunt enim elit incididunt dolor ut et aliqua nisi enim laborum cillum eiusmod proident. Consectetur nostrud et velit ad id cupidatat cillum ex ullamco aliquip.
  
  Irure non veniam aliqua cillum ut excepteur est excepteur eiusmod sint dolor cillum ullamco. Non mollit esse aute anim officia enim consequat ex nostrud ex aute quis irure exercitation. Excepteur ipsum nostrud exercitation in proident magna laboris proident aliquip exercitation veniam duis. Ipsum incididunt ea aute commodo ad ipsum proident voluptate minim ullamco ex aliqua. Quis dolor eu consequat nulla ullamco. Aliquip occaecat dolor proident velit irure ut in do.`,
      user: {
        email: 'some@some.com',
        firstName: 'some',
        middleName: '',
        lastName: 'speed',
        status: 'active',
        role: 'user',
      },
    },
  ],
};
