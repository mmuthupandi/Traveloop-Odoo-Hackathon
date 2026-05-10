import { Plane, Quote, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

function WorldMap() {
  return (
    <div className="relative h-[260px] overflow-hidden rounded-[1.75rem] bg-[#F5F0E7]">
      <svg
        viewBox="0 0 760 330"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="World map with dotted travel route"
      >
        <defs>
          <pattern
            id="map-dot"
            x="0"
            y="0"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.5" fill="#C8BEAC" opacity="0.75" />
          </pattern>
          <clipPath id="north-america">
            <path d="M84 91c45-28 109-24 145 4 18 14 24 35 7 49-20 17-55 5-75 18-16 10-18 34-40 39-28 7-54-21-61-50-6-25 2-47 24-60Z" />
          </clipPath>
          <clipPath id="south-america">
            <path d="M234 178c27 13 47 41 43 82-3 34-25 59-43 51-17-7-10-35-27-54-16-19-39-27-37-52 2-23 31-42 64-27Z" />
          </clipPath>
          <clipPath id="europe-africa">
            <path d="M339 92c65-33 145-18 161 33 6 19-11 30-31 31-24 2-36 11-32 37 5 34 29 53 19 82-10 30-60 26-84 4-24-21-8-49-27-70-17-19-50-15-58-42-7-25 18-57 52-75Z" />
          </clipPath>
          <clipPath id="asia-australia">
            <path d="M501 105c65-42 158-29 192 25 17 26 7 55-23 64-35 11-68-11-95 2-24 11-27 42-51 42-31 0-55-44-46-83 4-20 10-35 23-50Zm104 138c37-10 73 4 87 28 9 16-4 31-28 30-35-1-74-21-59-58Z" />
          </clipPath>
        </defs>
        <rect width="760" height="330" fill="#F5F0E7" />
        <rect
          width="760"
          height="330"
          fill="url(#map-dot)"
          clipPath="url(#north-america)"
        />
        <rect
          width="760"
          height="330"
          fill="url(#map-dot)"
          clipPath="url(#south-america)"
        />
        <rect
          width="760"
          height="330"
          fill="url(#map-dot)"
          clipPath="url(#europe-africa)"
        />
        <rect
          width="760"
          height="330"
          fill="url(#map-dot)"
          clipPath="url(#asia-australia)"
        />
        <path
          d="M184 177C274 124 382 109 493 148c47 17 83 45 106 86"
          fill="none"
          stroke="#2F4F3E"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="8 11"
        />
      </svg>

      <div className="absolute left-[23%] top-[45%] grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-forest text-white shadow-float">
        <span className="h-3 w-3 rounded-full bg-white" />
      </div>
      <div className="absolute left-[54%] top-[36%] grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-forest text-white shadow-float">
        <span className="h-3 w-3 rounded-full bg-white" />
      </div>
      <div className="absolute right-[15%] top-[44%] grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-forest text-white shadow-float">
        <span className="h-3 w-3 rounded-full bg-white" />
      </div>
      <div className="absolute left-[67%] top-[63%] grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#E7DDCE] text-forest">
        <X className="h-5 w-5" />
      </div>
      <div className="absolute left-[62%] top-[52%] rounded-full bg-white/90 p-2 text-clay shadow-travel">
        <Plane className="h-5 w-5 rotate-45" />
      </div>
    </div>
  );
}

export function TravelMapCard() {
  return (
    <Card className="overflow-hidden bg-parchment">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
        <CardTitle>Where do you want to go next?</CardTitle>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="px-0 text-sm font-bold text-forest hover:bg-transparent hover:text-clay"
        >
          View on map
        </Button>
      </CardHeader>
      <CardContent className="space-y-5">
        <WorldMap />
        <div className="grid items-center gap-5 rounded-[1.75rem] bg-[#EFE5D5] px-6 py-5 md:grid-cols-[1fr_220px]">
          <figure className="flex gap-4">
            <Quote className="mt-1 h-6 w-6 shrink-0 fill-forest text-forest" />
            <div>
              <blockquote className="max-w-md text-base font-semibold leading-7 text-ink">
                The world is a book and those who do not travel read only one
                page.
              </blockquote>
              <figcaption className="mt-2 text-sm font-medium text-muted">
                - Saint Augustine
              </figcaption>
            </div>
          </figure>
          <div className="hidden h-32 md:block">
            <MiniMountains />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
