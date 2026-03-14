import { Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border py-10 bg-card/30">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-md p-1 flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-foreground">
            EnginX <span className="text-primary">Automation</span>
          </span>
        </div>
        <p className="text-muted-foreground text-sm">
          {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
