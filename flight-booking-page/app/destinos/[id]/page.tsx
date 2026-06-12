import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Star,
  Clock,
  ArrowLeft,
  Check,
  Shield,
  Calendar,
  Users,
  CreditCard,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { destinations, getItinerary } from "@/lib/data";
import { BookingButton } from "@/components/booking-button";
import { DestinationGallery } from "@/components/destination-gallery";
import { DestinationItinerary } from "@/components/destination-itinerary";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export function generateStaticParams() {
  return destinations.map((dest) => ({ id: String(dest.id) }));
}

// Imagenes adicionales para la galeria por destino (usa las generadas + la principal)
const galleryExtras = [
  "/packages/cartagena.png",
  "/packages/machu-picchu.png",
  "/packages/medellin.png",
  "/packages/san-andres.png",
  "/packages/lima.png",
  "/packages/arequipa.png",
];

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destination = destinations.find((dest) => dest.id === Number(id));

  if (!destination) {
    notFound();
  }

  const itinerary = getItinerary(destination);
  const galleryImages = [destination.image, ...galleryExtras.slice(0, 4)];

  return (
    <>
    <Header />
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/destinos"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al catalogo
        </Link>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-4">
          <img
            src={destination.image || "/placeholder.svg"}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                {destination.category}
              </span>
              <div className="bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">{destination.rating}</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-background">
              {destination.name}
            </h1>
            <div className="flex items-center gap-3 text-background/90 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {destination.country}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {destination.duration}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <DestinationGallery images={galleryImages} name={destination.name} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground mb-4">Sobre el destino</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {destination.longDescription}
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">Que incluye</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {destination.highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-2 text-foreground">
                  <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-accent" />
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-bold text-foreground mb-6">Itinerario sugerido</h3>
            <DestinationItinerary itinerary={itinerary} />
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="mb-4">
                  <span className="text-sm text-muted-foreground">Precio desde</span>
                  <p className="text-3xl font-bold text-primary">${destination.price} USD</p>
                  <span className="text-sm text-muted-foreground">por persona</span>
                </div>
                <BookingButton
                  destinationName={destination.name}
                  price={destination.price}
                />
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Sin cargos por reservar. Paga cuando confirmes.
                </p>

                <div className="border-t border-border mt-5 pt-5 flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 text-primary shrink-0" />
                    Reserva protegida y verificada
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary shrink-0" />
                    Cancelacion gratuita hasta 48h antes
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 text-primary shrink-0" />
                    Guias locales en espanol
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CreditCard className="h-4 w-4 text-primary shrink-0" />
                    Paga en cuotas sin interes
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
