import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Endpoint {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  description: string;
  params?: { name: string; description: string }[];
  body?: string;
  response: string;
}

const endpoints: Endpoint[] = [
  {
    method: "GET",
    path: "/api/destinations",
    description: "Lista todos los destinos disponibles. Permite filtrar por pais, categoria o busqueda.",
    params: [
      { name: "country", description: "Filtra por pais (Colombia, Peru)" },
      { name: "category", description: "Filtra por categoria (Playa, Cultural, Aventura, Ciudad, Naturaleza)" },
      { name: "q", description: "Busqueda por nombre del destino" },
    ],
    response: `{
  "count": 8,
  "data": [
    {
      "id": 1,
      "name": "Cartagena",
      "country": "Colombia",
      "price": 299,
      "rating": 4.9,
      "category": "Playa"
    }
  ]
}`,
  },
  {
    method: "GET",
    path: "/api/destinations/:id",
    description: "Obtiene el detalle de un destino especifico por su ID.",
    response: `{
  "data": {
    "id": 1,
    "name": "Cartagena",
    "longDescription": "...",
    "highlights": ["Ciudad amurallada", "Islas del Rosario"]
  }
}`,
  },
  {
    method: "GET",
    path: "/api/operators",
    description: "Lista los operadores de tours verificados. Permite filtrar por pais.",
    params: [{ name: "country", description: "Filtra por pais (Colombia, Peru)" }],
    response: `{
  "count": 8,
  "data": [
    {
      "id": 1,
      "name": "Experiencia Viajera Colombia",
      "country": "Colombia",
      "rating": 5.0
    }
  ]
}`,
  },
  {
    method: "GET",
    path: "/api/bookings",
    description: "Lista todas las reservas registradas.",
    response: `{
  "count": 2,
  "data": [
    {
      "id": "BK-1001",
      "destination": "Cartagena",
      "status": "confirmada",
      "total": 598
    }
  ]
}`,
  },
  {
    method: "POST",
    path: "/api/bookings",
    description: "Crea una nueva reserva de vuelo o tour.",
    body: `{
  "type": "tour",
  "customerName": "Maria Gomez",
  "customerEmail": "maria@example.com",
  "destination": "Cartagena",
  "date": "2026-07-15",
  "passengers": 2,
  "total": 598
}`,
    response: `{
  "booking": {
    "id": "BK-1003",
    "status": "pendiente"
  }
}`,
  },
  {
    method: "PATCH",
    path: "/api/bookings/:id",
    description: "Actualiza el estado de una reserva (pendiente, confirmada, cancelada).",
    body: `{
  "status": "confirmada"
}`,
    response: `{
  "booking": {
    "id": "BK-1001",
    "status": "confirmada"
  }
}`,
  },
  {
    method: "DELETE",
    path: "/api/bookings/:id",
    description: "Elimina una reserva por su ID.",
    response: `{
  "success": true
}`,
  },
];

const methodColors: Record<Endpoint["method"], string> = {
  GET: "bg-accent/20 text-accent",
  POST: "bg-primary/20 text-primary",
  PATCH: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-500",
  DELETE: "bg-destructive/20 text-destructive",
};

export const metadata = {
  title: "API REST - Documentacion - Airvon",
  description: "Documentacion de la API REST de Airvon",
};

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            API REST de Airvon
          </h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Documentacion de los endpoints disponibles. La API devuelve JSON y sigue convenciones REST.
            URL base: <code className="text-sm bg-muted px-2 py-0.5 rounded font-mono">/api</code>
          </p>
        </div>

        <div className="space-y-6">
          {endpoints.map((endpoint, idx) => (
            <div
              key={idx}
              className="border border-border rounded-xl overflow-hidden bg-card"
            >
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <span
                  className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono ${methodColors[endpoint.method]}`}
                >
                  {endpoint.method}
                </span>
                <code className="text-sm font-mono text-foreground">
                  {endpoint.path}
                </code>
              </div>
              <div className="p-4 space-y-4">
                <p className="text-sm text-muted-foreground">{endpoint.description}</p>

                {endpoint.params && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      Parametros de consulta
                    </h4>
                    <div className="space-y-1">
                      {endpoint.params.map((param) => (
                        <div key={param.name} className="flex gap-2 text-sm">
                          <code className="font-mono text-accent shrink-0">
                            {param.name}
                          </code>
                          <span className="text-muted-foreground">
                            {param.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {endpoint.body && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      Cuerpo de la solicitud
                    </h4>
                    <pre className="bg-muted rounded-lg p-3 text-xs font-mono text-foreground overflow-x-auto">
                      {endpoint.body}
                    </pre>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    Respuesta
                  </h4>
                  <pre className="bg-muted rounded-lg p-3 text-xs font-mono text-foreground overflow-x-auto">
                    {endpoint.response}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
