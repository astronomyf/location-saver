import { getErrorMessage } from "@/lib/getErrorMessage";
import { LngLat } from "@/types/map/places-query";
import { NextRequest, NextResponse } from "next/server";
import { API_KEY } from "../[query]/route";

interface SearchCoordinatesArgs {
  coordinates: LngLat;
}

export async function POST(req: NextRequest) {
  try {
    const { coordinates }: Partial<SearchCoordinatesArgs> = await req.json();

    if (!coordinates) throw new Error("No coordinates provided");

    const url = `https://api.maptiler.com/geocoding/${coordinates[0]},${coordinates[1]}.json?key=${API_KEY}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return new NextResponse(getErrorMessage(err), { status: 500 });
  }
}
