/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SignupForm } from "./SignupForm";



export function LoginForm({setOpen,setLoggedIn}) {
  const [showSignup, setShowSignup] = useState(false); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify({ username, password }));
  
      const res = await fetch("https://amybd.com/demoapi.ashx?cmd=login", {
        method: "POST",
        body: formData,
      });
  
      const result = await res.json();
      console.log(result);
  
      if (result.mStatus === true && result.authid) {
        sessionStorage.setItem("authid", result.authid);
        setLoggedIn(true);
        alert("Login successful!");
        setOpen(false);
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };
  

  return (
    <div className="space-y-4">
      {!showSignup ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <h2 className="text-xl font-semibold">Login</h2>

          <div className="space-y-1 mt-3">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={remember}
              onChange={(e) =>
                setRemember((e.target as HTMLInputElement).checked)
              }
            />
            <Label htmlFor="remember">Remember me</Label>
          </div>

          <div className="flex justify-center">
            <Button type="submit" className="w-28 bg-[#0030ff] text-white">
              Login
            </Button>
          </div>

          {/* {error && <p className="text-red-500 text-center">{error}</p>} */}

          <div className="flex justify-between text-sm text-blue-600 mt-2">
            <button type="button" className="hover:underline">
              Forgot Password?
            </button>
            <button
              type="button"
              className="hover:underline"
              onClick={() => setShowSignup(true)}
            >
              Create New ID
            </button>
          </div>
        </form>
      ) : (
        <div className="max-w-md">
            <SignupForm />
        </div>
      )}
    </div>
  );
}
