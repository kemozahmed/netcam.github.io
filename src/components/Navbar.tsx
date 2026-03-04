import { Camera, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { t, lang, toggleLang } = useLanguage();

  const navItems = [
    { key: "nav.services", href: "#services" },
    { key: "nav.whyUs", href: "#why-us" },
    { key: "nav.contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="w-6 h-6 text-primary" />
          <span className="font-display font-bold text-lg text-foreground">
            Kareem<span className="text-primary">Tech</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                {t(item.key)}
              </a>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLang}
            className="text-muted-foreground hover:text-primary gap-1.5"
          >
            <Globe className="w-4 h-4" />
            {lang === "en" ? "العربية" : "English"}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
