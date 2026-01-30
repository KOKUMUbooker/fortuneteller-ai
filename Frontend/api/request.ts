import { API_BASE_URL } from "./urls";
import { PricingInputs } from "@/components/pricing-form";
import { PricingResult } from "@/components/result-card";

export const POSTS_CACHE_KEY = "posts" as const;

export async function makeRequest(input: PricingInputs): Promise<PricingResult> {
  const res = await fetch(`${API_BASE_URL}/post`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error(`An error occured : ${res.status} ${res.statusText}`);
  }

  return res.json();
}
