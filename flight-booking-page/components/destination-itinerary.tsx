import type { ItineraryDay } from "@/lib/data";

interface DestinationItineraryProps {
  itinerary: ItineraryDay[];
}

export function DestinationItinerary({ itinerary }: DestinationItineraryProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-2 bottom-2 w-px bg-border" aria-hidden="true" />
      <ol className="flex flex-col gap-6">
        {itinerary.map((item) => (
          <li key={item.day} className="relative flex gap-4">
            <div className="relative z-10 shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                {item.day}
              </div>
            </div>
            <div className="pb-2">
              <h4 className="font-semibold text-foreground">
                Dia {item.day}: {item.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
