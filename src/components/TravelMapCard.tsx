import { Quote } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RealWorldMap } from "@/components/RealWorldMap";

function MiniMountains() {
  return (
    <svg
      viewBox="0 0 230 120"
      className="h-full w-full"
      role="img"
      aria-label="Minimal mountain illustration"
    >
      <path
        d="M16 103 72 30l28 43 18-26 76 56"
        fill="#F7F4EE"
        stroke="#BEB19E"
        strokeWidth="2"
      />
      <path
        d="M72 30 83 62l17 11m18-26 9 31"
        stroke="#BEB19E"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M21 104c45-18 101-18 184 0"
        stroke="#CDBFA9"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M180 25c4-2 8-2 12 0m12 12c5-3 10-3 15 0"
        stroke="#BEB19E"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TravelMapCard() {
  return (
    <Card className="overflow-hidden bg-parchment">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
        <CardTitle>Where do you want to go next?</CardTitle>
        
      </CardHeader>
      <CardContent className="space-y-5">
        <RealWorldMap />
        <div className="grid items-center gap-5 rounded-[1.75rem] bg-[#F5F0E7] border border-[#E5DCC8] px-6 py-5 md:grid-cols-[1fr_220px]">
          <figure className="flex gap-4">
            <Quote className="mt-1 h-7 w-7 shrink-0 fill-[#2F4F3E] text-[#2F4F3E]" />
            <div>
              <blockquote className="max-w-md text-base font-semibold leading-7 text-[#3A3A3A]">
                The world is a book and those who do not travel read only one
                page.
              </blockquote>
              <figcaption className="mt-2 text-sm font-medium text-[#8B8B8B]">
                - Saint Augustine
              </figcaption>
            </div>
          </figure>
          <div className="hidden h-32 md:block opacity-60">
            <MiniMountains />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
