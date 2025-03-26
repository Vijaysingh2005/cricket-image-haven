
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  LogIn, 
  UserPlus,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

// Mock database for demonstration purposes
// In a real app, this would be a database call
const mockUserDB = [
  { 
    id: 1, 
    name: 'Test User', 
    email: 'test@example.com', 
    phone: '+1234567890', 
    password: 'password123' 
  }
];

interface AuthFormsProps {
  onLoginSuccess: () => void;
}

const AuthForms: React.FC<AuthFormsProps> = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');
  const { toast } = useToast();
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Login error state
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // Register error state
  const [registerError, setRegisterError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    // In a real app, this would validate against a database
    const user = mockUserDB.find(u => u.email === loginData.email);
    
    if (!user) {
      setLoginError('User not found. Please sign up first.');
      return;
    }
    
    if (user.password !== loginData.password) {
      setLoginError('Invalid password. Please try again.');
      return;
    }
    
    // Store user data and token
    localStorage.setItem('authToken', 'mock-jwt-token');
    localStorage.setItem('userData', JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone
    }));
    
    toast({
      title: "Login successful",
      description: `Welcome back, ${user.name}!`,
    });
    
    onLoginSuccess();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    setIsRegistering(true);
    
    // Basic validation
    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError('Passwords do not match');
      setIsRegistering(false);
      return;
    }
    
    if (registerData.password.length < 6) {
      setRegisterError('Password must be at least 6 characters long');
      setIsRegistering(false);
      return;
    }
    
    // Check if user already exists
    const userExists = mockUserDB.some(u => u.email === registerData.email);
    if (userExists) {
      setRegisterError('User with this email already exists');
      setIsRegistering(false);
      return;
    }
    
    // In a real app, this would make an API call to create a user
    console.log('Registration with:', registerData);
    
    // Mock adding user to database
    const newUser = {
      id: mockUserDB.length + 1,
      name: registerData.name,
      email: registerData.email,
      phone: registerData.phone,
      password: registerData.password
    };
    
    // In a real app, this would be saved to a database
    mockUserDB.push(newUser);
    
    // Store user data and token
    localStorage.setItem('authToken', 'mock-jwt-token');
    localStorage.setItem('userData', JSON.stringify({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone
    }));
    
    toast({
      title: "Registration successful",
      description: `Welcome, ${registerData.name}!`,
    });
    
    setIsRegistering(false);
    onLoginSuccess();
  };

  return (
    <div className="p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <motion.form 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleLogin}
            className="space-y-4"
          >
            {loginError && (
              <div className="bg-destructive/15 text-destructive p-3 rounded-md flex items-start gap-2">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p>{loginError}</p>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  className="pl-10"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              <LogIn className="h-4 w-4 mr-2" />
              Log In
            </Button>
            
            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <a 
                href="#" 
                className="text-primary hover:underline" 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('register');
                }}
              >
                Sign up
              </a>
            </p>
          </motion.form>
        </TabsContent>
        
        <TabsContent value="register">
          <motion.form 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleRegister}
            className="space-y-4"
          >
            {registerError && (
              <div className="bg-destructive/15 text-destructive p-3 rounded-md flex items-start gap-2">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p>{registerError}</p>
              </div>
            )}
              
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="John Doe" 
                  className="pl-10"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  className="pl-10"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+91 1234567890" 
                  className="pl-10"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isRegistering}>
              <UserPlus className="h-4 w-4 mr-2" />
              {isRegistering ? 'Creating Account...' : 'Sign Up'}
            </Button>
            
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <a 
                href="#" 
                className="text-primary hover:underline" 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('login');
                }}
              >
                Log in
              </a>
            </p>
          </motion.form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForms;
