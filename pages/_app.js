import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Roboto } from 'next/font/google';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={roboto.className} >
        <Layout>
          <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </main>
    </QueryClientProvider>
  )
}

export default MyApp
