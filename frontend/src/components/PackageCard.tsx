import { Check, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PackageCardProps {
  name: string;
  duration: string;
  price: string;
  hotel: string;
  hotelRating: number;
  distance: string;
  inclusions: string[];
  featured?: boolean;
  image?: string;
}

export function PackageCard({
  name,
  duration,
  price,
  hotel,
  hotelRating,
  distance,
  inclusions,
  featured = false,
  image = "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&auto=format&fit=crop&q=80",
}: PackageCardProps) {
  const whatsappMessage = `Hello! I'm interested in the ${name} package (${duration}, ${price}). Please share more details.`;
  const whatsappUrl = `https://web.whatsapp.com/send?phone=923000180347&text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <Card
      className={`overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-card border-border/50 ${
        featured ? "ring-2 ring-primary shadow-xl" : ""
      }`}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        {featured && (
          <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground font-semibold">
            <Star className="w-3 h-3 mr-1" />
            Most Popular
          </Badge>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-accent/90 via-accent/50 to-transparent p-6">
          <p className="text-primary-foreground font-display text-3xl font-bold">{price}</p>
          <p className="text-primary-foreground/80 text-sm">per person</p>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-xl font-bold text-foreground">
              {name}
            </h3>
            <p className="text-muted-foreground text-sm mt-1">{duration}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Hotel Info */}
        <div className="bg-secondary rounded-xl p-4">
          <p className="font-semibold text-foreground">{hotel}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex">
              {Array.from({ length: hotelRating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-primary fill-primary" />
              ))}
            </div>
            <span className="text-muted-foreground text-sm">• {distance}</span>
          </div>
        </div>

        {/* Inclusions */}
        <div className="space-y-2.5">
          {inclusions.slice(0, 4).map((inclusion, index) => (
            <div key={index} className="flex items-center gap-2.5 text-sm">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span className="text-muted-foreground">{inclusion}</span>
            </div>
          ))}
          {inclusions.length > 4 && (
            <p className="text-sm text-primary font-semibold pl-7">
              +{inclusions.length - 4} more inclusions
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button
          asChild
          className="w-full bg-primary text-primary-foreground hover:bg-accent font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <a
            href={whatsappUrl}
            target="_top"
            className="flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Inquire on WhatsApp
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
