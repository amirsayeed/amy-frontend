"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { BedDouble, Users, Plus, Minus, RotateCcw, Search } from "lucide-react";
import PlaceField from "@/components/search/common/PlaceField";
import DateField from "@/components/search/common/DateField";

function RoomsSelect({
  value, onChange,
}: { value: number; onChange: (v: number) => void }) {
  return (
    <Select value={String(value)} onValueChange={(v) => onChange(Number(v))}>
      <SelectTrigger className="w-[140px]">
        <div className="flex items-center gap-2">
          <BedDouble className="h-4 w-4" /> Room - {value}
        </div>
        <SelectValue placeholder="Room - 1" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <SelectItem key={n} value={String(n)}>{n}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function GuestsPopover({
  adults, children, onChange,
  }: { adults: number; children: number; onChange: (a: number, c: number) => void }) {
  const total = adults + children;
  const inc = (k: "a" | "c") =>
    k === "a" ? onChange(adults + 1, children) : onChange(adults, children + 1);
  const dec = (k: "a" | "c") =>
    k === "a" ? onChange(Math.max(1, adults - 1), children) : onChange(adults, Math.max(0, children - 1));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Users className="h-4 w-4" /> Guests - {total}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-white">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Adults</div>
              <div className="text-xs text-muted-foreground">12+ years</div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => dec("a")}><Minus className="h-4 w-4" /></Button>
              <div className="min-w-6 text-center text-sm">{adults}</div>
              <Button variant="outline" size="icon" onClick={() => inc("a")}><Plus className="h-4 w-4" /></Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Children</div>
              <div className="text-xs text-muted-foreground">2–10 years</div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => dec("c")}><Minus className="h-4 w-4" /></Button>
              <div className="min-w-6 text-center text-sm">{children}</div>
              <Button variant="outline" size="icon" onClick={() => inc("c")}><Plus className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function HotelForm() {
  const [rooms, setRooms] = React.useState(1);
  const [adults, setAdults] = React.useState(2);
  const [children, setChildren] = React.useState(0);

  const [location, setLocation] = React.useState("");
  const [checkin, setCheckin] = React.useState<Date | undefined>(new Date());
  const [checkout, setCheckout] = React.useState<Date | undefined>(undefined);

  const clearAll = () => {
    setRooms(1); 
    setAdults(2); 
    setChildren(0);
    setLocation(""); 
    setCheckin(new Date()); setCheckout(undefined);
  };

  const isValid = location.trim() && !!checkin && !!checkout;

  return (
    <Card className="border-none shadow-2xl">
      <CardContent className="space-y-5 bg-white/95 p-5 md:p-7 rounded-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <RoomsSelect value={rooms} onChange={setRooms} />
          <GuestsPopover
            adults={adults}
            children={children}
            onChange={(a, c) => { setAdults(a); setChildren(c); }}
          />
          <div className="ml-auto">
            <Button variant="outline" size="icon" title="Clear" className="rounded-xl" type="button" onClick={clearAll}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Fields row */}
        <div className="flex flex-col md:flex-row gap-2 items-start justify-between">
          <div className="w-full">
            <PlaceField label="Location" value={location} onChange={setLocation} />
          </div>
          <div className="w-full">
            <DateField label="Check-In" date={checkin} setDate={setCheckin} />
          </div>
          <div className="w-full">
            <DateField label="Check-Out" date={checkout} setDate={setCheckout} />
          </div>
          <div className="md:col-span-1 hidden md:block" />
        </div>

        <div className="flex justify-center pt-2">
          <Button
            size="lg"
            disabled={!isValid}
            className="px-7 rounded-xl bg-[#0030ff] text-white hover:bg-primary/90 disabled:opacity-60"
            type="button"
          >
            <Search className="mr-2 h-4 w-4" /> Search Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
