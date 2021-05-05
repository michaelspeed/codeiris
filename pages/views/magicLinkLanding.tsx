import React from 'react';
import { NextPageContext } from 'next';

function MagicLinkLanding({ data }) {
  return <div>Hello ____ !</div>;
}

export async function getServerSideProps(ctx: NextPageContext) {
  return {
    props: {
      data: ctx.query,
    },
  };
}

export default MagicLinkLanding;
