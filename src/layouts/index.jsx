import { CircleBackground } from "components/CircleBackground";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function index({ children }) {
  return (
    <div>
      <Header />
      <div className="flex w-full justify-center items-center  min-h-[calc(100vh-90px)] pb-[100px] relative px-1">
        {children}
        <Footer />
      </div>
      <div className="fixed -z-10 top-40 left-1/2 -translate-x-1/2 w-100">
        <img src="/assets/background.png" alt="" className="w-100 min-w-[500px] sm:min-w-[600px] md:min-w-[900px] opacity-70" />
      </div>
      <div className="fixed -z-10 lg:top-32 top-28 left-1/2 -translate-x-1/2 w-100">
        <CircleBackground  color="white" className="circle_animation -z-10 lg:w-[700px] lg:h-[700px] md:w-[500px] md:h-[500px] sm:w-[400px] sm:h-[400px]  w-[3s00px] h-[3s00px] " />
      </div>

      <div className="fixed top-[55%] left-[50%]  -translate-x-1/2 -translate-y-1/2  -z-20  rounded-full h-[50px] w-[50px] bg-symbol  blur-3xl"></div>
      <div className="fixed top-[55%] left-[50%]  -translate-x-1/2 -translate-y-1/2  -z-20  rounded-full h-[100px] w-[100px] bg-symbol/60  blur-3xl"></div>
      <div className="fixed top-[55%] left-[50%]  -translate-x-1/2 -translate-y-1/2  -z-20  rounded-full h-[200px] w-[200px] bg-symbol/50  blur-3xl"></div>
      <div className="fixed top-[55%] left-[50%]  -translate-x-1/2 -translate-y-1/2  -z-20  rounded-full h-[400px] w-[400px] bg-symbol/30  blur-3xl"></div>
      <div className="fixed top-[60%] left-[50%]  -translate-x-1/2 -translate-y-1/2  -z-20  rounded-full h-[1000px] w-[1000px] bg-symbol/10  blur-3xl"></div>
      <div className="fixed top-[60%] left-[50%]  -translate-x-1/2 -translate-y-1/2  -z-20  rounded-full h-[1300px] w-[1300px] bg-symbol/5  blur-3xl"></div>
    </div>
  );
}