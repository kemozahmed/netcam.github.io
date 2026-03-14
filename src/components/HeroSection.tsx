import { useState, useEffect } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { Shield, Camera, Server } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/lib/supabase";

const HeroSection = () => {
  const { t, lang } = useLanguage();
  const [content, setContent] = useState({
    title1: t("hero.title1"),
    title2: t("hero.title2"),
    desc: t("hero.desc"),
  });

  useEffect(() => {
    // Reset to translations first
    setContent({
      title1: t("hero.title1"),
      title2: t("hero.title2"),
      desc: t("hero.desc"),
    });

    const fetchCmsSettings = async () => {
      try {
        const { data, error } = await supabase.from("site_settings").select("value").eq("key", `content_${lang}`).single();
        if (data && !error) {
          setContent(prev => ({
            ...prev,
            title1: data.value.heroTitle1 || prev.title1,
            title2: data.value.heroTitle2 || prev.title2,
            desc: data.value.heroDesc || prev.desc,
          }));
        }
      } catch (error) {
        console.error("Error fetching Hero CMS:", error);
      }
    };

    fetchCmsSettings();
  }, [lang, t]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 bg-gradient-radial" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Camera className="w-6 h-6 text-primary" />
          <Shield className="w-6 h-6 text-primary" />
          <Server className="w-6 h-6 text-primary" />
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          <span className="text-foreground">{content.title1}</span>
          <br />
          <span className="text-primary text-glow">{content.title2}</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {content.desc}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-6 animate-pulse-glow" asChild>
            <a href="#contact">{t("hero.quote")}</a>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/30 text-primary hover:bg-primary/10" asChild>
            <a href="#services">{t("hero.ourServices")}</a>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
