"use client";

import { useState } from "react";
import { Plane, Calendar, Users, ArrowRightLeft, Search, Clock, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { sampleFlights, type FlightResult } from "@/lib/data";
import { BookingModal } from "@/components/booking-modal";

const popularCities = [
  { code: "BOG", name: "Bogota", country: "Colombia" },
  { code: "MDE", name: "Medellin", country: "Colombia" },
  { code: "CTG", name: "Cartagena", country: "Colombia" },
  { code: "CLO", name: "Cali", country: "Colombia" },
  { code: "LIM", name: "Lima", country: "Peru" },
  { code: "CUZ", name: "Cusco", country: "Peru" },
  { code: "AQP", name: "Arequipa", country: "Peru" },
  { code: "IQT", name: "Iquitos", country: "Peru" },
];

export function FlightSearch() {
  const [tripType, setTripType] = useState<"roundtrip" | "oneway">("roundtrip");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [bookingFlight, setBookingFlight] = useState<FlightResult | null>(null);

  const handleSearch = () => {
    setShowResults(true);
    setSelectedFlight(null);
    setTimeout(() => {
      document.getElementById("resultados-vuelos")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const filteredOriginCities = popularCities.filter(
    (city) =>
      city.name.toLowerCase().includes(origin.toLowerCase()) ||
      city.code.toLowerCase().includes(origin.toLowerCase())
  );

  const filteredDestCities = popularCities.filter(
    (city) =>
      city.name.toLowerCase().includes(destination.toLowerCase()) ||
      city.code.toLowerCase().includes(destination.toLowerCase())
  );

  const swapCities = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <section id="vuelos" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60" />
      </div>

      <div className="relative max-w-7xl mx-auto pt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 text-balance">
            Descubre los continentes cercanos a ti y un poco más allá
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto text-pretty">
            Encuentra los mejores vuelos y tours con operadores confiables para tu proxima aventura
          </p>
        </div>

        <Card className="max-w-5xl mx-auto shadow-2xl">
          <CardContent className="p-6 md:p-8">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setTripType("roundtrip")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${tripType === "roundtrip"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
              >
                Ida y vuelta
              </button>
              <button
                onClick={() => setTripType("oneway")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${tripType === "oneway"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
              >
                Solo ida
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Origen
                </label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Ciudad de origen"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    onFocus={() => setShowOriginDropdown(true)}
                    onBlur={() => setTimeout(() => setShowOriginDropdown(false), 200)}
                    className="pl-10"
                  />
                </div>
                {showOriginDropdown && filteredOriginCities.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {filteredOriginCities.map((city) => (
                      <button
                        key={city.code}
                        className="w-full px-4 py-2 text-left hover:bg-secondary transition-colors"
                        onClick={() => {
                          setOrigin(`${city.name} (${city.code})`);
                          setShowOriginDropdown(false);
                        }}
                      >
                        <span className="font-medium">{city.name}</span>
                        <span className="text-muted-foreground ml-2">({city.code})</span>
                        <span className="text-sm text-muted-foreground ml-2">{city.country}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative flex items-end">
                <button
                  onClick={swapCities}
                  className="absolute left-1/2 -translate-x-1/2 bottom-2 z-10 p-2 bg-card border border-border rounded-full shadow-md hover:bg-secondary transition-colors hidden md:block"
                  style={{ marginLeft: "-50%" }}
                >
                  <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                </button>
                <div className="w-full">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Destino
                  </label>
                  <div className="relative">
                    <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground rotate-90" />
                    <Input
                      placeholder="Ciudad de destino"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      onFocus={() => setShowDestDropdown(true)}
                      onBlur={() => setTimeout(() => setShowDestDropdown(false), 200)}
                      className="pl-10"
                    />
                  </div>
                  {showDestDropdown && filteredDestCities.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {filteredDestCities.map((city) => (
                        <button
                          key={city.code}
                          className="w-full px-4 py-2 text-left hover:bg-secondary transition-colors"
                          onClick={() => {
                            setDestination(`${city.name} (${city.code})`);
                            setShowDestDropdown(false);
                          }}
                        >
                          <span className="font-medium">{city.name}</span>
                          <span className="text-muted-foreground ml-2">({city.code})</span>
                          <span className="text-sm text-muted-foreground ml-2">{city.country}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Fecha de salida
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="date"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {tripType === "roundtrip" && (
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Fecha de regreso
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              <div className={tripType === "oneway" ? "lg:col-span-1" : ""}>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Pasajeros
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full h-9 pl-10 pr-4 rounded-md border border-input bg-transparent text-sm"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Pasajero" : "Pasajeros"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <Button onClick={handleSearch} className="w-full md:w-auto px-8 py-6 text-lg" size="lg">
              <Search className="mr-2 h-5 w-5" />
              Buscar Vuelos
            </Button>
          </CardContent>
        </Card>

        {showResults && (
          <div id="resultados-vuelos" className="max-w-5xl mx-auto mt-8">
            <Card className="shadow-2xl">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {origin && destination
                        ? `${origin.split(" (")[0]} → ${destination.split(" (")[0]}`
                        : "Vuelos disponibles"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {sampleFlights.length} vuelos encontrados · {passengers}{" "}
                      {passengers === 1 ? "pasajero" : "pasajeros"}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Precios por persona en USD
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {sampleFlights.map((flight) => (
                    <div
                      key={flight.id}
                      className={`border rounded-xl p-4 md:p-5 transition-all ${
                        selectedFlight === flight.id
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex items-center gap-3 md:w-48">
                          <div className="bg-secondary rounded-lg h-12 w-12 flex items-center justify-center font-bold text-primary shrink-0">
                            {flight.airlineCode}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{flight.airline}</p>
                            <p className="text-xs text-muted-foreground">Vuelo {flight.id}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 flex-1">
                          <div className="text-center">
                            <p className="text-xl font-bold text-foreground">{flight.departTime}</p>
                            <p className="text-xs text-muted-foreground">Salida</p>
                          </div>
                          <div className="flex-1 flex flex-col items-center">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {flight.duration}
                            </div>
                            <div className="w-full h-px bg-border my-1 relative">
                              <Plane className="h-3 w-3 text-primary absolute right-0 -top-1.5 rotate-90" />
                            </div>
                            <span
                              className={`text-xs ${
                                flight.stops === 0 ? "text-accent font-medium" : "text-muted-foreground"
                              }`}
                            >
                              {flight.stopDetail}
                            </span>
                          </div>
                          <div className="text-center">
                            <p className="text-xl font-bold text-foreground">{flight.arriveTime}</p>
                            <p className="text-xs text-muted-foreground">Llegada</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between md:flex-col md:items-end gap-2 md:w-40 border-t md:border-t-0 md:border-l border-border pt-3 md:pt-0 md:pl-4">
                          <div className="text-left md:text-right">
                            <p className="text-2xl font-bold text-primary">${flight.price}</p>
                            <p className="text-xs text-muted-foreground">por persona</p>
                          </div>
                          <Button
                            onClick={() => setSelectedFlight(flight.id)}
                            variant={selectedFlight === flight.id ? "default" : "outline"}
                            size="sm"
                          >
                            {selectedFlight === flight.id ? "Seleccionado" : "Seleccionar"}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                        <Briefcase className="h-3 w-3" />
                        {flight.baggage}
                      </div>
                    </div>
                  ))}
                </div>

                {selectedFlight && (
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-secondary rounded-xl p-4">
                    <p className="text-sm text-foreground">
                      Vuelo seleccionado:{" "}
                      <span className="font-semibold">
                        {sampleFlights.find((f) => f.id === selectedFlight)?.airline} —{" "}
                        ${(sampleFlights.find((f) => f.id === selectedFlight)?.price ?? 0) * passengers} USD total
                      </span>
                    </p>
                    <Button
                      size="lg"
                      onClick={() => {
                        const flight = sampleFlights.find((f) => f.id === selectedFlight);
                        if (flight) setBookingFlight(flight);
                      }}
                    >
                      Continuar con la reserva
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {bookingFlight && (
        <BookingModal
          isOpen={!!bookingFlight}
          onClose={() => setBookingFlight(null)}
          destinationName={`Vuelo ${bookingFlight.airline} — ${destination.split(" (")[0] || "Destino"}`}
          price={bookingFlight.price * passengers}
          bookingType="tour"
        />
      )}
    </section>
  );
}
