import React, { useState } from "react";
import { useFarmsWithBalance } from "hooks/useFarmsWithBalance";
import WiLDHarvestBalance from "./Staking/WiLDHarvestBalance";
import WiLDWalletBalance from "./Staking/WiLDWalletBalance";
import CompoundModal from "./CompoundModal";
import BigNumber from "bignumber.js";
import { DEFAULT_TOKEN_DECIMAL } from "config";

export default function FarmStaking() {
  const [open, setOpen] = useState(false);
  const [pids, setPids] = useState([]);

  const farmsWithBalance = useFarmsWithBalance();

  const balancesWithValue = farmsWithBalance.filter((balanceType) =>
    balanceType.balance.gt(0)
  );
  const earningsSum = farmsWithBalance.reduce((accum, earning) => {
    const earningNumber = new BigNumber(earning.balance);
    if (earningNumber.eq(0)) {
      return accum;
    }
    return accum + earningNumber.div(DEFAULT_TOKEN_DECIMAL).toNumber();
  }, 0);

  function closeModal() {
    setOpen(false);
  }

  return (
    <div className="flex-1 bg-secondary p-8 rounded-md ">
      <div className="text-3xl text-end font-semibold text-symbol mb-5 h-3.5">
        {/* Farms & Staking */}
      </div>
      <div className="flex justify-between flex-col md:flex-row">
        <div>
          <div className="text-base pb-2 font-semibold">$BILL to Harvest:</div>
          <div className="text-sm text-gray-300">
            <WiLDHarvestBalance farmsWithBalance={balancesWithValue} />
          </div>
          <div className="text-base pb-2 font-semibold mt-5">
            $BILL in Wallet:
          </div>
          <div className="text-sm text-gray-300">
            <WiLDWalletBalance />
          </div>
        </div>
        <div>
          {" "}
          <img
            src="/zapIn.png"
            alt="sticker"
            className="w-full lg:max-w-[230px] md:max-w-[180px] sm:max-w-[160px]  mx-auto"
          />
          {/* <div className="text-base font-semibold text-right">
            Current Sales Tax:
          </div>
          <div className="mb-1">
            <div className="flex justify-end">
              <CurrentSaleTax />
            </div>

            <span className="text-[11px] text-right">
              ( Sales tax burns all of the BWiLD automatically. <br /> The sales
              tax will drop over the next week to 8% )
            </span>
          </div> */}
        </div>
      </div>

      {/* <div className="mt-5 flex flex-col md:flex-row justify-between gap-3">
        {address ? (
          <>
            <button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              className="rounded-full w-full main_btn"
              onClick={harvestAllFarms}
            >
              {
                pendingTx ? (
                  <Loading />
                ) : (
                  `Harvest all ( ${balancesWithValue.length} )`
                )
              }
            </button>
            <button
              id="compound-all"
              disabled={balancesWithValue.length <= 0}
              onClick={openModal}
              className="rounded-full w-full main_btn"
            >
              {
                compoundPendingTx ? (
                  <Loading />
                ) : (
                  `Compound all ( ${balancesWithValue.length} )`
                )
              }
            </button>
          </>
        ) : (
          <ConnectButton />
        )}
      </div> */}
      {open && (
        <CompoundModal
          open={open}
          closeModal={closeModal}
          earnings={earningsSum}
          pid={pids}
          isAll={true}
        />
      )}
    </div>
  );
}
