import './styles/app.css';
import { withApollo } from '../lib/apollo';
import { ApolloProvider } from '@apollo/client';
import { StoreProvider } from './store/StoreProvider';

function MyApp({ Component, pageProps, apolloClient }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <StoreProvider {...pageProps}>
      <ApolloProvider client={apolloClient}>
        {getLayout(<Component {...pageProps} />)}
      </ApolloProvider>
    </StoreProvider>
  );
}

export default withApollo(MyApp);
