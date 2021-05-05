import { IntentProps } from './IntentProps';
import React from 'react';

export interface CommonProps {
  className?: string;
}

export type MaybeElement = JSX.Element | false | null | undefined;

export interface ActionProps extends IntentProps, CommonProps {
  disabled?: boolean;
  icon?: MaybeElement;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  text?: React.ReactNode;
}
