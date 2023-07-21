import { getErrorMessage } from "@/lib/getErrorMessage";
import { signURL } from "@/lib/services/signUrl";
import { NextRequest, NextResponse } from "next/server";

interface SearchQueryArgs {
  query: string;
}

export const ACCESS_TOKEN =
  "023c4702936e444c8c8f0b9155cbc459_b169f0dea1ae6877c29a6f20dae49df5afb21c65dcc20ce9edc7bdad9501b713";

export async function GET(
  req: NextRequest,
  { params }: { params: SearchQueryArgs }
) {
  try {
    const { query } = params;
    if (!query || query.length < 3) return NextResponse.json({});

    const url = `https://api.maptiler.com/geocoding/${query}.json?fuzzyMatch=true&limit=5`;
    const signedUrl = signURL(url, ACCESS_TOKEN);

    const response = await fetch(signedUrl, {
      method: "GET",
      headers: {
        Authorization: `Token ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (err) {
    return new NextResponse(getErrorMessage(err), { status: 500 });
  }
}
