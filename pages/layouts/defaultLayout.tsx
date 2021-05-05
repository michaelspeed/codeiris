import React from 'react';
import dynamic from 'next/dynamic';
const Header = dynamic(import('../components/Header'), { ssr: false });

interface Props {
  children: React.ReactNode;
}

function DefaultLayout({ children }: Props) {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  );
}

export default DefaultLayout;
