import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2, Search, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

const theatres = [
  {
    id: '1',
    name: 'Grand Cinema Downtown',
    location: '123 Main Street, Downtown',
    screens: 6,
    totalSeats: 1200,
    status: 'Active',
  },
  {
    id: '2',
    name: 'Platinum Multiplex',
    location: '456 Park Avenue, Central',
    screens: 8,
    totalSeats: 1600,
    status: 'Active',
  },
  {
    id: '3',
    name: 'Starlight Theater',
    location: '789 Broadway, Westside',
    screens: 4,
    totalSeats: 800,
    status: 'Maintenance',
  },
];

export function AdminTheatreManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <span>Theatre Management</span>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-lg">
                <Plus className="w-4 h-4 mr-2" />
                Add Theatre
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-xl">
              <DialogHeader>
                <DialogTitle>Add New Theatre</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="text-sm mb-2 block">Theatre Name</label>
                  <Input placeholder="Theatre name" className="rounded-lg" />
                </div>
                <div>
                  <label className="text-sm mb-2 block">Location</label>
                  <Input placeholder="Full address" className="rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm mb-2 block">Number of Screens</label>
                    <Input type="number" placeholder="6" className="rounded-lg" />
                  </div>
                  <div>
                    <label className="text-sm mb-2 block">Total Seats</label>
                    <Input type="number" placeholder="1200" className="rounded-lg" />
                  </div>
                </div>
                <Button onClick={() => setIsDialogOpen(false)} className="w-full rounded-lg">
                  Add Theatre
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search theatres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 rounded-xl border-border/50 bg-card/50"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {theatres.map((theatre) => (
            <Card key={theatre.id} className="p-6 rounded-xl backdrop-blur bg-card/50 border-border/50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{theatre.name}</h3>
                    <Badge variant={theatre.status === 'Active' ? 'default' : 'secondary'}>
                      {theatre.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{theatre.location}</span>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Screens: </span>
                      <span className="font-semibold">{theatre.screens}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Seats: </span>
                      <span className="font-semibold">{theatre.totalSeats}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-lg text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
