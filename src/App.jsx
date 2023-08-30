import React, { useEffect } from 'react'
import { FlexCol } from './Component/Elements'
import Header from './Component/Header'
import Banner from './Component/Banner'
import SocialBar from './Component/SocialBar'
import Footer from './Component/Footer'
import CountDownCard from './Component/CountDownCard'
import "react-toastify/dist/ReactToastify.css";
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  bsc
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ToastContainer } from 'react-toastify'

const App = () => {
  const { chains, publicClient } = configureChains(
    [bsc],
    [
      alchemyProvider({ apiKey: "JomhmuQ76IsTZ8H5xQ0kuj2kvpHwF8X2" }),
      publicProvider()
    ]);

  const { connectors } = getDefaultWallets({
    appName: 'Payment',
    projectId: '72f5d80525bd261bb92a76b1426b1ce0',
    chains
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })

  useEffect(() => {
    localStorage.clear()
  }, [window.reload])
  

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            closeOnClick
            rtl={false}
            theme="dark"
            draggable
          />
          <FlexCol>
            {/* Header */}
            <Header />

            {/* Banner */}
            <Banner />

            {/* Social Bar */}
            <SocialBar />

            {/* CountDown Card */}
            <CountDownCard />


            {/* Footer */}
            <Footer />
          </FlexCol>

        </RainbowKitProvider>
      </WagmiConfig>

    </>
  )
}

export default App