import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Plane, Globe } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { useSiteData } from "@/hooks/useSiteData";

const footerLinks = {
  services: [
    { name: "Umrah Packages", path: "/umrah-packages" },
    { name: "Flight Tickets", path: "/flights" },
    { name: "Visa Assistance", path: "/contact" },
    { name: "Hotel Bookings", path: "/contact" },
  ],
  company: [
    { name: "About Us", path: "/about" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ],
};

export function Footer() {
  const { data } = useSiteData();
  const { siteSettings } = data;

  return (
    <footer className="bg-gradient-green text-primary-foreground relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-background rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-background rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <img
              src={logo}
              alt={siteSettings.companyName}
              className="h-16 w-auto bg-background rounded-lg p-2"
            />
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Your trusted partner for Umrah journeys and flight bookings. 
              Making your spiritual travels seamless and memorable since 2010.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-light" />
              Our Services
            </h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-green-light rounded-full group-hover:scale-125 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 flex items-center gap-2">
              <Plane className="w-5 h-5 text-green-light" />
              Company
            </h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-green-light rounded-full group-hover:scale-125 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-green-light" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60">WhatsApp</p>
                  <a
                    href={`https://web.whatsapp.com/send?phone=${siteSettings.whatsapp}`}
                    className="text-primary-foreground hover:text-green-light transition-colors font-medium"
                  >
                    {siteSettings.phones[0] || siteSettings.whatsapp}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-green-light" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60">Email</p>
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="text-primary-foreground hover:text-green-light transition-colors font-medium"
                  >
                    {siteSettings.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-green-light" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60">Office</p>
                  <p className="text-primary-foreground text-sm">
                    {siteSettings.address.split(',').map((part, i) => (
                      <span key={i}>
                        {part.trim()}
                        {i < siteSettings.address.split(',').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} {siteSettings.companyName}. All rights reserved.
            </p>
            <p className="text-primary-foreground/60 text-sm">
              Ticketing • Umrah • Visa
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
