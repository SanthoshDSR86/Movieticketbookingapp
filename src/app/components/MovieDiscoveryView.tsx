import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star, Clock, Calendar, Film, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Select } from './ui/select';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

const movies = [
  {
    id: '1',
    title: 'Stellar Horizon',
    genre: 'Sci-Fi',
    rating: 8.5,
    duration: '148 min',
    language: 'English',
    image: 'https://images.unsplash.com/photo-1751823886813-0cfc86cb9478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2lmaSUyMGZ1dHVyaXN0aWMlMjBtb3ZpZXxlbnwxfHx8fDE3NjY0OTU3MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    title: 'Shadow Protocol',
    genre: 'Action',
    rating: 7.8,
    duration: '132 min',
    language: 'English',
    image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMGZpbG18ZW58MXx8fHwxNzY2NDI5MzUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    title: 'The Last Echo',
    genre: 'Horror',
    rating: 7.2,
    duration: '110 min',
    language: 'English',
    image: 'https://images.unsplash.com/photo-1758525862250-5d1f64dc140b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjB0aHJpbGxlciUyMG1vdmllfGVufDF8fHx8MTc2NjQ2OTcwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '4',
    title: 'Eternal Summer',
    genre: 'Romance',
    rating: 8.1,
    duration: '125 min',
    language: 'English',
    image: 'https://images.unsplash.com/photo-1514846528774-8de9d4a07023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbmNlJTIwbG92ZSUyMGNvdXBsZXxlbnwxfHx8fDE3NjY0NDE4MDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '5',
    title: 'Breaking Point',
    genre: 'Drama',
    rating: 8.9,
    duration: '155 min',
    language: 'English',
    image: 'https://images.unsplash.com/photo-1765510296004-614b6cc204da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFtYSUyMGZpbG0lMjBwb3N0ZXJ8ZW58MXx8fHwxNzY2NDY3OTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '6',
    title: 'City of Dreams',
    genre: 'Drama',
    rating: 7.5,
    duration: '140 min',
    language: 'English',
    image: 'https://images.unsplash.com/photo-1655367574486-f63675dd69eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NjY0NzkwNjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function MovieDiscoveryView() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  const genres = ['All', 'Action', 'Drama', 'Horror', 'Romance', 'Sci-Fi'];
  const ratings = ['All', '7+', '8+'];
  const languages = ['All', 'English', 'Hindi', 'Tamil'];

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre;
    const matchesRating =
      selectedRating === 'All' ||
      (selectedRating === '7+' && movie.rating >= 7) ||
      (selectedRating === '8+' && movie.rating >= 8);
    const matchesLanguage = selectedLanguage === 'All' || movie.language === selectedLanguage;

    return matchesSearch && matchesGenre && matchesRating && matchesLanguage;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Film className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">CinePass</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/bookings')}
            >
              <Calendar className="w-4 h-4 mr-2" />
              My Bookings
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 rounded-xl border-border/50 bg-card/50 backdrop-blur"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Filters:</span>
            </div>

            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-2 rounded-lg bg-card border border-border/50 text-sm"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre} Genre
                </option>
              ))}
            </select>

            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="px-4 py-2 rounded-lg bg-card border border-border/50 text-sm"
            >
              {ratings.map((rating) => (
                <option key={rating} value={rating}>
                  {rating === 'All' ? 'All Ratings' : `${rating} Rating`}
                </option>
              ))}
            </select>

            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-4 py-2 rounded-lg bg-card border border-border/50 text-sm"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <Card
              key={movie.id}
              className="group overflow-hidden rounded-xl bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-primary/10"
              onClick={() => navigate(`/theatre/${movie.id}`)}
            >
              <div className="relative aspect-[2/3] overflow-hidden">
                <ImageWithFallback
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-primary/90 backdrop-blur">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {movie.rating}
                  </Badge>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-semibold truncate">{movie.title}</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {movie.duration}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {movie.genre}
                  </Badge>
                </div>
                <Button className="w-full mt-2 rounded-lg" size="sm">
                  Book Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No movies found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
