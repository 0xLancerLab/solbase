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
import { SolanaTimeProvider } from "context/SolanaTimeContext";
import { UmiProvider } from "utils/UmiProvider";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

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
  const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          bg: "",
          color: "",
          input: "",
        },
      }),
    },
  });
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <UmiProvider endpoint={endpoint}>
          <WalletModalProvider>
            <SolanaTimeProvider>
              <Provider store={store}>
                <HelmetProvider>
                  <ThemeContextProvider>
                    <LanguageProvider>
                      <RefreshContextProvider>
                        <ChakraProvider theme={theme}>
                          <ModalProvider>{children}</ModalProvider>
                        </ChakraProvider>
                      </RefreshContextProvider>
                    </LanguageProvider>
                  </ThemeContextProvider>
                </HelmetProvider>
                <ToastContainer />
              </Provider>
            </SolanaTimeProvider>
          </WalletModalProvider>
        </UmiProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default Providers;
