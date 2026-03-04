import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { Shield, Camera, Server } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 bg-gradient-radial" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Camera className="w-6 h-6 text-primary" />
          <Shield className="w-6 h-6 text-primary" />
          <Server className="w-6 h-6 text-primary" />
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          <span className="text-foreground">CCTV & DVR</span>
          <br />
          <span className="text-primary text-glow">Security Solutions</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Professional CCTV installation, DVR/NVR systems, remote monitoring,
          and complete security solutions — serving Ismailia and beyond.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-6 animate-pulse-glow" asChild>
            <a href="#contact">Get a Free Quote</a>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/30 text-primary hover:bg-primary/10" asChild>
            <a href="#services">Our Services</a>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
