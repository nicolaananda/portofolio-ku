import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, MapPin, Send, Loader2, Sparkles, MessageCircle, CheckCircle, Linkedin, Github, Twitter, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import AnimatedSection from '../components/AnimatedSection';
import LazyGoogleMap from '../components/LazyGoogleMap';
import SEOHead from '../components/SEOHead';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });
  
  const API_URL = import.meta.env.VITE_API_URL;
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send message');
      }

      toast.success('Message sent successfully! I will get back to you soon.');
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen overflow-hidden bg-white dark:bg-black">
      {/* Enhanced Liquid Glass Background */}
      <div className="dark:opacity-100 opacity-30 liquid-bg"></div>
      <div className="fixed inset-0 -z-10 gradient-mesh"></div>
      <div className="noise-texture dark:opacity-100 opacity-50"></div>
      <SEOHead
        title="Contact Me - Nicola Ananda | Get In Touch"
        description="Ready to collaborate? Get in touch with Nicola Ananda for data analysis and web development projects."
        keywords="Contact Nicola Ananda, Data Analyst Contact, Web Developer Contact, Collaboration"
        url="https://nicola.id/contact"
        image="/contact.webp"
      />

      {/* SPLIT SCREEN LAYOUT */}
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* LEFT SIDE - Contact Info */}
        <div className="lg:w-5/12 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden lg:fixed lg:h-screen">
          <div className="absolute inset-0 gradient-dark-mesh"></div>
          <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          
          <div className="relative z-10 h-full flex flex-col justify-center p-8 lg:p-16">
            <AnimatedSection>
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full liquid-glass text-cyan-400 font-bold mb-8">
                  <MessageCircle className="w-5 h-5" />
                  Get In Touch
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-black dark:text-white text-gray-900 mb-6 leading-tight">
                  Let's Create
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                    Something Great
                  </span>
                </h1>
                
                <p className="text-xl dark:text-slate-400 text-gray-600 leading-relaxed">
                  Have a project in mind? I'd love to hear about it. Send me a message and let's make it happen.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm dark:text-slate-500 text-gray-500 font-bold uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:gmail@nicola.id" className="text-lg dark:text-white text-gray-900 hover:text-cyan-400 transition-colors font-bold">
                      gmail@nicola.id
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm dark:text-slate-500 text-gray-500 font-bold uppercase tracking-wider mb-1">Location</p>
                    <p className="text-lg dark:text-white text-gray-900 font-bold">
                      Malang, East Java<br />Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm dark:text-slate-500 text-gray-500 font-bold uppercase tracking-wider mb-1">Response Time</p>
                    <p className="text-lg dark:text-white text-gray-900 font-bold">
                      Usually within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-sm dark:text-slate-500 text-gray-500 font-bold uppercase tracking-wider mb-4">Connect With Me</p>
                <div className="flex gap-4">
                  <a 
                    href="https://linkedin.com/in/nicola-ananda" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 hover:scale-110 transition-all"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://github.com/nicolaananda" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 hover:bg-purple-500/20 hover:scale-110 transition-all"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://twitter.com/NoAbsen13" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 hover:bg-sky-500/20 hover:scale-110 transition-all"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* RIGHT SIDE - Contact Form */}
        <div className="lg:w-7/12 lg:ml-[41.666667%] min-h-screen">
          <div className="p-8 lg:p-16">
            <AnimatedSection delay={200}>
              {/* Form Header */}
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full liquid-glass text-purple-400 font-bold mb-8">
                  <Sparkles className="w-5 h-5" />
                  Send a Message
                </div>
                <h2 className="text-4xl font-black dark:text-white text-gray-900 mb-4">Drop Me a Line</h2>
                <p className="text-lg dark:text-slate-400 text-gray-600">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>
              </div>

              {/* Contact Form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-bold dark:text-white text-gray-900">Your Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              {...field} 
                              className="h-14 text-base rounded-2xl liquid-glass focus:border-white/30 dark:text-white text-gray-900 dark:placeholder:text-white/30 placeholder:text-gray-400"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-bold dark:text-white text-gray-900">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="john@example.com" 
                              {...field} 
                              className="h-14 text-base rounded-2xl liquid-glass focus:border-white/30 dark:text-white text-gray-900 dark:placeholder:text-white/30 placeholder:text-gray-400"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold dark:text-white text-gray-900">Subject</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="What's this about?" 
                            {...field} 
                            className="h-14 text-base rounded-2xl liquid-glass focus:border-white/30 dark:text-white text-gray-900 dark:placeholder:text-white/30 placeholder:text-gray-400"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold dark:text-white text-gray-900">Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell me about your project..." 
                            className="min-h-48 text-base rounded-2xl liquid-glass focus:border-white/30 dark:text-white text-gray-900 dark:placeholder:text-white/30 placeholder:text-gray-400 resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="group w-full h-16 text-lg font-black bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-2xl shadow-lg neon-cyan transition-all duration-300" 
                    disabled={isSubmitting}
                  >
                    <span className="flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </Button>
                </form>
              </Form>

              {/* Map Section */}
              <div className="mt-16">
                <h3 className="text-2xl font-black dark:text-white text-gray-900 mb-6 flex items-center">
                  <MapPin className="w-6 h-6 text-cyan-400 mr-3" />
                  Find Me Here
                </h3>
                <div className="rounded-3xl overflow-hidden border-2 dark:border-slate-800 border-gray-200 hover:border-cyan-500/30 transition-all duration-500">
                  <LazyGoogleMap
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63245.97055414067!2d112.56767803777092!3d-7.9827956694741045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62822063dc2fb%3A0x78879446481a4da2!2sMalang%2C%20Malang%20City%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1718539284037!5m2!1sen!2sid"
                    title="Malang, East Java Map"
                    height="400"
                  />
                </div>
              </div>

              {/* FAQ or Additional Info */}
              <div className="mt-16 liquid-glass-strong rounded-3xl p-8">
                <h3 className="text-2xl font-black dark:text-white text-gray-900 mb-6">Quick Info</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                    <p className="dark:text-slate-300 text-gray-600 leading-relaxed">
                      <span className="dark:text-white text-gray-900 font-bold">Response Time:</span> I typically respond within 24 hours on business days.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <p className="dark:text-slate-300 text-gray-600 leading-relaxed">
                      <span className="dark:text-white text-gray-900 font-bold">Project Discussion:</span> Free initial consultation to understand your needs.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-fuchsia-400 rounded-full mt-2"></div>
                    <p className="dark:text-slate-300 text-gray-600 leading-relaxed">
                      <span className="dark:text-white text-gray-900 font-bold">Availability:</span> Open to both short-term and long-term projects.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
