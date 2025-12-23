import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

const movies = [
  { id: '1', title: 'Stellar Horizon', genre: 'Sci-Fi', rating: 8.5, duration: '148 min', language: 'English', status: 'Active' },
  { id: '2', title: 'Shadow Protocol', genre: 'Action', rating: 7.8, duration: '132 min', language: 'English', status: 'Active' },
  { id: '3', title: 'The Last Echo', genre: 'Horror', rating: 7.2, duration: '110 min', language: 'English', status: 'Coming Soon' },
];

export function AdminMovieManagement() {
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
            <span>Movie Management</span>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-lg">
                <Plus className="w-4 h-4 mr-2" />
                Add Movie
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-xl">
              <DialogHeader>
                <DialogTitle>Add New Movie</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="text-sm mb-2 block">Title</label>
                  <Input placeholder="Movie title" className="rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm mb-2 block">Genre</label>
                    <Input placeholder="Genre" className="rounded-lg" />
                  </div>
                  <div>
                    <label className="text-sm mb-2 block">Duration</label>
                    <Input placeholder="120 min" className="rounded-lg" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm mb-2 block">Language</label>
                    <Input placeholder="English" className="rounded-lg" />
                  </div>
                  <div>
                    <label className="text-sm mb-2 block">Rating</label>
                    <Input type="number" step="0.1" placeholder="8.5" className="rounded-lg" />
                  </div>
                </div>
                <Button onClick={() => setIsDialogOpen(false)} className="w-full rounded-lg">
                  Add Movie
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
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 rounded-xl border-border/50 bg-card/50"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {movies.map((movie) => (
            <Card key={movie.id} className="p-6 rounded-xl backdrop-blur bg-card/50 border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{movie.title}</h3>
                    <Badge variant={movie.status === 'Active' ? 'default' : 'secondary'}>
                      {movie.status}
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{movie.genre}</span>
                    <span>•</span>
                    <span>{movie.duration}</span>
                    <span>•</span>
                    <span>{movie.language}</span>
                    <span>•</span>
                    <span>⭐ {movie.rating}</span>
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
