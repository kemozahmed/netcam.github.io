import { Shield } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-10 bg-card/30">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-primary" />
        <span className="font-display font-bold text-foreground">
          NetSecure<span className="text-primary">Pro</span>
        </span>
      </div>
      <p className="text-muted-foreground text-sm">
        © 2026 NetSecurePro. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
