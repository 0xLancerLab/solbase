import React, { useState, useEffect } from "react";
import { toReadableAmount } from "utils/customHelpers";
import SaleComponent from "components/SaleComponent";
import useRefresh from "hooks/useRefresh";
import PresaleForkABI from "config/abis/presaleFork.json";
import { getPresaleAddress } from "utils/addressHelpers";
import multicall from "utils/multicall";
import { CountDownComponent } from "../components/CountDown";

export default function Presale() {
  const preslaeContractAddress = getPresaleAddress();
  const { fastRefresh } = useRefresh();

  const [active, setActive] = useState(1);
  const [presaleData, setPresaleData] = useState({});
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const calls = [
        {
          address: preslaeContractAddress,
          name: "enabled",
          params: [],
        },
        {
          address: preslaeContractAddress,
          name: "sale_finalized",
          params: [],
        },
        {
          address: preslaeContractAddress,
          name: "finishedTimestamp",
          params: [],
        },
        {
          address: preslaeContractAddress,
          name: "total_deposited",
          params: [],
        },
      ];

      try {
        const rawResults = await multicall(PresaleForkABI, calls);
        rawResults.map((data, index) => {
          const newData =
            index <= 2
              ? {
                  [calls[index]["name"]]:
                    index === 2 ? Number(data[0]) : data[0],
                }
              : {
                  [calls[index]["name"]]: toReadableAmount(
                    rawResults[index].toString(),
                    18,
                    6
                  ),
                };

          setPresaleData((value) => ({ ...value, ...newData }));
        });
      } catch (e) {
        console.log("Fetch Farms With Balance Error:", e);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const calls = [
        {
          address: preslaeContractAddress,
          name: "user_deposits",
          params: [null],
        },
        {
          address: preslaeContractAddress,
          name: "WILDOwned",
          params: [null],
        },
        {
          address: preslaeContractAddress,
          name: "user_withdraw_amount",
          params: [null],
        },
        {
          address: preslaeContractAddress,
          name: "user_withdraw_timestamp",
          params: [null],
        },
        {
          address: preslaeContractAddress,
          name: "getAmountToWithdraw",
          params: [null],
        },
      ];

      try {
        const rawResults = await multicall(PresaleForkABI, calls);
        rawResults.map((data, index) => {
          const newData = {
            [calls[index]["name"]]:
              index === 3
                ? Number(rawResults[index])
                : toReadableAmount(rawResults[index].toString(), 18, 6),
          };
          setPresaleData((value) => ({ ...value, ...newData }));
        });
      } catch (e) {
        console.log("Fetch Farms With Balance Error:", e);
      }
    };
  }, []);

  return (
    <div className="w-full container max-w-[500px] mx-3">
      {!presaleData?.sale_finalized && !ended && (
        <>
          <p className="text-center text-3xl font-bold shadow-md shadow-black/50 py-3 bg-secondary/40 rounded-md mb-2 backdrop-blur-sm">
            $BILL SALE ENDS IN:
          </p>
          <CountDownComponent setEnded={setEnded} />
        </>
      )}

      <div className="tab_panel mx-auto">
        <div
          className={`tab_button py-[2px!important]  ${
            active === 0
              ? "main_btn hover:scale-[100%!important] hover:bg-[white!important] hover:text-[black!important]"
              : ""
          }`}
          onClick={() => setActive(0)}
        >
          Presale $BILL
        </div>
      </div>
      <div className="bg-secondary px-4 py-6 rounded-lg">
        <SaleComponent saleData={presaleData} />
      </div>
      <img
        src="/assets/stickers/presale-left.webp"
        alt=""
        className="fixed animate-pulse duration-1000 w-[150px] sm:w-[300px] md:w-[400px] lg:w-[500px] -z-[999] sm:inline-block bottom-8 left-3"
      />
      <img
        src="/assets/stickers/presale-right.webp"
        alt=""
        className="fixed animate-pulse duration-1000 w-[150px] sm:w-[300px] md:w-[400px] lg:w-[500px] -z-[999] sm:inline-block bottom-8 right-3"
      />
    </div>
  );
}
