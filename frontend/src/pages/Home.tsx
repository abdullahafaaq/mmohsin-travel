import { Layout } from "@/components/Layout";
import { PackageCard } from "@/components/PackageCard";
import { ServiceCard } from "@/components/ServiceCard";
import { CounterStats } from "@/components/CounterStats";
import { PartnersCarousel } from "@/components/PartnersCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Plane, Shield, Clock, Users, Star, MessageCircle, Globe, Award, Hotel, FileCheck, Map } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteData } from "@/hooks/useSiteData";

const services = [
  {
    icon: Plane,
    title: "Flight Reservations",
    description: "Seamless booking for domestic and international flights with competitive fares.",
  },
  {
    icon: Map,
    title: "Tour Packages",
    description: "Thoughtfully crafted Umrah and tour packages highlighting spiritual experiences.",
  },
  {
    icon: Users,
    title: "Group Travel",
    description: "Plan your group Umrah or travel hassle-free with our experienced team.",
  },
  {
    icon: Hotel,
    title: "Hotel Bookings",
    description: "Book your hotels near Haram effortlessly with premium accommodation options.",
  },
];

const features = [
  {
    icon: Shield,
    title: "Trusted & Reliable",
    description: "Licensed agency with 15+ years of experience in organizing successful Umrah journeys.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance from booking to return. We're always here for you.",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description: "Experienced guides accompany you throughout your spiritual journey.",
  },
  {
    icon: Star,
    title: "Premium Partners",
    description: "Partnerships with top airlines and hotels for the best travel experience.",
  },
];

export default function Home() {
  const { data } = useSiteData();
  
  // Get featured packages (max 3)
  const featuredPackages = data.umrahPackages
    .filter(pkg => pkg.featured)
    .slice(0, 3);
  
  // If no featured, take first 3
  const displayPackages = featuredPackages.length > 0 
    ? featuredPackages 
    : data.umrahPackages.slice(0, 3);

  const whatsappLink = `https://wa.me/${data.siteSettings.whatsapp}`;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&auto=format&fit=crop&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-primary/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl space-y-8">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              WELCOME TO
              <span className="block text-gradient-green text-5xl md:text-6xl lg:text-7xl">{data.siteSettings.companyName}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {data.siteSettings.companyName} offers personalized travel experiences with a focus on exceptional service and customized itineraries for Umrah and worldwide destinations.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-accent font-semibold text-lg px-8 py-6 shadow-xl"
              >
                <Link to="/umrah-packages" className="flex items-center gap-2">
                  View Packages
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary text-foreground hover:bg-primary hover:text-primary-foreground font-semibold text-lg px-8 py-6"
              >
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&auto=format&fit=crop&q=80"
                alt="About Us"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="text-4xl font-bold">{data.aboutContent.yearsExperience}+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>
            <div className="space-y-6">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">About Us</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Your Trusted Partner for Sacred Journeys
              </h2>
              {data.aboutContent.paragraphs.slice(0, 2).map((para, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed">
                  {para}
                </p>
              ))}
              <Button asChild className="bg-primary text-primary-foreground hover:bg-accent">
                <Link to="/about" className="flex items-center gap-2">
                  Learn More About Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Counter Stats */}
      <CounterStats />

      {/* Featured Packages */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Packages</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              Popular Umrah Packages
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose from our carefully curated packages designed for every budget.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPackages.map((pkg) => (
              <PackageCard key={pkg.id} {...pkg} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
            >
              <Link to="/umrah-packages" className="flex items-center gap-2">
                View All Packages
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Partners Carousel */}
      <PartnersCarousel />

      {/* Why Choose Us */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Why Us</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              Why Choose {data.siteSettings.companyName}?
            </h2>
            <p className="text-muted-foreground text-lg">
              We're committed to making your spiritual journey comfortable and memorable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border bg-card"
              >
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-green flex items-center justify-center shadow-lg">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-green relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-background/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-background/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground">
              Ready to Begin Your Sacred Journey?
            </h2>
            <p className="text-primary-foreground/80 text-xl">
              Contact us today and let us help you plan the perfect Umrah experience. 
              Our team is available 24/7 to assist you.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 font-semibold text-lg px-10 py-6 shadow-2xl"
            >
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-primary" />
                Start Planning on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
