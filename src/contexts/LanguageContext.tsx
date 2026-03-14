import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "ar";

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<string, Record<Lang, string>> = {
  // Navbar
  "nav.services": { en: "Services", ar: "خدماتنا" },
  "nav.whyUs": { en: "Why Us", ar: "لماذا نحن" },
  "nav.contact": { en: "Contact", ar: "تواصل معنا" },
  "nav.join": { en: "Join Us", ar: "انضم إلينا" },

  // Hero
  "hero.title1": { en: "EnginX Automation:", ar: "EnginX Automation:" },
  "hero.title2": { en: "Towards a Smarter Industrial Future", ar: "نحو مستقبل صناعي أذكى" },
  "hero.desc": {
    en: "Bridging the gap between mechanical engineering and digital intelligence. We provide premium industrial automation, smart security, and renewable energy solutions.",
    ar: "نربط بين الهندسة الميكانيكية والذكاء الرقمي. نقدم حلولاً متقدمة في الأتمتة الصناعية، الأمن الذكي، والطاقة المتجددة.",
  },
  "hero.quote": { en: "Get a Free Quote", ar: "احصل على عرض سعر مجاني" },
  "hero.ourServices": { en: "Our Services", ar: "خدماتنا" },

  // Services
  "services.subtitle": { en: "What We Offer", ar: "ما نقدمه" },
  "services.title": { en: "Our Services", ar: "خدماتنا" },
  "services.industrial.title": { en: "Industrial Automation", ar: "الأتمتة الصناعية" },
  "services.industrial.desc": {
    en: "Streamline your manufacturing processes with advanced PLCs, robotics, and smart sensors for maximum efficiency.",
    ar: "تبسيط عمليات التصنيع الخاصة بك باستخدام PLCs المتقدمة، الروبوتات، والمستشعرات الذكية لأقصى قدر من الكفاءة.",
  },
  "services.security.title": { en: "Smart Security", ar: "الأمن الذكي والمراقبة" },
  "services.security.desc": {
    en: "AI-powered surveillance, access control, and complete perimeter security systems integrated with your operations.",
    ar: "مراقبة مدعومة بالذكاء الاصطناعي، التحكم في الوصول، وأنظمة أمان محيطية متكاملة مع عملياتك.",
  },
  "services.software.title": { en: "Business Software & POS", ar: "برمجيات الأعمال ونقاط البيع" },
  "services.software.desc": {
    en: "Custom business management software, advanced POS systems, and ERP integration tailored for your enterprise.",
    ar: "برامج إدارة أعمال مخصصة، أنظمة نقاط بيع (POS) متقدمة، وتكامل ERP مصمم خصيصاً لشركتك.",
  },
  "services.solar.title": { en: "Renewable Energy & Solar", ar: "الطاقة المتجددة والشمسية" },
  "services.solar.desc": {
    en: "Sustainable solar power solutions with smart monitoring to reduce operational costs and carbon footprint.",
    ar: "حلول طاقة شمسية مستدامة مع مراقبة ذكية لتقليل تكاليف التشغيل والبصمة الكربونية.",
  },
  "services.iot.title": { en: "IoT Data Link", ar: "ربط بيانات إنترنت الأشياء (IoT)" },
  "services.iot.desc": {
    en: "Connect your machinery to the cloud. Real-time data acquisition and industrial IoT infrastructure.",
    ar: "ربط أجهزتك بالسحابة. الحصول على البيانات في الوقت الفعلي وبنية تحتية لإنترنت الأشياء الصناعي.",
  },
  "services.dashboards.title": { en: "Performance Dashboards", ar: "لوحات التحكم في الأداء" },
  "services.dashboards.desc": {
    en: "Interactive analytics dashboards providing actionable insights into your production and energy efficiency.",
    ar: "لوحات تحكم تحليلية تفاعلية توفر رؤى قابلة للتنفيذ حول كفاءة الإنتاج والطاقة لديك.",
  },

  // Why Us
  "why.subtitle": { en: "Why Choose Us", ar: "لماذا تختارنا" },
  "why.title1": { en: "Your Partner in ", ar: "شريكك في " },
  "why.title2": { en: "Innovation", ar: "الابتكار" },
  "why.desc": {
    en: "We combine mechanical engineering precision with cutting-edge software development to deliver unparalleled automation solutions.",
    ar: "نحن نجمع بين دقة الهندسة الميكانيكية وتطوير البرمجيات المتطورة لتقديم حلول أتمتة لا مثيل لها.",
  },
  "why.r1": { en: "Engineering Expertise (Mechanical Background)", ar: "خبرة هندسية (خلفية ميكانيكية قوية)" },
  "why.r2": { en: "Integrated Solutions (Hardware + Software)", ar: "حلول متكاملة (أجهزة + برمجيات)" },
  "why.r3": { en: "Local Support (Egypt-based)", ar: "دعم محلي (مقرنا في مصر)" },
  "why.r4": { en: "Cost Efficiency & Fast ROI", ar: "كفاءة التكلفة وعائد سريع على الاستثمار" },

  // Contact
  "contact.subtitle": { en: "Get In Touch", ar: "تواصل معنا" },
  "contact.title": { en: "Contact Us", ar: "اتصل بنا" },
  "contact.desc": {
    en: "Ready to upgrade your operations with our automation solutions? Reach out for a free consultation.",
    ar: "مستعد لترقية عملياتك بحلول الأتمتة لدينا؟ تواصل معنا للحصول على استشارة مجانية.",
  },
  "contact.location": { en: "Egypt — Nationwide Service", ar: "مصر — خدمة على مستوى الجمهورية" },
  "contact.name": { en: "Your Name", ar: "اسمك" },
  "contact.email": { en: "Email Address", ar: "البريد الإلكتروني" },
  "contact.phone": { en: "Phone Number", ar: "رقم الهاتف" },
  "contact.message": { en: "Tell us about your project...", ar: "أخبرنا عن مشروعك..." },
  "contact.send": { en: "Send Message", ar: "إرسال الرسالة" },

  // Footer
  "footer.rights": {
    en: "© 2026 EnginX Automation. All rights reserved. Egypt.",
    ar: "© 2026 EnginX Automation. جميع الحقوق محفوظة. مصر.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("ar");

  const toggleLang = () => setLang((prev) => (prev === "en" ? "ar" : "en"));
  const t = (key: string) => translations[key]?.[lang] ?? key;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, dir }}>
      <div dir={dir} className={lang === "ar" ? "font-sans" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
