export interface Destination {
  id: number;
  name: string;
  country: "Colombia" | "Peru";
  image: string;
  price: number;
  rating: number;
  description: string;
  longDescription: string;
  category: "Playa" | "Cultural" | "Aventura" | "Ciudad" | "Naturaleza";
  duration: string;
  highlights: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

// Genera un itinerario de ejemplo basado en los highlights del destino
export function getItinerary(dest: Destination): ItineraryDay[] {
  const intro = `Llegada a ${dest.name}, recepcion en el aeropuerto y traslado al hotel. Tarde libre para aclimatarse y recorrer los alrededores.`;
  const days: ItineraryDay[] = [
    { day: 1, title: "Llegada y bienvenida", description: intro },
  ];
  dest.highlights.forEach((h, i) => {
    days.push({
      day: i + 2,
      title: h,
      description: `Dia dedicado a explorar ${h}. Incluye guia profesional, transporte y tiempo libre para disfrutar la experiencia a tu ritmo.`,
    });
  });
  days.push({
    day: dest.highlights.length + 2,
    title: "Dia libre y regreso",
    description: `Manana libre para compras y ultimos paseos por ${dest.name}. Traslado al aeropuerto para tu vuelo de regreso.`,
  });
  return days;
}

export const destinations: Destination[] = [
  {
    id: 1,
    name: "Cartagena",
    country: "Colombia",
    image: "https://images.unsplash.com/photo-1583531352515-8884af319dc1?w=800&q=80",
    price: 299,
    rating: 4.9,
    description: "Ciudad amurallada con playas paradisiacas",
    longDescription:
      "Cartagena de Indias combina historia colonial, playas caribeñas y una vibrante vida nocturna. Recorre su ciudad amurallada declarada Patrimonio de la Humanidad por la UNESCO.",
    category: "Playa",
    duration: "4-7 dias",
    highlights: ["Ciudad amurallada", "Islas del Rosario", "Getsemani", "Castillo San Felipe"],
  },
  {
    id: 2,
    name: "Cusco",
    country: "Peru",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80",
    price: 349,
    rating: 4.8,
    description: "Puerta de entrada a Machu Picchu",
    longDescription:
      "Cusco, antigua capital del Imperio Inca, es la puerta de entrada a Machu Picchu y al Valle Sagrado. Una mezcla fascinante de cultura inca y arquitectura colonial.",
    category: "Cultural",
    duration: "5-8 dias",
    highlights: ["Machu Picchu", "Valle Sagrado", "Sacsayhuaman", "Plaza de Armas"],
  },
  {
    id: 3,
    name: "Medellin",
    country: "Colombia",
    image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80",
    price: 279,
    rating: 4.7,
    description: "La ciudad de la eterna primavera",
    longDescription:
      "Medellin es una ciudad moderna e innovadora rodeada de montañas. Disfruta de su clima primaveral, el Metrocable y la calida hospitalidad paisa.",
    category: "Ciudad",
    duration: "3-5 dias",
    highlights: ["Comuna 13", "Metrocable", "Parque Arvi", "Pueblito Paisa"],
  },
  {
    id: 4,
    name: "Lima",
    country: "Peru",
    image: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=800&q=80",
    price: 319,
    rating: 4.6,
    description: "Capital gastronomica de Sudamerica",
    longDescription:
      "Lima es la capital gastronomica de America Latina, con restaurantes de clase mundial, barrios coloniales y vistas al Pacifico desde Miraflores.",
    category: "Ciudad",
    duration: "3-5 dias",
    highlights: ["Miraflores", "Barranco", "Centro Historico", "Circuito Magico del Agua"],
  },
  {
    id: 5,
    name: "Santa Marta",
    country: "Colombia",
    image: "https://images.unsplash.com/photo-1591081658714-f576fb7ea3ed?w=800&q=80",
    price: 259,
    rating: 4.7,
    description: "Puerta al Parque Tayrona",
    longDescription:
      "Santa Marta es la puerta de entrada al Parque Nacional Tayrona, con playas vírgenes, selva tropical y la Sierra Nevada. Ideal para los amantes de la naturaleza.",
    category: "Naturaleza",
    duration: "4-6 dias",
    highlights: ["Parque Tayrona", "Ciudad Perdida", "Minca", "Playa Blanca"],
  },
  {
    id: 6,
    name: "Arequipa",
    country: "Peru",
    image: "https://images.unsplash.com/photo-1605552552033-7e3d54a3e9c7?w=800&q=80",
    price: 289,
    rating: 4.7,
    description: "La ciudad blanca y el Cañon del Colca",
    longDescription:
      "Arequipa, conocida como la Ciudad Blanca por su arquitectura de sillar, ofrece vistas a volcanes y el majestuoso Cañon del Colca, hogar del condor andino.",
    category: "Aventura",
    duration: "4-6 dias",
    highlights: ["Cañon del Colca", "Monasterio Santa Catalina", "Volcan Misti", "Plaza de Armas"],
  },
  {
    id: 7,
    name: "San Andres",
    country: "Colombia",
    image: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=80",
    price: 339,
    rating: 4.8,
    description: "El mar de los siete colores",
    longDescription:
      "San Andres es una isla caribeña famosa por su mar de siete colores, arrecifes de coral y playas de arena blanca. Un paraiso para el buceo y el snorkel.",
    category: "Playa",
    duration: "4-7 dias",
    highlights: ["Johnny Cay", "Acuario", "Hoyo Soplador", "La Piscinita"],
  },
  {
    id: 8,
    name: "Puno",
    country: "Peru",
    image: "https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?w=800&q=80",
    price: 269,
    rating: 4.5,
    description: "El Lago Titicaca y las islas flotantes",
    longDescription:
      "Puno se encuentra a orillas del Lago Titicaca, el lago navegable mas alto del mundo. Visita las islas flotantes de los Uros y conoce la cultura aymara.",
    category: "Cultural",
    duration: "3-5 dias",
    highlights: ["Lago Titicaca", "Islas Uros", "Isla Taquile", "Sillustani"],
  },
];

export interface TourOperator {
  id: number;
  name: string;
  country: "Colombia" | "Peru";
  rating: number;
  reviews: number;
  experience: string;
  travelers: string;
  specialty: string;
  website: string;
  highlights: string[];
}

export const tourOperators: TourOperator[] = [
  {
    id: 1,
    name: "Experiencia Viajera Colombia",
    country: "Colombia",
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
    country: "Colombia",
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
    country: "Colombia",
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
    country: "Colombia",
    rating: 4.6,
    reviews: 156,
    experience: "19 años",
    travelers: "8000+",
    specialty: "Turistas extranjeros y viajes empresariales",
    website: "https://colreservas.com",
    highlights: ["Experiencias personalizadas", "Viajes grupales"],
  },
  {
    id: 5,
    name: "Exploor Peru",
    country: "Peru",
    rating: 4.9,
    reviews: 278,
    experience: "12 años",
    travelers: "15000+",
    specialty: "Tours a Machu Picchu y Valle Sagrado",
    website: "https://exploor.pe",
    highlights: ["Camino Inca", "Tours culturales"],
  },
  {
    id: 6,
    name: "Quechuas Travel",
    country: "Peru",
    rating: 4.8,
    reviews: 234,
    experience: "15 años",
    travelers: "12000+",
    specialty: "Experiencias autenticas con comunidades locales",
    website: "https://quechuastravel.com",
    highlights: ["Turismo comunitario", "Trekking de montana"],
  },
  {
    id: 7,
    name: "Inca Experience",
    country: "Peru",
    rating: 4.7,
    reviews: 198,
    experience: "10 años",
    travelers: "8500+",
    specialty: "Aventuras en la selva y circuitos andinos",
    website: "https://incaexperience.com",
    highlights: ["Amazonas peruano", "Lineas de Nazca"],
  },
  {
    id: 8,
    name: "Tintaya Travel",
    country: "Peru",
    rating: 4.6,
    reviews: 167,
    experience: "8 años",
    travelers: "6000+",
    specialty: "Tours culturales y gastronomicos",
    website: "https://www.tintayatravel.com",
    highlights: ["Tours culinarios", "Lago Titicaca"],
  },
];

// Almacenamiento en memoria para reservas y solicitudes (demo, sin base de datos)
export interface Booking {
  id: string;
  type: "flight" | "tour" | "package";
  customerName: string;
  customerEmail: string;
  destination: string;
  date: string;
  passengers: number;
  status: "pendiente" | "confirmada" | "cancelada";
  total: number;
  createdAt: string;
}

export const bookingsStore: Booking[] = [
  {
    id: "BK-1001",
    type: "flight",
    customerName: "Maria Gomez",
    customerEmail: "maria@example.com",
    destination: "Cartagena",
    date: "2026-07-15",
    passengers: 2,
    status: "confirmada",
    total: 598,
    createdAt: "2026-06-01T10:00:00Z",
  },
  {
    id: "BK-1002",
    type: "tour",
    customerName: "Carlos Ruiz",
    customerEmail: "carlos@example.com",
    destination: "Cusco",
    date: "2026-08-10",
    passengers: 4,
    status: "pendiente",
    total: 1396,
    createdAt: "2026-06-03T14:30:00Z",
  },
  {
    id: "BK-1003",
    type: "tour",
    customerName: "Ana Martinez",
    customerEmail: "ana@example.com",
    destination: "San Andres",
    date: "2026-09-05",
    passengers: 2,
    status: "confirmada",
    total: 998,
    createdAt: "2026-06-05T09:15:00Z",
  },
];

// Paquetes turisticos completos (vuelo + hotel + traslados)
export interface TravelPackage {
  id: number;
  title: string;
  destination: string;
  country: "Colombia" | "Peru";
  image: string;
  nights: number;
  days: number;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  includes: string[];
  hotel: string;
  hotelStars: number;
  featured: boolean;
}

export const packages: TravelPackage[] = [
  {
    id: 1,
    title: "Cartagena Caribe Total",
    destination: "Cartagena",
    country: "Colombia",
    image: "/packages/cartagena.png",
    nights: 3,
    days: 4,
    price: 499,
    oldPrice: 699,
    rating: 4.9,
    reviews: 184,
    includes: ["Vuelo ida y vuelta", "Hotel 4 estrellas", "Traslados aeropuerto", "Tour Islas del Rosario", "Desayunos"],
    hotel: "Hotel Capilla del Mar",
    hotelStars: 4,
    featured: true,
  },
  {
    id: 2,
    title: "Machu Picchu Inolvidable",
    destination: "Cusco",
    country: "Peru",
    image: "/packages/machu-picchu.png",
    nights: 4,
    days: 5,
    price: 849,
    oldPrice: 1099,
    rating: 4.9,
    reviews: 267,
    includes: ["Vuelo ida y vuelta", "Hotel 4 estrellas", "Tren a Machu Picchu", "Tour Valle Sagrado", "Guia profesional", "Desayunos"],
    hotel: "Casa Andina Premium",
    hotelStars: 4,
    featured: true,
  },
  {
    id: 3,
    title: "Medellin Ciudad Eterna",
    destination: "Medellin",
    country: "Colombia",
    image: "/packages/medellin.png",
    nights: 3,
    days: 4,
    price: 429,
    oldPrice: 559,
    rating: 4.7,
    reviews: 142,
    includes: ["Vuelo ida y vuelta", "Hotel 4 estrellas", "Traslados", "Tour Comuna 13", "Tour Guatape"],
    hotel: "Hotel Du Parc",
    hotelStars: 4,
    featured: true,
  },
  {
    id: 4,
    title: "San Andres Mar de 7 Colores",
    destination: "San Andres",
    country: "Colombia",
    image: "/packages/san-andres.png",
    nights: 4,
    days: 5,
    price: 599,
    oldPrice: 799,
    rating: 4.8,
    reviews: 156,
    includes: ["Vuelo ida y vuelta", "Hotel frente al mar", "Traslados", "Tour Acuario y Johnny Cay", "Todo incluido"],
    hotel: "Decameron San Luis",
    hotelStars: 4,
    featured: false,
  },
  {
    id: 5,
    title: "Lima Gastronomica",
    destination: "Lima",
    country: "Peru",
    image: "/packages/lima.png",
    nights: 3,
    days: 4,
    price: 469,
    oldPrice: 629,
    rating: 4.6,
    reviews: 98,
    includes: ["Vuelo ida y vuelta", "Hotel en Miraflores", "Traslados", "Tour gastronomico", "City tour"],
    hotel: "Belmond Miraflores Park",
    hotelStars: 5,
    featured: false,
  },
  {
    id: 6,
    title: "Arequipa y Cañon del Colca",
    destination: "Arequipa",
    country: "Peru",
    image: "/packages/arequipa.png",
    nights: 3,
    days: 4,
    price: 519,
    oldPrice: 689,
    rating: 4.7,
    reviews: 87,
    includes: ["Vuelo ida y vuelta", "Hotel 4 estrellas", "Tour Cañon del Colca", "Monasterio Santa Catalina", "Desayunos"],
    hotel: "Costa del Sol Arequipa",
    hotelStars: 4,
    featured: false,
  },
];

// Resultados de vuelos simulados para la busqueda
export interface FlightResult {
  id: string;
  airline: string;
  airlineCode: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  stops: number;
  stopDetail: string;
  baggage: string;
  price: number;
}

export const sampleFlights: FlightResult[] = [
  {
    id: "AV-201",
    airline: "Avianca",
    airlineCode: "AV",
    departTime: "06:30",
    arriveTime: "08:15",
    duration: "1h 45m",
    stops: 0,
    stopDetail: "Directo",
    baggage: "1 maleta de mano + 1 equipaje 23kg",
    price: 189,
  },
  {
    id: "LA-455",
    airline: "LATAM Airlines",
    airlineCode: "LA",
    departTime: "09:10",
    arriveTime: "11:40",
    duration: "2h 30m",
    stops: 1,
    stopDetail: "1 escala (BOG)",
    baggage: "1 maleta de mano",
    price: 154,
  },
  {
    id: "P5-780",
    airline: "Wingo",
    airlineCode: "P5",
    departTime: "13:20",
    arriveTime: "15:05",
    duration: "1h 45m",
    stops: 0,
    stopDetail: "Directo",
    baggage: "1 maleta de mano",
    price: 142,
  },
  {
    id: "AV-318",
    airline: "Avianca",
    airlineCode: "AV",
    departTime: "17:45",
    arriveTime: "20:30",
    duration: "2h 45m",
    stops: 1,
    stopDetail: "1 escala (MDE)",
    baggage: "1 maleta de mano + 1 equipaje 23kg",
    price: 167,
  },
  {
    id: "H2-092",
    airline: "Sky Airline",
    airlineCode: "H2",
    departTime: "20:15",
    arriveTime: "22:00",
    duration: "1h 45m",
    stops: 0,
    stopDetail: "Directo",
    baggage: "1 maleta de mano + 1 equipaje 23kg",
    price: 198,
  },
];
