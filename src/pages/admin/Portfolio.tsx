
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Search, FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

// Mock portfolio data
const mockProjects = [
  {
    id: 1,
    title: "E-Commerce Website",
    category: "Web Development",
    client: "RetailCo Inc.",
    imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&auto=format&fit=crop&q=80",
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    category: "Mobile Development",
    client: "ProductivityTech",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=80",
    featured: true
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    category: "Web Development",
    client: "DataViz Corp",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    featured: true
  },
  {
    id: 4,
    title: "Social Media App",
    category: "Mobile Development",
    client: "ConnectNow Media",
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=80",
    featured: false
  },
  {
    id: 5,
    title: "Fitness Tracker",
    category: "Mobile Development",
    client: "HealthFirst",
    imageUrl: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&auto=format&fit=crop&q=80",
    featured: false
  },
  {
    id: 6,
    title: "Restaurant Website",
    category: "UI/UX Design",
    client: "Gourmet Dining",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
    featured: false
  }
];

const AdminPortfolio = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  
  // Filter and search projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.client.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && project.featured;
  });
  
  const handleDelete = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
    toast.success('Project deleted successfully');
  };
  
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Portfolio Projects</h1>
        <Button asChild>
          <Link to="/admin/portfolio/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Project
          </Link>
        </Button>
      </div>
      
      <Card className="mb-8">
        <div className="p-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant={filter === 'all' ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All Projects
              </Button>
              <Button 
                variant={filter === 'featured' ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter('featured')}
              >
                Featured Only
              </Button>
              
              {(searchTerm || filter !== 'all') && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setSearchTerm('');
                    setFilter('all');
                  }}
                >
                  <FilterX className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="h-full w-full object-cover" 
                />
                {project.featured && (
                  <div className="absolute top-2 right-2">
                    <span className="rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                      Featured
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold">
                  <Link to={`/admin/portfolio/${project.id}`} className="hover:text-primary hover:underline">
                    {project.title}
                  </Link>
                </h3>
                <div className="mt-1 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{project.category}</p>
                    <p className="text-xs text-muted-foreground">Client: {project.client}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/admin/portfolio/${project.id}`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleDelete(project.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          Confirm Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex h-40 items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <p className="text-muted-foreground">No projects found.</p>
              <Button 
                variant="link" 
                asChild
                className="mt-2"
              >
                <Link to="/admin/portfolio/new">Add your first project</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPortfolio;
