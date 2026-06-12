"use client";

import useSWR from "swr";
import { useState } from "react";
import Link from "next/link";
import {
  Plane,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Check,
  X,
  Trash2,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import type { Booking } from "@/lib/data";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const statusStyles: Record<Booking["status"], string> = {
  pendiente: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-500",
  confirmada: "bg-accent/20 text-accent",
  cancelada: "bg-destructive/20 text-destructive",
};

export function AdminDashboard() {
  const { data, isLoading, mutate } = useSWR<{ count: number; data: Booking[] }>(
    "/api/bookings",
    fetcher
  );
  const [filter, setFilter] = useState<"todas" | Booking["status"]>("todas");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const bookings = data?.data || [];
  const filtered =
    filter === "todas" ? bookings : bookings.filter((b) => b.status === filter);

  const stats = {
    total: bookings.length,
    confirmadas: bookings.filter((b) => b.status === "confirmada").length,
    pendientes: bookings.filter((b) => b.status === "pendiente").length,
    ingresos: bookings
      .filter((b) => b.status === "confirmada")
      .reduce((sum, b) => sum + b.total, 0),
  };

  // Datos para la grafica de reservas por destino
  const destinationData = Object.values(
    bookings.reduce<Record<string, { destino: string; reservas: number; ingresos: number }>>(
      (acc, b) => {
        if (!acc[b.destination]) {
          acc[b.destination] = { destino: b.destination, reservas: 0, ingresos: 0 };
        }
        acc[b.destination].reservas += 1;
        acc[b.destination].ingresos += b.total;
        return acc;
      },
      {}
    )
  );

  // Clientes unicos
  const clientsMap = bookings.reduce<
    Record<string, { name: string; email: string; reservas: number; total: number }>
  >((acc, b) => {
    if (!acc[b.customerEmail]) {
      acc[b.customerEmail] = {
        name: b.customerName,
        email: b.customerEmail,
        reservas: 0,
        total: 0,
      };
    }
    acc[b.customerEmail].reservas += 1;
    acc[b.customerEmail].total += b.total;
    return acc;
  }, {});
  const clients = Object.values(clientsMap);

  const updateStatus = async (id: string, status: Booking["status"]) => {
    setUpdatingId(id);
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await mutate();
    setUpdatingId(null);
  };

  const deleteBooking = async (id: string) => {
    setUpdatingId(id);
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    await mutate();
    setUpdatingId(null);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Panel de Administracion
          </h1>
          <p className="text-muted-foreground">
            Gestiona las reservas de vuelos y tours de Airvon
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total reservas</span>
                <Plane className="h-4 w-4 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Confirmadas</span>
                <Check className="h-4 w-4 text-accent" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stats.confirmadas}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Pendientes</span>
                <TrendingUp className="h-4 w-4 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stats.pendientes}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Ingresos</span>
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                ${stats.ingresos.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-1">
                Reservas por destino
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Distribucion de reservas segun el destino
              </p>
              {destinationData.length > 0 && (
                <ChartContainer
                  config={{
                    reservas: { label: "Reservas", color: "var(--chart-1)" },
                  }}
                  className="h-[240px] w-full"
                >
                  <BarChart data={destinationData}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis
                      dataKey="destino"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      fontSize={12}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="reservas" radius={[6, 6, 0, 0]} fill="var(--color-reservas)" />
                  </BarChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-1">Clientes</h2>
              <p className="text-sm text-muted-foreground mb-4">
                {clients.length} clientes registrados
              </p>
              <div className="flex flex-col gap-3 max-h-[240px] overflow-y-auto">
                {clients.map((client) => (
                  <div
                    key={client.email}
                    className="flex items-center justify-between gap-3 pb-3 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
                        {client.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">
                          {client.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {client.reservas} {client.reservas === 1 ? "reserva" : "reservas"}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-primary shrink-0">
                      ${client.total.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {(["todas", "pendiente", "confirmada", "cancelada"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                No hay reservas en esta categoria.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-muted-foreground">
                      <th className="p-4 font-medium">Codigo</th>
                      <th className="p-4 font-medium">Cliente</th>
                      <th className="p-4 font-medium">Destino</th>
                      <th className="p-4 font-medium hidden md:table-cell">Fecha</th>
                      <th className="p-4 font-medium hidden md:table-cell">Pasajeros</th>
                      <th className="p-4 font-medium">Total</th>
                      <th className="p-4 font-medium">Estado</th>
                      <th className="p-4 font-medium text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((booking) => (
                      <tr
                        key={booking.id}
                        className="border-b border-border last:border-0 hover:bg-muted/30"
                      >
                        <td className="p-4 font-mono text-xs">{booking.id}</td>
                        <td className="p-4">
                          <div className="font-medium text-foreground">
                            {booking.customerName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {booking.customerEmail}
                          </div>
                        </td>
                        <td className="p-4 text-foreground">{booking.destination}</td>
                        <td className="p-4 text-muted-foreground hidden md:table-cell">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {booking.date}
                          </span>
                        </td>
                        <td className="p-4 text-muted-foreground hidden md:table-cell">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {booking.passengers}
                          </span>
                        </td>
                        <td className="p-4 font-medium text-foreground">
                          ${booking.total}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[booking.status]}`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-1">
                            {updatingId === booking.id ? (
                              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                            ) : (
                              <>
                                {booking.status !== "confirmada" && (
                                  <button
                                    onClick={() => updateStatus(booking.id, "confirmada")}
                                    title="Confirmar"
                                    className="p-1.5 rounded-md hover:bg-accent/20 text-accent transition-colors"
                                  >
                                    <Check className="h-4 w-4" />
                                  </button>
                                )}
                                {booking.status !== "cancelada" && (
                                  <button
                                    onClick={() => updateStatus(booking.id, "cancelada")}
                                    title="Cancelar"
                                    className="p-1.5 rounded-md hover:bg-destructive/20 text-destructive transition-colors"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteBooking(booking.id)}
                                  title="Eliminar"
                                  className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
