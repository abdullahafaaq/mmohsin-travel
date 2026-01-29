import { useState, useEffect } from "react";
import { useSiteData } from "@/hooks/useSiteData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminAboutContent() {
  const { data, updateAboutContent } = useSiteData();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState(data.aboutContent);
  const [paragraphsText, setParagraphsText] = useState(data.aboutContent.paragraphs.join("\n\n"));

  useEffect(() => {
    setFormData(data.aboutContent);
    setParagraphsText(data.aboutContent.paragraphs.join("\n\n"));
  }, [data.aboutContent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paragraphs = paragraphsText.split("\n\n").filter(p => p.trim());
    updateAboutContent({ ...formData, paragraphs });
    toast({ title: "Content Saved", description: "About page content has been updated." });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">About Page Content</h1>
        <p className="text-muted-foreground">Edit the content shown on the About page</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heroTitle">Hero Title</Label>
              <Input
                id="heroTitle"
                value={formData.heroTitle}
                onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroDescription">Hero Description</Label>
              <Textarea
                id="heroDescription"
                rows={3}
                value={formData.heroDescription}
                onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Main Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mainTitle">Main Title</Label>
              <Input
                id="mainTitle"
                value={formData.mainTitle}
                onChange={(e) => setFormData({ ...formData, mainTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paragraphs">Content Paragraphs (separate with empty lines)</Label>
              <Textarea
                id="paragraphs"
                rows={10}
                value={paragraphsText}
                onChange={(e) => setParagraphsText(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearsExperience">Years of Experience</Label>
              <Input
                id="yearsExperience"
                type="number"
                value={formData.yearsExperience}
                onChange={(e) => setFormData({ ...formData, yearsExperience: parseInt(e.target.value) || 0 })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mission & Vision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mission">Mission Statement</Label>
              <Textarea
                id="mission"
                rows={4}
                value={formData.mission}
                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vision">Vision Statement</Label>
              <Textarea
                id="vision"
                rows={4}
                value={formData.vision}
                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
