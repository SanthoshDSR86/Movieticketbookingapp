import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Film, MapPin, Calendar, Clock, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const bookings = [
  {
    id: 'BK001',
    movie: 'Stellar Horizon',
    theatre: 'Grand Cinema Downtown',
    date: 'Dec 25, 2024',
    time: '8:30 PM',
    seats: 'A1, A2, A3',
    amount: '$36.00',
    status: 'confirmed',
  },
  {
    id: 'BK002',
    movie: 'Shadow Protocol',
    theatre: 'Platinum Multiplex',
    date: 'Dec 20, 2024',
    time: '6:00 PM',
    seats: 'B5, B6',
    amount: '$24.00',
    status: 'completed',
  },
];

export function BookingHistoryView() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/movies')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Film className="w-6 h-6 text-primary" />
            <span>My Bookings</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {bookings.map((booking) => (
            <Card key={booking.id} className="p-6 rounded-xl backdrop-blur bg-card/50 border-border/50">
              <div className="grid md:grid-cols-[1fr,auto] gap-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{booking.movie}</h3>
                      <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                        {booking.status}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">#{booking.id}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{booking.theatre}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Seats:</span>
                      <span className="font-semibold">{booking.seats}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-lg font-semibold text-primary">{booking.amount}</span>
                    <Button variant="outline" size="sm" className="rounded-lg">
                      <Download className="w-4 h-4 mr-2" />
                      Download Ticket
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 p-4 bg-background/50 rounded-lg">
                  <QRCodeSVG
                    value={booking.id}
                    size={120}
                    level="H"
                    className="rounded"
                  />
                  <span className="text-xs text-muted-foreground">Scan at theatre</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {bookings.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">No bookings yet</p>
            <Button onClick={() => navigate('/movies')} className="rounded-lg">
              Browse Movies
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
