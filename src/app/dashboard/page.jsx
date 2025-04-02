'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart, LineChart, Users, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';
import WelcomeCard from '@/components/dashboard/welcome-card';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      title: "New Customers",
      value: "573",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Active Policies",
      value: "1,352",
      change: "+3.4%",
      trend: "up",
      icon: LineChart,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      title: "Pending Quotes",
      value: "45",
      change: "-5.1%",
      trend: "down",
      icon: BarChart,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-900/20"
    },
  ];

  return (
    <div className="space-y-6">
      <WelcomeCard />
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
                <span className={`flex items-center text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUp className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-1" />
                  )}
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Policy #1234 was updated', 'New quote created for John Smith', 'Payment received from Emma Johnson', 'Support ticket #4567 resolved'].map((activity, i) => (
                <div key={i} className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{activity}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{i + 1} hour{i !== 0 ? 's' : ''} ago</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Create Quote', path: '/dashboard/quotes' },
                { name: 'New Policy', path: '/dashboard/policies' },
                { name: 'Add Product', path: '/dashboard/products/create' },
                { name: 'Manage Users', path: '/dashboard/users' }
              ].map((action, i) => (
                <button
                  key={i}
                  onClick={() => router.push(action.path)}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors"
                >
                  <p className="font-medium text-gray-800 dark:text-white">{action.name}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}