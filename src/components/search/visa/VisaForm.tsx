"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function VisaForm() {
  const [country, setCountry] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");

  const isValid = country !== "" && category !== "";

  return (
    <Card className="border-none shadow-2xl">
      <CardContent className="space-y-5 rounded-3xl p-5 ">
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6 space-y-1">
            <Label className="pl-0.5 text-sm text-muted-foreground">Country</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="bangladesh">Bangladesh</SelectItem>
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="uae">United Arab Emirates</SelectItem>
                <SelectItem value="saudi">Saudi Arabia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-6 space-y-1">
            <Label className="pl-0.5 text-sm text-muted-foreground">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="tourist">Tourist Visa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <Button
            type="button"
            size="lg"
            disabled={!isValid}
            className="rounded-xl px-7 bg-[#0030ff] text-white hover:bg-primary/90 disabled:opacity-60"
          >
            <Search className="mr-2 h-4 w-4" />
            Search Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
