import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle, HelpCircle } from "lucide-react";

const faqCategories = [
  {
    title: "Umrah Packages",
    questions: [
      {
        question: "What is included in your Umrah packages?",
        answer: "Our Umrah packages typically include: Umrah visa processing, return flights, hotel accommodation in Makkah and Madinah, airport transfers, Ziyarat tours in both holy cities, and 24/7 customer support. Specific inclusions vary by package tier (Economy, Standard, Premium, VIP).",
      },
      {
        question: "How far in advance should I book my Umrah package?",
        answer: "We recommend booking at least 4-6 weeks in advance to ensure availability and smooth visa processing. During peak seasons (Ramadan, school holidays), booking 2-3 months ahead is advisable. Last-minute bookings are possible but may have limited options.",
      },
      {
        question: "Can I customize my Umrah package?",
        answer: "Absolutely! We understand every pilgrim has unique needs. Contact us on WhatsApp to discuss your specific requirements, and we'll create a tailored package just for you. We can adjust duration, hotel categories, add extra services, and accommodate special requests.",
      },
      {
        question: "What documents do I need for Umrah?",
        answer: "You'll need: A valid passport (minimum 6 months validity), recent passport-sized photographs (with white background), vaccination certificate (Meningitis and COVID-19 if required), completed visa application form, and proof of relationship for female pilgrims traveling with a Mahram.",
      },
      {
        question: "Do you offer group discounts?",
        answer: "Yes! We offer attractive group discounts for families and groups. The more people in your group, the better the rates. Contact us to get a customized quote for your group.",
      },
    ],
  },
  {
    title: "Flights & Booking",
    questions: [
      {
        question: "Which airlines do you work with?",
        answer: "We partner with major airlines including Pakistan International Airlines (PIA), Saudi Airlines, Emirates, Qatar Airways, Turkish Airlines, Etihad Airways, and budget carriers like Air Arabia and flynas. This allows us to offer you the best prices and schedules.",
      },
      {
        question: "Can I book just flight tickets without the full package?",
        answer: "Yes! We offer standalone flight booking services to Jeddah, Madinah, and many other destinations worldwide. Contact us with your travel dates and we'll provide you with the best available options.",
      },
      {
        question: "What is your cancellation policy?",
        answer: "Cancellation policies vary depending on the package and airlines involved. Generally, cancellations made 30+ days before departure receive a higher refund. For specific cancellation terms, please contact us directly. We recommend purchasing travel insurance for added protection.",
      },
      {
        question: "How do I make payment?",
        answer: "We accept multiple payment methods including bank transfer, cash, and installment plans for eligible customers. A 30-50% deposit is typically required to confirm your booking, with the balance due before travel dates. Full payment details are provided upon booking confirmation.",
      },
    ],
  },
  {
    title: "During Your Journey",
    questions: [
      {
        question: "Will there be a guide with us during Umrah?",
        answer: "Yes! All our packages include guidance support. Economy and Standard packages include group guides, while Premium and VIP packages offer dedicated personal guides who accompany you throughout your journey, helping with rituals and logistics.",
      },
      {
        question: "What support is available if I face issues during travel?",
        answer: "We provide 24/7 support throughout your journey. Our team is available via WhatsApp and phone for any emergencies or assistance you may need. We also have local representatives in Makkah and Madinah to help with on-ground issues.",
      },
      {
        question: "Can I extend my stay in Saudi Arabia?",
        answer: "Extensions are possible subject to hotel availability and visa regulations. Please inform us in advance if you're considering an extension, and we'll help arrange it. Additional charges will apply for extended accommodation and services.",
      },
      {
        question: "What happens if my flight is delayed or cancelled?",
        answer: "In case of flight disruptions, our team will immediately work to rebook you on the next available flight. We'll also adjust your hotel bookings accordingly. This is why we maintain 24/7 support to handle such situations promptly.",
      },
    ],
  },
  {
    title: "Visa & Requirements",
    questions: [
      {
        question: "How long does Umrah visa processing take?",
        answer: "Umrah visa processing typically takes 3-7 business days. However, during peak seasons, it may take longer. We recommend submitting your documents at least 2-3 weeks before your intended travel date to avoid any last-minute issues.",
      },
      {
        question: "What is the Mahram rule for female pilgrims?",
        answer: "According to Saudi regulations, women under 45 years of age must travel with a Mahram (a male relative whom she cannot marry - father, brother, husband, son, etc.). Women 45 and above can travel in an organized group without a Mahram. We can help arrange group travel for solo female pilgrims.",
      },
      {
        question: "Are vaccinations required for Umrah?",
        answer: "Yes, Meningitis (ACWY) vaccination is mandatory and must be taken at least 10 days before travel. COVID-19 vaccination requirements may vary based on current regulations. We'll provide you with updated vaccination requirements at the time of booking.",
      },
    ],
  },
];

export default function FAQ() {
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-background/10 flex items-center justify-center">
                <HelpCircle className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-primary-foreground/80 font-semibold text-sm uppercase tracking-wider">Help Center</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Find answers to common questions about our Umrah packages, flights, 
              and travel services.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-green flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">{categoryIndex + 1}</span>
                  </div>
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${categoryIndex}-${faqIndex}`}
                      className="bg-card border-0 shadow-lg rounded-2xl px-6 overflow-hidden"
                    >
                      <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-6 hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-24 bg-gradient-green relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-background/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-background/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
              Still Have Questions?
            </h2>
            <p className="text-primary-foreground/80 text-xl">
              Can't find the answer you're looking for? Our team is here to help. 
              Reach out to us on WhatsApp for immediate assistance.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 font-semibold text-lg px-10 py-6 shadow-2xl"
            >
              <a
                href="https://wa.me/923000180347?text=Hello! I have a question about your travel services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-primary" />
                Ask Us on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
