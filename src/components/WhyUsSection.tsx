import { CheckCircle2 } from "lucide-react";

const reasons = [
  "Certified networking & surveillance professionals",
  "Enterprise-grade equipment & trusted brands",
  "Custom solutions tailored to your needs",
  "Competitive pricing with transparent quotes",
  "Fast installation & minimal downtime",
  "Ongoing maintenance & 24/7 support",
];

const WhyUsSection = () => {
  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary font-display font-semibold tracking-widest uppercase text-sm mb-3">
              Why Choose Us
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Trusted by businesses <span className="text-primary">since day one</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We deliver reliable, scalable technology solutions backed by years of
              hands-on experience in networking, surveillance, and internet services.
            </p>
          </div>

          <div className="space-y-4">
            {reasons.map((reason, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="text-foreground">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
