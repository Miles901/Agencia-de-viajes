"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Clock, Check, Hotel } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { packages, type TravelPackage } from "@/lib/data";
import { BookingModal } from "@/components/booking-modal";

export function Packages() {
  const [selected, setSelected] = useState<TravelPackage | null>(null);

  return (
    <section id="paquetes" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4">Paquetes todo incluido</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Paquetes completos: vuelo + hotel + tours
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Viaja sin preocupaciones con nuestros paquetes todo incluido. Un solo precio, cero complicaciones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={pkg.image || "/placeholder.svg"}
                  alt={`Paquete a ${pkg.destination}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {pkg.featured && <Badge className="bg-accent text-accent-foreground">Mas vendido</Badge>}
                  <Badge variant="secondary">{pkg.country}</Badge>
                </div>
                <div className="absolute top-3 right-3 bg-card/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-3 w-3 fill-accent text-accent" />
                  <span className="text-xs font-semibold">{pkg.rating}</span>
                </div>
              </div>

              <CardContent className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Clock className="h-4 w-4" />
                  {pkg.days} dias / {pkg.nights} noches
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">{pkg.title}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                  <Hotel className="h-4 w-4" />
                  {pkg.hotel}
                  <span className="flex">
                    {Array.from({ length: pkg.hotelStars }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                    ))}
                  </span>
                </div>

                <ul className="flex flex-col gap-1.5 mb-4 flex-1">
                  {pkg.includes.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 text-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                  {pkg.includes.length > 4 && (
                    <li className="text-sm text-primary font-medium">
                      +{pkg.includes.length - 4} mas incluidos
                    </li>
                  )}
                </ul>

                <div className="flex items-end justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-sm text-muted-foreground line-through">${pkg.oldPrice}</span>
                    <p className="text-2xl font-bold text-primary">
                      ${pkg.price} <span className="text-sm font-normal text-muted-foreground">USD</span>
                    </p>
                    <span className="text-xs text-muted-foreground">{pkg.reviews} reseñas</span>
                  </div>
                  <Button onClick={() => setSelected(pkg)}>Reservar</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selected && (
        <BookingModal
          isOpen={!!selected}
          onClose={() => setSelected(null)}
          destinationName={selected.title}
          price={selected.price}
          bookingType="package"
          packageInfo={{
            nights: selected.nights,
            days: selected.days,
            hotel: selected.hotel,
            hotelStars: selected.hotelStars,
            includes: selected.includes,
            oldPrice: selected.oldPrice,
            image: selected.image,
          }}
        />
      )}
    </section>
  );
}
