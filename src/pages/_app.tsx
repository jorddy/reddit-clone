import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/header";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Reddit 2.0</title>
      </Head>

      <div className='min-h-screen bg-slate-200'>
        <Header />
        <main className='mt-4'>
          <Component {...pageProps} />
        </main>
      </div>
    </SessionProvider>
  );
};

export default MyApp;
