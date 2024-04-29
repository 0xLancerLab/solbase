import React, { useState } from "react";
import {
  didUserReject,
  fromReadableAmount,
} from "utils/customHelpers";
import { useBalance, useAccount, useSendTransaction } from "wagmi";
import { privateWILDPrice } from "config";
import { notify } from "utils/toastHelper";


export default function SaleComponent({ saleData }) {
    const { sendTransaction } = useSendTransaction();
  const [amount, setAmount] = useState("");
  const { address } = useAccount();
  const { data } = useBalance({
    address: address,
  });

  const handleChange = (value) => {
    setAmount(value);
  };

  const handleBuyWild = async () => {

    try {
      const ethAmountToSend = Number(amount) * Number(privateWILDPrice);
      sendTransaction({
        to: "0x17a06C7A6EB41B5964151aFDDa191B15B1456Be3",
        value: fromReadableAmount(ethAmountToSend, 18),
      });
      notify("success", `You bought ${amount} BiLL successfully`);
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

  console.log(saleData)

  return (
    <div>
      <div className="balance_form">
        <div className="my-8">
          <div className="flex justify-between mb-3 border-b border-symbolBorder px-1">
            <div> Your Committed:</div>
            <div>{saleData?.user_deposits || "0"} ETH</div>
          </div>
          <div className="flex justify-between mb-3 border-b border-symbolBorder px-1">
            <div> Presale Price:</div>
            <div>
              <p className="flex gap-1">
                <span className={"font-semibold text-green-500"}>
                  {privateWILDPrice} ETH
                </span>
              </p>
            </div>
          </div>
          <div className="flex justify-between mb-3 border-b border-symbolBorder px-1">
            <div> Launch Price:</div>
            <div>
              <p className="flex gap-1">
                <span className={"font-semibold text-green-500"}>
                  {privateWILDPrice * 2} ETH
                </span>
              </p>
            </div>
          </div>
          <div className="flex justify-between mb-3 border-b border-symbolBorder px-1">
            <div> Your ETH Balance:</div>
            <div>
              {Number(data?.formatted).toFixed(5) === "NaN"
                ? "0.000"
                : Number(data?.formatted).toFixed(5)}{" "}
              ETH
            </div>
          </div>
        </div>
        <div>
          <div> BiLL Amount to Buy</div>
          <input
            className="w-full rounded-md py-1 bg-primary/20 px-3 mb-3 hover:outline-none focus-visible:outline-none border border-symbol/70"
            type="number"
            placeholder="Input BiLL amount to Buy."
            value={amount}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      </div>
      <button
        className="main_btn w-full my-2"
        onClick={() => handleBuyWild()}
      >
          BUY BiLL
      </button>
    </div>
  );
}
