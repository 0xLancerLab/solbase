import React, { useEffect, useState } from "react";
import { didUserReject } from "utils/customHelpers";
import { notify } from "utils/toastHelper";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
const presalePrice = 0.003;
const recipientKey = "9v5wQgrEeMnWFqHWhottspa3GJKhKJ2pQx6SSYFM8XuV";

export default function SaleComponent({ saleData }) {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("0");
  const [txSig, setTxSig] = useState("");

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const link = () => {
    return txSig
      ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
      : "";
  };
  const handleChange = (value) => {
    setAmount(value);
  };

  useEffect(() => {
    async function getBalance() {
      const balance = await connection.getBalance(publicKey);
      //So we convert it to SOL
      const solBalance = balance / LAMPORTS_PER_SOL;
      setBalance(solBalance);
    }
    if (publicKey) getBalance();
  }, [publicKey, connection]);

  const handleBuyWild = async (event) => {
    try {
      if (Number(amount) <= 0) {
        notify("warning", "Input $BILL amount to buy!");
        return;
      }
      if (Number(balance) < Number(amount) * Number(presalePrice)) {
        notify("warning", "Insufficient SOL Balance");
        return;
      }
      event.preventDefault();
      if (!connection || !publicKey) {
        return;
      }
      const transaction = new web3.Transaction();
      const recipientPubKey = new web3.PublicKey(recipientKey);

      const sendSolInstruction = web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipientPubKey,
        lamports: LAMPORTS_PER_SOL * Number(amount) * Number(presalePrice),
      });

      transaction.add(sendSolInstruction);
      sendTransaction(transaction, connection).then((sig) => {
        setTxSig(sig);
      });
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

  return (
    <div>
      <div className="balance_form">
        {/* <p className="text-center text-lg font-semibold">Presale is now until timer expires.</p> */}
        <div className="my-8">
          <div className="flex justify-between mb-3 border-b border-symbolBorder px-1">
            <div> Presale Price:</div>
            <div>
              <p className="flex gap-1">
                <span className={"font-semibold text-green-500"}>
                  {presalePrice} SOL
                </span>
              </p>
            </div>
          </div>
          <div className="flex justify-between mb-3 border-b border-symbolBorder px-1">
            <div> Launch Price:</div>
            <div>
              <p className="flex gap-1">
                <span className={"font-semibold text-green-500"}>
                  0.004 SOL
                </span>
              </p>
            </div>
          </div>
          <div className="flex justify-between mb-3 border-b border-symbolBorder px-1">
            <div> Your SOL Balance:</div>
            <div className={"font-semibold text-green-500"}>{balance} SOL</div>
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
        className="main_btn base_bg w-full my-2"
        onClick={(e) => handleBuyWild(e)}
      >
        BUY $BILL
      </button>
    </div>
  );
}
