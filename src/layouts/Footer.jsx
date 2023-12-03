import React from "react";
import { socials } from "config";
import moment from "moment";
export default function Footer() {
  return (
    <footer className="mx-auto grid grid-cols-12 absolute bottom-0 w-full mb-2 container">
      <div className="md:text-md text-sm mb-2 md:mb-0 justify-center md:justify-start  col-span-12 md:col-span-6 flex items-center">
        (C) WiLD BASE {moment().format("YYYY")}
        <span className="font-semibold mx-2">( v1.0 )</span> All Rights
        Reserved.
      </div>
      <div className="gap-2 col-span-12 md:col-span-6 flex md:justify-end justify-center  items-center">
        {[
          // {
          //   icon: () => null,
          //   name: "BSC Wild",
          //   href: "https://basc-wildbase-farm.vercel.app/",
          // },
          {
            icon: () => null,
            name: "Docs",
            href: "https://lodgedocs.gitbook.io/wildbase-farm/protocol/about-bwild",
          },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              href={item.href}
              key={index}
              className={`p-3 flex items-center gap-1 hover:text-gray-400 `}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon />
              {item.name}
            </a>
          );
        })}
        {socials.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              href={item.href}
              key={index}
              className={`p-1 flex items-center justify-center gap-2 my-auto hover:text-gray-400 bg-secondary rounded-full h-[37px] w-[37px]`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon />
              {item.name}
            </a>
          );
        })}
      </div>
    </footer>
  );
}
