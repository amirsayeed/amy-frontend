"use client";

import { useEffect, useMemo, useState } from "react";
import FiltersSidebar from "@/components/flights/FiltersSidebar";
import FlightResultCard from "@/components/flights/FlightResultCard";
import FlightsBanner from "@/components/flights/FlightsBanner";

type Segment = "00–06" | "06–12" | "12–18" | "18–00" | null; 

export default function FlightsPage() {
  const [flights, setFlights] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [refundFilter, setRefundFilter] = useState("any");
  const [onwardSegment, setOnwardSegment] = useState<Segment>(null);

  useEffect(() => {
    async function fetchFlights() {
      const res = await fetch("https://amybd.com/amyset/flightresult.json");
      const data = await res.json();
      setFlights(data?.TripList ?? []);
    }
    fetchFlights();
  }, []);

  const inOnwardSegment = (iso?: string, seg: Segment) => {
    if (!seg || !iso) return true;
    const h = new Date(iso).getHours(); 

    switch (seg) {
      case "00–06": return h >= 0 && h < 6;
      case "06–12": return h >= 6 && h < 12;
      case "12–18": return h >= 12 && h < 18;
      case "18–00": return h >= 18 && h < 24; 
      default: return true;
    }
  };


  const matchesRefund = (it) => {
    if (refundFilter === "any") return true;
    const raw = (it?.fRefund || it?.Fares?.[0]?.fDesc || "").toString().toUpperCase();
    const isRefundable =
      raw.includes("REFUND") && !raw.includes("FR_0"); 
    return refundFilter === "refundable" ? isRefundable : !isRefundable;
  };

  const baseList = useMemo(() => {
    return (flights ?? []).filter((it) => {
      if (!matchesRefund(it)) return false;

      const trips = it?.Trips ?? [];
      const out = trips.find((t: any) => t?.TripNo === 1) ?? trips[0];
      const depIso = out?.fDTime as string | undefined;

      return inOnwardSegment(depIso, onwardSegment);
    });
  }, [flights, refundFilter, onwardSegment]);

  const handleSortChange = (value: "fastest"|"cheapest"|"departure") => {
    const sorted = [...baseList];
    if (value === "fastest") {
      sorted.sort((a, b) => (a.Trips?.[0]?.fDuration || 0) - (b.Trips?.[0]?.fDuration || 0));
    } else if (value === "cheapest") {
      sorted.sort((a, b) => (a.Fares?.[0]?.tot_fare || 0) - (b.Fares?.[0]?.tot_fare || 0));
    } else if (value === "departure") {
      sorted.sort(
        (a, b) =>
          new Date(a.Trips?.[0]?.fDTime || 0).getTime() -
          new Date(b.Trips?.[0]?.fDTime || 0).getTime()
      );
    }
    setFiltered(sorted);
  };

  useEffect(() => {
    setFiltered([]);
  }, [refundFilter, onwardSegment]);

  const handleReset = () => {
    setFiltered([]);
    setRefundFilter("any");
    setOnwardSegment(null);       
  };

  const displayList = filtered.length ? filtered : baseList;

  return (
    <div>
      <section className="relative">
        <FlightsBanner />
      </section>

      <div className="mx-auto max-w-6xl mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[300px_minmax(0,1fr)] p-3">
        <aside>
        <FiltersSidebar
          onSortChange={handleSortChange}
          refundFilter={refundFilter}
          onRefundChange={setRefundFilter}
          onReset={handleReset}
          onwardSegment={onwardSegment}                 
          setOnwardSegment={setOnwardSegment}         
        />
        </aside>

        <div className="space-y-3 px-2">
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
