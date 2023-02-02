import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import { ApolloProvider } from "@apollo/client";
import client from "@/apollo-client";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </main>
  );
}
