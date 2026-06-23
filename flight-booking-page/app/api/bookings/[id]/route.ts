import { NextResponse } from "next/server";
import { bookingsStore } from "@/lib/data";

// PATCH /api/bookings/:id - Actualiza el estado de una reserva
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const booking = bookingsStore.find((b) => b.id === id);

  if (!booking) {
    return NextResponse.json(
      { error: "Reserva no encontrada" },
      { status: 404 }
    );
  }

  try {
    const body = await request.json();
    if (body.status && ["pendiente", "confirmada", "cancelada"].includes(body.status)) {
      booking.status = body.status;
    }
    return NextResponse.json({ booking });
  } catch {
    return NextResponse.json({ error: "Solicitud invalida" }, { status: 400 });
  }
}

// DELETE /api/bookings/:id - Elimina una reserva
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const index = bookingsStore.findIndex((b) => b.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: "Reserva no encontrada" },
      { status: 404 }
    );
  }

  bookingsStore.splice(index, 1);
  return NextResponse.json({ success: true });
}
