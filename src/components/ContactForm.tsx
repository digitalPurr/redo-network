import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Mail, MessageSquare, User, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: 'general' | 'technical' | 'collaboration' | 'partnership' | 'feedback';
  priority: 'low' | 'medium' | 'high';
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general',
    priority: 'medium'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    } else if (formData.subject.length > 200) {
      newErrors.subject = 'Subject must be less than 200 characters';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.length > 2000) {
      newErrors.message = 'Message must be less than 2000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Rate limiting check using database function
  const checkRateLimit = async (): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .rpc('check_contact_rate_limit', { 
          user_email: formData.email,
          user_id_param: user?.id || null
        });

      if (error) {
        console.error('Rate limit check error:', error);
        return true; // Allow submission if check fails
      }

      return data === true;
    } catch (error) {
      console.error('Rate limit check error:', error);
      return true; // Allow submission if check fails
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      // Check rate limiting
      const rateLimitOk = await checkRateLimit();
      if (!rateLimitOk) {
        toast.error('Too many submissions. Please wait before sending another message.');
        return;
      }

      // Get current user if authenticated
      const { data: { user } } = await supabase.auth.getUser();

      // Create contact submission record
      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        type: formData.type,
        priority: formData.priority,
        status: 'new' as const,
        user_id: user?.id || null
      };

      const { data: submission, error: dbError } = await supabase
        .from('contact_submissions')
        .insert(submissionData)
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Failed to save your message. Please try again.');
      }

      // Send email notification via Edge Function
      const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
        body: {
          submissionId: submission.id,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          type: formData.type,
          priority: formData.priority
        }
      });

      if (emailError) {
        console.error('Email error:', emailError);
        // Don't fail the entire submission if email fails
        toast.warning('Message saved but email notification failed. We will still respond to your inquiry.');
      }

      // Log security event for contact form submission
      await supabase.from('security_events').insert({
        event_type: 'CONTACT_FORM_SUBMISSION',
        user_id: user?.id || null,
        details: {
          email: formData.email,
          type: formData.type,
          priority: formData.priority,
          submission_id: submission.id
        },
        severity: formData.priority === 'high' ? 'medium' : 'low'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general',
        priority: 'medium'
      });

      toast.success('Message sent successfully! We\'ll respond within 24-48 hours.');

    } catch (error) {
      console.error('Contact form error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update form field
  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Get type descriptions
  const getTypeDescription = (type: string) => {
    const descriptions = {
      general: 'General questions about the platform',
      technical: 'Bug reports, technical issues, or feature requests',
      collaboration: 'Interest in collaborating or joining projects',
      partnership: 'Business partnerships and integrations',
      feedback: 'Feedback about your experience with RE:DO'
    };
    return descriptions[type as keyof typeof descriptions] || '';
  };

  return (
    <Card className="border-border/50 bg-gradient-card backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-primary rounded-full">
            <Mail className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Get in Touch
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                Name *
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Your full name"
                className={errors.name ? 'border-destructive' : ''}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email *
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="your.email@example.com"
                className={errors.email ? 'border-destructive' : ''}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Type and Priority Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Inquiry Type
              </label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => updateField('type', value)}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select inquiry type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="collaboration">Collaboration</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {getTypeDescription(formData.type)}
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm font-medium">
                Priority
              </label>
              <Select 
                value={formData.priority} 
                onValueChange={(value) => updateField('priority', value)}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Subject *
            </label>
            <Input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => updateField('subject', e.target.value)}
              placeholder="What's this about?"
              className={errors.subject ? 'border-destructive' : ''}
              disabled={isSubmitting}
            />
            {errors.subject && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.subject}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message *
            </label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => updateField('message', e.target.value)}
              placeholder="Tell us about your project, idea, or question..."
              rows={6}
              className={errors.message ? 'border-destructive' : ''}
              disabled={isSubmitting}
            />
            <div className="flex justify-between items-center">
              {errors.message && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground ml-auto">
                {formData.message.length}/2000 characters
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            variant="hero" 
            size="lg" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Mail className="h-5 w-5" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;