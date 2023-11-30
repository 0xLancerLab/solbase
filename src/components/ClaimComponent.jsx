import React from "react";
import { notify } from "utils/toastHelper";
import moment from "moment";
import { didUserReject, toReadableAmount } from "utils/customHelpers";
import { getPresaleContract } from "utils/contractHelpers";
import { useAccount } from "wagmi";

export default function ClaimComponent({ saleData }) {
  const { address } = useAccount();
  const lastClaimedTime = window.localStorage.getItem("lastClaimedTime");
  const presaleContract = getPresaleContract();

  const handleClaim = async () => {
    if (!Boolean(saleData.sale_finalized)) {
      notify("error", "Presale is not ended yet");
      return;
    }
    if (Number(saleData.user_deposits) === 0) {
      notify("error", "You do not have any tokens to claim");
      return;
    }
    try {
      const tx = await presaleContract.withdrawWILD({
        from: address,
      });
      await tx.wait();
      notify("success", "You claimed tokens successfully");
      notify("info", "You can claim tokens again after 1 hours");
      window.localStorage.setItem("lastClaimedTime", Date.now());
    } catch (error) {
      if (didUserReject(error)) {
        notify("warning", "User Rejected transaction");
        return;
      } else {
        notify(
          "warning",
          "Please check your network status or You are not available to claim tokens yet"
        );
        return;
      }
    }
  };

  return (
    <div className="claim_card">
      <div className="py-8">
        <div className="flex justify-between mb-3 border-b border-symbolBorder px-1">
          <div> Total Earned BWiLD:</div>
          <div>{saleData?.WILDOwned || '0.00'} &nbsp; <span className="text-[10.5px] text-sm">BWiLD</span> </div>
        </div>
        <div className="flex justify-between mb-3 border-b border-symbolBorder px-1">
          <div> Total Claimed BWiLD:</div>
          <div>{saleData?.user_withdraw_amount || '0.00'}  &nbsp; <span className="text-[10.5px] text-sm">BWiLD</span></div>
        </div>
        <div className="flex justify-between mb-3 border-b border-symbolBorder px-1">
          <div> Next Claimable BWiLD:</div>
          <div>{saleData?.getAmountToWithdraw || '0.00'}  &nbsp; <span className="text-[10.5px] text-sm">BWiLD</span></div>
        </div>
        <div className="flex justify-between mb-3 border-b border-symbolBorder px-1">
          <div> Last Claimed Time:</div>
          <div>
            {lastClaimedTime
              ? moment(Number(lastClaimedTime)).format("YYYY-MM-DD HH:mm:ss")
              : "0000-00-00 00:00:00"}{" "}
          </div>
        </div>
        <div className="flex justify-between mb-3 border-b border-symbolBorder px-1">
          <div> Next Claimable Time:</div>
          <div>
            {saleData?.user_withdraw_timestamp
              ? moment(Number(saleData?.user_withdraw_timestamp))
                  .add(1, "d")
                  .format("YYYY-MM-DD HH:mm:ss")
              : "0000-00-00 00:00:00"}
          </div>
        </div>
      </div>

      <button
        className="main_btn w-full"
        onClick={() => handleClaim()}
        disabled={!Boolean(saleData?.sale_finalized) ? "disabled" : ""}
      >
        {!Boolean(saleData?.sale_finalized)
          ? "Preslae is not ended yet"
          : Number(saleData?.getAmountToWithdraw)
          ? "You don't have any tokens to claim"
          : "ClAIM WILD"}
      </button>
    </div>
  );
}
