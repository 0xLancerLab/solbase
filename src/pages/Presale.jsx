import React, { useState } from "react";
import SaleComponent from "components/SaleComponent";
import { CountDownComponent } from "../components/CountDown";

export default function Presale() {
  const [active, setActive] = useState(1);
  const [ended, setEnded] = useState(false);

  return (
    <div className="w-full container flex flex-col justify-center items-center max-w-[500px] mx-3">
      {/* {!ended && ( */}
      <>
        <p className="text-center text-3xl font-bold shadow-md shadow-black/50 py-3 bg-secondary/40 rounded-md mb-2 backdrop-blur-sm">
          BiLL SALE ENDS IN:
        </p>
        <CountDownComponent endDate={1711552461000} setEnded={setEnded} />
      </>
      {/* )} */}
      <div className="bg-secondary px-4 py-6 rounded-lg flex w-full justify-center">
        <SaleComponent />
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
