import css from '../styles/globals.css';
import { Toaster } from 'react-hot-toast';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <header></header>
      <main>
        <Component {...pageProps} />
      </main>
      <Toaster />
    </>
  );
}
