import React from 'react';
import { IntentProps } from '../../../../lib/common/props/IntentProps';
import { AvatarSize } from '../../../../lib/common/props/AvatarProps';
import { SpinnerSize } from '../../../../lib/common/props/SpinnerProps';
import clsx from 'clsx';
import Heading, { HeadingSize } from '../typography';

export interface AvatarProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    IntentProps {
  label?: string;
  size?: AvatarSize;
  image?: string;
  color?: string;
}

export default function Avatar({ label, size, image, color }: AvatarProps) {
  return (
    <div>
      {image && (
        <div className="flex justify-center items-center">
          {label && (
            <Heading size={HeadingSize.H400} className="mr-2 text-gray-400">
              {label}
            </Heading>
          )}
          <img
            className={clsx(
              checkSize(size),
              'inline-block rounded-full ring-2 ring-primary',
            )}
            src={image}
            alt={label}
          />
        </div>
      )}
      {!image && (
        <div className="flex justify-center items-center">
          <div
            className={clsx(
              'flex rounded-full ring-2 justify-center items-center',
              checkSize(size),
              checkColor(color),
            )}
          >
            <Heading
              size={checkHeadingSize(size)}
              className="text-white uppercase"
            >
              {label && label[0]}
            </Heading>
          </div>
        </div>
      )}
    </div>
  );
}

function checkColor(color) {
  return color ? color : 'bg-primary';
}

function checkSize(size: AvatarSize) {
  switch (size) {
    case AvatarSize.small:
      return 'h-6 w-6';
    case AvatarSize.medium:
      return 'h-10 w-10';
    case AvatarSize.large:
      return 'h-20 w-20';
    default:
      return 'h-10 w-10';
  }
}

function checkHeadingSize(size: AvatarSize) {
  switch (size) {
    case AvatarSize.small:
      return HeadingSize.H300;
    case AvatarSize.medium:
      return HeadingSize.H400;
    case AvatarSize.large:
      return HeadingSize.H500;
    default:
      return HeadingSize.H400;
  }
}
