import { Camera } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-10 bg-card/30">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Camera className="w-5 h-5 text-primary" />
        <span className="font-display font-bold text-foreground">
          Kareem<span className="text-primary">Tech</span>
        </span>
      </div>
      <p className="text-muted-foreground text-sm">
        © 2026 KareemTech. All rights reserved. Ismailia, Egypt.
      </p>
    </div>
  </footer>
);

export default Footer;
