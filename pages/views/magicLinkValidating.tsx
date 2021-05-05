import React, { useEffect } from 'react';
import Spinner from '../components/atomic/spinner';
import { Intent } from '../../lib/common';
import Heading, { HeadingSize } from '../components/atomic/typography';
import { NextPageContext } from 'next';
import { Auth } from 'src/models/auth.model';
import {
  setAccessToken,
  setCustomExpiry,
  setRefreshToken,
} from '../../lib/accessToken';
import moment from 'moment';
import Router from 'next/router';

interface Props {
  data: {
    auth: Auth;
  };
}

function MagicLinkValidating({ data }: Props) {
  useEffect(() => {
    if (data) {
      setAccessToken(data.auth.accessToken);
      setRefreshToken(data.auth.refreshToken);
      setCustomExpiry(moment().add(30, 'minutes').toDate());
      setTimeout(() => {
        Router.push('/');
      }, 3000);
    }
  }, []);
  return (
    <React.Fragment>
      <div className="w-screen flex justify-center items-center h-screen bg-gray-100">
        <div
          className="bg-white shadow rounded-2xl flex justify-center items-center"
          style={{ width: '70vw', height: '70vh' }}
        >
          <div className="flex flex-col justify-center items-center">
            <Spinner intent={Intent.PRIMARY} />
            <Heading size={HeadingSize.H600} className="text-primary">
              Validating
            </Heading>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { invalid, ...rest } = context.query;
  if (invalid) {
    return {
      redirect: {
        destination: '/auth/validationError',
        permanent: false,
      },
    };
  }
  return {
    props: {
      data: rest,
    },
  };
}

export default MagicLinkValidating;
