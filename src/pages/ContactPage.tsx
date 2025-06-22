import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, MapPin, Send, Loader2, Sparkles, ChevronDown, MessageCircle, CheckCircle } from 'lucide-react';
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
    <div className="min-h-screen pt-20 overflow-hidden">
      <SEOHead
        title="Contact Me - Nicola Ananda | Get In Touch"
        description="Ready to collaborate? Get in touch with Nicola Ananda for data analysis and web development projects. Let's discuss how we can work together."
        keywords="Contact Nicola Ananda, Data Analyst Contact, Web Developer Contact, Malang Indonesia, Collaboration, Project Inquiry"
        url="https://nicola.id/contact"
        image="/contact.webp"
      />

      {/* Modern Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/40"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-50/30 via-transparent to-pink-50/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(120,119,198,0.1),transparent),radial-gradient(ellipse_at_bottom_right,rgba(255,154,158,0.1),transparent)]"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-16 w-32 h-32 bg-gradient-to-br from-purple-300/20 to-blue-300/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-8 w-24 h-24 bg-gradient-to-br from-accent/6 to-primary/6 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        
        <div className="relative container px-4 z-10">
          <AnimatedSection>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-8">
                <MessageCircle className="w-4 h-4" />
                Let's Connect
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
                Get in <span className="bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">Touch</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
                Have a question or want to work together? I'd love to hear from you. 
                <span className="text-gray-800 font-semibold"> Send me a message</span> and I'll respond as soon as possible.
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 animate-bounce">
          <p className="text-xs font-medium tracking-widest uppercase">Start Conversation</p>
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>
      
      {/* Enhanced Contact Content Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,1)_1px,transparent_0)] bg-[size:24px_24px]"></div>
        </div>

        <div className="container px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-16 lg:grid-cols-5 lg:gap-20">
              {/* Enhanced Contact Information */}
              <AnimatedSection delay={100} className="lg:col-span-2">
                <div className="relative p-8 rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative space-y-8">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Ready to start a conversation? Here are the best ways to reach me.
                      </p>
                    </div>
                
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Mail className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg text-gray-900">Email</p>
                          <a href="mailto:gmail@nicola.id" className="text-gray-600 hover:text-primary transition-colors text-base">
                            gmail@nicola.id
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg text-gray-900">Location</p>
                          <p className="text-gray-600 text-base">
                            Malang, East Java, Indonesia
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <CheckCircle className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg text-gray-900">Response Time</p>
                          <p className="text-gray-600 text-base">
                            Usually within 24 hours
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Connect with me</h3>
                      <div className="flex space-x-3">
                        <a href="https://linkedin.com/in/nicola-ananda" target="_blank" rel="noopener noreferrer"
                          className="group p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 group-hover:scale-110 transition-transform duration-300">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                          </svg>
                        </a>
                        <a href="https://github.com/nicolaananda" target="_blank" rel="noopener noreferrer"
                          className="group p-3 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 text-white hover:from-gray-800 hover:to-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 group-hover:scale-110 transition-transform duration-300">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                        </a>
                        <a href="https://twitter.com/NoAbsen13" target="_blank" rel="noopener noreferrer"
                          className="group p-3 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-500 text-white hover:from-sky-500 hover:to-sky-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 group-hover:scale-110 transition-transform duration-300">
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
              
              {/* Enhanced Contact Form */}
              <AnimatedSection delay={200} className="lg:col-span-3">
                <div className="relative p-8 rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-transparent rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="mb-8">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
                        <Sparkles className="w-4 h-4" />
                        Send a Message
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Let's Start a Conversation</h2>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Fill out the form below and I'll get back to you as soon as possible.
                      </p>
                    </div>
                
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base font-semibold text-gray-900">Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Your name" 
                                    {...field} 
                                    className="h-11 text-base rounded-xl border-gray-200 focus:border-primary/50 focus:ring-primary/20"
                                  />
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
                                <FormLabel className="text-base font-semibold text-gray-900">Email</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="your.email@example.com" 
                                    {...field} 
                                    className="h-11 text-base rounded-xl border-gray-200 focus:border-primary/50 focus:ring-primary/20"
                                  />
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
                              <FormLabel className="text-base font-semibold text-gray-900">Subject</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="What is this regarding?" 
                                  {...field} 
                                  className="h-11 text-base rounded-xl border-gray-200 focus:border-primary/50 focus:ring-primary/20"
                                />
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
                              <FormLabel className="text-base font-semibold text-gray-900">Message</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Your message here..." 
                                  className="min-h-32 text-base rounded-xl border-gray-200 focus:border-primary/50 focus:ring-primary/20 resize-none" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="group relative overflow-hidden w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1 rounded-2xl" 
                          disabled={isSubmitting}
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Sending Message...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                                Send Message
                              </>
                            )}
                          </span>
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
      
      {/* Enhanced Map Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50/30">
        <div className="container px-4">
          <AnimatedSection delay={300}>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-6">
                <MapPin className="w-4 h-4" />
                Location
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">
                Find Me <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Here</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Located in the beautiful city of Malang, East Java, Indonesia
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <LazyGoogleMap
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63245.97055414067!2d112.56767803777092!3d-7.9827956694741045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62822063dc2fb%3A0x78879446481a4da2!2sMalang%2C%20Malang%20City%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1718539284037!5m2!1sen!2sid"
                title="Malang, East Java Map"
                className="rounded-3xl border border-gray-200 overflow-hidden shadow-2xl"
                height="450"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-purple-50/50 to-accent/5 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-56 h-56 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-6">
                  <MessageCircle className="w-4 h-4" />
                  Let's Build Together
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                  Ready to Start Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Project?</span>
                </h2>
                <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                  Whether you need data analysis insights or a modern web application, I'm here to help turn your ideas into reality.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button asChild size="lg" className="group relative overflow-hidden rounded-2xl px-10 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1">
                    <a href="mailto:gmail@nicola.id">
                      <span className="relative z-10 flex items-center">
                        <Mail size={20} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                        Email Me Directly
                      </span>
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="group rounded-2xl px-10 py-6 text-lg font-semibold border-2 border-gray-200 hover:border-primary/40 hover:bg-white/80 transition-all duration-300 backdrop-blur-sm">
                    <a href="/portfolio">
                      View My Work
                    </a>
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
