import React, { useState } from 'react';
import DefaultLayout from '../layouts/defaultLayout';
import PostList from '../components/PostList';
import { NextPageContext } from 'next';
import Filter from 'pages/components/Filter';

function Home({ data }) {
  return (
    <div className="mt-10 ">
      <Filter />
      <PostList
        initialPosts={JSON.parse(data.initialPosts).map((ele) => ({
          ...ele,
          id: ele.id,
          body: ele.body,
          title: ele.title,
          user: ele.user,
          upvotes: ele._count.votes,
          totalComments: ele._count.comments,
        }))}
      />
    </div>
  );
}

Home.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export async function getServerSideProps(ctx: NextPageContext) {
  return {
    props: {
      data: ctx.query,
    },
  };
}
export default Home;
