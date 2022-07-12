import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { QueryClientProvider, QueryClient } from "react-query";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
