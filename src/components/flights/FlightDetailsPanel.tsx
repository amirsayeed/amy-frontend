"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const tHHmm = (iso) => (iso && iso.length >= 16 ? iso.slice(11, 16) : "—");
const tYYYYMMDD = (iso) => (iso ? iso.slice(0, 10) : "—");
const tDur = (m) =>
  typeof m === "number" ? (m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`) : "—";

function Leg({ title, seg }) {
  if (!seg) return null;

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="mb-3 text-base font-semibold">{title}</div>

      {/* timeline block */}
      <div className="grid grid-cols-[16px_1fr] gap-4">
        {/* left vertical line with dots */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
          <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full border border-primary bg-background" />
          <div className="absolute left-1/2 bottom-0 h-3 w-3 -translate-x-1/2 rounded-full border border-primary bg-background" />
        </div>

        {/* right content */}
        <div className="space-y-5">
          {/* depart */}
          <div className="grid grid-cols-[100px_1fr]">
            <div className="text-lg font-semibold">{tHHmm(seg.fDTime)}</div>
            <div className="text-base">
              <div className="font-medium">{seg.fFrom}</div>
              {seg.fDepTerminal ? (
                <div className="text-sm text-muted-foreground">
                  Terminal {seg.fDepTerminal}
                </div>
              ) : null}
              <div className="text-sm text-muted-foreground">{tYYYYMMDD(seg.fDTime)}</div>
            </div>
          </div>

          {/* middle meta */}
          <div className="pl-[100px] text-sm text-muted-foreground">
            {tDur(seg.fDuration)} • {seg.fLayover === 0 ? "Non Stop" : `${seg.fLayover} Stop`}
          </div>

          {/* arrive */}
          <div className="grid grid-cols-[100px_1fr]">
            <div className="text-lg font-semibold">{tHHmm(seg.fATime)}</div>
            <div className="text-base">
              <div className="font-medium">{seg.fDest}</div>
              {seg.fArrTerminal ? (
                <div className="text-sm text-muted-foreground">
                  Terminal {seg.fArrTerminal}
                </div>
              ) : null}
              <div className="text-sm text-muted-foreground">{tYYYYMMDD(seg.fATime)}</div>
            </div>
          </div>

          {/* aircraft & class */}
          <div className="pl-[100px] text-sm text-muted-foreground">
            {seg.fEquip ? `Aircraft: ${seg.fEquip}` : ""}{" "}
            {seg.fCabin ? `• Cabin: ${seg.fCabin}` : ""} {seg.fClass ? `• Class: ${seg.fClass}` : ""}
            {seg.fNo ? ` • Flight no: ${seg.fNo}` : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FlightDetailsPanel({ item, trigger }) {
  const airline = item?.airline ?? item?.air_code ?? "—";
  const out = (item?.Trips ?? []).find((t) => t.TripNo === 1) || item?.Trips?.[0] || null;
  const ret = (item?.Trips ?? []).find((t) => t.TripNo === 2) || null;

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="right" className="w-full max-w-xl overflow-y-auto p-5">
        <SheetHeader className="mb-3">
          <SheetTitle className="text-2xl">Flight Details</SheetTitle>
          <SheetDescription className="text-base">{airline}</SheetDescription>
        </SheetHeader>

        <div className="space-y-5">
          {out && <Leg title="Departure Flight" seg={out} />}
          {ret && <Leg title="Return Flight" seg={ret} />}

          {/* optional section */}
          <div className="rounded-lg border p-5 text-base">
            <div className="mb-2 font-semibold">Policy</div>
            <p className="text-muted-foreground">
              Refunds and date changes follow airline rules and service fees. Check fare rules
              before purchase.
            </p>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <SheetClose asChild>
            <Button variant="outline" className="text-base px-5 py-2">Close</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
