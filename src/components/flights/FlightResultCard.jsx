"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FlightDetailsPanel from "./FlightDetailsPanel";
import { Plane } from "lucide-react";
import { useState } from "react";

const fmtTime = (iso) => (iso && iso.length >= 16 ? iso.slice(11, 16) : "—");

const fmtDur = (mins) =>
  typeof mins === "number"
    ? (mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins}m`)
    : "—";

    const logoSrcFromName = (name) => {
      const cleaned = (name || "")
        .trim()
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, "-")     
        .replace(/^-+|-+$/g, "");        
      return `https://www.amybd.com/images/logo/logo-${cleaned}.png`;
    };


/** one segment-row (no borders between rows) */
function SegmentRow({ airlineLabel,airCode,flightNo,from, to, departIso, arriveIso, durationMin, nonstop = true }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <div className="grid grid-cols-[150px_1fr] items-center gap-4 py-3">
      {/* airline label + tiny logo square */}
      <div className="flex items-start gap-2">
      {imgOk ? (
        <img
          src={logoSrcFromName(airlineLabel)}
          alt={`${airlineLabel} logo`}
          className="h-12 w-12 object-contain"
          onError={() => setImgOk(false)}
        />
      ) : (
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-primary">
          <Plane className="h-4 w-4" aria-hidden />
        </div>
      )}
       <div className="leading-tight">
          <div className="text-sm font-semibold">{airlineLabel}</div>
          {(airCode || flightNo) && (
            <div className="text-sm flex text-muted-foreground gap-1">
              <span>{airCode}</span>
              <span>{flightNo}</span>
            </div>
          )}
        </div>
      </div>

      {/* timeline */}
      <div className="grid grid-cols-[90px_1fr_90px] items-center gap-3">
        <div className="text-right">
          <div className="text-xl font-semibold leading-none">{fmtTime(departIso)}</div>
          <div className="text-xs text-muted-foreground">{from}</div>
        </div>

        <div className="relative text-center">
          <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-blue-200" />
          <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-blue-300 bg-white" />
          <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-blue-300 bg-white" />
          <div className="relative -top-2 text-xs text-muted-foreground">{fmtDur(durationMin)}</div>
          <div className="relative top-2 text-xs text-muted-foreground">
            {nonstop ? "Non Stop" : "Stop"}
          </div>
        </div>

        <div className="text-left">
          <div className="text-xl font-semibold leading-none">{fmtTime(arriveIso)}</div>
          <div className="text-xs text-muted-foreground">{to}</div>
        </div>
      </div>
    </div>
  );
}

export default function FlightResultCard({ item }) {
  const airline = item?.airline ?? item?.air_code ?? "—";
  const out =
    (item?.Trips ?? []).find((t) => t.TripNo === 1) || (item?.Trips ?? [])[0] || null;
  const ret = (item?.Trips ?? []).find((t) => t.TripNo === 2) || null;

  const fare = item?.Fares?.[0];
  const total = typeof fare?.tot_fare === "number" ? fare.tot_fare : null;

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-0">
        {/* two columns: segments | price/cta */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_220px]">
          {/* left: segments (no border between trips) */}
          <div className="p-3">
            {out && (
              <SegmentRow
                airlineLabel={airline}
                airCode={out.air_code ?? item?.air_code ?? ""}
                flightNo={out.fNo ?? ""}
                from={out.fFrom}
                to={out.fDest}
                departIso={out.fDTime}
                arriveIso={out.fATime}
                durationMin={out.fDuration}
                nonstop={out.fLayover === 0}
              />
            )}

            {ret && (
              <SegmentRow
                airlineLabel={airline}
                airCode={ret.air_code ?? item?.air_code ?? ""}
                flightNo={ret.fNo ?? ""}
                from={ret.fFrom}
                to={ret.fDest}
                departIso={ret.fDTime}
                arriveIso={ret.fATime}
                durationMin={ret.fDuration}
                nonstop={ret.fLayover === 0}
              />
            )}
          </div>

          {/* right: price + primary button (no yellow) */}
          <div className="flex items-center justify-center gap-3 p-4">
            <div className="text-right">
              <div className="text-lg font-bold">
                {total != null ? (
                  <>
                    BDT <span className="text-blue-700">{total.toLocaleString()}</span>
                  </>
                ) : (
                  "—"
                )}
              </div>
            </div>
            <Button type="button" className="rounded-md px-5 bg-primary text-primary-foreground hover:bg-primary/90">
              Select
            </Button>
          </div>
        </div>

        {/* footer */}
        <div className="flex border-t border-dashed items-end justify-end p-1">
          <FlightDetailsPanel
          item={item}
          trigger={
            <button
              type="button"
              className="text-sm font-semibold text-primary"
            >
              Flight Details
            </button>
          }
          />
        </div>
      </CardContent>
    </Card>
  );
}
