import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Mail, Lock, Github, Chrome } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

interface LoginViewProps {
  onLogin: (isAdmin: boolean) => void;
}

export function LoginView({ onLogin }: LoginViewProps) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isAdmin = email.includes('admin');
    onLogin(isAdmin);
    navigate(isAdmin ? '/admin' : '/movies');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Film className="w-10 h-10 text-primary" />
            <h1 className="text-3xl font-bold">CinePass</h1>
          </div>
          <p className="text-muted-foreground">Your premium movie booking experience</p>
        </div>

        <Card className="p-8 backdrop-blur-xl bg-card/50 border-border/50 shadow-2xl rounded-xl">
          <div className="flex gap-2 mb-6">
            <Button
              variant={isLogin ? 'default' : 'outline'}
              className="flex-1 rounded-lg"
              onClick={() => setIsLogin(true)}
            >
              Login
            </Button>
            <Button
              variant={!isLogin ? 'default' : 'outline'}
              className="flex-1 rounded-lg"
              onClick={() => setIsLogin(false)}
            >
              Register
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 rounded-lg border-border/50 bg-input"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 rounded-lg border-border/50 bg-input"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            <Button type="submit" className="w-full rounded-lg">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="rounded-lg border-border/50">
              <Chrome className="w-4 h-4 mr-2" />
              Google
            </Button>
            <Button variant="outline" className="rounded-lg border-border/50">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground mt-6">
            Demo: Use any email (use admin@test.com for admin access)
          </p>
        </Card>
      </div>
    </div>
  );
}
