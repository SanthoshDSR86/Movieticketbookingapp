import { useNavigate } from 'react-router-dom';
import { Film, Building2, BarChart3, Users, TrendingUp, DollarSign, Ticket } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const stats = [
  { label: 'Total Revenue', value: '$45,280', change: '+12.5%', icon: DollarSign, color: 'text-green-500' },
  { label: 'Total Bookings', value: '1,234', change: '+8.2%', icon: Ticket, color: 'text-blue-500' },
  { label: 'Active Users', value: '892', change: '+5.4%', icon: Users, color: 'text-purple-500' },
  { label: 'Movies Running', value: '24', change: '+2', icon: Film, color: 'text-primary' },
];

export function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">Admin Dashboard</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/movies')}>
            User View
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6 rounded-xl backdrop-blur bg-card/50 border-border/50">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-background/50 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-sm text-green-500 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            onClick={() => navigate('/admin/movies')}
            className="p-8 rounded-xl backdrop-blur bg-card/50 border-border/50 hover:border-primary/50 transition-all cursor-pointer group"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Film className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Manage Movies</h3>
                <p className="text-sm text-muted-foreground">Add, edit, or remove movies</p>
              </div>
            </div>
          </Card>

          <Card
            onClick={() => navigate('/admin/theatres')}
            className="p-8 rounded-xl backdrop-blur bg-card/50 border-border/50 hover:border-primary/50 transition-all cursor-pointer group"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Manage Theatres</h3>
                <p className="text-sm text-muted-foreground">Manage theatre information</p>
              </div>
            </div>
          </Card>

          <Card
            onClick={() => navigate('/admin/reports')}
            className="p-8 rounded-xl backdrop-blur bg-card/50 border-border/50 hover:border-primary/50 transition-all cursor-pointer group"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">View Reports</h3>
                <p className="text-sm text-muted-foreground">Analytics and insights</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
