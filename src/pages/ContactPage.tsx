
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
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
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', data);
    toast.success('Message sent successfully! I will get back to you soon.');
    
    form.reset();
    setIsSubmitting(false);
  };
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden hero-gradient">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
          
          {/* Floating shapes */}
          <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl floating-animation"></div>
          <div className="absolute bottom-10 right-20 w-32 h-32 bg-gradient-to-br from-accent/15 to-primary/15 rounded-lg rotate-45 blur-xl floating-animation" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="relative container px-4 z-10">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-center text-xl text-muted-foreground leading-relaxed">
              Have a question or want to work together? I'd love to hear from you. Send me a message and I'll respond as soon as possible.
            </p>
          </AnimatedSection>
        </div>
      </section>
      
      <div className="container px-4">
        
        <div className="mx-auto py-20 max-w-7xl">
          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            <AnimatedSection delay={100} className="md:col-span-1">
              <div className="glass-effect rounded-2xl p-8 space-y-8">
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-4 group">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Email</p>
                      <a href="mailto:gmail@nicola.id" className="text-muted-foreground hover:text-primary transition-colors">
                        gmail@nicola.id
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 group">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-accent to-primary text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Location</p>
                      <p className="text-muted-foreground">
                        Malang, East Java, Indonesia
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-6 text-xl font-bold">Connect with me</h3>
                  <div className="flex space-x-4">
                    <a href="https://linkedin.com/in/nicola-ananda" target="_blank" rel="noopener noreferrer"
                      className="group p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 group-hover:scale-110 transition-transform duration-300">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                    <a href="https://github.com/nicolaananda" target="_blank" rel="noopener noreferrer"
                      className="group p-4 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 text-white hover:from-gray-800 hover:to-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 group-hover:scale-110 transition-transform duration-300">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                    <a href="https://twitter.com/NoAbsen13" target="_blank" rel="noopener noreferrer"
                      className="group p-4 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-500 text-white hover:from-sky-500 hover:to-sky-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 group-hover:scale-110 transition-transform duration-300">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={200} className="md:col-span-2">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h2 className="text-2xl font-semibold">Send a Message</h2>
                <p className="mt-2 text-muted-foreground">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" {...field} />
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
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="What is this regarding?" {...field} />
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
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message here..." 
                              className="min-h-32" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </AnimatedSection>
          </div>
        </div>
        
        <AnimatedSection delay={300} className="mt-16">
          <LazyGoogleMap
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63245.97055414067!2d112.56767803777092!3d-7.9827956694741045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62822063dc2fb%3A0x78879446481a4da2!2sMalang%2C%20Malang%20City%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1718539284037!5m2!1sen!2sid"
            title="Malang, East Java Map"
            className="rounded-lg border overflow-hidden"
            height="450"
          />
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ContactPage;
