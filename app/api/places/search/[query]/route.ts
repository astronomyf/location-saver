import { getErrorMessage } from "@/lib/getErrorMessage";
import { NextRequest, NextResponse } from "next/server";
import { MAPTILER_API_KEY } from "..";

interface SearchQueryArgs {
  query: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: SearchQueryArgs }
) {
  try {
    const { query } = params;
    if (!query || query.length < 3) return NextResponse.json({});

    const url = `https://api.maptiler.com/geocoding/${query}.json?limit=5&key=${MAPTILER_API_KEY}`;

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
