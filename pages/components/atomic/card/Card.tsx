import React from 'react';
import Image from 'next/image';

export interface CardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  image?: string;
  title?: string;
  body?: string;
  totalUpvotes?: number;
  totalComments?: number;
  totalViews?: number;
}

function Card({
  image,
  title,
  body,
  totalUpvotes,
  totalComments,
  totalViews,
}: CardProps) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Image
        className="w-full"
        src="https://unsplash.com/photos/iAlerP-CnBY"
        alt="WildPhoto"
        width={100}
        height={100}
      />
      <div className="px-6 py-4 bg-body-light">
        <div className="font-bold text-xl mb-2 text-heading-dark">{title}</div>
        <p
          className="text-body-dark text-base"
          dangerouslySetInnerHTML={{ __html: body }}
        ></p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  );
}

export default Card;
