import Link from "next/link";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { destinations } from "@/lib/data";

export function Destinations() {
  const featured = destinations.slice(0, 4);
  return (
    <section id="destinos" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Destinos Populares
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explora los destinos mas solicitados en Colombia y Peru con ofertas exclusivas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((dest) => (
            <Link key={dest.id} href={`/destinos/${dest.id}`}>
              <Card
                className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 h-full"
              >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">{dest.rating}</span>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{dest.country}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">{dest.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{dest.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">Desde</span>
                    <p className="text-xl font-bold text-primary">${dest.price} USD</p>
                  </div>
                  <span className="text-sm font-medium text-primary group-hover:underline">
                    Ver detalles
                  </span>
                </div>
              </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/destinos">
              Ver todos los destinos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
