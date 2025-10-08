"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function DateField({ label, date, setDate, withLink }: { label: string; date: Date | undefined; setDate: (d: Date | undefined) => void; withLink?: boolean; }) {

const [open, setOpen] = React.useState(false);

return (
    <div className="space-y-1 w-full">
        <Label className="pl-0.5 text-sm text-muted-foreground">{label}</Label>
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-full justify-start font-normal", !date && "text-muted-foreground")}>{date ? format(date, "dd-MMM-yyyyEEEE") : "Pick a date"}</Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 bg-white" align="start">
        <Calendar mode="single" selected={date} onSelect={(d) => { setDate(d); setOpen(false); }} initialFocus />
        </PopoverContent>
        </Popover>
        {withLink && (<a className="text-xs text-muted-foreground flex justify-end" href="#" onClick={(e)=>e.preventDefault()}>Flight Schedule</a>)}
    </div>
);
}