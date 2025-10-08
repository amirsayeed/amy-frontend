"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function PlaceField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; }) {

return (
    <div className="space-y-1 w-full">
        <Label className="pl-0.5 text-sm text-muted-foreground">{label}</Label>
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder || "City or Airport"} />
        <div className="text-xs text-muted-foreground flex justify-end">Airport Info</div>
    </div>
);
}