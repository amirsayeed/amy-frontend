"use client";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
export default function CabinSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
return (
    <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[140px]"><SelectValue placeholder="Economy" /></SelectTrigger>
        <SelectContent className="bg-white">
        <SelectItem value="economy">Economy</SelectItem>
        <SelectItem value="premium">Premium Economy</SelectItem>
        <SelectItem value="business">Business</SelectItem>
        </SelectContent>
    </Select>
);
}