"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeftRight, RotateCcw, Search, Plus, ArrowRight } from "lucide-react";
import PassengerPopover, { Pax } from "@/components/search/common/PassengerPopover";
import CabinSelect from "@/components/search/common/CabinSelect";
import PlaceField from "@/components/search/common/PlaceField";
import DateField from "@/components/search/common/DateField";
import { useRouter } from "next/navigation";


export type TripType = "oneway" | "roundtrip" | "multicity";

export default function FlightForm() {
  const [tripType, setTripType] = React.useState<TripType>("oneway");
  const [cabin, setCabin] = React.useState("economy");
  const [pax, setPax] = React.useState<Pax>({ adults: 1, children: 0, infants: 0, childDOBs: [] });
  const [umrah, setUmrah] = React.useState(false);
  const router = useRouter();

  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [depart, setDepart] = React.useState<Date | undefined>(new Date());
  const [ret, setRet] = React.useState<Date | undefined>(undefined); 

  const swap = () => { setFrom((prev) => { const tmp = to; setTo(prev); return tmp; }); };

  const clearAll = () => {
    setTripType("oneway");
    setCabin("economy");
    setPax({ adults: 1, children: 0, infants: 0, childDOBs: [] });
    setUmrah(false);
    setFrom("");
    setTo("");
    setDepart(undefined);
    setRet(undefined);
  };

  const onSearch = async () => {
    const payload = {
      tripType,
      cabin,
      pax,
      umrah,
      legs:
        tripType === "oneway"
          ? [{ from, to, date: depart }]
          : tripType === "roundtrip"
          ? [
              { from, to, date: depart },
              { from: to, to: from, date: ret },
            ]
          : [{ from, to, date: depart }], 
    };
    

    console.log("Search flights:", payload);
    router.push('/flights');
  };


  const isValid =
    from.trim() &&
    to.trim() &&
    !!depart &&
    (tripType !== "roundtrip" || !!ret);

  return (
    <Card className="border-none shadow-2xl bg-white/90">
      <CardContent className="space-y-5 p-5 md:p-7 rounded-3xl">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <RadioGroup
            value={tripType}
            onValueChange={(v: TripType) => setTripType(v as TripType)}
            className="flex flex-wrap gap-6"
          >
            {[
              ["oneway", "One Way"],
              ["roundtrip", "Round Trip"],
              ["multicity", "Multi City"],
            ].map(([val, label]) => (
              <div className="flex items-center space-x-2" key={val}>
                <RadioGroupItem
                  id={val}
                  value={val}
                  className="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                />
                <Label htmlFor={val} className="text-sm">
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <CabinSelect value={cabin} onChange={setCabin} />
          <PassengerPopover pax={pax} setPax={setPax} />

          <div className="flex items-center gap-2">
            <Checkbox id="umrah" checked={umrah} onCheckedChange={(c) => setUmrah(!!c)} />
            <Label htmlFor="umrah" className="text-sm">Umrah</Label>
          </div>

          <div className="ml-auto">
            <Button variant="outline" size="icon" title="Clear" className="rounded-xl" onClick={clearAll} type="button">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {tripType === "oneway" && (
          <div className="flex flex-col md:flex-row gap-2 items-start justify-between">
            <PlaceField label="Journey From" value={from} onChange={setFrom} />
            <div className="">
              <Button variant="secondary" size="icon" onClick={swap} className="mt-6 rounded-full" title="Swap" type="button">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
            <PlaceField label="Journey To" value={to} onChange={setTo} />
            <DateField label="Departing" date={depart} setDate={setDepart} withLink />
          </div>
        )}

        {tripType === "roundtrip" && (
          <div className="flex flex-col md:flex-row gap-1 items-start justify-evenly">
            <div className="w-full">
              <PlaceField label="Journey From" value={from} onChange={setFrom} />
            </div>

            <div className="">
              <Button variant="secondary" size="icon" onClick={swap} className="mt-6 rounded-full" title="Swap" type="button">
                <ArrowLeftRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="w-full">
              <PlaceField label="Journey To" value={to} onChange={setTo} />
            </div>

            <div className="w-full">
              <DateField label="Departing" date={depart} setDate={setDepart} withLink />
            </div>

            <div className="w-full">
              <DateField label="Returning" date={ret} setDate={setRet} withLink />
            </div>
          </div>
        )}

        {tripType === "multicity" && (
          <div className="flex flex-col md:flex-row gap-2 items-start justify-around">
            <div className="w-full">
              <PlaceField label="Journey From" value={from} onChange={setFrom} />
            </div>

            <div className="">
              <Button variant="secondary" size="icon" onClick={swap} className="mt-6 rounded-full" title="Swap" type="button">
                <ArrowLeftRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="w-full">
              <PlaceField label="Journey To" value={to} onChange={setTo} />
            </div>

            <div className="w-full">
              <DateField label="Departing" date={depart} setDate={setDepart} />
            </div>

            <div className="">
              <Button variant="secondary" className="mt-6 bg-[#0030ff] text-white rounded-xl" type="button" onClick={() => alert("+ Add Flight clicked")}>
                <Plus className="mr-2 h-4 w-4" /> Add Flight
              </Button>
            </div>
          </div>
        )}

        <div className="flex justify-center pt-2">
          <Button
            onClick={onSearch}
            disabled={!isValid}
            size="lg"
            className="px-7 rounded-xl bg-[#0030ff] text-white"
          >
            <Search className="mr-2 h-4 w-4" /> Search Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
