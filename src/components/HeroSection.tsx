import { useState, useEffect } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { Shield, Camera, Server, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/lib/supabase";

const stats = [
  { valueAr: "+٥٠", valueEn: "50+", labelAr: "عميل راضٍ", labelEn: "Happy Clients" },
  { valueAr: "+١٠٠", valueEn: "100+", labelAr: "مشروع منجز", labelEn: "Projects Done" },
  { valueAr: "+٣", valueEn: "3+", labelAr: "سنوات خبرة", labelEn: "Years Experience" },
];

const HeroSection = () => {
  const { t, lang } = useLanguage();
  const [content, setContent] = useState({
    title1: t("hero.title1"),
    title2: t("hero.title2"),
    desc: t("hero.desc"),
  });

  useEffect(() => {
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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="absolute inset-0 bg-background/75" />
      <div className="absolute inset-0 bg-gradient-radial" />

      <div className="relative z-10 container mx-auto px-6 text-center flex-1 flex flex-col items-center justify-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 rounded-full px-4 py-1.5 mb-8 animate-fade-in-up">
          <Zap className="w-3.5 h-3.5 text-primary" />
          <span className="text-primary text-sm font-medium">
            {lang === 'ar' ? 'حلول أتمتة صناعية متكاملة' : 'Integrated Industrial Automation'}
          </span>
        </div>

        {/* Icons */}
        <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in-up-delay-1">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Camera className="w-5 h-5 text-primary" />
          </div>
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Server className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in-up-delay-1">
          <span className="text-foreground">{content.title1}</span>
          <br />
          <span className="text-primary text-glow">{content.title2}</span>
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up-delay-2">
          {content.desc}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-3">
          <Button size="lg" className="text-lg px-8 py-6 animate-pulse-glow" asChild>
            <a href="#contact">{t("hero.quote")}</a>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/30 text-primary hover:bg-primary/10" asChild>
            <a href="#services">{t("hero.ourServices")}</a>
          </Button>
        </div>

        {/* Stats strip */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto animate-fade-in-up-delay-3">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-3xl font-bold text-primary text-glow">
                {lang === 'ar' ? stat.valueAr : stat.valueEn}
              </div>
              <div className="text-muted-foreground text-sm mt-1">
                {lang === 'ar' ? stat.labelAr : stat.labelEn}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
