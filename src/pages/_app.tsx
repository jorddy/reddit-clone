import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";
import Header from "@/components/header";

const queryClient = new QueryClient();

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Head>
          <title>Reddit 2.0</title>
        </Head>

        <Toaster position='bottom-center' />

        <div className='min-h-screen bg-slate-200'>
          <Header />
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
