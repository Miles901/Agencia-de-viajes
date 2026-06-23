import { NextResponse } from "next/server";
import { destinations } from "@/lib/data";

// GET /api/destinations - Lista todos los destinos
// Query params opcionales: ?country=Colombia&category=Playa&q=cartagena
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");
  const category = searchParams.get("category");
  const q = searchParams.get("q");

  let result = destinations;

  if (country) {
    result = result.filter(
      (d) => d.country.toLowerCase() === country.toLowerCase()
    );
  }
  if (category) {
    result = result.filter(
      (d) => d.category.toLowerCase() === category.toLowerCase()
    );
  }
  if (q) {
    result = result.filter((d) =>
      d.name.toLowerCase().includes(q.toLowerCase())
    );
  }

  return NextResponse.json({
    count: result.length,
    data: result,
  });
}
