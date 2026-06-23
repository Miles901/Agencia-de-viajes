"use client";

import { useState } from "react";
import { Clock, Percent, Plane, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/booking-modal";

const offers = [
  {
    id: 1,
    title: "Escapada a Cartagena",
    description: "Vuelo + 3 noches de hotel con desayuno incluido",
    originalPrice: 850,
    discountPrice: 599,
    discount: 30,
    destination: "Cartagena, Colombia",
    validUntil: "15 Jun 2026",
    image: "https://images.unsplash.com/photo-1583531172005-814193749ed8?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Machu Picchu Express",
    description: "Vuelo + Tour guiado + Entrada a Machu Picchu",
    originalPrice: 1200,
    discountPrice: 899,
    discount: 25,
    destination: "Cusco, Peru",
    validUntil: "30 Jun 2026",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Medellin City Break",
    description: "Vuelo ida y vuelta + 4 noches + City tour",
    originalPrice: 720,
    discountPrice: 549,
    discount: 24,
    destination: "Medellin, Colombia",
    validUntil: "20 Jun 2026",
    image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=400&h=300&fit=crop",
  },
];

type Offer = typeof offers[0];

export function SpecialOffers() {
  const [selected, setSelected] = useState<Offer | null>(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Percent className="h-4 w-4" />
            Ofertas por Tiempo Limitado
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Ofertas Especiales
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Aprovecha nuestras promociones exclusivas y ahorra en tu proximo viaje
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                  -{offer.discount}%
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-foreground/80 text-background px-3 py-1 rounded-full text-xs">
                  <Clock className="h-3 w-3" />
                  Hasta {offer.validUntil}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <Plane className="h-4 w-4" />
                  {offer.destination}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{offer.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{offer.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-muted-foreground line-through text-sm">
                      ${offer.originalPrice} USD
                    </span>
                    <div className="text-2xl font-bold text-primary">
                      ${offer.discountPrice} USD
                    </div>
                  </div>
                  <Button
                    onClick={() => setSelected(offer)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Reservar
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <BookingModal
          isOpen={!!selected}
          onClose={() => setSelected(null)}
          destinationName={selected.title}
          price={selected.discountPrice}
          bookingType="tour"
        />
      )}
    </section>
  );
}
