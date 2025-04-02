'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading
    setTimeout(() => {
      // Simple mock logic
      const isAdmin = email === 'admin@example.com';
      const userData = {
        email,
        role: isAdmin ? 'admin' : 'user'
      };

      localStorage.setItem('user', JSON.stringify(userData));
      router.push('/dashboard');
    }, 800);
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Decorative */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 text-white relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/10"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/10"></div>
          <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-white/5"></div>
        </div>
        
        <div className="relative z-10 flex flex-col h-full justify-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to AppDash</h1>
          <p className="text-xl text-white/80 mb-10">Your comprehensive insurance management solution.</p>
          
          <div className="space-y-8">
            {[
              'Manage all your insurance products in one place',
              'Track quotes and policies in real-time',
              'Comprehensive analytics and reporting'
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.2 }}
                className="flex items-center"
              >
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white/90">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right side - Login form */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900"
      >
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
              <span className="font-bold text-2xl">A</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Sign in to your account</p>
          </div>

          <motion.form 
            className="space-y-6"
            onSubmit={handleLogin}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-gray-400 hover:text-gray-500" />
                  ) : (
                    <Eye size={18} className="text-gray-400 hover:text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-medium transition-all duration-200 shadow-md ${
                isLoading ? 'opacity-90' : 'opacity-100'
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <LogIn size={18} className="mr-2" />
              )}
              {isLoading ? 'Signing in...' : 'Sign in'}
            </motion.button>
            
            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              Don't have an account? <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">Sign up</a>
            </div>
          </motion.form>

          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">For demo purposes, use admin@example.com with any password</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}