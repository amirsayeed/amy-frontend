"use client";
import StatBadges from "@/components/hero/StatBadges";
import TabsNav from "@/components/search/TabsNav";
export default function HeroSearchHeader() {
return (
    <header role="banner" aria-label="Find flights and hotels" className="relative isolate">
    <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url('/images/bgice.webp')" }} />
        <div className="absolute inset-0 -z-10 bg-black/30" />
        <div className="container mx-auto max-w-6xl px-4 py-6 md:py-10">
        <div className="select-none pb-4 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-xl tracking-tight">উড়াল দিন</h1>
        <div className="mt-3"><StatBadges /></div>
        </div>
        <div className="mx-auto max-w-6xl rounded-[22px]">
        <TabsNav />
        </div>
    </div>
    </header>
);
}