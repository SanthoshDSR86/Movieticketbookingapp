import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { useState } from 'react';
import { LoginView } from './components/LoginView';
import { MovieDiscoveryView } from './components/MovieDiscoveryView';
import { TheatreSelectionView } from './components/TheatreSelectionView';
import { SeatSelectionView } from './components/SeatSelectionView';
import { PaymentView } from './components/PaymentView';
import { BookingHistoryView } from './components/BookingHistoryView';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminMovieManagement } from './components/AdminMovieManagement';
import { AdminTheatreManagement } from './components/AdminTheatreManagement';
import { ReportsAnalytics } from './components/ReportsAnalytics';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            <Route 
              path="/" 
              element={<LoginView onLogin={(admin) => {
                setIsLoggedIn(true);
                setIsAdmin(admin);
              }} />} 
            />
            <Route 
              path="/movies" 
              element={isLoggedIn ? <MovieDiscoveryView /> : <Navigate to="/" />} 
            />
            <Route 
              path="/theatre/:movieId" 
              element={isLoggedIn ? <TheatreSelectionView /> : <Navigate to="/" />} 
            />
            <Route 
              path="/seats/:theatreId" 
              element={isLoggedIn ? <SeatSelectionView /> : <Navigate to="/" />} 
            />
            <Route 
              path="/payment" 
              element={isLoggedIn ? <PaymentView /> : <Navigate to="/" />} 
            />
            <Route 
              path="/bookings" 
              element={isLoggedIn ? <BookingHistoryView /> : <Navigate to="/" />} 
            />
            <Route 
              path="/admin" 
              element={isLoggedIn && isAdmin ? <AdminDashboard /> : <Navigate to="/" />} 
            />
            <Route 
              path="/admin/movies" 
              element={isLoggedIn && isAdmin ? <AdminMovieManagement /> : <Navigate to="/" />} 
            />
            <Route 
              path="/admin/theatres" 
              element={isLoggedIn && isAdmin ? <AdminTheatreManagement /> : <Navigate to="/" />} 
            />
            <Route 
              path="/admin/reports" 
              element={isLoggedIn && isAdmin ? <ReportsAnalytics /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
