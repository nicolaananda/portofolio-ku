
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, ArrowLeft, Trash2, Upload, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// Mock project data
const mockProject = {
  id: 1,
  title: "E-Commerce Website",
  slug: "ecommerce-website",
  description: "A comprehensive e-commerce platform built for RetailCo Inc., featuring product catalog, user authentication, shopping cart, payment processing, and order management. The project focused on creating a seamless shopping experience with fast page loads and intuitive navigation.",
  challenge: "The main challenge was implementing a real-time inventory system that would update across all user sessions while maintaining performance and scalability.",
  solution: "I designed a microservices architecture using Node.js and MongoDB, with WebSockets for real-time updates. This allowed for efficient scaling and reliable inventory tracking across thousands of concurrent users.",
  category: "Web Development",
  client: "RetailCo Inc.",
  completionDate: "October 2023",
  technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
  imageUrls: [
    "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=800&auto=format&fit=crop&q=80"
  ],
  liveUrl: "https://example-project.com",
  githubUrl: "https://github.com/username/project",
  featured: true
};

const categories = [
  { value: 'Web Development', label: 'Web Development' },
  { value: 'Mobile Development', label: 'Mobile Development' },
  { value: 'UI/UX Design', label: 'UI/UX Design' },
  { value: 'Branding', label: 'Branding' },
  { value: 'Graphic Design', label: 'Graphic Design' },
];

const portfolioFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  slug: z.string().min(3, { message: 'Slug must be at least 3 characters' })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Slug must be in kebab-case format' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters' }),
  challenge: z.string().min(20, { message: 'Challenge must be at least 20 characters' }),
  solution: z.string().min(20, { message: 'Solution must be at least 20 characters' }),
  category: z.string({ required_error: 'Please select a category' }),
  client: z.string().min(2, { message: 'Client name must be at least 2 characters' }),
  completionDate: z.string().min(2, { message: 'Completion date is required' }),
  technologies: z.string().min(2, { message: 'Technologies are required' }),
  liveUrl: z.string().url({ message: 'Please enter a valid URL' }).or(z.string().length(0)),
  githubUrl: z.string().url({ message: 'Please enter a valid URL' }).or(z.string().length(0)),
  featured: z.boolean().default(false),
});

type PortfolioFormValues = z.infer<typeof portfolioFormSchema>;

const AdminPortfolioEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      challenge: '',
      solution: '',
      category: '',
      client: '',
      completionDate: '',
      technologies: '',
      liveUrl: '',
      githubUrl: '',
      featured: false,
    },
  });
  
  // In a real app, this would fetch data from an API
  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // If creating a new project
        if (id === 'new') {
          setIsLoading(false);
          return;
        }
        
        // Mock fetching project data
        const project = mockProject;
        
        if (project) {
          form.reset({
            title: project.title,
            slug: project.slug,
            description: project.description,
            challenge: project.challenge,
            solution: project.solution,
            category: project.category,
            client: project.client,
            completionDate: project.completionDate,
            technologies: project.technologies.join(', '),
            liveUrl: project.liveUrl,
            githubUrl: project.githubUrl,
            featured: project.featured,
          });
          
          setImageUrls(project.imageUrls);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        toast.error('Failed to load project');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProject();
  }, [id, form]);
  
  const onSubmit = async (data: PortfolioFormValues) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Saved project:', data, 'Images:', imageUrls);
      
      toast.success('Project saved successfully');
      
      // Navigate back to portfolio list after save
      if (id === 'new') {
        navigate('/admin/portfolio');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Project deleted successfully');
      navigate('/admin/portfolio');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };
  
  const handleImageUpload = () => {
    // In a real app, this would open a file picker and upload to storage
    const mockImageUrls = [
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=800&auto=format&fit=crop&q=80',
    ];
    
    const randomImage = mockImageUrls[Math.floor(Math.random() * mockImageUrls.length)];
    
    if (imageUrls.length < 5) {
      setImageUrls([...imageUrls, randomImage]);
      toast.success('Image uploaded successfully');
    } else {
      toast.error('You can only upload up to 5 images');
    }
  };
  
  const removeImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };
  
  const pageTitle = id === 'new' ? 'Add New Project' : 'Edit Project';
  
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/portfolio')}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-2xl font-bold">{pageTitle}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          {id !== 'new' && (
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this
                    project and remove it from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          
          <Button type="submit" form="portfolio-form" disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
      
      {isLoading && id !== 'new' ? (
        <div className="flex h-96 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : (
        <Form {...form}>
          <form id="portfolio-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="mb-4 border-b pb-2 text-lg font-medium">Project Details</h2>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter project title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL Slug</FormLabel>
                          <FormControl>
                            <Input placeholder="project-url-slug" {...field} />
                          </FormControl>
                          <FormDescription>
                            The slug will be used in the project URL: /portfolio/your-slug
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the project, its goals, and features"
                              className="min-h-24" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="challenge"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Challenge</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="What challenges did you face?"
                                className="min-h-24" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="solution"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Solution</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="How did you solve these challenges?"
                                className="min-h-24" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="mb-4 border-b pb-2 text-lg font-medium">Project Images</h2>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload images for your project. The first image will be used as the thumbnail.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {imageUrls.map((url, index) => (
                        <div key={index} className="relative overflow-hidden rounded-md border bg-muted">
                          <AspectRatio ratio={16/9}>
                            <img 
                              src={url} 
                              alt={`Project ${index + 1}`} 
                              className="h-full w-full object-cover" 
                            />
                          </AspectRatio>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      
                      {imageUrls.length < 5 && (
                        <div className="flex aspect-video items-center justify-center rounded-md border border-dashed">
                          <Button 
                            variant="outline" 
                            className="h-10 w-10 rounded-full p-0"
                            onClick={handleImageUpload}
                          >
                            <Plus className="h-4 w-4" />
                            <span className="sr-only">Add image</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h2 className="mb-4 border-b pb-2 text-lg font-medium">Project Metadata</h2>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Category</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.value} value={category.value}>
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="client"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client</FormLabel>
                          <FormControl>
                            <Input placeholder="Client name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="completionDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Completion Date</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. October 2023" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="technologies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Technologies Used</FormLabel>
                          <FormControl>
                            <Input placeholder="React, Node.js, MongoDB, etc." {...field} />
                          </FormControl>
                          <FormDescription>
                            Separate technologies with commas
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="liveUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Live Project URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="githubUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub Repository URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://github.com/username/repo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="featured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Featured Project</FormLabel>
                            <FormDescription>
                              Featured projects appear on the homepage
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default AdminPortfolioEdit;
