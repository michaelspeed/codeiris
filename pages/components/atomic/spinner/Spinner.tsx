import React from 'react';
import { SpinnerSize } from '../../../../lib/common/props/SpinnerProps';
import clsx from 'clsx';
import { IntentProps } from '../../../../lib/common/props/IntentProps';
import { Intent } from '../../../../lib/common';

export interface SpinnerProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    IntentProps {
  size?: SpinnerSize;
}

export default function Spinner({ size, intent }: SpinnerProps) {
  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-t-2 border-b-2 ml-1 mr-1',
        calculateSize(size),
        checkColor({ intent }),
      )}
    />
  );
}

function checkColor({ intent }: IntentProps) {
  switch (intent) {
    case Intent.PRIMARY:
      return 'border-primary';
    case Intent.SUCCESS:
      return 'border-success';
    case Intent.SECONDARY:
      return 'border-secondary';
    case Intent.INFO:
      return 'border-info';
    case Intent.ERROR:
      return 'border-error';
    case Intent.WARNING:
      return 'border-warning';
    case Intent.QUESTION:
      return 'border-question';
    default:
      return 'border-primary';
  }
}

function calculateSize(size: SpinnerSize) {
  switch (size) {
    case SpinnerSize.small:
      return 'h-5 w-5';
    case SpinnerSize.medium:
      return 'h-10 w-10';
    case SpinnerSize.large:
      return 'h-20 w-20';
    default:
      return 'h-10 w-10';
  }
}
