"use client";

import FlightForm from "../search/flights/FlightForm";

export default function FlightsBanner() {
  return (
    <div>
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/bg6.webp')" }}
          />
          <div className="absolute inset-0 -z-10 bg-black/30" />

          <div className="container mx-auto max-w-6xl px-4 py-6 md:py-10">
          <h1 className="text-center text-4xl md:text-5xl font-extrabold text-white drop-shadow">Flights</h1>

          <div className="mx-auto mt-4 max-w-6xl rounded-[22px]">
            <FlightForm />
          </div>
          </div>
    </div>
  );
}
