import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import "@/styles/globals.css";

function App({ Component, pageProps }) {
  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <Component {...pageProps} />;
}

export default App;
