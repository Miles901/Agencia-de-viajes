import { NextResponse } from "next/server";
import { tourOperators } from "@/lib/data";

// GET /api/operators - Lista los operadores de tours
// Query param opcional: ?country=Peru
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");

  let result = tourOperators;
  if (country) {
    result = result.filter(
      (o) => o.country.toLowerCase() === country.toLowerCase()
    );
  }

  return NextResponse.json({
    count: result.length,
    data: result,
  });
}
