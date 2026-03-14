import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import DashboardPreview from "./DashboardPreview";

const reasonKeys = ["why.r1", "why.r2", "why.r3", "why.r4"];

const WhyUsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="why-us" className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary font-display font-semibold tracking-widest uppercase text-sm mb-3">
              {t("why.subtitle")}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t("why.title1")}<span className="text-primary">{t("why.title2")}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("why.desc")}
            </p>
          </div>

          <div className="space-y-4">
            {reasonKeys.map((key, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="text-foreground">{t(key)}</span>
              </div>
            ))}
            <div className="pt-8">
              <DashboardPreview />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
