"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { RotateCcw } from "lucide-react";


export default function FiltersSidebar({
  onSortChange,
  refundFilter = "any",
  onRefundChange = () => {},
  onReset = () => {},
  onwardSegment = null,               
  setOnwardSegment = () => {}   
  }) 
  {
  const segments = ["00–06", "06–12", "12–18", "18–00"] as const;
  const handleSegClick = (seg: typeof segments[number]) => {
    setOnwardSegment(onwardSegment === seg ? null : seg);
  };

  return (
    <Card className="border shadow-lg">
      <CardContent className="space-y-5 p-4 text-base">
      <div className="flex justify-between text-xl font-semibold">
        <span>Filters</span>
        <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 px-2"
        onClick={onReset} 
        title="Reset all filters"
      >
        <RotateCcw className="mr-1 h-4 w-4" />
        Reset
      </Button>
      </div>
      
      <Separator />

        <div className="flex flex-wrap items-center gap-5">
          <RadioGroup
            className="flex flex-wrap gap-5"
            onValueChange={(val) => onSortChange(val)}
          >
          <div className="flex items-center gap-2">
            <RadioGroupItem id="sort-cheapest" value="cheapest" />
            <Label htmlFor="sort-cheapest">Cheapest Fare</Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem id="sort-departure" value="departure" />
            <Label htmlFor="sort-departure">Departure Time</Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem id="sort-fastest" value="fastest" />
            <Label htmlFor="sort-fastest">Fastest Time</Label>
          </div>
        </RadioGroup>
        </div>

        <Separator />

        {/* Stops */}
        <div className="space-y-2">
          <div className="font-semibold">Any stops</div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox id="stops-direct" />
              <Label htmlFor="stops-direct">Direct flight</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="stops-one" />
              <Label htmlFor="stops-one">1 stop</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="stops-two" />
              <Label htmlFor="stops-two">2 stops</Label>
            </div>
          </div>
        </div>

        <Separator />

        {/* Airlines */}
        <div className="space-y-2">
          <div className="font-semibold">Airlines</div>
          <div className="space-y-3">
            {[
              { code: "BG", name: "Biman Bangladesh Airlines" },
              { code: "BS", name: "US-Bangla Airlines" },
              { code: "2A", name: "Air Astra" },
              { code: "VQ", name: "NOVOAIR" }
              
            ].map((a) => (
              <div key={a.code} className="flex items-center gap-2">
                <Checkbox id={`al-${a.code}`} />
                <Label htmlFor={`al-${a.code}`}>
                  {a.name} <span className="text-muted-foreground">({a.code})</span>
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Onward Day Segments*/}
        <div className="space-y-2">
          <div className="font-semibold">Onward Day Segments</div>
          <div className="grid grid-cols-2 gap-2">
            {segments.map((t) => {
              const active = onwardSegment === t;
              return (
                <Button
                  key={`onward-${t}`}
                  variant={active ? "default" : "outline"}  
                  size="sm"
                  className="justify-center"
                  type="button"
                  onClick={() => handleSegClick(t)}
                >
                  {t}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Return Day Segments */}
        <div className="space-y-2">
          <div className="font-semibold">Return Day Segments</div>
          <div className="grid grid-cols-2 gap-2">
            {["00–06", "06–12", "12–18", "18–00"].map((t) => (
              <Button
                key={`return-${t}`}
                variant="outline"
                size="sm"
                className="justify-center"
                type="button"
              >
                {t}
              </Button>
            ))}
          </div>
        </div>

        {/* Onward Layover time */}
        <div className="space-y-2">
          <div className="font-semibold">Onward Layover time</div>
          <div className="flex flex-wrap gap-2">
            {["0h–05h", "05h–10h", "10h–15h", "15h+"].map((t) => (
              <Button key={`layover-on-${t}`} variant="outline" size="sm" type="button">
                {t}
              </Button>
            ))}
          </div>
        </div>

        {/* Return Layover time */}
        <div className="space-y-2">
          <div className="font-semibold">Return Layover time</div>
          <div className="flex flex-wrap gap-2">
            {["0h–05h", "05h–10h", "10h–15h", "15h+"].map((t) => (
              <Button key={`layover-ret-${t}`} variant="outline" size="sm" type="button">
                {t}
              </Button>
            ))}
          </div>
        </div>

        {/* Onward Fare Range */}
        <div className="space-y-2">
          <div className="font-semibold">Onward Fare Range</div>
          <Slider defaultValue={[0, 100]} step={1} min={0} max={100} />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>BDT 6398</span>
            <span>BDT 12199</span>
          </div>
        </div>

        {/* Return Fare Range */}
        <div className="space-y-2">
          <div className="font-semibold">Return Fare Range</div>
          <Slider defaultValue={[0, 100]} step={1} min={0} max={100} />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>BDT 6398</span>
            <span>BDT 12199</span>
          </div>
        </div>

        <div className="space-y-2">
        <div className="font-semibold">Fare Type</div>
        <RadioGroup
          value={refundFilter}               
          onValueChange={onRefundChange}          
          className="flex flex-wrap gap-5"
        >

          <div className="flex items-center gap-2">
            <RadioGroupItem id="fare-ref" value="refundable" />
            <Label htmlFor="fare-ref">Refundable</Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem id="fare-nonref" value="nonrefundable" />
            <Label htmlFor="fare-nonref">Non-Refundable</Label>
          </div>
        </RadioGroup>
      </div>

        {/* Provider */}
        <div className="space-y-2">
          <div className="font-semibold">Provider</div>
          <div className="flex items-center gap-2">
            <Checkbox id="prov-bd" />
            <Label htmlFor="prov-bd">BD</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
