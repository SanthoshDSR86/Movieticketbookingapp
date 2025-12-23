import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapPin, Clock, ArrowLeft, Film } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const theatres = [
  {
    id: '1',
    name: 'Grand Cinema Downtown',
    location: '123 Main Street, Downtown',
    distance: '2.5 km',
    showtimes: ['10:00 AM', '1:30 PM', '5:00 PM', '8:30 PM'],
  },
  {
    id: '2',
    name: 'Platinum Multiplex',
    location: '456 Park Avenue, Central',
    distance: '3.8 km',
    showtimes: ['11:00 AM', '2:30 PM', '6:00 PM', '9:30 PM'],
  },
  {
    id: '3',
    name: 'Starlight Theater',
    location: '789 Broadway, Westside',
    distance: '5.2 km',
    showtimes: ['12:00 PM', '3:30 PM', '7:00 PM', '10:00 PM'],
  },
];

export function TheatreSelectionView() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [selectedTheatre, setSelectedTheatre] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedTheatre && selectedTime) {
      navigate(`/seats/${selectedTheatre}`);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/movies')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Film className="w-6 h-6 text-primary" />
              <span>Select Theatre & Showtime</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {theatres.map((theatre) => (
            <Card
              key={theatre.id}
              className={`p-6 rounded-xl backdrop-blur bg-card/50 border-border/50 transition-all duration-300 ${
                selectedTheatre === theatre.id ? 'border-primary ring-2 ring-primary/20' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">{theatre.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{theatre.location}</span>
                    </div>
                    <Badge variant="outline" className="mt-2">{theatre.distance} away</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Available Showtimes:</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {theatre.showtimes.map((time) => (
                      <Button
                        key={time}
                        variant={
                          selectedTheatre === theatre.id && selectedTime === time
                            ? 'default'
                            : 'outline'
                        }
                        size="sm"
                        className="rounded-lg"
                        onClick={() => {
                          setSelectedTheatre(theatre.id);
                          setSelectedTime(time);
                        }}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleContinue}
            disabled={!selectedTheatre || !selectedTime}
            className="rounded-lg px-8"
            size="lg"
          >
            Continue to Seat Selection
          </Button>
        </div>
      </div>
    </div>
  );
}
