import DefaultLayout from '../layouts/defaultLayout';
import Heading from '../components/atomic/typography/Heading';
import { HeadingSize } from '../components/atomic/typography';
import TextField from '../components/atomic/textField';
import Button from '../components/atomic/button';
import { useMutation } from '@apollo/client';
import {
  MutationSendMagicLinkArgs,
  SendMagicLinkDocument,
  SendMagicLinkMutation,
} from '../../gql';
import { useEffect, useState } from 'react';
import MagicLinkSendingSuccess from '../components/MagicLink/MagicLinkSendingSuccess';
import io from 'socket.io-client';

function Login() {
  const [email, setEmail] = useState('');
  const [listener, setListener] = useState<string | null>(null);
  const [SendMagicLink, { loading }] = useMutation<
    SendMagicLinkMutation,
    MutationSendMagicLinkArgs
  >(SendMagicLinkDocument);

  return (
    <div className="w-screen flex justify-center items-center h-screen bg-gray-100">
      <div
        className="bg-white shadow rounded-2xl"
        style={{ width: '70vw', height: '70vh' }}
      >
        <div className="grid grid-cols-2 h-full">
          <div className="flex justify-center items-center w-full">
            <div>
              {listener && <MagicLinkSendingSuccess listener={listener} />}
              {!listener && (
                <div>
                  <div className="flex justify-center mb-5">
                    <Heading
                      size={HeadingSize.H600}
                      style={{ fontSize: 60 }}
                      className="text-heading-light"
                    >
                      Sign In
                    </Heading>
                  </div>
                  <div>
                    <TextField
                      placeholder="Email"
                      className="2xl:w-80"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                  <div>
                    <Button
                      loading={loading}
                      disabled={loading}
                      onClick={async () => {
                        SendMagicLink({ variables: { email: email } }).then(
                          (value) => {
                            setListener(value.data.sendMagicLink.listener);
                          },
                        );
                      }}
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-primary"></div>
        </div>
      </div>
    </div>
  );
}

Login.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Login;
