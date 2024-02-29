import React from "react";
import { useTotalSupply } from "hooks/useTokenBalance";
import { usePriceBWiLDUsdc, useTotalValue } from "state/hooks";
import CardValue from "./Staking/CardValue";
import { convertCurrency } from "utils/customHelpers";

export default function TotalValueLocked() {
  const tvlData = useTotalValue();
  const tvl = tvlData
    ? tvlData.toLocaleString("en-US", { maximumFractionDigits: 1 })
    : 0;
  const liquidity = usePriceBWiLDUsdc()[1];
  const marketCap = usePriceBWiLDUsdc()[2];

  const totalSupply = useTotalSupply();
  // 0xeAA13b4f85A98E6CcaF65606361BD590e98DE2Cb

  const totalMinted = totalSupply;
  return (
    <div className="flex-1 bg-secondary p-8 rounded-md ">
      <div className="text-3xl text-right  font-semibold text-symbol">
        Total Value Locked
      </div>
      <div className="mb-5">
        {tvlData !== null ? (
          <div color="#fff" className="text-2xl font-semibold text-right pb-3">
            {`$${tvl}`} staked
          </div>
        ) : (
          <div />
        )}
      </div>
      <div className="text-3xl text-right mb-5">$BILL Stats</div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Liquidity</p>
          <div className="h-30 ">
            {liquidity > 0 ? (
              <span className="text-[20px] font-semibold">
                $ {convertCurrency(liquidity)}
              </span>
            ) : (
              <div />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Market Cap</p>
          <div className="h-30 ">
            {marketCap > 0 ? (
              <span className="text-[20px] font-semibold">
                $ {convertCurrency(marketCap)}
              </span>
            ) : (
              <div />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Total Burned</p>
          <div>0</div>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Circulating Supply</p>
          <div>
            {totalSupply && (
              <CardValue
                fontSize="20px"
                value={totalMinted}
                decimals={1}
                color="#fffff"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
