import React, { useState, useEffect } from "react";
import { useAccount, useNetwork } from "wagmi";
import { useEthersSigner } from "hooks/useEthers";
import { toReadableAmount } from "utils/customHelpers";
import ClaimComponent from "components/ClaimComponent";
import SaleComponent from "components/SaleComponent";
import useRefresh from "hooks/useRefresh";
import PresaleABI from "config/abis/presale.json";
import { getPresaleAddress } from "utils/addressHelpers";
import multicall from "utils/multicall";
import { CountDownComponent } from "../components/CountDown";

export default function Presale() {
  const preslaeContractAddress = getPresaleAddress();
  const signer = useEthersSigner();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { fastRefresh } = useRefresh();

  const [active, setActive] = useState(0);
  const [presaleData, setPresaleData] = useState({});

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
        const rawResults = await multicall(PresaleABI, calls);
        rawResults.map((data, index) => {
          const newData =
            index < 2
              ? { [calls[index]["name"]]: data[0] }
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
  }, [fastRefresh]);

  useEffect(() => {
    const fetchData = async () => {
      const calls = [
        {
          address: preslaeContractAddress,
          name: "WILDOwned",
          params: [address],
        },
        {
          address: preslaeContractAddress,
          name: "user_deposits",
          params: [address],
        },
        {
          address: preslaeContractAddress,
          name: "user_withdraw_amount",
          params: [address],
        },
        {
          address: preslaeContractAddress,
          name: "getAmountToWithdraw",
          params: [address],
        },
        {
          address: preslaeContractAddress,
          name: "user_withdraw_timestamp",
          params: [address],
        },
      ];

      try {
        const rawResults = await multicall(PresaleABI, calls);
        rawResults.map((data, index) => {
          const newData = {
            [calls[index]["name"]]:
              index === 4
                ? Number(rawResults[index])
                : toReadableAmount(rawResults[index].toString(), 18, 6),
          };

          setPresaleData((value) => ({ ...value, ...newData }));
        });
      } catch (e) {
        console.log("Fetch Farms With Balance Error:", e);
      }
    };

    if (address) {
      fetchData();
    }
  }, [address]);

  return (
    <div className="w-full container max-w-[500px] mx-3">
      <p className="text-center text-3xl font-bold shadow-md shadow-black/50 py-3 bg-secondary/40 rounded-md mb-2 backdrop-blur-sm">Farms Starts In: </p>
      <CountDownComponent />
      <div className="tab_panel mx-auto">
        <div
          className={`tab_button py-[2px!important]  ${
            active === 0
              ? "main_btn hover:scale-[100%!important] hover:bg-[white!important] hover:text-[black!important]"
              : ""
          }`}
          onClick={() => setActive(0)}
        >
          Sale
        </div>
        <div
          className={`tab_button py-[2px!important]  ${
            active === 1
              ? "main_btn hover:scale-[100%!important] hover:bg-[white!important] hover:text-[black!important]"
              : ""
          }`}
          onClick={() => setActive(1)}
        >
          Claim
        </div>
      </div>
      <div className="bg-secondary px-4 py-6 rounded-lg">
        {active === 0 ? (
          <SaleComponent saleData={presaleData} />
        ) : (
          <ClaimComponent saleData={presaleData} />
        )}
      </div>
    </div>
  );
}
