'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, LineChart, Users, DollarSign, ArrowUp, 
  ArrowDown, Activity, Zap, Clock, TrendingUp,
  Shield, FileText, CreditCard, CheckCircle, Package
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsClient(true);
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
    } else {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data:", e);
        localStorage.removeItem('user');
        router.push('/login');
      }
    }
  }, [router]);

  if (!isClient) return null;
  if (!user) return null; // wait for user to load

  // Stats data for the dashboard
  const stats = [
    {
      title: "Total Revenue",
      value: "$24,560",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      gradient: "from-emerald-400 to-teal-500",
      shadowColor: "shadow-emerald-200 dark:shadow-emerald-900/30"
    },
    {
      title: "New Customers",
      value: "573",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      gradient: "from-blue-400 to-violet-500",
      shadowColor: "shadow-blue-200 dark:shadow-blue-900/30"
    },
    {
      title: "Active Policies",
      value: "1,352",
      change: "+3.4%",
      trend: "up",
      icon: LineChart,
      gradient: "from-purple-400 to-pink-500",
      shadowColor: "shadow-purple-200 dark:shadow-purple-900/30"
    },
    {
      title: "Pending Quotes",
      value: "45",
      change: "-5.1%",
      trend: "down",
      icon: BarChart3,
      gradient: "from-amber-400 to-orange-500",
      shadowColor: "shadow-amber-200 dark:shadow-amber-900/30"
    },
  ];

  // Recent activities for the timeline
  const activities = [
    { 
      id: 1, 
      title: "Policy #1234 was updated", 
      time: "1 hour ago", 
      type: "policy",
      icon: Shield
    },
    { 
      id: 2, 
      title: "New quote created for John Smith", 
      time: "2 hours ago", 
      type: "quote",
      icon: FileText
    },
    { 
      id: 3, 
      title: "Payment received from Emma Johnson", 
      time: "3 hours ago", 
      type: "payment",
      icon: CreditCard
    },
    { 
      id: 4, 
      title: "Support ticket #4567 resolved", 
      time: "4 hours ago", 
      type: "support",
      icon: CheckCircle
    }
  ];

  // Quick actions for the dashboard
  const quickActions = [
    { name: 'Create Quote', path: '/dashboard/quotes', icon: FileText, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300' },
    { name: 'New Policy', path: '/dashboard/policies', icon: Shield, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300' },
    { name: 'Add Product', path: '/dashboard/products/create', icon: Package, color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300' },
    { name: 'Manage Users', path: '/dashboard/users', icon: Users, color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section with Gradient Background */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8"
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl font-bold mr-6 shadow-lg">
              {user.email?.[0]?.toUpperCase() || 'A'}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Welcome back</h1>
              <p className="text-white/80 mt-1 text-lg">Here's what's happening with your insurance dashboard today.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-indigo-500/20 mr-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Quick Access</h3>
                  <p className="text-white/70 text-sm">Create a new quote</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-500/20 mr-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Performance</h3>
                  <p className="text-white/70 text-sm">+12% from last month</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-pink-500/20 mr-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Recent Activity</h3>
                  <p className="text-white/70 text-sm">3 new updates</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Stats Overview - Animated Cards with Gradients */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${stat.gradient} p-6 shadow-lg ${stat.shadowColor}`}
          >
            <div className="absolute -right-6 -top-6 p-6 opacity-20">
              <stat.icon className="h-16 w-16 text-white" />
            </div>
            <div className="relative">
              <p className="text-sm font-medium text-white/80">{stat.title}</p>
              <h3 className="mt-2 text-3xl font-bold text-white">{stat.value}</h3>
              <div className="mt-2 flex items-center">
                <span className={`flex items-center text-sm font-medium ${
                  stat.trend === 'up' ? 'text-emerald-100' : 'text-red-100'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUp className="mr-1 h-4 w-4" />
                  ) : (
                    <ArrowDown className="mr-1 h-4 w-4" />
                  )}
                  {stat.change}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity - Timeline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recent Activity</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your latest actions and updates</p>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-6">
              {activities.map((activity, index) => (
                <motion.div 
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative"
                >
                  {index !== activities.length - 1 && (
                    <div className="absolute top-7 left-4 h-full w-px bg-gray-200 dark:bg-gray-700"></div>
                  )}
                  <div className="flex items-start group">
                    <div className="relative z-10 h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-300 mr-4">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {activity.title}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions - Hoverable Cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Quick Actions</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Common tasks and shortcuts</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push(action.path)}
                  className="p-4 rounded-xl flex items-center hover:shadow-md transition-all duration-200 bg-gray-50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                >
                  <div className={`h-10 w-10 rounded-full ${action.color} flex items-center justify-center mr-3`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <p className="font-medium text-gray-800 dark:text-white">{action.name}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}