"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Star, Clock, Search, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { destinations } from "@/lib/data";

const countries = ["Todos", "Colombia", "Peru"] as const;
const categories = ["Todas", "Playa", "Cultural", "Aventura", "Ciudad", "Naturaleza"] as const;

export function DestinationCatalog() {
  const [country, setCountry] = useState<(typeof countries)[number]>("Todos");
  const [category, setCategory] = useState<(typeof categories)[number]>("Todas");
  const [query, setQuery] = useState("");

  const filtered = destinations.filter((dest) => {
    const matchesCountry = country === "Todos" || dest.country === country;
    const matchesCategory = category === "Todas" || dest.category === category;
    const matchesQuery =
      dest.name.toLowerCase().includes(query.toLowerCase()) ||
      dest.description.toLowerCase().includes(query.toLowerCase());
    return matchesCountry && matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Catalogo de Destinos
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
            Explora todos nuestros destinos en Colombia y Peru. Filtra por pais, categoria o busca tu proximo viaje.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar destino..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => setCountry(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  country === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                category === cat
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-card text-muted-foreground border-border hover:border-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          {filtered.length} {filtered.length === 1 ? "destino encontrado" : "destinos encontrados"}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              No se encontraron destinos con los filtros seleccionados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dest) => (
              <Link key={dest.id} href={`/destinos/${dest.id}`}>
                <Card className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={dest.image || "/placeholder.svg"}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                      {dest.category}
                    </div>
                    <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{dest.rating}</span>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-1 text-muted-foreground mb-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{dest.country}</span>
                      <span className="mx-1">•</span>
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{dest.duration}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{dest.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{dest.description}</p>
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
        )}
      </div>
    </div>
  );
}
