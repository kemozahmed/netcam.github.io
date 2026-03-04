import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary font-display font-semibold tracking-widest uppercase text-sm mb-3">
            Get In Touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Contact Us
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-8">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Ready to upgrade your network, secure your premises, or get reliable
              internet? Reach out and we'll provide a free consultation.
            </p>
            <div className="space-y-5">
              {[
                { icon: Phone, text: "+1 (555) 123-4567" },
                { icon: Mail, text: "info@yourservice.com" },
                { icon: MapPin, text: "123 Tech Street, City, State" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="Your Name" className="bg-card border-border focus:border-primary" />
            <Input placeholder="Email Address" type="email" className="bg-card border-border focus:border-primary" />
            <Input placeholder="Phone Number" type="tel" className="bg-card border-border focus:border-primary" />
            <Textarea placeholder="Tell us about your project..." rows={4} className="bg-card border-border focus:border-primary" />
            <Button size="lg" className="w-full text-lg py-6">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
