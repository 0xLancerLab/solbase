import React, { useState, useEffect } from "react";
import {
  didUserReject,
  formatAddress,
  fromReadableAmount,
} from "utils/customHelpers";
import { getPresaleAddress } from "utils/addressHelpers";
import { useBalance, useAccount } from "wagmi";
import { privateWILDPrice, BASE_EXPLORER } from "config";
import { notify } from "utils/toastHelper";
import { usePresaleContract } from "hooks/useContract";

export default function SaleComponent({ saleData }) {
  const presaleContract = usePresaleContract();
  const [amount, setAmount] = useState("");
  const { address } = useAccount();
  const { data } = useBalance({
    address: address,
  });

  const handleChange = (value) => {
    setAmount(value);
  };

  const handleBuyWild = async () => {
    if (!saleData?.enabled) {
      notify("error", "Presale is not started yet");
      return;
    }
    if (saleData?.sale_finalized) {
      notify("error", "Presale is ended");
      return;
    }
    let ethPrice;

    try {
      const ethAmountToSend = (amount * 12) / Number(ethPrice);
      if (Number(data?.formatted) <= Number(ethAmountToSend)) {
        notify("warning", "Insufficient Balance");
        return;
      }

      const tx = await presaleContract.buyWILD({
        from: address,
        value: fromReadableAmount(Number(ethAmountToSend).toFixed(5)),
      });
      await tx.wait();
      notify("success", `You bought ${amount} $BILL successfully`);
    } catch (error) {
      if (didUserReject(error)) {
        notify("warning", "User Rejected transaction");
        return;
      } else {
        notify("warning", error.reason);
        return;
      }
    }
  };

  console.log(saleData);

  return (
    <div>
      <div className="balance_form">
        {/* <p className="text-center text-lg font-semibold">Presale is now until timer expires.</p> */}
        <div className="my-8">
          <div className="flex justify-between mb-3 border-b border-symbolBorder px-1">
            <div> Presale Price:</div>
            <div>
              <p className="flex gap-1">
                <span className={"font-semibold text-green-500"}>0.33 SOL</span>
              </p>
            </div>
          </div>
          <div className="flex justify-between mb-3 border-b border-symbolBorder px-1">
            <div> Launch Price:</div>
            <div>
              <p className="flex gap-1">
                <span className={"font-semibold text-green-500"}>0.5 SOL</span>
              </p>
            </div>
          </div>
          <div className="flex justify-between mb-3 border-b border-symbolBorder px-1">
            <div> Your SOL Balance:</div>
            <div>
              {Number(data?.formatted).toFixed(5) === "NaN"
                ? "0.000"
                : Number(data?.formatted).toFixed(5)}{" "}
              SOL
            </div>
          </div>
        </div>
        <div>
          <div> $BILL Amount to Buy</div>
          <input
            className="w-full rounded-md py-1 bg-primary/20 px-3 mb-3 hover:outline-none focus-visible:outline-none border border-symbol/70"
            type="number"
            placeholder="Input $BILL amount to Buy."
            value={amount}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      </div>
      <button
        className="main_btn w-full my-2"
        onClick={() => handleBuyWild()}
        disabled={
          !saleData?.enabled ||
          saleData?.sale_finalized ||
          250 <= Number(saleData?.WILDOwned) + Number(amount)
        }
      >
        {!saleData?.enabled
          ? "Presale is not started yet"
          : saleData?.sale_finalized
          ? "Preslae is ended"
          : 250 <= Number(saleData?.WILDOwned) + Number(amount)
          ? "Exceed Maximum Amount"
          : "BUY BWILD"}
      </button>
    </div>
  );
}
