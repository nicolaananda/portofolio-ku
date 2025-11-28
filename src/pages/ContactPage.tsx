import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Send, Loader2, MapPin, ArrowRight, MessageSquare, User, AtSign, Hash } from 'lucide-react';
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to send message');

      toast.success('Message sent successfully!');
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background text-foreground pt-24 pb-20 min-h-screen flex flex-col justify-center">
      <SEOHead
        title="Contact Me - Nicola Ananda"
        description="Get in touch with Nicola Ananda for projects and collaborations."
        keywords="Contact Nicola Ananda, Hire Data Analyst, Hire Web Developer"
        url="https://nicola.id/contact"
        image="/contact.webp"
      />

      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Side: Info */}
          <div className="lg:sticky lg:top-32">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 animate-reveal leading-[0.85]">
              LET'S<br />TALK
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-12 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Ready to start your next project? I'm currently available for freelance work and open to new opportunities.
            </p>

            <div className="space-y-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <a href="mailto:gmail@nicola.id" className="group flex items-center gap-4 text-xl font-bold hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <div className="w-12 h-12 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="h-5 w-5" />
                </div>
                gmail@nicola.id
              </a>

              <div className="flex items-center gap-4 text-xl font-bold">
                <div className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5" />
                </div>
                Malang, Indonesia
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-[2rem] p-8 md:p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-gray-500">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} className="h-12 bg-white dark:bg-black border-none shadow-sm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-gray-500">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com" {...field} className="h-12 bg-white dark:bg-black border-none shadow-sm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-gray-500">Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Project Subject" {...field} className="h-12 bg-white dark:bg-black border-none shadow-sm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-gray-500">Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Tell me about your project..." {...field} className="min-h-[150px] bg-white dark:bg-black border-none shadow-sm resize-none" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-lg font-bold rounded-xl bg-black text-white dark:bg-white dark:text-black hover:scale-[1.02] transition-transform">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Send Message <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
