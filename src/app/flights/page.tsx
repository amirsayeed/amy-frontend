import FiltersSidebar from "@/components/flights/FiltersSidebar";
import FlightResultCard from "@/components/flights/FlightResultCard";
import { Key } from "react";

async function getData() {
  const res = await fetch("https://amybd.com/amyset/flightresult.json", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch flights");
  return res.json();
}

export default async function FlightsPage() {
  const data = await getData();
  const list = data?.TripList ?? [];

  return (
    <div>
        <div className="mx-auto max-w-6xl mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[280px_minmax(0,1fr)] p-3">
          <aside>
            <FiltersSidebar />
          </aside>
          <div className="container mx-auto max-w-6xl space-y-4 px-4">
          {list.map((it: unknown, i: Key | null | undefined) => (
            <FlightResultCard key={i} item={it} />
          ))}
          {list.length === 0 && (
            <div className="text-sm text-muted-foreground">No flights found.</div>
          )}
        </div>
        </div>
    </div>
  );
}
