import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContactSection = () => {
  const { t, lang } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service_type: "",
    message: "",
  });

  const contactInfo = [
    { icon: Phone, text: "+20 122 377 7109", href: "tel:+201223777109" },
    { icon: Mail, text: "info@enginxautomation.com", href: "mailto:info@enginxautomation.com" },
    { icon: MapPin, textKey: "contact.location" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('leads')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service_type: formData.service_type,
          message: formData.message,
        }]);

      if (error) throw error;

      toast.success(lang === 'ar' ? 'تم إرسال رسالتك بنجاح!' : 'Your message has been sent successfully!');
      setFormData({ name: "", email: "", phone: "", service_type: "", message: "" });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(lang === 'ar' ? 'حدث خطأ، يرجى المحاولة مرة أخرى.' : 'An error occurred, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, service_type: value }));
  };

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

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("contact.name")}
              required
              className="bg-card border-border focus:border-primary"
            />
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("contact.email")}
              type="email"
              required
              className="bg-card border-border focus:border-primary"
            />
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t("contact.phone")}
              type="tel"
              required
              className="bg-card border-border focus:border-primary"
            />

            <Select onValueChange={handleSelectChange} value={formData.service_type}>
              <SelectTrigger className="bg-card border-border focus:border-primary w-full text-left" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <SelectValue placeholder={lang === 'ar' ? "اختر الخدمة..." : "Select Service..."} />
              </SelectTrigger>
              <SelectContent dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <SelectItem value="industrial">{t("services.industrial.title")}</SelectItem>
                <SelectItem value="security">{t("services.security.title")}</SelectItem>
                <SelectItem value="software">{t("services.software.title")}</SelectItem>
                <SelectItem value="solar">{t("services.solar.title")}</SelectItem>
                <SelectItem value="iot">{t("services.iot.title")}</SelectItem>
                <SelectItem value="dashboards">{t("services.dashboards.title")}</SelectItem>
              </SelectContent>
            </Select>

            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t("contact.message")}
              rows={4}
              required
              className="bg-card border-border focus:border-primary"
            />
            <Button size="lg" className="w-full text-lg py-6" disabled={isSubmitting}>
              {isSubmitting ? (lang === 'ar' ? "جاري الإرسال..." : "Sending...") : t("contact.send")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
