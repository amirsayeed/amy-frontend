"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Users } from "lucide-react";


export type Pax = { adults: number; children: number; infants: number; childDOBs: (Date | null)[] };


function Pill({ value }: { value: number }) {
return <div className="inline-flex min-w-6 items-center justify-center rounded-full border px-2 text-sm font-medium">{value}</div>;
}

function CounterRow({ label, sub, value, min = 0, max = 9, onChange }: { label: string; sub?: string; value: number; min?: number; max?: number; onChange: (v: number) => void; }) {
const dec = () => onChange(Math.max(min, value - 1));
const inc = () => onChange(Math.min(max, value + 1));
return (
<div className="flex items-center justify-between gap-4 py-2">
<div>
<div className="text-sm font-medium leading-none">{label}</div>
{sub && <div className="text-xs text-muted-foreground">{sub}</div>}
</div>
<div className="flex items-center gap-2">
<Button variant="outline" size="icon" onClick={dec} disabled={value <= min}>−</Button>
<Pill value={value} />
<Button variant="outline" size="icon" onClick={inc} disabled={value >= max}>+</Button>
</div>
</div>
);
}


export default function PassengerPopover({ pax, setPax }: { pax: Pax; setPax: (p: Pax) => void }) {
const total = pax.adults + pax.children + pax.infants;
return (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2"><Users className="h-4 w-4" /> <span>{total}</span></Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-white">
            <div className="space-y-2">
            <CounterRow label="Adult" sub="12+ years" value={pax.adults} min={1} max={9} onChange={(v) => setPax({ ...pax, adults: v })} />
            <CounterRow label="Children" sub="2–11 years" value={pax.children} min={0} max={4} onChange={(v) => setPax({ ...pax, children: v, childDOBs: Array.from({ length: v }, (_, i) => pax.childDOBs[i] || null) })} />
            {pax.children > 0 && (
            <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: pax.children }).map((_, i) => (
            <div key={i} className="space-y-1">
            <Label className="text-xs">Child {i + 1} DOB</Label>
            <Input type="date" value={pax.childDOBs[i] ? new Date(pax.childDOBs[i]!).toISOString().slice(0,10) : ""} onChange={(e) => { const d = e.target.value ? new Date(e.target.value) : null; const arr = [...pax.childDOBs]; arr[i] = d; setPax({ ...pax, childDOBs: arr }); }} />
            </div>
            ))}
            </div>
            )}
            <CounterRow label="Infants" sub="< 2 years" value={pax.infants} min={0} max={2} onChange={(v) => setPax({ ...pax, infants: v })} />
            </div>
        </PopoverContent>
    </Popover>
);
}