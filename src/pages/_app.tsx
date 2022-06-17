import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "react-query/devtools";
import Head from "next/head";
import Header from "@/components/header";

const MyApp = ({
  Component,
  pageProps: { session, dehydratedState, ...pageProps }
}: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <Head>
            <title>Reddit 2.0</title>
          </Head>

          <div className='h-screen overflow-y-scroll bg-slate-200'>
            <Header />
            <Component {...pageProps} />
          </div>

          <Toaster position='bottom-center' />
          <ReactQueryDevtools />
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
