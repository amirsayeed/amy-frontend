"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FlightDetailsPanel from "./FlightDetailsPanel";
import { Plane } from "lucide-react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

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


  function SegmentRow({ airlineLabel,airCode,flightNo,from, to, departIso, arriveIso, durationMin, nonstop = true }) {
    const [imgOk, setImgOk] = useState(true);
    return (
      <div className="grid grid-cols-[150px_1fr] items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-2">
        {imgOk ? (
          <div>
              <img
              src={logoSrcFromName(airlineLabel)}
              alt={`${airlineLabel} logo`}
              className="h-16 w-16 object-contain"
              onError={() => setImgOk(false)}
            />
          </div>
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-primary">
            <Plane className="h-4 w-4" aria-hidden />
          </div>
        )}
        <div className="leading-tight">
            <div className="text-sm font-extrabold">{airlineLabel}</div>
            {(airCode || flightNo) && (
              <div className="text-sm font-semibold flex text-muted-foreground gap-1">
                <span>{airCode}</span>
                <span>{flightNo}</span>
              </div>
            )}
          </div>
        </div>

        {/* timeline */}
        <div className="inline-grid grid-cols-[90px_auto_90px] items-center gap-3 mx-auto">
          <div className="text-right">
            <div className="text-xl font-semibold leading-none">{fmtTime(departIso)}</div>
            <div className="text-sm font-semibold text-muted-foreground">{from}</div>
          </div>

        <div className="relative text-center">
          <svg
            viewBox="0 0 100 2"
            preserveAspectRatio="none"
            className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] w-full"
          >
            <line x1="0" y1="1" x2="100" y2="1" stroke="#bfdbfe" strokeWidth="2" />
          </svg>

          <svg
            viewBox="0 0 12 12"
            className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4"
            aria-hidden
          >
            <path
              d="M1 6H9M6 3l3 3-3 3"
              fill="none"
              stroke="#1d4ed8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="relative -top-2 text-xs font-semibold text-muted-foreground">
            {fmtDur(durationMin)}
          </div>
          <div className="relative font-semibold top-2 text-xs text-muted-foreground">
            {nonstop ? "Non Stop" : "Stop"}
          </div>
        </div>

          <div className="text-left">
            <div className="text-xl font-semibold leading-none">{fmtTime(arriveIso)}</div>
            <div className="text-sm font-semibold text-muted-foreground">{to}</div>
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
        <CardContent className="px-2">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_220px]">
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

            <div className="flex flex-col items-center justify-center gap-3 p-3">
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
          <div className="flex border-t border-dashed items-end justify-end p-1 mr-2">
            <FlightDetailsPanel
            item={item}
            trigger={
              <button
                type="button"
                className="flex items-center text-sm font-semibold text-primary"
              >
                <span>Flight Details</span>
                <span><FaArrowRight/></span>
              </button>
            }
            />
          </div>
        </CardContent>
      </Card>
    );
  }
