import React, { useState, useEffect, useCallback } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaExternalLinkAlt, FaRegCopy } from "react-icons/fa";
import { getBiLLAddress, getWethAddress } from "utils/addressHelpers";
import { CHAIN_ID, TESTNET_CHAIN_ID, BASE_SWAP_URL, BASE_URL } from "config";
import { useNetwork } from "wagmi";
import { formatAddress } from "utils/customHelpers";
import { getScanTokenUrl } from "utils/getExplorerURL";
// import { useEthersProvider } from 'hooks/useEthers'

export default function FarmBanner() {
  const [isCopied, setIsCopied] = useState(false);
  const [wildAddress, setWildAddress] = useState("");
  const { chain } = useNetwork();
  const token = getBiLLAddress();
  // const provider = useEthersProvider()

  const addWatchBiLLToken = useCallback(async () => {
    const provider = window.ethereum;
    if (provider) {
      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        await provider.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: token,
              symbol: "BiLL",
              decimals: "18",
              image: `${BASE_URL}/assets/tokens/wildx.png`,
            },
          },
        });

        // if (wasAdded) {
        //   console.log('Token was added')
        // }
      } catch (error) {
        console.log("error", error);
        // TODO: find a way to handle when the user rejects transaction or it fails
      }
    }
  }, []);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  useEffect(() => {
    if (chain && (chain.id === CHAIN_ID || chain.id === TESTNET_CHAIN_ID)) {
      const addr = getBiLLAddress();
      setWildAddress(addr);
    }
  }, [chain]);
  return (
    <div className="flex justify-center flex-col md:flex-row bg-secondary rounded-md">
      <div className="p-3 md:p-12 md:w-1/2 w-full text-center md:text-left">
        <h1 className="text-7xl">
          Earn BiLL <br />
          <span className="text-symbol font-semibold"> on Base</span>
        </h1>
      </div>
      <div className="flex justify-center items-center p-3 md:p-6 w-fill md:w-1/2">
        <div className="buy_card flex justify-center items-center">
          <img
            src="/assets/stickers/sticker4.webp"
            className="w-[150px] h-[150px] min-w-[150px] col-span-12 lg:col-span-5 mx-auto my-1"
            alt="sticker"
          />
          <div className="w-full col-span-12 lg:col-span-7">
            <div className="flex items-center justify-center gap-2">
              <a className="main_btn w-full" href="/presale">
                Buy BiLL
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
