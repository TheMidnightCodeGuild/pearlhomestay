import Link from "next/link";
import Head from "next/head";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Image from "next/image";

export default function Custom404() {
  return (
    <>
      <Navbar />
      <Head>
        <title>404 – Page Not Found | Pearl Homestay Ujjain</title>
        <meta
          name="description"
          content="Sorry, the page you are looking for does not exist. Return to Pearl Homestay Ujjain homepage or explore our rooms, blogs, and more."
        />
      </Head>

      <div className="min-h-screen flex flex-col items-center justify-center bg-[#C6A38D] px-4 pt-44 pb-12 border-l-[10px] border-r-[10px] border-[#ffffff] ">
        <div className="flex flex-col md:flex-row items-center w-full max-w-4xl bg-[#fffff0] rounded-4xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl p-6 md:p-5">
          <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
            <Image
              src="/images/home.png"
              alt="Pearl Homestay Ujjain - Not Found"
              width={400}
              height={300}
              className="object-cover rounded-lg w-full h-auto"
              priority
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-6xl font-bold text-[#8B593E] mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-[#4A2511] mb-2">
              Oops! Page Not Found
            </h2>
            <p className="text-[#8B593E] mb-6 max-w-md">
              The page you’re looking for doesn’t exist or has been moved.
              <br />
              Return to our homepage or explore our latest blogs about Ujjain
              and Pearl Homestay.
            </p>
            <div className="flex space-x-4 mb-4">
              <Link href="/" legacyBehavior>
                <a className="px-5 py-2 bg-[#8B593E] text-white rounded hover:bg-[#4A2511] transition font-semibold shadow-md">
                  Go to Homepage
                </a>
              </Link>
              <Link href="/blogs" legacyBehavior>
                <a className="px-5 py-2 bg-[#F2E2D7] text-[#4A2511] rounded hover:bg-[#C6A38D] transition font-semibold shadow-md">
                  View Blogs
                </a>
              </Link>
            </div>
            <div className="text-sm text-gray-400 mt-2">
              &copy; {new Date().getFullYear()} Pearl Homestay Ujjain
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
