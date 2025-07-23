import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from '@/components/RichTextEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Eye } from 'lucide-react';


interface SiteContent {
  id: string;
  section_key: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  content: any;
}

const AdminSiteContent = () => {
  const [siteContent, setSiteContent] = useState<Record<string, SiteContent>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchSiteContent();
  }, []);

  const fetchSiteContent = async () => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .order('created_at');

      if (error) throw error;

      const contentMap = data.reduce((acc, item) => {
        acc[item.section_key] = item;
        return acc;
      }, {} as Record<string, SiteContent>);

      setSiteContent(contentMap);
    } catch (error) {
      console.error('Error fetching site content:', error);
      toast({
        title: "Error",
        description: "Failed to load site content.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSiteContent = async (sectionKey: string, updates: Partial<SiteContent>) => {
    setSaving(sectionKey);
    try {
      const { error } = await supabase
        .from('site_content')
        .update(updates)
        .eq('section_key', sectionKey);

      if (error) throw error;

      setSiteContent(prev => ({
        ...prev,
        [sectionKey]: { ...prev[sectionKey], ...updates }
      }));

      toast({
        title: "Success",
        description: "Content updated successfully!",
      });
    } catch (error) {
      console.error('Error updating site content:', error);
      toast({
        title: "Error",
        description: "Failed to update content.",
        variant: "destructive",
      });
    } finally {
      setSaving(null);
    }
  };

  const updateField = (sectionKey: string, field: string, value: any) => {
    setSiteContent(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: value
      }
    }));
  };

  const updateContentField = (sectionKey: string, field: string, value: any) => {
    setSiteContent(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        content: {
          ...prev[sectionKey]?.content,
          [field]: value
        }
      }
    }));
  };

  if (loading) {
    return (
      <AdminLayout title="Site Content" description="Manage front page content">
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  const heroContent = siteContent.hero;
  const philosophyContent = siteContent.philosophy;
  const projectsContent = siteContent.projects;

  return (
    <AdminLayout title="Site Content" description="Manage front page content and sections">
      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="philosophy">Philosophy</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>
                Manage the main hero section that appears at the top of the homepage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="hero-title">Title</Label>
                  <Input
                    id="hero-title"
                    value={heroContent?.title || ''}
                    onChange={(e) => updateField('hero', 'title', e.target.value)}
                    placeholder="RE:DO NETWORK"
                  />
                </div>

                <div>
                  <Label htmlFor="hero-subtitle">Subtitle</Label>
                  <Input
                    id="hero-subtitle"
                    value={heroContent?.subtitle || ''}
                    onChange={(e) => updateField('hero', 'subtitle', e.target.value)}
                    placeholder="We are a second chance space."
                  />
                </div>

                <div>
                  <Label htmlFor="hero-description">Description</Label>
                  <Textarea
                    id="hero-description"
                    value={heroContent?.description || ''}
                    onChange={(e) => updateField('hero', 'description', e.target.value)}
                    placeholder="For projects. For people. For possibilities."
                    rows={3}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => updateSiteContent('hero', heroContent)}
                    disabled={saving === 'hero'}
                  >
                    {saving === 'hero' ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save Hero Section
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/" target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="philosophy">
          <Card>
            <CardHeader>
              <CardTitle>Philosophy Section</CardTitle>
              <CardDescription>
                Manage the philosophy section and core values
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="philosophy-title">Title</Label>
                  <Input
                    id="philosophy-title"
                    value={philosophyContent?.title || ''}
                    onChange={(e) => updateField('philosophy', 'title', e.target.value)}
                    placeholder="Building with Care"
                  />
                </div>

                <div>
                  <Label htmlFor="philosophy-subtitle">Subtitle</Label>
                  <Textarea
                    id="philosophy-subtitle"
                    value={philosophyContent?.subtitle || ''}
                    onChange={(e) => updateField('philosophy', 'subtitle', e.target.value)}
                    placeholder="We uplift process over perfection..."
                    rows={3}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => updateSiteContent('philosophy', philosophyContent)}
                    disabled={saving === 'philosophy'}
                  >
                    {saving === 'philosophy' ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save Philosophy Section
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/" target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Projects Section</CardTitle>
              <CardDescription>
                Manage the featured projects section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="projects-title">Title</Label>
                  <Input
                    id="projects-title"
                    value={projectsContent?.title || ''}
                    onChange={(e) => updateField('projects', 'title', e.target.value)}
                    placeholder="Featured Projects"
                  />
                </div>

                <div>
                  <Label htmlFor="projects-subtitle">Subtitle</Label>
                  <Textarea
                    id="projects-subtitle"
                    value={projectsContent?.subtitle || ''}
                    onChange={(e) => updateField('projects', 'subtitle', e.target.value)}
                    placeholder="This is not content. This is connection..."
                    rows={3}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => updateSiteContent('projects', projectsContent)}
                    disabled={saving === 'projects'}
                  >
                    {saving === 'projects' ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save Projects Section
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/" target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </AdminLayout>
  );
};

export default AdminSiteContent;