import { useState, useEffect } from "react";
import { useSiteData } from "@/hooks/useSiteData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminSiteSettings() {
  const { data, updateSiteSettings } = useSiteData();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState(data.siteSettings);
  const [phonesText, setPhonesText] = useState(data.siteSettings.phones.join("\n"));

  useEffect(() => {
    setFormData(data.siteSettings);
    setPhonesText(data.siteSettings.phones.join("\n"));
  }, [data.siteSettings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phones = phonesText.split("\n").filter(p => p.trim());
    updateSiteSettings({ ...formData, phones });
    toast({ title: "Settings Saved", description: "Site settings have been updated." });
  };

  const addBusinessHour = () => {
    setFormData({
      ...formData,
      businessHours: [...formData.businessHours, { day: "", hours: "" }],
    });
  };

  const updateBusinessHour = (index: number, field: "day" | "hours", value: string) => {
    const updated = formData.businessHours.map((bh, i) => 
      i === index ? { ...bh, [field]: value } : bh
    );
    setFormData({ ...formData, businessHours: updated });
  };

  const removeBusinessHour = (index: number) => {
    setFormData({
      ...formData,
      businessHours: formData.businessHours.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground">Manage company information and contact details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Office Address</Label>
              <Textarea
                id="address"
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phones">Phone Numbers (one per line)</Label>
              <Textarea
                id="phones"
                rows={3}
                placeholder="+92 300 0180347&#10;+92 302 7553524"
                value={phonesText}
                onChange={(e) => setPhonesText(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number (without + or spaces)</Label>
              <Input
                id="whatsapp"
                placeholder="923000180347"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook URL</Label>
                <Input
                  id="facebook"
                  type="url"
                  value={formData.socialLinks.facebook}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, facebook: e.target.value },
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram URL</Label>
                <Input
                  id="instagram"
                  type="url"
                  value={formData.socialLinks.instagram}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube URL</Label>
                <Input
                  id="youtube"
                  type="url"
                  value={formData.socialLinks.youtube}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, youtube: e.target.value },
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsappLink">WhatsApp Link</Label>
                <Input
                  id="whatsappLink"
                  type="url"
                  value={formData.socialLinks.whatsapp}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, whatsapp: e.target.value },
                  })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Business Hours</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addBusinessHour}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.businessHours.map((bh, index) => (
              <div key={index} className="flex gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <Label>Day(s)</Label>
                  <Input
                    placeholder="e.g., Monday - Saturday"
                    value={bh.day}
                    onChange={(e) => updateBusinessHour(index, "day", e.target.value)}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label>Hours</Label>
                  <Input
                    placeholder="e.g., 10:00 AM - 7:00 PM"
                    value={bh.hours}
                    onChange={(e) => updateBusinessHour(index, "hours", e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeBusinessHour(index)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
