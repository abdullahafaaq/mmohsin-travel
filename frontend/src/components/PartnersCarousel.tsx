import { useSiteData } from "@/hooks/useSiteData";

export function PartnersCarousel() {
  const { data } = useSiteData();
  
  // Double the items for seamless infinite scroll
  const airlines = [...data.airlines, ...data.airlines];

  return (
    <section className="py-16 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <div className="text-center">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Trusted By
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
            Our Partners
          </h2>
        </div>
      </div>

      {/* Infinite scroll container */}
      <div className="relative">
        <div className="flex animate-scroll">
          {airlines.map((airline, index) => (
            <div
              key={`${airline.id}-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <div className="w-40 h-24 flex items-center justify-center bg-background rounded-xl shadow-sm hover:shadow-md transition-shadow p-4">
                <img
                  src={airline.logo}
                  alt={airline.name}
                  className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
