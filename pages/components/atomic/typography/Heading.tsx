import { HeadingSize } from '../../../../lib/common/props/HeadingProps';
import React, { CSSProperties } from 'react';
import clsx from 'clsx';

export interface HeadingProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  children: string;
  size: HeadingSize;
}

function Heading({ children, style, size, ...rest }: HeadingProps) {
  return (
    <span style={calculateStyles({ size }, style)} {...rest}>
      {children}
    </span>
  );
}

function calculateStyles({ size }, styles): CSSProperties {
  styles = {
    fontFamily: 'Product Sans',
    ...styles,
  };
  switch (size) {
    case HeadingSize.H100:
      styles = {
        fontSize: 11,
        fontWeight: 400,
        ...styles,
      };
      return styles;
      break;
    case HeadingSize.H200:
      styles = {
        fontSize: 12,
        fontWeight: 600,
        ...styles,
      };
      return styles;
      break;
    case HeadingSize.H300:
      styles = {
        fontSize: 14,
        fontWeight: 600,
        ...styles,
      };
      return styles;
      break;
    case HeadingSize.H400:
      styles = {
        fontSize: 18,
        fontWeight: 500,
        ...styles,
      };
      return styles;
      break;
    case HeadingSize.H600:
      styles = {
        fontSize: 20,
        fontWeight: 500,
        ...styles,
      };
      return styles;
      break;
    default:
      return styles;
      break;
  }
}

export default Heading;
