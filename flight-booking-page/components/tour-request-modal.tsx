"use client";

import { useState } from "react";
import { X, MapPin, Calendar, Users, MessageSquare, Check, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TourRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

const countries = [
  { code: "CO", name: "Colombia", flag: "https://flagcdn.com/w40/co.png" },
  { code: "PE", name: "Peru", flag: "https://flagcdn.com/w40/pe.png" },
];

const tourTypes = [
  { id: "adventure", name: "Aventura", description: "Trekking, rafting, escalada" },
  { id: "cultural", name: "Cultural", description: "Historia, museos, tradiciones" },
  { id: "nature", name: "Naturaleza", description: "Parques, fauna, paisajes" },
  { id: "gastronomy", name: "Gastronomia", description: "Comida local, mercados" },
  { id: "relax", name: "Relax", description: "Playas, spas, descanso" },
];

export function TourRequestModal({ isOpen, onClose, userName }: TourRequestModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    tourType: "",
    startDate: "",
    endDate: "",
    travelers: "1",
    budget: "",
    comments: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.country) newErrors.country = "Selecciona un pais";
      if (!formData.city.trim()) newErrors.city = "Ingresa la ciudad";
      if (!formData.tourType) newErrors.tourType = "Selecciona el tipo de tour";
    }

    if (step === 2) {
      if (!formData.startDate) newErrors.startDate = "Selecciona fecha de inicio";
      if (!formData.endDate) newErrors.endDate = "Selecciona fecha de fin";
      if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
        newErrors.endDate = "La fecha de fin debe ser posterior";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setStep(1);
    setIsSuccess(false);
    setFormData({
      country: "",
      city: "",
      tourType: "",
      startDate: "",
      endDate: "",
      travelers: "1",
      budget: "",
      comments: "",
    });
    onClose();
  };

  const selectedCountry = countries.find(c => c.code === formData.country);

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={handleClose} />
        <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 text-center">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Solicitud Enviada</h2>
          <p className="text-muted-foreground mb-6">
            Tu solicitud de tour a {selectedCountry?.name} ha sido recibida. Nuestros operadores te contactaran pronto.
          </p>
          <Button onClick={handleClose} className="w-full">Cerrar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={handleClose} />
      
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        <div className="bg-primary/10 p-6 pb-8">
          <div className="flex items-center gap-3 mb-2">
            <Plane className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Solicitar Tour</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Hola {userName}, completa el formulario para solicitar tu tour
          </p>
          
          <div className="flex items-center gap-2 mt-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  s === step 
                    ? "bg-primary text-primary-foreground" 
                    : s < step 
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                }`}>
                  {s < step ? <Check className="h-4 w-4" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-12 h-1 mx-1 rounded ${s < step ? "bg-accent" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  Pais de destino
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, country: country.code }))}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                        formData.country === country.code
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <img src={country.flag} alt={country.name} className="h-6 rounded shadow-sm" />
                      <span className="font-medium">{country.name}</span>
                    </button>
                  ))}
                </div>
                {errors.country && <p className="text-destructive text-sm mt-1">{errors.country}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Ciudad o region de interes
                </label>
                <Input
                  placeholder="Ej: Cartagena, Cusco, Medellin..."
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                />
                {errors.city && <p className="text-destructive text-sm mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tipo de experiencia
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {tourTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, tourType: type.id }))}
                      className={`flex items-center justify-between p-3 rounded-lg border-2 text-left transition-all ${
                        formData.tourType === type.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div>
                        <span className="font-medium">{type.name}</span>
                        <span className="text-muted-foreground text-sm ml-2">{type.description}</span>
                      </div>
                      {formData.tourType === type.id && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
                {errors.tourType && <p className="text-destructive text-sm mt-1">{errors.tourType}</p>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Fecha de inicio
                  </label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                  {errors.startDate && <p className="text-destructive text-sm mt-1">{errors.startDate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Fecha de fin
                  </label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                  {errors.endDate && <p className="text-destructive text-sm mt-1">{errors.endDate}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Users className="h-4 w-4 inline mr-1" />
                  Numero de viajeros
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData(prev => ({ 
                      ...prev, 
                      travelers: Math.max(1, parseInt(prev.travelers) - 1).toString() 
                    }))}
                  >
                    -
                  </Button>
                  <span className="text-xl font-bold w-12 text-center">{formData.travelers}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData(prev => ({ 
                      ...prev, 
                      travelers: (parseInt(prev.travelers) + 1).toString() 
                    }))}
                  >
                    +
                  </Button>
                  <span className="text-muted-foreground text-sm">personas</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Presupuesto aproximado (USD)
                </label>
                <Input
                  type="text"
                  placeholder="Ej: 1000 - 2000"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <MessageSquare className="h-4 w-4 inline mr-1" />
                  Comentarios adicionales
                </label>
                <textarea
                  placeholder="Cuentanos mas sobre lo que buscas, preferencias especiales, actividades que te gustaria hacer..."
                  value={formData.comments}
                  onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                  className="w-full h-32 px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3">Resumen de tu solicitud</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Destino:</span>
                    <span className="font-medium">{formData.city}, {selectedCountry?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tipo:</span>
                    <span className="font-medium">{tourTypes.find(t => t.id === formData.tourType)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fechas:</span>
                    <span className="font-medium">{formData.startDate} - {formData.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Viajeros:</span>
                    <span className="font-medium">{formData.travelers} personas</span>
                  </div>
                  {formData.budget && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Presupuesto:</span>
                      <span className="font-medium">${formData.budget} USD</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack} className="flex-1">
                Atras
              </Button>
            )}
            {step < 3 ? (
              <Button onClick={handleNext} className="flex-1">
                Siguiente
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
