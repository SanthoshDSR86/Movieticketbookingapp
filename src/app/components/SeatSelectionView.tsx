import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Film, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

type SeatStatus = 'available' | 'selected' | 'booked';

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const seatsPerRow = 12;

const bookedSeats = ['A5', 'A6', 'B7', 'C8', 'D5', 'D6', 'E4', 'F9', 'F10'];

export function SeatSelectionView() {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const getSeatStatus = (seatId: string): SeatStatus => {
    if (bookedSeats.includes(seatId)) return 'booked';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  const toggleSeat = (seatId: string) => {
    const status = getSeatStatus(seatId);
    if (status === 'booked') return;

    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const totalPrice = selectedSeats.length * 12;

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Film className="w-6 h-6 text-primary" />
              <span>Select Your Seats</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Screen */}
        <div className="mb-12">
          <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mb-2" />
          <p className="text-center text-sm text-muted-foreground">SCREEN</p>
        </div>

        {/* Seat Map */}
        <div className="mb-8 overflow-x-auto">
          <div className="min-w-[700px] mx-auto">
            {rows.map((row) => (
              <div key={row} className="flex items-center gap-2 mb-3 justify-center">
                <span className="w-8 text-sm text-muted-foreground font-mono">{row}</span>
                <div className="flex gap-2">
                  {Array.from({ length: seatsPerRow }, (_, i) => {
                    const seatId = `${row}${i + 1}`;
                    const status = getSeatStatus(seatId);
                    return (
                      <button
                        key={seatId}
                        onClick={() => toggleSeat(seatId)}
                        disabled={status === 'booked'}
                        className={`
                          w-9 h-9 rounded-t-lg rounded-b-sm border-2 transition-all duration-200
                          ${
                            status === 'available'
                              ? 'bg-card border-border/50 hover:border-primary cursor-pointer'
                              : status === 'selected'
                              ? 'bg-primary border-primary text-primary-foreground'
                              : 'bg-muted border-border cursor-not-allowed opacity-40'
                          }
                        `}
                      >
                        <span className="text-xs opacity-0 hover:opacity-100">
                          {i + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <span className="w-8 text-sm text-muted-foreground font-mono">{row}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-t-lg rounded-b-sm bg-card border-2 border-border/50" />
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-t-lg rounded-b-sm bg-primary border-2 border-primary" />
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-t-lg rounded-b-sm bg-muted border-2 border-border opacity-40" />
            <span className="text-sm">Booked</span>
          </div>
        </div>

        {/* Summary */}
        {selectedSeats.length > 0 && (
          <Card className="p-4 rounded-xl backdrop-blur bg-card/50 border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Selected Seats</p>
                <p className="font-semibold">{selectedSeats.join(', ')}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Price</p>
                <p className="text-2xl font-semibold text-primary">${totalPrice}</p>
              </div>
            </div>
            <Button onClick={() => navigate('/payment')} className="w-full rounded-lg" size="lg">
              Proceed to Payment
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
