"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Building2, Globe, MoonStar, Map, Compass } from "lucide-react";
import FlightForm from "@/components/search/flights/FlightForm";
import { usePathname } from "next/navigation";
import HotelForm from "./hotels/HotelForm";
import VisaForm from "./visa/VisaForm";

const triggerBase =
  "flex-1 justify-center rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground " +
  "data-[state=active]:text-[#0B57D0] data-[state=active]:bg-white data-[state=active]:shadow-sm " +
  "relative after:absolute after:left-3 after:right-3 after:-bottom-[6px] after:h-[2px] " +
  "after:bg-[#0B57D0] after:opacity-0 data-[state=active]:after:opacity-100";

export default function TabsNav() {
  const pathname = usePathname();
  return (
    <Tabs defaultValue="flights" className="w-full">
      {
        pathname==='/' &&
        (
        <div className="rounded-2xl max-w-4xl mx-auto bg-white p-2 shadow-sm ring-1 ring-black/5">
        <TabsList className="mx-auto grid w-full grid-cols-6 gap-1 rounded-2xl bg-white p-1">
          <TabsTrigger value="flights" className={triggerBase}>
            <Plane className="mr-2 h-4 w-4" /> Flights
          </TabsTrigger>
          <TabsTrigger value="hotels" className={triggerBase}>
            <Building2 className="mr-2 h-4 w-4" /> Hotels
          </TabsTrigger>
          <TabsTrigger value="visa" className={triggerBase}>
            <Globe className="mr-2 h-4 w-4" /> Visa
          </TabsTrigger>
          <TabsTrigger value="umrah" className={triggerBase}>
            <MoonStar className="mr-2 h-4 w-4" /> Umrah
          </TabsTrigger>
          <TabsTrigger value="tours" className={triggerBase}>
            <Map className="mr-2 h-4 w-4" /> Tours
          </TabsTrigger>
          <TabsTrigger value="explore" className={triggerBase}>
            <Compass className="mr-2 h-4 w-4" /> Explore
          </TabsTrigger>
        </TabsList>
      </div>
        )
      }

      {/* Flights — Tab*/}
      <TabsContent value="flights" className="mt-2">
        <FlightForm />
      </TabsContent>

      
      {/* Hotels — Tab*/}
      <TabsContent value="hotels" className="mt-2">
        <HotelForm />
      </TabsContent>

      <TabsContent value="visa" className="mt-3">
        <VisaForm />
      </TabsContent>

      {(["umrah", "tours", "explore"] as const).map((key) => (
        <TabsContent key={key} value={key} className="mt-3">
          <Card className="border-none shadow-xl">
            <CardContent className="p-6 text-center text-muted-foreground">
              {key} module coming next.
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
