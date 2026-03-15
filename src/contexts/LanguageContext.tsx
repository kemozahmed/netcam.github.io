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
  "services.industrial.title": { en: "Industrial Automation (PLC/SCADA)", ar: "أتمتة خطوط الإنتاج (PLC/SCADA)" },
  "services.industrial.desc": {
    en: "Full automation of production lines using PLC programming, SCADA systems, and smart industrial controllers.",
    ar: "أتمتة كاملة لخطوط الإنتاج باستخدام برمجة PLC وأنظمة SCADA والمتحكمات الصناعية الذكية.",
  },
  "services.security.title": { en: "Smart Surveillance", ar: "أنظمة المراقبة الذكية" },
  "services.security.desc": {
    en: "AI-powered surveillance and access control systems integrated with industrial and commercial operations.",
    ar: "أنظمة مراقبة ذكية مدعومة بالذكاء الاصطناعي وتحكم في الوصول متكاملة مع العمليات الصناعية والتجارية.",
  },
  "services.software.title": { en: "Business Automation (POS)", ar: "أتمتة نقاط البيع والأعمال" },
  "services.software.desc": {
    en: "Custom POS systems, warehouse automation, and business management software for modern enterprises.",
    ar: "أنظمة نقاط بيع مخصصة وأتمتة المستودعات وبرامج إدارة الأعمال للشركات الحديثة.",
  },
  "services.solar.title": { en: "Production Line Robotics", ar: "روبوتات خطوط الإنتاج" },
  "services.solar.desc": {
    en: "Industrial robotic arms and automated assembly solutions for manufacturing and production facilities.",
    ar: "أذرع روبوتية صناعية وحلول تجميع آلية للمصانع ومرافق الإنتاج.",
  },
  "services.iot.title": { en: "Industrial IoT", ar: "إنترنت الأشياء الصناعي" },
  "services.iot.desc": {
    en: "Remote monitoring and control of mechanical equipment via industrial IoT infrastructure and real-time data pipelines.",
    ar: "المراقبة والتحكم عن بُعد في المعدات الميكانيكية عبر بنية إنترنت الأشياء الصناعية وقنوات البيانات اللحظية.",
  },
  "services.dashboards.title": { en: "Performance Dashboards", ar: "لوحات تحليل الأداء" },
  "services.dashboards.desc": {
    en: "Real-time production and profit analytics dashboards with actionable KPIs for factory and business intelligence.",
    ar: "لوحات تحليل بيانات الإنتاج والأرباح لحظياً مع مؤشرات أداء قابلة للتنفيذ لذكاء المصانع والأعمال.",
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
  const [lang, setLang] = useState<Lang>("en");

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
