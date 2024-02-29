import React, { useState, useEffect, useCallback } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaExternalLinkAlt, FaRegCopy } from "react-icons/fa";
import { getBWiLDAddress, getWethAddress } from "utils/addressHelpers";
import { CHAIN_ID, TESTNET_CHAIN_ID, BASE_SWAP_URL, BASE_URL } from "config";
import { useNetwork } from "wagmi";
import { formatAddress } from "utils/customHelpers";
import { getScanTokenUrl } from "utils/getExplorerURL";
// import { useEthersProvider } from 'hooks/useEthers'

export default function FarmBanner() {
  const [isCopied, setIsCopied] = useState(false);
  const [wildAddress, setWildAddress] = useState("Connect correct wallet");
  const { chain } = useNetwork();
  const token = getBWiLDAddress();
  // const provider = useEthersProvider()

  const addWatchBWiLDToken = useCallback(async () => {
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
              symbol: "BWiLD",
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
      const addr = getBWiLDAddress();
      setWildAddress(addr);
    }
  }, [chain]);
  return (
    <div className="flex justify-center flex-col md:flex-row bg-secondary rounded-md">
      <div className="p-3 md:p-12 md:w-1/2 w-full text-center md:text-left">
        <h1 className="text-7xl">
          Earn $BILL <br />
          <span className="text-symbol font-semibold"> on Solana</span>
        </h1>
      </div>
      <div className="flex justify-end p-3 md:p-6 w-fill md:w-1/2">
        <div className="buy_card">
          <img
            src="/assets/stickers/sticker4.webp"
            className="w-[150px] h-[150px] min-w-[150px] col-span-12 lg:col-span-5 mx-auto my-1"
            alt="sticker"
          />
          <div className="w-full col-span-12 lg:col-span-7">
            <div className="flex items-center justify-center gap-2">
              <a className="main_btn w-full" href="/presale">
                Buy $BILL
              </a>
            </div>
            <div className="flex items-center justify-center">
              <a
                className="w-100  flex items-center justify-center py-10 text-base hover:underline text-symbol"
                href={`${
                  chain && chain.id === CHAIN_ID
                    ? getScanTokenUrl(wildAddress)
                    : ""
                }`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="hidden xl:block">
                  {formatAddress(wildAddress, 10)}
                </span>
                <span className="block xl:hidden">
                  {formatAddress(wildAddress, 6)}
                </span>
                &nbsp;
                <FaExternalLinkAlt color="gray" />
                <span></span>
              </a>
            </div>
            <div className="flex items-center justify-center">
              <CopyToClipboard text={wildAddress} onCopy={handleCopy}>
                <span className="flex items-center cursor-pointer">
                  {isCopied === true ? "Copied" : "Copy Address"} &nbsp;{" "}
                  <FaRegCopy color="gray" />
                </span>
              </CopyToClipboard>
              {/* <button className='flex items-center justify-center'>
                  Copy Adress &nbsp; <FaRegCopy color='gray' />
                </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
