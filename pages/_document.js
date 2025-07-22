import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KR25WYXMVE"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KR25WYXMVE');
          `}
        </Script>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {`
            {
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              "name": "Pearl Homestay",
              "image": "https://pearlhomestayujjain.in/images/home.png",
              "@id": "https://pearlhomestayujjain.in/",
              "url": "https://pearlhomestayujjain.in/",
              "telephone": "+919456294563",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "B - 61, Arpita Enclave, Near Jain Lassi",
                "addressLocality": "Ujjain",
                "addressRegion": "Madhya Pradesh",
                "postalCode": "456010",
                "addressCountry": "IN"
              },
              "priceRange": "₹2000 - ₹4000 per night",
              "description": "Experience luxury stay at Pearl Homestay Ujjain, located near Mahakaleshwar Temple. Enjoy comfortable rooms, modern amenities and warm hospitality. Book your spiritual stay today.",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 12.9716,
                "longitude": 77.5946
              }
            }
          `}
        </Script>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
