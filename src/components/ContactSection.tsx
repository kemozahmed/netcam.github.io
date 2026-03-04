import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();

  const contactInfo = [
    { icon: Phone, text: "+20 122 377 7109", href: "tel:+201223777109" },
    { icon: Mail, text: "kareemahmedibrahiimeldesoky@gmail.com", href: "mailto:kareemahmedibrahiimeldesoky@gmail.com" },
    { icon: MapPin, textKey: "contact.location" },
  ];

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary font-display font-semibold tracking-widest uppercase text-sm mb-3">
            {t("contact.subtitle")}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            {t("contact.title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-8">
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("contact.desc")}
            </p>
            <div className="space-y-5">
              {contactInfo.map(({ icon: Icon, text, href, textKey }) => (
                <div key={text || textKey} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  {href ? (
                    <a href={href} className="text-foreground hover:text-primary transition-colors break-all">
                      {text}
                    </a>
                  ) : (
                    <span className="text-foreground">{textKey ? t(textKey) : text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder={t("contact.name")} className="bg-card border-border focus:border-primary" />
            <Input placeholder={t("contact.email")} type="email" className="bg-card border-border focus:border-primary" />
            <Input placeholder={t("contact.phone")} type="tel" className="bg-card border-border focus:border-primary" />
            <Textarea placeholder={t("contact.message")} rows={4} className="bg-card border-border focus:border-primary" />
            <Button size="lg" className="w-full text-lg py-6">
              {t("contact.send")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
