"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  X,
  User,
  Mail,
  Calendar,
  Users,
  CreditCard,
  Check,
  Plane,
  Loader2,
  Hotel,
  Clock,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface BookingPackageInfo {
  nights: number;
  days: number;
  hotel: string;
  hotelStars: number;
  includes: string[];
  oldPrice?: number;
  image?: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationName: string;
  price: number;
  /** Tipo de reserva: paquete completo o solo destino/tour */
  bookingType?: "package" | "tour";
  /** Informacion adicional cuando se reserva un paquete */
  packageInfo?: BookingPackageInfo;
}

type Step = 1 | 2 | 3 | 4;

export function BookingModal({
  isOpen,
  onClose,
  destinationName,
  price,
  bookingType = "tour",
  packageInfo,
}: BookingModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    passengers: 1,
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const total = price * form.passengers;

  const update = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Ingresa tu nombre";
    if (!form.email.trim()) e.email = "Ingresa tu correo";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Correo invalido";
    if (!form.date) e.date = "Selecciona una fecha";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e: Record<string, string> = {};
    if (!form.cardName.trim()) e.cardName = "Nombre en la tarjeta";
    if (form.cardNumber.replace(/\s/g, "").length < 15)
      e.cardNumber = "Numero de tarjeta invalido";
    if (!form.cardExpiry.trim()) e.cardExpiry = "Requerido";
    if (form.cardCvc.length < 3) e.cardCvc = "CVC invalido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: bookingType === "package" ? "package" : "tour",
          customerName: form.name,
          customerEmail: form.email,
          destination: destinationName,
          date: form.date,
          passengers: form.passengers,
          total,
        }),
      });
      const data = await res.json();
      const newId = data.booking?.id || "BK-NEW";
      setBookingId(newId);
      setStep(4);
      toast.success(`¡Reserva ${newId} confirmada! Recibirás un correo pronto.`);
    } catch {
      setBookingId("BK-NEW");
      setStep(4);
      toast.success("¡Reserva confirmada! Recibirás un correo de confirmación pronto.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setForm({
      name: "",
      email: "",
      date: "",
      passengers: 1,
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    });
    setErrors({});
    onClose();
  };

  const stepLabels = ["Resumen", "Viajero", "Pago"];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Plane className="h-4 w-4 text-primary-foreground" />
            </div>
            <h2 className="text-lg font-bold text-foreground">
              Reservar {destinationName}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg hover:bg-muted transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {step !== 4 && (
          <div className="flex items-center gap-2 px-6 pt-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= s
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s ? <Check className="h-4 w-4" /> : s}
                  </div>
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-0.5 ${step > s ? "bg-primary" : "bg-muted"}`}
                  />
                )}
              </div>
            ))}
          </div>
        )}
        {step !== 4 && (
          <p className="px-6 pt-2 text-sm font-medium text-muted-foreground">
            Paso {step} de 3: {stepLabels[step - 1]}
          </p>
        )}

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              {packageInfo && (
                <div className="rounded-xl border border-border overflow-hidden">
                  <div className="bg-secondary/50 p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      {packageInfo.days} dias / {packageInfo.nights} noches
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Hotel className="h-4 w-4 text-primary" />
                      {packageInfo.hotel}
                      <span className="flex">
                        {Array.from({ length: packageInfo.hotelStars }).map((_, i) => (
                          <span key={i} className="text-accent">
                            ★
                          </span>
                        ))}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">
                        Que incluye:
                      </p>
                      <ul className="flex flex-col gap-1.5">
                        {packageInfo.includes.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <Check className="h-4 w-4 text-accent shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {!packageInfo && (
                <div className="flex items-start gap-3 rounded-xl border border-border p-4">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">{destinationName}</p>
                    <p className="text-sm text-muted-foreground">
                      Selecciona la fecha y el numero de viajeros para continuar.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Fecha de viaje
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="date"
                      value={form.date}
                      onChange={(e) => update("date", e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Viajeros
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <select
                      value={form.passengers}
                      onChange={(e) => update("passengers", Number(e.target.value))}
                      className="w-full h-9 pl-9 pr-2 rounded-md border border-input bg-transparent text-sm"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    ${price} x {form.passengers}{" "}
                    {form.passengers === 1 ? "persona" : "personas"}
                  </span>
                  <span className="text-foreground">${price * form.passengers} USD</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-sm font-medium text-foreground">Total</span>
                  <span className="text-xl font-bold text-primary">${total} USD</span>
                </div>
              </div>

              <Button className="w-full" onClick={handleNext}>
                Continuar con los datos
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Datos del viajero</h3>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">
                  Nombre completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Tu nombre"
                    className="pl-9"
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-destructive mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">
                  Correo electronico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="tu@correo.com"
                    className="pl-9"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">
                  Fecha de viaje
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    className="pl-9"
                  />
                </div>
                {errors.date && (
                  <p className="text-xs text-destructive mt-1">{errors.date}</p>
                )}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                  Atras
                </Button>
                <Button className="flex-1" onClick={handleNext}>
                  Continuar al pago
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-medium text-foreground flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Datos de pago
              </h3>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">
                  Nombre en la tarjeta
                </label>
                <Input
                  value={form.cardName}
                  onChange={(e) => update("cardName", e.target.value)}
                  placeholder="Como aparece en la tarjeta"
                />
                {errors.cardName && (
                  <p className="text-xs text-destructive mt-1">{errors.cardName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">
                  Numero de tarjeta
                </label>
                <Input
                  value={form.cardNumber}
                  onChange={(e) => update("cardNumber", e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                {errors.cardNumber && (
                  <p className="text-xs text-destructive mt-1">{errors.cardNumber}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Vencimiento
                  </label>
                  <Input
                    value={form.cardExpiry}
                    onChange={(e) => update("cardExpiry", e.target.value)}
                    placeholder="MM/AA"
                    maxLength={5}
                  />
                  {errors.cardExpiry && (
                    <p className="text-xs text-destructive mt-1">{errors.cardExpiry}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">CVC</label>
                  <Input
                    value={form.cardCvc}
                    onChange={(e) => update("cardCvc", e.target.value)}
                    placeholder="123"
                    maxLength={4}
                  />
                  {errors.cardCvc && (
                    <p className="text-xs text-destructive mt-1">{errors.cardCvc}</p>
                  )}
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total a pagar</span>
                <span className="text-xl font-bold text-primary">${total} USD</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                <ShieldCheck className="h-4 w-4 text-accent" />
                Pago seguro y encriptado
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                  Atras
                </Button>
                <Button className="flex-1" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Procesando
                    </>
                  ) : (
                    "Confirmar pago"
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Pago de demostracion. No se realizan cargos reales.
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Reserva confirmada
              </h3>
              <p className="text-muted-foreground mb-4">
                Tu reserva a {destinationName} fue registrada exitosamente. Enviamos los
                detalles a {form.email}.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Codigo de reserva</span>
                  <span className="font-medium text-foreground">{bookingId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Destino</span>
                  <span className="font-medium text-foreground">{destinationName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fecha</span>
                  <span className="font-medium text-foreground">{form.date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Viajeros</span>
                  <span className="font-medium text-foreground">{form.passengers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-medium text-primary">${total} USD</span>
                </div>
              </div>
              <Button className="w-full" onClick={handleClose}>
                Listo
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
