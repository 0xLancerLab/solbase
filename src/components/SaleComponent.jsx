import React, { useState, useEffect } from "react";
import {
  didUserReject,
  fromReadableAmount,
} from "utils/customHelpers";
import { useBalance, useAccount, useSendTransaction } from "wagmi";
import { privateWILDPrice } from "config";
import { notify } from "utils/toastHelper";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { storedb } from "services/firebase";

export default function SaleComponent() {
  const { sendTransaction } = useSendTransaction();
  const [saleData, setPresaleData] = useState()
  const [amount, setAmount] = useState("");
  const { address } = useAccount();

  const { data } = useBalance({
    address: address,
  });

  useEffect(() => {
    async function getHistory(address) {
      const q = query(
        collection(storedb, "presales"),
        where("address", "==", address)
      );

      const querySnapshot = await getDocs(q);
      let depositedAmount = 0;
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const data = doc.data();
        if (data.sol_amount !== undefined) {
          depositedAmount += Number(data.eth_amount);
        }
      });
      setPresaleData({ user_deposits: depositedAmount });
    }
    if (address) getHistory(address);
  }, [address]);

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
      try {
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(storedb, "presales"), {
          address: address,
          token_amount: amount,
          eth_amount: ethAmountToSend,
          purchase_date: Date.now(),
        });
        console.log("Presale recorded with ID: ", docRef.id);

        notify(
          "success",
          `You deposited ${ethAmountToSend} ETH for ${amount} BiLLs successfully`
        );
        window.location.reload();

      } catch (error) {
        console.log(error);
      }
      
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
