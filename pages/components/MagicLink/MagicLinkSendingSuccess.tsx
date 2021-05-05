import Heading, { HeadingSize } from '../atomic/typography';
import io from 'socket.io-client';
import { useEffect } from 'react';
import { host } from '../../../utils/GlobalConstants';

export default function MagicLinkSendingSuccess({ listener }) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {
    const socket = io('http://localhost:3000/');
    socket.on('connect', () => {
      console.log(socket);
    });
    socket.emit('joinRoom', listener);
    socket.on('joinRoom', (msg) => {
      console.log(msg);
    });
    socket.on('linkstatus', (message) => {
      console.log(message);
    });
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Heading size={HeadingSize.H600} style={{ fontSize: 30 }} className='text-gray-500'>
          Login Email Sent
        </Heading>
      </div>
    </div>
  );
}
