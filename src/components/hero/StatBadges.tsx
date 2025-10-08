"use client";
import { BadgeCheck, CreditCard, Trophy } from "lucide-react";
export default function StatBadges() {
return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-white/95">
        <div className="flex items-center gap-2 text-sm font-medium">
        <BadgeCheck className="h-4 w-4" /> 24/7 Amy Support Team
        </div>
        <div className="flex items-center gap-2 text-sm font-medium">
        <CreditCard className="h-4 w-4" /> Secure & Easy Payment
        </div>
        <div className="flex items-center gap-2 text-sm font-medium">
        <Trophy className="h-4 w-4" /> Award-winning
        </div>
    </div>
);
}