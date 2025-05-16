
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Blog Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Contact Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="mb-4 mt-8 text-xl font-semibold">Recent Activity</h2>
      <div className="rounded-lg border">
        <div className="p-4">
          <ul className="divide-y">
            <ActivityItem 
              title="Blog post created" 
              description="New post: 'Introduction to React Hooks'" 
              date="Today" 
            />
            <ActivityItem 
              title="Project updated" 
              description="Updated 'E-Commerce Website' details" 
              date="Yesterday" 
            />
            <ActivityItem 
              title="New contact message" 
              description="From: client@example.com" 
              date="3 days ago" 
            />
            <ActivityItem 
              title="Blog post updated" 
              description="Updated 'Best Practices for TypeScript'" 
              date="1 week ago" 
            />
          </ul>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>This is a demo admin dashboard. In a production environment, this would display real-time data.</p>
      </div>
    </div>
  );
};

interface ActivityItemProps {
  title: string;
  description: string;
  date: string;
}

const ActivityItem = ({ title, description, date }: ActivityItemProps) => {
  return (
    <li className="py-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>
    </li>
  );
};

export default AdminDashboard;
