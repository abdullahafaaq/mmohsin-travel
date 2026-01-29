import { Layout } from "@/components/Layout";
import { CounterStats } from "@/components/CounterStats";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Shield, Heart, Users, Award, Target, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteData } from "@/hooks/useSiteData";

const values = [
  {
    icon: Shield,
    title: "Trust & Integrity",
    description: "We build lasting relationships through honesty and transparency in all our dealings.",
  },
  {
    icon: Heart,
    title: "Customer Care",
    description: "Your satisfaction is our priority. We go above and beyond to meet your needs.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Our experienced professionals ensure every journey is smooth and memorable.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in every service we provide, from booking to return.",
  },
];

export default function About() {
  const { data } = useSiteData();
  const whatsappLink = `https://wa.me/${data.siteSettings.whatsapp}`;

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
            <span className="text-primary-foreground/80 font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mt-4 mb-6">
              {data.aboutContent.heroTitle}
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              {data.aboutContent.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&auto=format&fit=crop&q=80"
                alt="About M Mohsin International"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 bg-primary text-primary-foreground p-8 rounded-2xl shadow-xl hidden lg:block">
                <div className="text-5xl font-bold">{data.aboutContent.yearsExperience}+</div>
                <div className="text-lg">Years of Excellence</div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {data.aboutContent.mainTitle}
              </h2>
              {data.aboutContent.paragraphs.map((para, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed text-lg">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Counter Stats */}
      <CounterStats />

      {/* Mission & Vision */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-card border-0 shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-green flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {data.aboutContent.mission}
                </p>
              </CardContent>
            </Card>
            <Card className="p-8 bg-card border-0 shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-green flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {data.aboutContent.vision}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              What We Stand For
            </h2>
            <p className="text-muted-foreground text-lg">
              Our core values guide everything we do and shape the experience we deliver.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border bg-card"
              >
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-green flex items-center justify-center shadow-lg">
                    <value.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Team</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              Meet the Experts
            </h2>
            <p className="text-muted-foreground text-lg">
              Our dedicated team works tirelessly to make your travel dreams come true.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {data.teamMembers.map((member) => (
              <Card key={member.id} className="text-center p-8 bg-card border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-green flex items-center justify-center text-primary-foreground text-3xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.description}</p>
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
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
              Ready to Start Your Journey?
            </h2>
            <p className="text-primary-foreground/80 text-xl">
              Contact us today and let us help you plan your perfect travel experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 font-semibold text-lg px-8 py-6 shadow-2xl"
              >
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Chat on WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold text-lg px-8 py-6"
              >
                <Link to="/contact" className="flex items-center gap-2">
                  Contact Us
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
