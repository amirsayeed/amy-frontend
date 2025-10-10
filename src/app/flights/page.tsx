"use client";

import { useEffect, useState } from "react";
import FiltersSidebar from "@/components/flights/FiltersSidebar";
import FlightResultCard from "@/components/flights/FlightResultCard";
import FlightsBanner from "@/components/flights/FlightsBanner";

export default function FlightsPage() {
  const [flights, setFlights] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    async function fetchFlights() {
      const res = await fetch("https://amybd.com/amyset/flightresult.json");
      const data = await res.json();
      setFlights(data?.TripList ?? []);
    }
    fetchFlights();
  }, []);

  // Sorting / filtering logic
  const handleSortChange = (value) => {
    const sorted = [...flights];

    if (value === "fastest") {
      sorted.sort((a, b) => {
        const durA = a.Trips?.[0]?.fDuration || 0;
        const durB = b.Trips?.[0]?.fDuration || 0;
        return durA - durB;
      });
    }

    if (value === "cheapest") {
      sorted.sort((a, b) => {
        const fareA = a.Fares?.[0]?.tot_fare || 0;
        const fareB = b.Fares?.[0]?.tot_fare || 0;
        return fareA - fareB;
      });
    }

    if (value === "departure") {
      sorted.sort((a, b) => {
        const depA = new Date(a.Trips?.[0]?.fDTime).getTime();
        const depB = new Date(b.Trips?.[0]?.fDTime).getTime();
        return depA - depB;
      });
    }

    setFiltered(sorted);
  };

  const displayList = filtered.length ? filtered : flights;

  return (
    <div>
      <section className="relative">
        <FlightsBanner />
      </section>

      <div className="mx-auto max-w-6xl mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[280px_minmax(0,1fr)] p-3">
        <aside>
          <FiltersSidebar onSortChange={handleSortChange} />
        </aside>

        <div className="space-y-4 px-4">
          {displayList.map((it, i) => (
            <FlightResultCard key={i} item={it} />
          ))}

          {displayList.length === 0 && (
            <div className="text-sm text-muted-foreground">No flights found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
