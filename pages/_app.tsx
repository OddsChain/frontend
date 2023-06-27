import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { moonbaseAlpha } from "wagmi/chains";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [moonbaseAlpha],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/franfran20/odds-subgraph",
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </WagmiConfig>
  );
}
