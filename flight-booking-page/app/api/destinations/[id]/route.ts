import { NextResponse } from "next/server";
import { destinations } from "@/lib/data";

// GET /api/destinations/:id - Obtiene un destino por ID
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const destination = destinations.find((d) => d.id === Number(id));

  if (!destination) {
    return NextResponse.json(
      { error: "Destino no encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: destination });
}
