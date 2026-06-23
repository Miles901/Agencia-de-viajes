"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/booking-modal";

export function BookingButton({
  destinationName,
  price,
}: {
  destinationName: string;
  price: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button className="w-full" size="lg" onClick={() => setOpen(true)}>
        Reservar ahora
      </Button>
      <BookingModal
        isOpen={open}
        onClose={() => setOpen(false)}
        destinationName={destinationName}
        price={price}
      />
    </>
  );
}
