import React from "react";
import SaleComponent from "components/SaleComponent";


export default function Presale() {

  return (
    <div className="w-full container max-w-[500px] mx-3">
      <div className="tab_panel mx-auto">
        <div className={`tab_button py-[2px!important]`}>
          $bFARM TOKEN PRESALE
        </div>
      </div>
      <div className="bg-secondary px-4 py-6 rounded-lg">
        <SaleComponent  />
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
