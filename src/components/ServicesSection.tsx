import { Camera, Shield, Server, Headphones } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const serviceKeys = [
  { icon: Camera, titleKey: "services.cctv.title", descKey: "services.cctv.desc" },
  { icon: Shield, titleKey: "services.security.title", descKey: "services.security.desc" },
  { icon: Server, titleKey: "services.server.title", descKey: "services.server.desc" },
  { icon: Headphones, titleKey: "services.support.title", descKey: "services.support.desc" },
];

const ServicesSection = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary font-display font-semibold tracking-widest uppercase text-sm mb-3">
            {t("services.subtitle")}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            {t("services.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {serviceKeys.map((service) => (
            <div
              key={service.titleKey}
              className="group bg-card border border-border rounded-lg p-8 hover:border-primary/40 transition-all duration-300 border-glow hover:border-glow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {t(service.titleKey)}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t(service.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
