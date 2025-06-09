"use client";
import { useEffect, useRef } from "react";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const Hero = () => {
  const imageRef = useRef(null);

  console.log("Hero component rendered");

  useEffect(() => {
    console.log("Hero component mounted");
    const imageElement = imageRef.current;
    console.log("Image Element:", imageElement);
    // console.log(window.scrollY);

    const handleScroll = () => {
      const scrollPositoin = window.scrollY;
      const scrollThreshold = 20;
      // console.log({ scrollPositoin, scrollThreshold });

      if (scrollPositoin > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto  text-center pb-5">
        <div className="">
          <h1 className="text-[105px] gradient max-md:text-6xl max-sm:text-3xl max-lg:text-6xl max-xl:text-7xl">
            Welcome to FinSight AI
          </h1>
          <p className="text-xl max-sm:text-sm text-gray-600 mb-8 max-w-2xl mx-auto">
            AI-Powered Insights for a Brighter Financial Future.
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Link href={"/dashboard"}>
            <Button size={"lg"} className="px-4">
              Get Started
            </Button>
          </Link>
          <Link href={"/dashboard"}>
            <Button variant={"outline"} size={"lg"} className="px-4">
              Watch Demo
            </Button>
          </Link>
        </div>
      </div>

      <div className="hero-image-wrapper ">
        <div ref={imageRef} className="hero-img ">
          <Image
            width={1000}
            height={1000}
            src={"/bg1.jpg"}
            alt="Hero Image"
            className="w-[80%] mx-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
