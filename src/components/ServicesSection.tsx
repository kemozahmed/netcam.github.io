import { Camera, Shield, Server, Headphones } from "lucide-react";

const services = [
  {
    icon: Camera,
    title: "CCTV & DVR Systems",
    description: "HD surveillance cameras, Hikvision DVR/NVR recording, remote monitoring via Hik-Connect, and 24/7 security coverage.",
  },
  {
    icon: Shield,
    title: "Security & Access Control",
    description: "Complete security solutions including firewall configuration, VPN setup, access control systems, and cyber threat protection.",
  },
  {
    icon: Server,
    title: "Server & IT Setup",
    description: "On-premise servers, MikroTik router configuration, cloud integration, data backup, and IT infrastructure management.",
  },
  {
    icon: Headphones,
    title: "Remote Support & Maintenance",
    description: "Remote monitoring, troubleshooting, scheduled maintenance, and rapid response — all managed online from Ismailia.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary font-display font-semibold tracking-widest uppercase text-sm mb-3">
            What We Offer
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Our Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-card border border-border rounded-lg p-8 hover:border-primary/40 transition-all duration-300 border-glow hover:border-glow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
