import { Layout } from "@/components/Layout";
import { CounterStats } from "@/components/CounterStats";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, MessageCircle, Clock, Shield, CreditCard, Globe, Headphones, CheckCircle } from "lucide-react";
import { useSiteData } from "@/hooks/useSiteData";

const services = [
  {
    icon: Globe,
    title: "Worldwide Destinations",
    description: "Book flights to any destination around the world with competitive prices.",
  },
  {
    icon: CreditCard,
    title: "Best Price Guarantee",
    description: "We offer the most competitive rates and match any lower price you find.",
  },
  {
    icon: Clock,
    title: "Instant Confirmation",
    description: "Get your e-tickets within hours of booking confirmation.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our team is available round the clock for any assistance you need.",
  },
];

const bookingSteps = [
  {
    step: "01",
    title: "Share Your Details",
    description: "Contact us on WhatsApp with your travel dates, destination, and passenger details.",
  },
  {
    step: "02",
    title: "Get Options & Prices",
    description: "We'll share available flights with different airlines and price options.",
  },
  {
    step: "03",
    title: "Confirm & Pay",
    description: "Choose your preferred option, make payment, and receive your e-tickets.",
  },
];

export default function FlightTickets() {
  const { data } = useSiteData();
  const whatsappLink = `https://wa.me/${data.siteSettings.whatsapp}`;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&auto=format&fit=crop&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-accent/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-background/10 flex items-center justify-center">
                <Plane className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-primary-foreground/80 font-semibold text-sm uppercase tracking-wider">Flight Reservations</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Book Your Flight Tickets
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Seamless booking for domestic and international flights with competitive fares. 
              Book flights to Jeddah, Madinah, and destinations worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Popular Routes</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              Popular Destinations
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore our most booked flight routes with competitive prices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.destinations.map((dest) => (
              <Card
                key={dest.id}
                className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-0"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.city}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-2xl font-bold text-white">
                      {dest.city}
                    </h3>
                    <p className="text-white/80 text-sm">{dest.country}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Starting from</p>
                      <p className="font-display text-2xl font-bold text-primary">
                        {dest.from}
                      </p>
                    </div>
                    <Button
                      asChild
                      className="bg-primary text-primary-foreground hover:bg-accent"
                    >
                      <a
                        href={`${whatsappLink}?text=${encodeURIComponent(`Hello! I'm interested in booking a flight to ${dest.city}. Please share available options.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Inquire
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Book */}
      <section className="py-24 bg-gradient-green relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-background/5 rounded-full -translate-y-1/2 translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary-foreground/80 font-semibold text-sm uppercase tracking-wider">Easy Booking</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-3 mb-4">
              How to Book Your Flight
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {bookingSteps.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-background/10 flex items-center justify-center border-2 border-primary-foreground/20">
                  <span className="font-display text-3xl font-bold text-primary-foreground">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-primary-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-primary-foreground/80">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 font-semibold text-lg px-10 py-6 shadow-2xl"
            >
              <a
                href={`${whatsappLink}?text=${encodeURIComponent("Hello! I want to book a flight. Please help me with available options.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-primary" />
                Book Now on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Airlines */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Partners</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              Airline Partners
            </h2>
            <p className="text-muted-foreground text-lg">
              We work with all major airlines to get you the best deals.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {data.airlines.map((airline) => (
              <Card
                key={airline.id}
                className="p-6 text-center border border-border hover:border-primary hover:shadow-lg transition-all duration-300 bg-card"
              >
                <CardContent className="p-0 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-muted flex items-center justify-center overflow-hidden">
                    <img
                      src={airline.logo || "/placeholder.svg"}
                      alt={airline.name}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <p className="text-foreground text-sm font-medium leading-tight">
                    {airline.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Counter Stats */}
      <CounterStats />
    </Layout>
  );
}
