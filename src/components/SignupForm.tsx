"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [introducerCode, setIntroducerCode] = useState("");
  const [city, setCity] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
          <h2 className="text-xl font-semibold">Create a New Account</h2>

          <div className="space-y-1">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              type="text"
              id="mobile"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

        <div className="flex justify-between">
        <div className="space-y-1">
            <Label htmlFor="introducer">Introducer Code (optional)</Label>
            <Input
              type="text"
              id="introducer"
              placeholder="Enter code if any"
              value={introducerCode}
              onChange={(e) => setIntroducerCode(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="city">City</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger id="city">
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dhaka">Dhaka</SelectItem>
                <SelectItem value="Chattogram">Chattogram</SelectItem>
                <SelectItem value="Sylhet">Sylhet</SelectItem>
                <SelectItem value="Khulna">Khulna</SelectItem>
              </SelectContent>
            </Select>
          </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onChange={(e) =>
                setAgreeTerms((e.target as HTMLInputElement).checked)
              }
            />
            <Label htmlFor="terms">I agree to the Terms & Conditions</Label>
          </div>

          <div className="flex justify-center">
          <Button type="submit" className="w-28 bg-[#0030ff] text-white">
            Signup
          </Button>
          </div>
        </form>
  );
}
