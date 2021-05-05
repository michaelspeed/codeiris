import React from 'react';

export const HeadingSize = {
  H100: 'H100' as const,
  H200: 'H200' as const,
  H300: 'H300' as const,
  H400: 'H400' as const,
  H500: 'H500' as const,
  H600: 'H600' as const,
};

export type HeadingSize = typeof HeadingSize[keyof typeof HeadingSize];
