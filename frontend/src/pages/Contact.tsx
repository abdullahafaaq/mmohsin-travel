import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageCircle, Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20, "Phone number is too long"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const subjectOptions = [
  { value: "general", label: "General Inquiry" },
  { value: "umrah", label: "Umrah Package" },
  { value: "flight", label: "Flight Booking" },
  { value: "custom", label: "Custom Package" },
  { value: "other", label: "Other" },
];

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Quick responses, available 24/7",
    value: "0300 0180347",
    action: "https://wa.me/923000180347",
    actionText: "Chat Now",
    primary: true,
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our team",
    value: "0302 7553524",
    action: "tel:+923027553524",
    actionText: "Call Now",
    primary: false,
  },
  {
    icon: Mail,
    title: "Email",
    description: "For detailed inquiries",
    value: "info@mmohsintravel.com",
    action: "mailto:info@mmohsintravel.com",
    actionText: "Send Email",
    primary: false,
  },
];

const businessHours = [
  { day: "Monday - Saturday", hours: "10:00 AM - 7:00 PM" },
  { day: "Sunday", hours: "Closed (WhatsApp available)" },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

export default function Contact() {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  // Handle pre-selected subject from URL params
  useEffect(() => {
    const subjectParam = searchParams.get("subject");
    if (subjectParam) {
      const matchingSubject = subjectOptions.find(
        (opt) => opt.label.toLowerCase() === subjectParam.toLowerCase()
      );
      if (matchingSubject) {
        setValue("subject", matchingSubject.value);
      }
      // Scroll to form
      const formElement = document.getElementById("inquiry-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [searchParams, setValue]);

  const onSubmit = (data: ContactFormData) => {
    const subjectLabel = subjectOptions.find((opt) => opt.value === data.subject)?.label || data.subject;
    
    // Create WhatsApp message
    const message = `Hello! I'm ${data.name}.

Subject: ${subjectLabel}

${data.message}

Contact Details:
📧 Email: ${data.email}
📱 Phone: ${data.phone}`;

    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/923000180347?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    toast({
      title: "Message Prepared!",
      description: "Redirecting you to WhatsApp to send your inquiry.",
    });

    reset();
  };

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
            <span className="text-primary-foreground/80 font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mt-4 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Ready to plan your journey? Get in touch with us through WhatsApp 
              for the fastest response, or use any of our other contact methods.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Methods */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div id="inquiry-form">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Send a Message</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-8">
                Inquiry Form
              </h2>
              <Card className="p-8 border-0 shadow-xl">
                <CardContent className="p-0">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        {...register("name")}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          {...register("email")}
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+92 300 1234567"
                          {...register("phone")}
                          className={errors.phone ? "border-destructive" : ""}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Select
                        value={watch("subject")}
                        onValueChange={(value) => setValue("subject", value)}
                      >
                        <SelectTrigger className={errors.subject ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjectOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.subject && (
                        <p className="text-sm text-destructive">{errors.subject.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your travel plans or inquiry..."
                        rows={5}
                        {...register("message")}
                        className={errors.message ? "border-destructive" : ""}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive">{errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-accent font-semibold"
                      disabled={isSubmitting}
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message via WhatsApp
                    </Button>

                    <p className="text-sm text-muted-foreground text-center">
                      Your message will be sent directly to our WhatsApp for quick response.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Methods */}
            <div className="space-y-8">
              <div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Contact Methods</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-8">
                  Other Ways to Reach Us
                </h2>
              </div>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <Card
                    key={index}
                    className={`p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                      method.primary ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <CardContent className="p-0 flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                          method.primary ? "bg-gradient-green" : "bg-primary/10"
                        }`}
                      >
                        <method.icon
                          className={`w-7 h-7 ${
                            method.primary ? "text-primary-foreground" : "text-primary"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-bold text-foreground">
                          {method.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {method.value}
                        </p>
                      </div>
                      <Button
                        asChild
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-accent"
                      >
                        <a
                          href={method.action}
                          target={method.icon === MessageCircle ? "_blank" : undefined}
                          rel={method.icon === MessageCircle ? "noopener noreferrer" : undefined}
                        >
                          {method.actionText}
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Contact Box */}
              <Card className="p-8 bg-gradient-green text-primary-foreground border-0">
                <CardContent className="pt-0 space-y-4">
                  <h3 className="font-display text-2xl font-bold">
                    Prefer a Quick Chat?
                  </h3>
                  <p className="text-primary-foreground/80">
                    Our WhatsApp support is available 24/7. Get instant responses 
                    to your queries about packages, flights, and more.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-background text-foreground hover:bg-background/90 font-semibold"
                  >
                    <a
                      href="https://wa.me/923000180347?text=Hello! I'm interested in your travel services. Please help me with information."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5 text-primary" />
                      Start WhatsApp Chat
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Info & Map */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Office Details */}
            <div className="space-y-8">
              <div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Location</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-8">
                  Visit Our Office
                </h2>
                <Card className="p-8 border-0 shadow-xl">
                  <CardContent className="pt-0 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-green flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground mb-1">
                          Office Address
                        </h3>
                        <p className="text-muted-foreground">
                          Near Govt. Muslim Model High School
                          <br />
                          Darman Road, Shakargarh
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-green flex items-center justify-center flex-shrink-0">
                        <Clock className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground mb-3">
                          Business Hours
                        </h3>
                        <ul className="space-y-2">
                          {businessHours.map((item, index) => (
                            <li
                              key={index}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-muted-foreground">
                                {item.day}
                              </span>
                              <span className="text-foreground font-medium">
                                {item.hours}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Map */}
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-bold text-foreground">
                Find Us on Map
              </h2>
              <div className="aspect-square lg:aspect-auto lg:h-[500px] rounded-2xl overflow-hidden border border-border shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13456.123456789!2d75.1595!3d32.2632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391eeb2f3f3f3f3f%3A0x3f3f3f3f3f3f3f3f!2sShakargarh%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1635000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="M. Mohsin Travels Office Location"
                />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Located near Govt. Muslim Model High School, Darman Road, Shakargarh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Stay Connected</span>
            <h2 className="font-display text-3xl font-bold text-foreground mt-3 mb-4">
              Follow Us on Social Media
            </h2>
            <p className="text-muted-foreground mb-8">
              Stay updated with our latest packages, travel tips, and special offers.
            </p>
            <div className="flex justify-center gap-4">
              {socialLinks.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.href}
                  className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <platform.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
