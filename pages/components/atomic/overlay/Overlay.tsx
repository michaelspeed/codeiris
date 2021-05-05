import React from 'react';
import { TransitionGroup } from 'react-transition-group';

function Overlay({ children }) {
  return (
    <TransitionGroup appear={true} component="div">
      {children}
    </TransitionGroup>
  );
}

export default Overlay;
