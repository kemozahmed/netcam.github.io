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

  // Hero
  "hero.title1": { en: "CCTV & DVR", ar: "كاميرات مراقبة" },
  "hero.title2": { en: "Security Solutions", ar: "وحلول أمنية" },
  "hero.desc": {
    en: "Professional CCTV installation, DVR/NVR systems, remote monitoring, and complete security solutions — serving Ismailia and beyond.",
    ar: "تركيب كاميرات مراقبة احترافي، أنظمة DVR/NVR، مراقبة عن بُعد، وحلول أمنية متكاملة — نخدم الإسماعيلية وما حولها.",
  },
  "hero.quote": { en: "Get a Free Quote", ar: "احصل على عرض سعر مجاني" },
  "hero.ourServices": { en: "Our Services", ar: "خدماتنا" },

  // Services
  "services.subtitle": { en: "What We Offer", ar: "ما نقدمه" },
  "services.title": { en: "Our Services", ar: "خدماتنا" },
  "services.cctv.title": { en: "CCTV & DVR Systems", ar: "كاميرات مراقبة وأنظمة DVR" },
  "services.cctv.desc": {
    en: "HD surveillance cameras, Hikvision DVR/NVR recording, remote monitoring via Hik-Connect, and 24/7 security coverage.",
    ar: "كاميرات مراقبة عالية الدقة، تسجيل Hikvision DVR/NVR، مراقبة عن بُعد عبر Hik-Connect، وتغطية أمنية على مدار الساعة.",
  },
  "services.security.title": { en: "Security & Access Control", ar: "الأمان والتحكم في الوصول" },
  "services.security.desc": {
    en: "Complete security solutions including firewall configuration, VPN setup, access control systems, and cyber threat protection.",
    ar: "حلول أمنية متكاملة تشمل تكوين جدران الحماية، إعداد VPN، أنظمة التحكم في الوصول، والحماية من التهديدات السيبرانية.",
  },
  "services.server.title": { en: "Server & IT Setup", ar: "إعداد السيرفرات وتكنولوجيا المعلومات" },
  "services.server.desc": {
    en: "On-premise servers, MikroTik router configuration, cloud integration, data backup, and IT infrastructure management.",
    ar: "سيرفرات محلية، تكوين راوترات MikroTik، تكامل سحابي، نسخ احتياطي للبيانات، وإدارة البنية التحتية لتكنولوجيا المعلومات.",
  },
  "services.support.title": { en: "Remote Support & Maintenance", ar: "الدعم والصيانة عن بُعد" },
  "services.support.desc": {
    en: "Remote monitoring, troubleshooting, scheduled maintenance, and rapid response — all managed online from Ismailia.",
    ar: "مراقبة عن بُعد، استكشاف الأخطاء وإصلاحها، صيانة مجدولة، واستجابة سريعة — كل ذلك يُدار أونلاين من الإسماعيلية.",
  },

  // Why Us
  "why.subtitle": { en: "Why Choose Us", ar: "لماذا تختارنا" },
  "why.title1": { en: "Trusted security ", ar: "خبير أمني " },
  "why.title2": { en: "expert", ar: "موثوق" },
  "why.desc": {
    en: "Hands-on experience with Hikvision DVR systems, MikroTik networking, and server infrastructure — all managed remotely from Ismailia.",
    ar: "خبرة عملية مع أنظمة Hikvision DVR وشبكات MikroTik والبنية التحتية للسيرفرات — كل ذلك يُدار عن بُعد من الإسماعيلية.",
  },
  "why.r1": { en: "Hikvision & HiLook certified installer", ar: "فني معتمد من Hikvision و HiLook" },
  "why.r2": { en: "MikroTik router & network expertise", ar: "خبرة في راوترات MikroTik والشبكات" },
  "why.r3": { en: "Remote monitoring & Hik-Connect setup", ar: "مراقبة عن بُعد وإعداد Hik-Connect" },
  "why.r4": { en: "Competitive pricing with transparent quotes", ar: "أسعار تنافسية وعروض شفافة" },
  "why.r5": { en: "Fast installation & minimal downtime", ar: "تركيب سريع وتوقف ضئيل" },
  "why.r6": { en: "Online support — no office visit needed", ar: "دعم أونلاين — بدون زيارة مكتبية" },

  // Contact
  "contact.subtitle": { en: "Get In Touch", ar: "تواصل معنا" },
  "contact.title": { en: "Contact Us", ar: "اتصل بنا" },
  "contact.desc": {
    en: "Ready to secure your premises with professional CCTV and DVR systems? Reach out and we'll provide a free consultation.",
    ar: "مستعد لتأمين مقرك بكاميرات مراقبة وأنظمة DVR احترافية؟ تواصل معنا وسنقدم لك استشارة مجانية.",
  },
  "contact.location": { en: "Ismailia, Egypt — Online Service", ar: "الإسماعيلية، مصر — خدمة أونلاين" },
  "contact.name": { en: "Your Name", ar: "اسمك" },
  "contact.email": { en: "Email Address", ar: "البريد الإلكتروني" },
  "contact.phone": { en: "Phone Number", ar: "رقم الهاتف" },
  "contact.message": { en: "Tell us about your project...", ar: "أخبرنا عن مشروعك..." },
  "contact.send": { en: "Send Message", ar: "إرسال الرسالة" },

  // Footer
  "footer.rights": {
    en: "© 2026 KareemTech. All rights reserved. Ismailia, Egypt.",
    ar: "© 2026 KareemTech. جميع الحقوق محفوظة. الإسماعيلية، مصر.",
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
