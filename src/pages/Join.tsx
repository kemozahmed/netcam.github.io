import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Checkbox } from "@/components/ui/checkbox";

const skillsList = [
  "PLC Programming",
  "CNC Automation",
  "Industrial Robotics",
  "IoT",
  "Python/React for Business",
  "Mechatronics Design"
];

const Join = () => {
  const { lang, t, dir } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experienceLevel: "",
    cvUrl: "",
    skills: [] as string[],
  });

  const handleCheckboxChange = (skill: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      skills: checked
        ? [...prev.skills, skill]
        : prev.skills.filter(s => s !== skill)
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, experienceLevel: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.skills.length === 0) {
      toast.error(lang === "ar" ? "يرجى اختيار مهارة واحدة على الأقل" : "Please select at least one skill");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contributors')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          experience_level: formData.experienceLevel,
          cv_url: formData.cvUrl,
          skills: formData.skills,
        }]);

      if (error) throw error;

      toast.success(lang === 'ar' ? 'تم إرسال طلبك بنجاح!' : 'Your application has been submitted successfully!');
      setFormData({ fullName: "", email: "", phone: "", experienceLevel: "", cvUrl: "", skills: [] });
    } catch (error: unknown) {
      console.error('Error submitting application:', error);
      toast.error(lang === 'ar' ? 'حدث خطأ، يرجى المحاولة مرة أخرى.' : 'An error occurred, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32 -mb-32" />

        <div className="container mx-auto px-6 relative z-10 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {lang === "ar" ? "انضم إلى فريق EnginX" : "Join the EnginX Team"}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {lang === "ar"
                ? "هل أنت مهندس أتمتة أو مطور برمجيات تبحث عن تحديات جديدة؟ انضم إلى شبكتنا للمساهمة في مشاريع صناعية مبتكرة."
                : "Are you an Automation Engineer or Software Developer looking for new challenges? Join our network to collaborate on innovative industrial projects."}
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 md:p-10 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`text-sm font-medium text-foreground block ${lang === 'ar' ? 'text-right' : ''}`}>{lang === "ar" ? "الاسم الكامل" : "Full Name"}</label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={lang === "ar" ? "أحمد محمد" : "John Doe"}
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-medium text-foreground block ${lang === 'ar' ? 'text-right' : ''}`}>{lang === "ar" ? "البريد الإلكتروني المهني" : "Professional Email"}</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`text-sm font-medium text-foreground block ${lang === 'ar' ? 'text-right' : ''}`}>{lang === "ar" ? "رقم الهاتف" : "Phone Number"}</label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+20 100 000 0000"
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-medium text-foreground block ${lang === 'ar' ? 'text-right' : ''}`}>{lang === "ar" ? "مستوى الخبرة" : "Experience Level"}</label>
                  <Select onValueChange={handleSelectChange} value={formData.experienceLevel} required>
                    <SelectTrigger className="bg-background border-border focus:border-primary text-left" dir={dir}>
                      <SelectValue placeholder={lang === "ar" ? "اختر مستوى الخبرة" : "Select Level"} />
                    </SelectTrigger>
                    <SelectContent dir={dir}>
                      <SelectItem value="Junior">{lang === "ar" ? "مبتدئ (Junior)" : "Junior"}</SelectItem>
                      <SelectItem value="Mid-Level">{lang === "ar" ? "متوسط (Mid-Level)" : "Mid-Level"}</SelectItem>
                      <SelectItem value="Senior">{lang === "ar" ? "خبير (Senior)" : "Senior"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <label className={`text-sm font-medium text-foreground block ${lang === 'ar' ? 'text-right' : ''}`}>{lang === "ar" ? "مهارات الأتمتة الأساسية (اختر واحدة أو أكثر)" : "Primary Automation Skills (Select one or more)"}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {skillsList.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id={`skill-${skill}`}
                        checked={formData.skills.includes(skill)}
                        onCheckedChange={(checked) => handleCheckboxChange(skill, checked as boolean)}
                        className={lang === "ar" ? "ml-2" : "mr-2"}
                      />
                      <label
                        htmlFor={`skill-${skill}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className={`text-sm font-medium text-foreground block ${lang === 'ar' ? 'text-right' : ''}`}>{lang === "ar" ? "رابط السيرة الذاتية (Google Drive / Portfolio)" : "CV / Portfolio Link (Google Drive, etc.)"}</label>
                <Input
                  name="cvUrl"
                  type="url"
                  value={formData.cvUrl}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/..."
                  required
                  className="bg-background border-border focus:border-primary"
                />
              </div>

              <Button type="submit" className="w-full text-lg py-6" disabled={isSubmitting}>
                {isSubmitting ? (lang === 'ar' ? "جاري الإرسال..." : "Submitting...") : (lang === "ar" ? "تقديم طلب الانضمام" : "Submit Application")}
              </Button>

            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Join;
