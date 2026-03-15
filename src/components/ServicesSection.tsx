import { useState, useEffect } from "react";
import { Factory, ShieldCheck, MonitorSmartphone, Sun, Wifi, BarChart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/lib/supabase";

const serviceKeys = [
  { icon: Factory, titleKey: "services.industrial.title", descKey: "services.industrial.desc", cmsKey: "servicesIndustrialDesc" },
  { icon: ShieldCheck, titleKey: "services.security.title", descKey: "services.security.desc", cmsKey: "servicesSecurityDesc" },
  { icon: MonitorSmartphone, titleKey: "services.software.title", descKey: "services.software.desc", cmsKey: "servicesSoftwareDesc" },
  { icon: Sun, titleKey: "services.solar.title", descKey: "services.solar.desc", cmsKey: "servicesSolarDesc" },
  { icon: Wifi, titleKey: "services.iot.title", descKey: "services.iot.desc", cmsKey: "servicesIotDesc" },
  { icon: BarChart, titleKey: "services.dashboards.title", descKey: "services.dashboards.desc", cmsKey: "servicesDashboardsDesc" },
];

const ServicesSection = () => {
  const { t, lang } = useLanguage();
  const [descriptions, setDescriptions] = useState<Record<string, string>>({});

  useEffect(() => {
    // Reset to defaults
    const defaults: Record<string, string> = {};
    serviceKeys.forEach(s => defaults[s.cmsKey] = t(s.descKey));
    setDescriptions(defaults);

    const fetchCmsSettings = async () => {
      try {
        const { data, error } = await supabase.from("site_settings").select("value").eq("key", `content_${lang}`).single();
        if (data && !error) {
          const fetchedDescriptions: Record<string, string> = {};
          serviceKeys.forEach(s => {
            fetchedDescriptions[s.cmsKey] = data.value[s.cmsKey] || t(s.descKey);
          });
          setDescriptions(fetchedDescriptions);
        }
      } catch (error) {
        console.error("Error fetching Services CMS:", error);
      }
    };

    fetchCmsSettings();
  }, [lang, t]);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {serviceKeys.map((service) => (
            <div
              key={service.titleKey}
              className="group bg-card border border-border rounded-lg p-8 hover:border-primary/40 transition-all duration-300 border-glow hover:border-glow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className={`font-display text-xl font-semibold text-foreground mb-3 leading-relaxed ${lang === 'ar' ? 'text-right' : ''}`}>
                {t(service.titleKey)}
              </h3>
              <p className={`text-muted-foreground leading-relaxed ${lang === 'ar' ? 'text-right' : ''}`}>
                {descriptions[service.cmsKey] || t(service.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
