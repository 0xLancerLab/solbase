import React, { useMemo } from "react";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { RefreshContextProvider } from "context/RefreshContext";
import { ThemeContextProvider } from "context/ThemeContext";
import { LanguageProvider } from "context/Localization";
import { ModalProvider } from "uikit";

import store from "state";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

const Providers = ({ children }) => {
  let network = WalletAdapterNetwork.Devnet;
  if (
    process.env.REACT_PUBLIC_ENVIRONMENT === "mainnet-beta" ||
    process.env.REACT_PUBLIC_ENVIRONMENT === "mainnet"
  ) {
    network = WalletAdapterNetwork.Mainnet;
  }

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new UnsafeBurnerWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <Provider store={store}>
            <HelmetProvider>
              <ThemeContextProvider>
                <LanguageProvider>
                  <RefreshContextProvider>
                    <ModalProvider>{children}</ModalProvider>
                  </RefreshContextProvider>
                </LanguageProvider>
              </ThemeContextProvider>
            </HelmetProvider>
            <ToastContainer />
          </Provider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default Providers;
