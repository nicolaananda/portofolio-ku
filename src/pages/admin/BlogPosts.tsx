
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Search, FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

// Mock blog posts data
const mockBlogPosts = [
  {
    id: 1,
    title: "Introduction to React Hooks",
    status: "published",
    category: "React",
    date: "May 15, 2023",
    views: 1254
  },
  {
    id: 2,
    title: "Building Responsive UIs with Tailwind CSS",
    status: "published",
    category: "CSS",
    date: "June 3, 2023",
    views: 963
  },
  {
    id: 3,
    title: "State Management in Modern React Applications",
    status: "published",
    category: "React",
    date: "July 12, 2023",
    views: 745
  },
  {
    id: 4,
    title: "TypeScript Best Practices for Frontend Developers",
    status: "published",
    category: "TypeScript",
    date: "August 22, 2023",
    views: 1102
  },
  {
    id: 5,
    title: "Building Accessible Web Applications",
    status: "draft",
    category: "Accessibility",
    date: "September 5, 2023",
    views: 0
  },
  {
    id: 6,
    title: "Frontend Performance Optimization Techniques",
    status: "draft",
    category: "Performance",
    date: "October 18, 2023",
    views: 0
  }
];

const AdminBlogPosts = () => {
  const [posts, setPosts] = useState(mockBlogPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  
  // Filter and search posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && post.status === filter;
  });
  
  const handleDelete = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
    toast.success('Blog post deleted successfully');
  };
  
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Button asChild>
          <Link to="/admin/blog/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Post
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
                placeholder="Search posts..."
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
                All
              </Button>
              <Button 
                variant={filter === 'published' ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter('published')}
              >
                Published
              </Button>
              <Button 
                variant={filter === 'draft' ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter('draft')}
              >
                Drafts
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
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    <Link to={`/admin/blog/${post.id}`} className="hover:text-primary hover:underline">
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                      post.status === 'published' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {post.status}
                    </span>
                  </TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell className="text-right">{post.views.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/admin/blog/${post.id}`}>
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
                            onClick={() => handleDelete(post.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            Confirm Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No blog posts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminBlogPosts;
