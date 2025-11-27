import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Send, Loader2, MapPin, ArrowRight } from 'lucide-react';
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
    <div className="bg-background text-foreground pt-24 pb-20">
      <SEOHead
        title="Contact Me - Nicola Ananda"
        description="Get in touch with Nicola Ananda for projects and collaborations."
        keywords="Contact Nicola Ananda, Hire Data Analyst, Hire Web Developer"
        url="https://nicola.id/contact"
        image="/contact.webp"
      />

      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left Side: Info */}
          <div>
            <h1 className="text-[10vw] lg:text-8xl leading-[0.8] font-black tracking-tighter mb-12">
              LET'S<br />TALK
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-12 max-w-md">
              Have a project in mind or just want to say hi? I'm always open to discussing new ideas and opportunities.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-black text-white dark:bg-white dark:text-black rounded-full">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Email</div>
                  <a href="mailto:gmail@nicola.id" className="text-2xl font-bold hover:underline">gmail@nicola.id</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-black text-white dark:bg-white dark:text-black rounded-full">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Location</div>
                  <div className="text-2xl font-bold">Malang, Indonesia</div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <h3 className="font-bold mb-4">Availability</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Currently available for freelance projects and consulting.
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-white dark:bg-black border-2 border-black dark:border-white p-8 md:p-12 shadow-brutal-lg">
            <h2 className="text-3xl font-black mb-8">Send a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="h-14 bg-transparent border-2 border-black/10 dark:border-white/10 focus:border-black dark:focus:border-white rounded-none" />
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
                        <FormLabel className="text-base font-bold">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} className="h-14 bg-transparent border-2 border-black/10 dark:border-white/10 focus:border-black dark:focus:border-white rounded-none" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold">Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Project Inquiry" {...field} className="h-14 bg-transparent border-2 border-black/10 dark:border-white/10 focus:border-black dark:focus:border-white rounded-none" />
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
                      <FormLabel className="text-base font-bold">Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell me about your project..." {...field} className="min-h-[150px] bg-transparent border-2 border-black/10 dark:border-white/10 focus:border-black dark:focus:border-white rounded-none resize-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isSubmitting} className="w-full h-16 text-lg font-bold bg-black text-white dark:bg-white dark:text-black rounded-none hover:opacity-90 transition-opacity">
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
  );
};

export default ContactPage;
