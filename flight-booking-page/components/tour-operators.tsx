import { ExternalLink, Star, Shield, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const colombiaTours = [
  {
    id: 1,
    name: "Experiencia Viajera Colombia",
    rating: 5.0,
    reviews: 247,
    experience: "6 años",
    travelers: "1200+",
    specialty: "Viajes personalizados con guias en español",
    website: "https://experienciaviajeracolombia.com",
    highlights: ["Diseño de viajes personalizados", "Soporte antes, durante y despues del viaje"],
  },
  {
    id: 2,
    name: "Baquianos Travel",
    rating: 4.8,
    reviews: 312,
    experience: "10+ años",
    travelers: "19948+",
    specialty: "Ciudad Perdida y experiencias de aventura",
    website: "https://baquianos.com/es",
    highlights: ["Temporada de ballenas", "Temporada de colores"],
  },
  {
    id: 3,
    name: "Xperiencia",
    rating: 4.7,
    reviews: 189,
    experience: "8 años",
    travelers: "5000+",
    specialty: "Cañones, nevados y avistamiento de ballenas",
    website: "https://xperiencia.com.co",
    highlights: ["Cañon del Güejar", "Nevado del Tolima"],
  },
  {
    id: 4,
    name: "Colreservas",
    rating: 4.6,
    reviews: 156,
    experience: "19 años",
    travelers: "8000+",
    specialty: "Turistas extranjeros y viajes empresariales",
    website: "https://colreservas.com",
    highlights: ["Experiencias personalizadas", "Viajes grupales"],
  },
];

const peruTours = [
  {
    id: 1,
    name: "Exploor Peru",
    rating: 4.9,
    reviews: 278,
    experience: "12 años",
    travelers: "15000+",
    specialty: "Tours a Machu Picchu y Valle Sagrado",
    website: "https://exploor.pe",
    highlights: ["Camino Inca", "Tours culturales"],
  },
  {
    id: 2,
    name: "Quechuas Travel",
    rating: 4.8,
    reviews: 234,
    experience: "15 años",
    travelers: "12000+",
    specialty: "Experiencias autenticas con comunidades locales",
    website: "https://quechuastravel.com",
    highlights: ["Turismo comunitario", "Trekking de montana"],
  },
  {
    id: 3,
    name: "Inca Experience",
    rating: 4.7,
    reviews: 198,
    experience: "10 años",
    travelers: "8500+",
    specialty: "Aventuras en la selva y circuitos andinos",
    website: "https://incaexperience.com",
    highlights: ["Amazonas peruano", "Lineas de Nazca"],
  },
  {
    id: 4,
    name: "Tintaya Travel",
    rating: 4.6,
    reviews: 167,
    experience: "8 años",
    travelers: "6000+",
    specialty: "Tours culturales y gastronomicos",
    website: "https://www.tintayatravel.com",
    highlights: ["Tours culinarios", "Lago Titicaca"],
  },
];

function TourCard({ operator }: { operator: typeof colombiaTours[0] }) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">{operator.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{operator.rating}</span>
              </div>
              <span className="text-muted-foreground text-sm">
                ({operator.reviews} reseñas)
              </span>
            </div>
          </div>
          <Shield className="h-6 w-6 text-accent" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{operator.specialty}</p>

        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{operator.experience}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{operator.travelers} viajeros</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {operator.highlights.map((highlight, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
            >
              {highlight}
            </span>
          ))}
        </div>

        <Button variant="outline" className="w-full" asChild>
          <a href={operator.website} target="_blank" rel="noopener noreferrer">
            Visitar sitio web
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

export function TourOperators() {
  return (
    <section id="tours" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Operadores de Tours Confiables
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Hemos seleccionado los mejores operadores turisticos verificados en Colombia y Peru para que disfrutes tu viaje con total confianza
          </p>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-1 w-12 bg-primary rounded" />
            <h3 className="text-2xl font-bold text-foreground">Colombia</h3>
            <img
              src="https://flagcdn.com/w40/co.png"
              alt="Bandera de Colombia"
              className="h-6 rounded shadow-sm"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {colombiaTours.map((operator) => (
              <TourCard key={operator.id} operator={operator} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-1 w-12 bg-primary rounded" />
            <h3 className="text-2xl font-bold text-foreground">Peru</h3>
            <img
              src="https://flagcdn.com/w40/pe.png"
              alt="Bandera de Peru"
              className="h-6 rounded shadow-sm"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {peruTours.map((operator) => (
              <TourCard key={operator.id} operator={operator} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
