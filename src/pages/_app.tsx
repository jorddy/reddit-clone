import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Head from "next/head";
import Header from "@/components/header";

const queryClient = new QueryClient();

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Reddit 2.0</title>
        </Head>

        <div className='h-screen overflow-y-scroll bg-slate-200'>
          <Header />
          <Component {...pageProps} />
        </div>

        <Toaster position='bottom-center' />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
