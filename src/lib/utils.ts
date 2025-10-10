import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function verifySession() {
  const authId = sessionStorage.getItem("authid");
  if (!authId) return { valid: false, message: "No session found" };

  const headers = new Headers();
  headers.append("authid", authId);

  const res = await fetch("https://amybd.com/demoapi.ashx?cmd=getverify", {
    method: "GET",
    headers,
    redirect: "follow",
  });

  const result = await res.json();
  return { valid: result?.mStatus === true, data: result };
}
