'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Search, Calendar, MessageSquare, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { navigationConfig } from '@/lib/navigation';
import Portal from '@/components/ui/portal';

export default function NewHeader({ isMobile, setMobileMenuOpen }) {
  const pathname = usePathname();
  const [user, setUser] = useState({ email: '', role: '' });
  const [showSearchBar, setShowSearchBar] = useState(false);
  
  // Dropdown states
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Refs for positioning dropdowns
  const calendarButtonRef = useRef(null);
  const messagesButtonRef = useRef(null);
  const notificationsButtonRef = useRef(null);
  const userButtonRef = useRef(null);
  const searchRef = useRef(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user') 
      ? JSON.parse(localStorage.getItem('user')) 
      : { email: 'admin@example.com', role: 'admin' };
    
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Close all dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      // Close search
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchBar(false);
      }
      
      // If we're not clicking on any of the button refs, close all dropdowns
      const isClickingOnButtons = [
        calendarButtonRef, 
        messagesButtonRef, 
        notificationsButtonRef, 
        userButtonRef
      ].some(ref => ref.current && ref.current.contains(event.target));
      
      // If clicking outside the buttons, close all dropdowns
      if (!isClickingOnButtons && !event.target.closest('.dropdown-content')) {
        setShowCalendar(false);
        setShowMessages(false);
        setShowNotifications(false);
        setShowUserMenu(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getCurrentPageTitle = () => {
    if (pathname === '/dashboard') return 'Dashboard';
    for (const section of navigationConfig) {
      for (const item of section.items) {
        if (item.href === pathname) return item.name;
      }
    }
    return 'Dashboard';
  };

  // Get current date in a nice format
  const getCurrentDate = () => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };
  
  // Sample notifications data
  const notifications = [
    { id: 1, title: 'New quote request', time: '10 minutes ago', read: false },
    { id: 2, title: 'Policy #4532 updated', time: '1 hour ago', read: false },
    { id: 3, title: 'Payment received', time: '3 hours ago', read: true },
    { id: 4, title: 'New user registered', time: 'Yesterday', read: true },
  ];
  
  // Sample messages data
  const messages = [
    { id: 1, sender: 'User1', content: 'Hi, I need help with my policy', time: '10:45 AM', avatar: 'J' },
    { id: 2, sender: 'User2', content: 'Thank you for your assistance', time: 'Yesterday', avatar: 'W' },
    { id: 3, sender: 'User3', content: 'Can you update my details?', time: 'Yesterday', avatar: 'L' },
  ];
  
  // Sample calendar events for today
  const today = new Date();
  const dayStart = new Date(today.setHours(9, 0, 0, 0));
  
  const events = [
    { id: 1, title: 'Team meeting', time: new Date(today.setHours(10, 0, 0, 0)), duration: 60 },
    { id: 2, title: 'Client call', time: new Date(today.setHours(13, 30, 0, 0)), duration: 45 },
    { id: 3, title: 'Product demo', time: new Date(today.setHours(15, 0, 0, 0)), duration: 60 },
  ];
  
  // Get dropdown position
  const getDropdownPosition = (ref) => {
    if (!ref.current) return { top: 0, left: 0 };
    
    const rect = ref.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      right: window.innerWidth - rect.right - window.scrollX,
    };
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } }
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
    >
      <div className="h-16 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {isMobile && (
            <motion.button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu size={20} className="text-gray-500 dark:text-gray-400" />
            </motion.button>
          )}

          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">{getCurrentPageTitle()}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{getCurrentDate()}</p>
          </div>
        </div>

        <div className="flex items-center space-x-1 md:space-x-3 relative">
          {/* Search Bar - Expandable */}
          <div className="relative" ref={searchRef}>
            {showSearchBar ? (
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 250, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </motion.div>
            ) : (
              <motion.button 
                onClick={() => setShowSearchBar(true)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search size={20} className="text-gray-500 dark:text-gray-400" />
              </motion.button>
            )}
          </div>
          
          {/* Calendar Button & Dropdown */}
          <div className="relative">
            <motion.button 
              ref={calendarButtonRef}
              onClick={() => {
                setShowCalendar(!showCalendar);
                setShowMessages(false);
                setShowNotifications(false);
                setShowUserMenu(false);
              }}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hidden md:flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar size={20} className="text-gray-500 dark:text-gray-400" />
            </motion.button>
            
            <Portal show={showCalendar}>
              <div 
                className="fixed inset-0 bg-transparent z-[999]"
                onClick={() => setShowCalendar(false)}
              />
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="dropdown-content fixed w-80 rounded-lg shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-[1000] overflow-hidden"
                style={{
                  top: `${getDropdownPosition(calendarButtonRef).top + 10}px`,
                  right: `${getDropdownPosition(calendarButtonRef).right}px`,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.15)"
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-800 dark:text-white">Today's Schedule</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="p-2 max-h-64 overflow-y-auto">
                  {events.length > 0 ? (
                    <div className="space-y-2">
                      {events.map(event => (
                        <div key={event.id} className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                          <p className="text-sm font-medium text-gray-800 dark:text-white">{event.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {event.time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - 
                            {new Date(event.time.getTime() + event.duration * 60000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 p-4 text-center">No events scheduled for today</p>
                  )}
                </div>
                <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full p-2 text-center text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md">
                    View Full Calendar
                  </button>
                </div>
              </motion.div>
            </Portal>
          </div>
          
          {/* Messages Button & Dropdown */}
          <div className="relative">
            <motion.button 
              ref={messagesButtonRef}
              onClick={() => {
                setShowMessages(!showMessages);
                setShowCalendar(false);
                setShowNotifications(false);
                setShowUserMenu(false);
              }}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hidden md:flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare size={20} className="text-gray-500 dark:text-gray-400" />
            </motion.button>
            
            <Portal show={showMessages}>
              <div 
                className="fixed inset-0 bg-transparent z-[999]"
                onClick={() => setShowMessages(false)}
              />
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="dropdown-content fixed w-80 rounded-lg shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-[1000] overflow-hidden"
                style={{
                  top: `${getDropdownPosition(messagesButtonRef).top + 10}px`,
                  right: `${getDropdownPosition(messagesButtonRef).right}px`,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.15)"
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-800 dark:text-white">Messages</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{messages.length} unread messages</p>
                </div>
                <div className="p-2 max-h-64 overflow-y-auto">
                  {messages.length > 0 ? (
                    <div className="space-y-2">
                      {messages.map(message => (
                        <div key={message.id} className="flex items-start p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3 flex-shrink-0">
                            {message.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium text-gray-800 dark:text-white truncate">{message.sender}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{message.time}</p>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{message.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 p-4 text-center">No messages</p>
                  )}
                </div>
                <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full p-2 text-center text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md">
                    View All Messages
                  </button>
                </div>
              </motion.div>
            </Portal>
          </div>

          {/* Notifications Button & Dropdown */}
          <div className="relative">
            <motion.button 
              ref={notificationsButtonRef}
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowCalendar(false);
                setShowMessages(false);
                setShowUserMenu(false);
              }}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell size={20} className="text-gray-500 dark:text-gray-400" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </motion.button>
            
            <Portal show={showNotifications}>
              <div 
                className="fixed inset-0 bg-transparent z-[999]"
                onClick={() => setShowNotifications(false)}
              />
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="dropdown-content fixed w-80 rounded-lg shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-[1000] overflow-hidden"
                style={{
                  top: `${getDropdownPosition(notificationsButtonRef).top + 10}px`,
                  right: `${getDropdownPosition(notificationsButtonRef).right}px`,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.15)"
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-800 dark:text-white">Notifications</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {notifications.filter(n => !n.read).length} unread notifications
                  </p>
                </div>
                <div className="p-2 max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div className="space-y-2">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md flex items-start ${
                            notification.read ? '' : 'bg-blue-50 dark:bg-blue-900/20'
                          }`}
                        >
                          <div className={`h-2 w-2 rounded-full mt-1.5 mr-2 flex-shrink-0 ${
                            notification.read ? 'bg-gray-300 dark:bg-gray-600' : 'bg-blue-500 dark:bg-blue-400'
                          }`}></div>
                          <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-white">{notification.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 p-4 text-center">No notifications</p>
                  )}
                </div>
                <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full p-2 text-center text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md">
                    Mark All as Read
                  </button>
                </div>
              </motion.div>
            </Portal>
          </div>

          {/* User Profile & Dropdown */}
          <div 
            className="relative flex items-center ml-2 pl-2 md:pl-4 border-l border-gray-200 dark:border-gray-700"
          >
            <motion.div 
              ref={userButtonRef}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowCalendar(false);
                setShowMessages(false);
                setShowNotifications(false);
              }}
              className="flex items-center cursor-pointer"
            >
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white mr-2 shadow-md">
                {user.email?.[0]?.toUpperCase() || 'A'}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {user.email ? user.email.split('@')[0] : 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.role || 'user'}</p>
              </div>
              <ChevronDown size={16} className="ml-2 text-gray-400 hidden md:block" />
            </motion.div>
            
            <Portal show={showUserMenu}>
              <div 
                className="fixed inset-0 bg-transparent z-[999]"
                onClick={() => setShowUserMenu(false)}
              />
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="dropdown-content fixed w-48 rounded-lg shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-[1000] overflow-hidden"
                style={{
                  top: `${getDropdownPosition(userButtonRef).top + 10}px`,
                  right: `${getDropdownPosition(userButtonRef).right}px`,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.15)"
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {user.email || 'admin@example.com'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user.role || 'Admin'} Account
                    </p>
                  </div>
                  
                  <a href="/dashboard/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <User size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                    My Profile
                  </a>
                  
                  <a href="/dashboard/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Settings size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                    Settings
                  </a>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                  
                  <button 
                    onClick={() => {
                      localStorage.removeItem('user');
                      window.location.href = '/login';
                    }}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign out
                  </button>
                </div>
              </motion.div>
            </Portal>
          </div>
        </div>
      </div>
    </motion.header>
  );
}