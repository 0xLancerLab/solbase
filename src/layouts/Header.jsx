import React, { useState } from "react";
import { Fade as Hamburger } from "hamburger-react";
import { routes } from "config";
import { WalletConnect } from "components/UI/ConnectButton";

export default function Header() {
  const currentUrl = window.location.pathname;
  const [isMobile, setMobile] = useState(false);

  return (
    <>
      <div className="py-3">
        <div className="container mr-auto ml-auto relative">
          <div className="flex justify-between">
            <div className="hidden sm:block logo">
              <a href="/">
                <img
                  src="/logo.png"
                  className="h-16 w-18"
                  alt=""
                />
                {/* <span className="text-symbol">3</span>WiLD */}
              </a>
            </div>
            <div
              className="text-symbol ml-2 block sm:hidden mt-[3px]"
              onClick={() => setMobile(!isMobile)}
            >
              <Hamburger />
            </div>

            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <ul className="nav_list">
                {routes.map((link, key) => (
                  <li
                    className={`list_item ${
                      currentUrl === link.url ? "active" : ""
                    }`}
                    key={key}
                  >
                    <a href={link.url}>{link.name}</a>
                    <div className="flex gap-[2px]">
                      <div className="h-1 w-full bg-symbol"></div>
                      <div className="w-1 h-1 bg-symbol rounded-full"></div>
                    </div>
                  </li>
                ))}
                <li className="list_item">
                  <a
                    href="https://lodgedocs.gitbook.io/wildbase-farm/protocol/about-bwild"
                    target="_blank"
                    className={`p-3`}
                    rel="noopener noreferrer"
                  >
                    Docs
                  </a>
                  <div className="flex gap-[2px]">
                    <div className="h-1 w-full bg-symbol"></div>
                    <div className="w-1 h-1 bg-symbol rounded-full"></div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="nav_action">
              <WalletConnect />
              <div
                className="text-symbol ml-2 hidden sm:block lg:hidden"
                onClick={() => setMobile(!isMobile)}
              >
                <Hamburger />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMobile === true ? (
        <div className="container mr-auto ml-auto">
          <div className="nav_bar mobile_navbar">
            <ul className="nav_list">
              {routes.map((link, key) => (
                <li
                  className={`list_item ${
                    currentUrl === link.url ? "active" : ""
                  }`}
                  key={key}
                >
                  <a href={link.url}>{link.name}</a>
                </li>
              ))}
              <li className={`list_item`}>
                <a
                  href="https://lodgedocs.gitbook.io/wildbase-farm/protocol/about-bwild"
                  target="_blank"
                  className={`p-3`}
                  rel="noopener noreferrer"
                >
                  {" "}
                  Docs
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
