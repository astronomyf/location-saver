import { getErrorMessage } from "@/lib/getErrorMessage";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

interface LoadJSONArgs {
  fileName: string;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get("fileName");

    if (!fileName) return NextResponse.json({});

    const jsonDirectory = path.join(process.cwd(), "json");

    //Read the json data file data.json
    const data = await fs.readFile(`${jsonDirectory}/${fileName}.json`, "utf8");

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return new NextResponse(getErrorMessage(err), { status: 500 });
  }
}
