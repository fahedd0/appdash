import { 
    Home, Package, FileText, Shield, Download, 
    LifeBuoy, Activity, Building2, Users, Bell, 
    ListChecks
  } from 'lucide-react';
  
  export const navigationConfig = [
    {
      title: null,
      items: [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'Products', href: '/dashboard/products', icon: Package },
      ]
    },
    {
      title: 'Policy Management Center',
      items: [
        { name: 'Quotes', href: '/dashboard/quotes', icon: FileText },
        { name: 'Policies', href: '/dashboard/policies', icon: Shield },
      ]
    },
    {
      title: 'Reports',
      items: [
        { name: 'Download Center', href: '/dashboard/download', icon: Download },
      ]
    },
    {
      title: 'Support',
      items: [
        { name: 'Request Support', href: '/dashboard/support', icon: LifeBuoy },
      ]
    },
    {
      title: 'Settings',
      items: [
        { name: 'Activity Log', href: '/dashboard/activity', icon: Activity },
        { name: 'Agencies', href: '/dashboard/agencies', icon: Building2 },
        { name: 'Users', href: '/dashboard/users', icon: Users },
        { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
        { name: 'Sequences', href: '/dashboard/sequences', icon: ListChecks },
      ]
    },
  ];