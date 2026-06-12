"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Maria Garcia",
    location: "Ciudad de Mexico",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Increible experiencia con Airvon. Reservamos un tour a Machu Picchu y todo salio perfecto. El operador fue muy profesional y los precios fueron los mejores que encontre.",
    trip: "Tour Machu Picchu",
  },
  {
    id: 2,
    name: "Carlos Rodriguez",
    location: "Buenos Aires, Argentina",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Viaje a Cartagena con mi familia y fue espectacular. La plataforma es muy facil de usar y el equipo de soporte nos ayudo con todas nuestras dudas. Totalmente recomendado.",
    trip: "Vuelo + Hotel Cartagena",
  },
  {
    id: 3,
    name: "Ana Martinez",
    location: "Santiago, Chile",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Encontre ofertas increibles para Medellin. El proceso de reserva fue rapido y seguro. Ya estoy planeando mi proximo viaje con Airvon.",
    trip: "Escapada Medellin",
  },
  {
    id: 4,
    name: "Pedro Sanchez",
    location: "Lima, Peru",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Excelente servicio al cliente. Tuve que cambiar mis fechas de viaje y me ayudaron sin ningun problema. Los operadores de tours son de primera calidad.",
    trip: "Tour Ciudad Perdida",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Lo Que Dicen Nuestros Viajeros
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Miles de viajeros confian en Airvon para sus aventuras en Sudamerica
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-background rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 relative"
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10" />
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-muted-foreground text-sm">{testimonial.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-foreground/80 mb-4 leading-relaxed">{testimonial.text}</p>
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {testimonial.trip}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
