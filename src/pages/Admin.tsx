import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Download, Settings, Users, LayoutDashboard, UserCircle, LogOut, Briefcase, Eye, Mail } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { User } from "@supabase/supabase-js";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  message: string;
  created_at: string;
}

interface Contributor {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  skills: string[];
  experience_level: string;
  cv_url: string;
  applied_at: string;
}

const Admin = () => {
  const { lang, t } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [loginEmail, setLoginEmail] = useState("admin@enginx.com");
  const [loginPassword, setLoginPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"leads" | "contributors" | "cms" | "profile">("leads");
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  // Leads
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);

  // Contributors
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loadingContributors, setLoadingContributors] = useState(false);
  const [contributorSearch, setContributorSearch] = useState("");

  // CMS
  const [cmsData, setCmsData] = useState({
    heroTitle1: t("hero.title1"),
    heroTitle2: t("hero.title2"),
    heroDesc: t("hero.desc"),
    servicesIndustrialDesc: t("services.industrial.desc"),
    servicesSecurityDesc: t("services.security.desc"),
    servicesSoftwareDesc: t("services.software.desc"),
    servicesSolarDesc: t("services.solar.desc"),
    servicesIotDesc: t("services.iot.desc"),
    servicesDashboardsDesc: t("services.dashboards.desc"),
  });
  const [savingCms, setSavingCms] = useState(false);
  const [loadingCms, setLoadingCms] = useState(false);

  // Profile
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updatingProfile, setUpdatingProfile] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) setNewEmail(session.user.email ?? "");
      setIsAuthenticating(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChanged((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) setNewEmail(session.user.email ?? "");
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchLeads();
      fetchContributors();
      fetchCmsSettings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, lang]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (error) throw error;
      toast.success(lang === "ar" ? "تم تسجيل الدخول بنجاح" : "Successfully logged in");
    } catch (error: unknown) {
      console.error("Login Error:", error);
      toast.error(error instanceof Error ? error.message : (lang === "ar" ? "كلمة المرور غير صحيحة" : "Incorrect password"));
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success(lang === "ar" ? "تم تسجيل الخروج" : "Logged out successfully");
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingProfile(true);
    try {
      const updates: { email?: string; password?: string } = {};
      if (newEmail && newEmail !== user?.email) updates.email = newEmail;
      if (newPassword) updates.password = newPassword;

      if (Object.keys(updates).length === 0) {
        toast.info(lang === "ar" ? "لا توجد تغييرات للحفظ" : "No changes to save");
        return;
      }

      const { error } = await supabase.auth.updateUser(updates);
      if (error) throw error;

      toast.success(lang === "ar" ? "تم تحديث البيانات بنجاح" : "Credentials Updated Successfully");
      setNewPassword("");
    } catch (error: unknown) {
      console.error("Profile Update Error:", error);
      toast.error(error instanceof Error ? error.message : (lang === "ar" ? "فشل التحديث" : "Update failed"));
    } finally {
      setUpdatingProfile(false);
    }
  };

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast.error(lang === "ar" ? "فشل في جلب البيانات" : "Failed to fetch leads");
    } finally {
      setLoadingLeads(false);
    }
  };

  const deleteLead = async (id: string) => {
    try {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw error;
      toast.success(lang === "ar" ? "تم الحذف بنجاح" : "Successfully deleted");
      setLeads((prev) => prev.filter((lead) => lead.id !== id));
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast.error(lang === "ar" ? "فشل الحذف" : "Failed to delete");
    }
  };

  const fetchContributors = async () => {
    setLoadingContributors(true);
    try {
      const { data, error } = await supabase.from("contributors").select("*").order("applied_at", { ascending: false });
      if (error) throw error;
      setContributors(data || []);
    } catch (error) {
      console.error("Error fetching contributors:", error);
      toast.error(lang === "ar" ? "فشل في جلب المساهمين" : "Failed to fetch contributors");
    } finally {
      setLoadingContributors(false);
    }
  };

  const deleteContributor = async (id: string) => {
    try {
      const { error } = await supabase.from("contributors").delete().eq("id", id);
      if (error) throw error;
      toast.success(lang === "ar" ? "تم الحذف بنجاح" : "Successfully deleted");
      setContributors((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error deleting contributor:", error);
      toast.error(lang === "ar" ? "فشل الحذف" : "Failed to delete");
    }
  };

  const filteredContributors = contributors.filter(c =>
    c.skills.some(skill => skill.toLowerCase().includes(contributorSearch.toLowerCase()))
  );

  const exportToCsv = () => {
    const headers = ["Name", "Email", "Phone", "Service Type", "Message", "Date"];
    const csvData = leads.map(lead => [
      `"${lead.name.replace(/"/g, '""')}"`,
      `"${lead.email.replace(/"/g, '""')}"`,
      `"${lead.phone.replace(/"/g, '""')}"`,
      `"${lead.service_type.replace(/"/g, '""')}"`,
      `"${lead.message.replace(/"/g, '""')}"`,
      `"${new Date(lead.created_at).toLocaleDateString()}"`
    ].join(','));

    const csvContent = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `enginx_leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchCmsSettings = async () => {
    setLoadingCms(true);
    try {
      const { data, error } = await supabase.from("site_settings").select("*").eq("key", `content_${lang}`).single();
      if (error && error.code !== "PGRST116") throw error; // PGRST116 is not found
      if (data) {
        setCmsData(data.value);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoadingCms(false);
    }
  };

  const handleCmsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCmsData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveCmsSettings = async () => {
    setSavingCms(true);
    try {
      const { error } = await supabase
        .from("site_settings")
        .upsert({ key: `content_${lang}`, value: cmsData, updated_at: new Date().toISOString() });
      if (error) throw error;
      toast.success(lang === "ar" ? "تم حفظ التغييرات بنجاح" : "Changes saved successfully");
    } catch (error) {
      console.error("Error saving CMS:", error);
      toast.error(lang === "ar" ? "فشل الحفظ" : "Failed to save");
    } finally {
      setSavingCms(false);
    }
  };

  if (isAuthenticating) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><Skeleton className="h-32 w-32 rounded-full" /></div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="bg-card p-8 rounded-xl shadow-lg border border-border w-full max-w-md">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="bg-primary rounded-md p-2 flex items-center justify-center">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <span className="font-display font-bold text-2xl text-foreground">
              EnginX <span className="text-primary">Admin</span>
            </span>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                {lang === "ar" ? "البريد الإلكتروني للإدارة" : "Admin Email"}
              </label>
              <Input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="bg-background"
                placeholder="admin@enginx.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                {lang === "ar" ? "كلمة المرور" : "Password"}
              </label>
              <Input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="bg-background"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {lang === "ar" ? "تسجيل الدخول" : "Login"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Admin Navbar */}
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-md p-1 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/'}>
              {lang === "ar" ? "العودة للموقع" : "Back to Site"}
            </Button>
            <Button variant="destructive" size="icon" onClick={handleLogout} title="Logout">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 flex-1 flex flex-col md:flex-row gap-8">

        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-2 shrink-0">
          <Button
            variant={activeTab === "leads" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("leads")}
          >
            <Users className="mr-2 h-4 w-4" />
            {lang === "ar" ? "إدارة الطلبات" : "Manage Leads"}
          </Button>
          <Button
            variant={activeTab === "contributors" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("contributors")}
          >
            <Briefcase className="mr-2 h-4 w-4" />
            {lang === "ar" ? "شبكة المساهمين" : "Contributors"}
          </Button>
          <Button
            variant={activeTab === "cms" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("cms")}
          >
            <Settings className="mr-2 h-4 w-4" />
            {lang === "ar" ? "إدارة المحتوى" : "Content Editor"}
          </Button>
          <Button
            variant={activeTab === "profile" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("profile")}
          >
            <UserCircle className="mr-2 h-4 w-4" />
            {lang === "ar" ? "إعدادات الحساب" : "Profile Settings"}
          </Button>
        </div>

        {/* Dashboard Panels */}
        <div className="flex-1 max-w-5xl">

          {/* Leads Tab */}
          {activeTab === "leads" && (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-display font-bold text-primary">
                  {lang === "ar" ? "صندوق الطلبات (Inbox)" : "Leads Inbox"}
                </h2>
                <Button variant="outline" onClick={exportToCsv} disabled={leads.length === 0}>
                  <Download className="mr-2 h-4 w-4" />
                  {lang === "ar" ? "تصدير (CSV)" : "Export CSV"}
                </Button>
              </div>

              {loadingLeads ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : leads.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground bg-background rounded-lg border border-dashed border-border">
                  {lang === "ar" ? "لا توجد طلبات حالياً." : "No leads found."}
                </div>
              ) : (
                <div className="rounded-md border border-border overflow-hidden bg-background">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50 hover:bg-muted/50">
                        <TableHead>{lang === "ar" ? "التاريخ" : "Date"}</TableHead>
                        <TableHead>{lang === "ar" ? "الاسم" : "Name"}</TableHead>
                        <TableHead>{lang === "ar" ? "الهاتف" : "Phone"}</TableHead>
                        <TableHead>{lang === "ar" ? "الخدمة" : "Service"}</TableHead>
                        <TableHead>{lang === "ar" ? "الرسالة" : "Message"}</TableHead>
                        <TableHead className="text-right">{lang === "ar" ? "إجراءات" : "Actions"}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="whitespace-nowrap">{new Date(lead.created_at).toLocaleDateString()}</TableCell>
                          <TableCell className="font-medium">{lead.name}</TableCell>
                          <TableCell>{lead.phone}</TableCell>
                          <TableCell className="capitalize">{lead.service_type || '-'}</TableCell>
                          <TableCell className="max-w-[200px] truncate" title={lead.message}>{lead.message}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="destructive" size="icon" onClick={() => deleteLead(lead.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}

          {/* Contributors Tab */}
          {activeTab === "contributors" && (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-2xl font-display font-bold text-primary">
                  {lang === "ar" ? "شبكة المساهمين (Marketplace)" : "Contributors Marketplace"}
                </h2>
                <Input
                  placeholder={lang === "ar" ? "ابحث حسب المهارة (مثال: PLC, React)..." : "Filter by Skill (e.g., PLC, React)..."}
                  value={contributorSearch}
                  onChange={(e) => setContributorSearch(e.target.value)}
                  className="max-w-xs bg-background"
                />
              </div>

              {loadingContributors ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : filteredContributors.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground bg-background rounded-lg border border-dashed border-border">
                  {lang === "ar" ? "لا يوجد مساهمين بهذه المواصفات." : "No contributors found."}
                </div>
              ) : (
                <div className="rounded-md border border-border overflow-hidden bg-background">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50 hover:bg-muted/50">
                        <TableHead>{lang === "ar" ? "الاسم" : "Name"}</TableHead>
                        <TableHead>{lang === "ar" ? "المهارات" : "Skills"}</TableHead>
                        <TableHead>{lang === "ar" ? "مستوى الخبرة" : "Level"}</TableHead>
                        <TableHead>{lang === "ar" ? "البريد / الهاتف" : "Contact"}</TableHead>
                        <TableHead className="text-right">{lang === "ar" ? "إجراءات" : "Actions"}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContributors.map((contributor) => (
                        <TableRow key={contributor.id}>
                          <TableCell className="font-medium whitespace-nowrap">{contributor.full_name}</TableCell>
                          <TableCell className="max-w-[200px] truncate" title={contributor.skills.join(', ')}>
                            {contributor.skills.join(', ')}
                          </TableCell>
                          <TableCell>{contributor.experience_level}</TableCell>
                          <TableCell>
                            <div className="flex flex-col text-sm">
                              <span>{contributor.email}</span>
                              <span className="text-muted-foreground">{contributor.phone}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="icon" asChild title="View CV">
                                <a href={contributor.cv_url} target="_blank" rel="noopener noreferrer">
                                  <Eye className="h-4 w-4" />
                                </a>
                              </Button>
                              <Button variant="outline" size="icon" asChild title="Send Email">
                                <a href={`mailto:${contributor.email}`}>
                                  <Mail className="h-4 w-4" />
                                </a>
                              </Button>
                              <Button variant="destructive" size="icon" onClick={() => deleteContributor(contributor.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}

          {/* CMS Tab */}
          {activeTab === "cms" && (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-display font-bold text-primary">
                  {lang === "ar" ? "محرر المحتوى" : "Content Editor"}
                </h2>
                <Button onClick={saveCmsSettings} disabled={savingCms || loadingCms}>
                  {savingCms ? (lang === "ar" ? "جاري الحفظ..." : "Saving...") : (lang === "ar" ? "حفظ التغييرات" : "Save Changes")}
                </Button>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg mb-6 border border-primary/20">
                <p className="text-sm text-foreground mb-2">
                  {lang === "ar" ? "أنت تقوم الآن بتعديل محتوى اللغة:" : "You are currently editing content for language:"}
                  <strong className="ml-2 uppercase text-primary">{lang}</strong>
                </p>
                <p className="text-xs text-muted-foreground italic">
                  {lang === "ar" ? "لتعديل اللغة الأخرى، ارجع للموقع، غير اللغة، ثم ادخل للوحة التحكم مرة أخرى." : "To edit the other language, go back to the site, switch language, and re-enter admin."}
                </p>
              </div>

              {loadingCms ? (
                 <div className="space-y-6">
                 {[1, 2, 3, 4, 5, 6].map(i => (
                   <div key={i} className="space-y-2">
                     <Skeleton className="h-4 w-24" />
                     <Skeleton className="h-10 w-full" />
                   </div>
                 ))}
               </div>
              ) : (
                <div className="space-y-8">
                  {/* Hero Section */}
                  <div className="space-y-4 bg-background p-4 rounded-lg border border-border">
                    <h3 className="text-xl font-semibold border-b border-border pb-2">Hero Section</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Title Part 1 (Orange text/prefix)</label>
                        <Input name="heroTitle1" value={cmsData.heroTitle1 || ''} onChange={handleCmsChange} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Title Part 2</label>
                        <Input name="heroTitle2" value={cmsData.heroTitle2 || ''} onChange={handleCmsChange} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea name="heroDesc" value={cmsData.heroDesc || ''} onChange={handleCmsChange} rows={3} />
                    </div>
                  </div>

                  {/* Services Descriptions */}
                  <div className="space-y-4 bg-background p-4 rounded-lg border border-border">
                    <h3 className="text-xl font-semibold border-b border-border pb-2">Services Descriptions</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Industrial Automation</label>
                        <Textarea name="servicesIndustrialDesc" value={cmsData.servicesIndustrialDesc || ''} onChange={handleCmsChange} rows={2} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Smart Security</label>
                        <Textarea name="servicesSecurityDesc" value={cmsData.servicesSecurityDesc || ''} onChange={handleCmsChange} rows={2} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Business Software & POS</label>
                        <Textarea name="servicesSoftwareDesc" value={cmsData.servicesSoftwareDesc || ''} onChange={handleCmsChange} rows={2} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Renewable Energy & Solar</label>
                        <Textarea name="servicesSolarDesc" value={cmsData.servicesSolarDesc || ''} onChange={handleCmsChange} rows={2} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">IoT Data Link</label>
                        <Textarea name="servicesIotDesc" value={cmsData.servicesIotDesc || ''} onChange={handleCmsChange} rows={2} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Performance Dashboards</label>
                        <Textarea name="servicesDashboardsDesc" value={cmsData.servicesDashboardsDesc || ''} onChange={handleCmsChange} rows={2} />
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-display font-bold text-primary">
                  {lang === "ar" ? "إعدادات الحساب" : "Account Security"}
                </h2>
              </div>

              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {lang === "ar" ? "البريد الإلكتروني الجديد" : "New Email Address"}
                  </label>
                  <Input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {lang === "ar" ? "كلمة المرور الجديدة" : "New Password"}
                  </label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={lang === "ar" ? "اترك الحقل فارغاً إذا لم ترد التغيير" : "Leave blank to keep current password"}
                    className="bg-background"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={updatingProfile}>
                  {updatingProfile ? (lang === "ar" ? "جاري التحديث..." : "Updating...") : (lang === "ar" ? "تحديث البيانات" : "Update Credentials")}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
