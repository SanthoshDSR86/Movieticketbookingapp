import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Wallet, Building, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';

export function PaymentView() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      navigate('/bookings');
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <span>Payment</span>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="p-6 rounded-xl backdrop-blur bg-card/50 border-border/50 mb-6">
          <h3 className="font-semibold mb-4">Booking Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Movie</span>
              <span>Stellar Horizon</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Theatre</span>
              <span>Grand Cinema Downtown</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Showtime</span>
              <span>8:30 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Seats</span>
              <span>A1, A2, A3</span>
            </div>
            <div className="border-t border-border/50 pt-2 mt-2 flex justify-between font-semibold">
              <span>Total Amount</span>
              <span className="text-primary text-xl">$36.00</span>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <h3 className="font-semibold">Select Payment Method</h3>

          <div className="grid grid-cols-3 gap-3">
            <Button
              variant={paymentMethod === 'card' ? 'default' : 'outline'}
              className="h-auto py-4 flex-col gap-2 rounded-xl"
              onClick={() => setPaymentMethod('card')}
            >
              <CreditCard className="w-6 h-6" />
              <span className="text-xs">Card</span>
            </Button>
            <Button
              variant={paymentMethod === 'upi' ? 'default' : 'outline'}
              className="h-auto py-4 flex-col gap-2 rounded-xl"
              onClick={() => setPaymentMethod('upi')}
            >
              <Wallet className="w-6 h-6" />
              <span className="text-xs">UPI</span>
            </Button>
            <Button
              variant={paymentMethod === 'netbanking' ? 'default' : 'outline'}
              className="h-auto py-4 flex-col gap-2 rounded-xl"
              onClick={() => setPaymentMethod('netbanking')}
            >
              <Building className="w-6 h-6" />
              <span className="text-xs">Net Banking</span>
            </Button>
          </div>

          {paymentMethod === 'card' && (
            <Card className="p-6 rounded-xl backdrop-blur bg-card/50 border-border/50">
              <div className="space-y-4">
                <div>
                  <label className="text-sm mb-2 block">Card Number</label>
                  <Input placeholder="1234 5678 9012 3456" className="rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm mb-2 block">Expiry Date</label>
                    <Input placeholder="MM/YY" className="rounded-lg" />
                  </div>
                  <div>
                    <label className="text-sm mb-2 block">CVV</label>
                    <Input placeholder="123" type="password" className="rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="text-sm mb-2 block">Cardholder Name</label>
                  <Input placeholder="John Doe" className="rounded-lg" />
                </div>
              </div>
            </Card>
          )}

          <Button
            onClick={handlePayment}
            disabled={processing}
            className="w-full rounded-lg mt-6"
            size="lg"
          >
            {processing ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                Confirm Payment
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
