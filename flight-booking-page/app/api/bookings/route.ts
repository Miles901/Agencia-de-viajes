import { NextResponse } from "next/server";
import { bookingsStore, type Booking } from "@/lib/data";

// GET /api/bookings - Lista todas las reservas
export async function GET() {
  return NextResponse.json({
    count: bookingsStore.length,
    data: bookingsStore,
  });
}

// POST /api/bookings - Crea una nueva reserva
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, customerName, customerEmail, destination, date, passengers, total } =
      body;

    if (!customerName || !customerEmail || !destination || !date) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const booking: Booking = {
      id: `BK-${1000 + bookingsStore.length + 1}`,
      type: type === "tour" ? "tour" : type === "package" ? "package" : "flight",
      customerName,
      customerEmail,
      destination,
      date,
      passengers: Number(passengers) || 1,
      status: "pendiente",
      total: Number(total) || 0,
      createdAt: new Date().toISOString(),
    };

    bookingsStore.push(booking);

    return NextResponse.json({ booking }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Solicitud invalida" },
      { status: 400 }
    );
  }
}
