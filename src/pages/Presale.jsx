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
        <p className="text-center text-3xl font-bold  p-3 rounded-md mb-2 backdrop-blur-sm">
          BiLL SALE ENDS IN:
        </p>
        <div className="mb-12 flex gap-2 lg:gap-8 mt-3">
          <span className="shadow p-6 text-3xl  lg:text-4xl font-bold text-white bg-secondary/40 backdrop-blur-sm shadow-black rounded-2xl w-[55px] h-[55px] lg:w-[75px] lg:h-[75px] flex justify-center items-center">
            00
          </span>
          <span className="flex items-center font-extrabold text-5xl text-white">
            :
          </span>
          <span className="shadow p-6 text-3xl  lg:text-4xl font-bold text-white bg-secondary/40 backdrop-blur-sm shadow-black rounded-2xl w-[55px] h-[55px] lg:w-[75px] lg:h-[75px] flex justify-center items-center">
            00
          </span>
          <span className="flex items-center font-extrabold text-5xl text-white">
            :
          </span>
          <span className="shadow p-6 text-3xl  lg:text-4xl font-bold text-white bg-secondary/40 backdrop-blur-sm shadow-black rounded-2xl w-[55px] h-[55px] lg:w-[75px] lg:h-[75px] flex justify-center items-center">
            00
          </span>
          <span className="flex items-center font-extrabold text-5xl text-white">
            :
          </span>
          <span className="shadow p-6 text-3xl  lg:text-4xl font-bold text-white bg-secondary/40 backdrop-blur-sm shadow-black rounded-2xl w-[55px] h-[55px] lg:w-[75px] lg:h-[75px] flex justify-center items-center">
            00
          </span>
        </div>{" "}
      </>
      {/* )} */}
      <div className="bg-secondary px-4 py-6 rounded-lg flex w-full justify-center presale_form">
        <SaleComponent />
      </div>
      <img
        src="/assets/stickers/presale-left.webp"
        alt=""
        className="fixed animate-pulse duration-1000 w-[100px] sm:w-[200px] md:w-[250px] lg:w-[350px] -z-[999] sm:inline-block bottom-8 left-64"
      />
      <img
        src="/assets/stickers/presale-right.webp"
        alt=""
        className="fixed animate-pulse duration-1000 w-[100px] sm:w-[200px] md:w-[250px] lg:w-[350px] -z-[999] sm:inline-block bottom-8 right-3"
      />
    </div>
  );
}
