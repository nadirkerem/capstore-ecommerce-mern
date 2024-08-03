import React, { useState, useEffect } from "react";

export default function Hero() {
  return (
    <div
      className="hero h-[90vh]"
      style={{
        backgroundImage:
          "url(https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU)",
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-30"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-white">
            Welcome to Tech Haven
          </h1>
          <p className="mb-5 text-white">
            Discover the latest and greatest in tech gadgets. From smartphones
            to smart home devices, we have everything you need to stay ahead of
            the curve. Shop now and elevate your tech game!
          </p>
          <button className="btn btn-secondary">Shop Now</button>
        </div>
      </div>
    </div>
  );
}

Hero;
