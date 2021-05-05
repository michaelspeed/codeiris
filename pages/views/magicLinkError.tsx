import React from 'react';
import Heading, { HeadingSize } from '../components/atomic/typography';
import Button from '../components/atomic/button';
import Router from 'next/router';

function MagicLinkError() {
  return (
    <React.Fragment>
      <div className="w-screen flex justify-center items-center h-screen bg-gray-100">
        <div
          className="bg-white shadow rounded-2xl flex justify-center items-center"
          style={{ width: '70vw', height: '70vh' }}
        >
          <div className="flex flex-col justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <Heading size={HeadingSize.H600} className="text-error">
              Invalid Link
            </Heading>
            <Button onClick={() => Router.push('/')}>Go to Home</Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default MagicLinkError;
