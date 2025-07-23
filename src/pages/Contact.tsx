import React, { useState } from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { SimpleBottomWave } from '@/components/waves/SimpleBottomWave';
import { Mail, MessageSquare, Users, Zap } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactTypes = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Join the Network",
      description: "Interested in collaborating? Let's explore how we can create together.",
      action: "Collaboration Inquiry"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Project Partnership",
      description: "Have a project idea? We'd love to bring your vision to life.",
      action: "Project Proposal"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "General Inquiry",
      description: "Questions about our work, process, or technology? Get in touch.",
      action: "General Question"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Media & Press",
      description: "Press inquiries, interviews, or speaking opportunities.",
      action: "Media Request"
    }
  ];

  return (
    <div className="min-h-screen relative">
      <GenerativeBackground />
      <SimpleBottomWave />
      <Header />
      
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Get in Touch
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ready to collaborate? Have questions about our work? 
              Let's start a conversation about the future of digital creation.
            </p>
          </div>

          {/* Contact Types */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {contactTypes.map((type, index) => (
              <Card
                key={index}
                className={`
                  group p-6 bg-gradient-card border-border/50 hover:shadow-card 
                  transition-all duration-500 hover:scale-105 cursor-pointer
                  animate-in slide-in-from-bottom-8 duration-700 [animation-delay:${index * 100}ms]
                `}
                onClick={() => setFormData(prev => ({ ...prev, subject: type.action }))}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground group-hover:shadow-glow transition-all duration-300">
                    {type.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {type.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {type.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <Card className="p-8 bg-gradient-card border-border/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project, idea, or question..."
                  rows={6}
                  required
                />
              </div>
              
              <Button type="submit" variant="hero" size="lg" className="w-full">
                Send Message
                <Mail className="h-5 w-5" />
              </Button>
            </form>
          </Card>

          {/* Additional Contact Info */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              You can also reach us directly at{' '}
              <a 
                href="mailto:contact@redo-network.com" 
                className="text-primary hover:underline"
              >
                contact@redo-network.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;