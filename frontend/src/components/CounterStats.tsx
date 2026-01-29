import { useEffect, useState, useRef } from "react";
import { Calendar, Users, Award, Clock, Building, Plane, Star, Globe, LucideIcon } from "lucide-react";
import { useSiteData } from "@/hooks/useSiteData";

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  Users,
  Award,
  Clock,
  Building,
  Plane,
  Star,
  Globe,
};

function useCountUp(target: number, duration: number = 2000, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, start]);

  return count;
}

function StatItem({ icon, target, suffix, label, isVisible }: {
  icon: string;
  target: number;
  suffix: string;
  label: string;
  isVisible: boolean;
}) {
  const count = useCountUp(target, 2000, isVisible);
  const Icon = iconMap[icon] || Calendar;

  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-foreground/10 flex items-center justify-center">
        <Icon className="w-8 h-8 text-primary-foreground" />
      </div>
      <div className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-primary-foreground/80 text-lg">
        {label}
      </div>
    </div>
  );
}

export function CounterStats() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { data } = useSiteData();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-gradient-green relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary-foreground rounded-full" />
        <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-primary-foreground rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-primary-foreground rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {data.counterStats.map((stat) => (
            <StatItem key={stat.id} {...stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
