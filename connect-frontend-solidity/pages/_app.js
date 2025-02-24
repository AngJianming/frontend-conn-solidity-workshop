import dynamic from "next/dynamic";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { sepolia, mainnet, polygon, optimism, arbitrum, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';



const { chains, provider } = configureChains(
  [sepolia, mainnet, polygon, optimism, arbitrum, polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default dynamic(() => Promise.resolve(App), { ssr: false })