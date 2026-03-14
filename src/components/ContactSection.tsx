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

            <a
              href="https://wa.me/201223777109"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full rounded-md border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 hover:border-[#25D366]/60 transition-all py-3 text-sm font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {lang === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
            </a>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
