import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>{/* Google Analytics */}</Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-KR25WYXMVE"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-KR25WYXMVE', { page_path: window.location.pathname });
        `}
      </Script>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
