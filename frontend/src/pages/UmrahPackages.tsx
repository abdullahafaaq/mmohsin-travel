import { Layout } from "@/components/Layout";
import { CounterStats } from "@/components/CounterStats";
import { PackageCard } from "@/components/PackageCard";
import { Button } from "@/components/ui/button";
import { Check, Star, Shield, Clock, Users, Award, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useSiteData } from "@/hooks/useSiteData";

const standardInclusions = [
  "Umrah Visa Processing",
  "Return Flights (Economy/Business as per package)",
  "Hotel Accommodation",
  "Airport Transfers",
  "Ziyarat Tours in Makkah & Madinah",
  "Travel Insurance",
];

const supportFeatures = [
  "24/7 Customer Support",
  "Experienced Tour Guides",
  "Pre-departure Briefing",
  "Umrah Training Session",
  "Emergency Assistance",
  "Flexible Payment Plans",
];

const whyChooseUs = [
  {
    icon: Shield,
    title: "Trusted Agency",
    description: "14+ years of experience with 100% visa success rate.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance throughout your journey.",
  },
  {
    icon: Users,
    title: "Expert Guides",
    description: "Experienced guides for spiritual guidance.",
  },
  {
    icon: Award,
    title: "Best Prices",
    description: "Competitive rates with no hidden charges.",
  },
];

export default function UmrahPackages() {
  const { data } = useSiteData();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&auto=format&fit=crop&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-accent/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 border border-background/20 rounded-full mb-6">
              <Star className="w-4 h-4 text-primary-foreground" />
              <span className="text-primary-foreground/90 font-medium text-sm">Premium Travel Experiences</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Umrah Packages
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Choose from our carefully curated packages designed for every budget and preference. 
              All packages include visa processing, flights, accommodation, and guided tours.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow bg-card">
                <CardContent className="p-0">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-green flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Packages</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              Choose Your Perfect Package
            </h2>
            <p className="text-muted-foreground text-lg">
              From economy to VIP, we have packages for every budget and preference.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.umrahPackages.map((pkg) => (
              <PackageCard key={pkg.id} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Counter Stats */}
      <CounterStats />

      {/* Custom Package CTA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-green rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-background/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Need a Custom Package?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
                We understand every pilgrim has unique needs. Contact us to create a personalized 
                Umrah package tailored specifically for you and your family.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 font-semibold text-lg px-10 py-6 shadow-2xl"
              >
                <Link
                  to="/contact?subject=Custom Package"
                  className="flex items-center gap-2"
                >
                  <Send className="w-5 h-5 text-primary" />
                  Request Custom Package
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Inclusions Info */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">What's Included</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                Every Package Includes
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 border-0 shadow-xl bg-card">
                <CardContent className="p-0">
                  <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-green flex items-center justify-center">
                      <Check className="w-5 h-5 text-primary-foreground" />
                    </div>
                    Standard Inclusions
                  </h3>
                  <ul className="space-y-4">
                    {standardInclusions.map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-8 border-0 shadow-xl bg-card">
                <CardContent className="p-0">
                  <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-green flex items-center justify-center">
                      <Check className="w-5 h-5 text-primary-foreground" />
                    </div>
                    Our Support
                  </h3>
                  <ul className="space-y-4">
                    {supportFeatures.map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
