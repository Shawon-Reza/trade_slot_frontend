export interface Trader {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface WorkArea {
  id: string;
  date: string;
  area: string;
  travelBuffer: number;
  isActive: boolean;
}

export interface Booking {
  id: string;
  customer: Customer;
  trader: Trader;
  service: string;
  date: string;
  time: string;
  duration: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  amount: number;
  location: string;
}

export interface StatCardData {
  label: string;
  value: string | number;
  comparison?: string;
  icon: string;
}

export interface ActivityItem {
  id: string;
  message: string;
  timestamp: string;
  type: 'booking' | 'payment' | 'workarea';
}

export const mockTrader: Trader = {
  id: 'trader-1',
  name: 'Shawon',
  businessName: 'Shawon Plumbing Services',
  email: 'shawon@tradeslot.com',
  phone: '+880 17XX XXXXXX',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=shawon',
};

export const mockCustomer: Customer = {
  id: 'customer-1',
  name: 'Alex',
  email: 'alex@tradeslot.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
};

export const mockWorkAreas: WorkArea[] = [
  {
    id: 'wa-1',
    date: '2026-08-20',
    area: 'Gulshan, Dhaka',
    travelBuffer: 30,
    isActive: true,
  },
  {
    id: 'wa-2',
    date: '2026-08-21',
    area: 'Banani, Dhaka',
    travelBuffer: 30,
    isActive: false,
  },
  {
    id: 'wa-3',
    date: '2026-08-22',
    area: 'Mirpur, Dhaka',
    travelBuffer: 30,
    isActive: false,
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    customer: {
      id: 'cust-1',
      name: 'John Smith',
      email: 'john@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    },
    trader: mockTrader,
    service: 'Plumbing',
    date: '2026-08-20',
    time: '10:00 AM',
    duration: 60,
    status: 'confirmed',
    paymentStatus: 'paid',
    amount: 120,
    location: 'Gulshan, Dhaka',
  },
  {
    id: 'booking-2',
    customer: {
      id: 'cust-2',
      name: 'Alex Brown',
      email: 'alex@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alexbrown',
    },
    trader: mockTrader,
    service: 'Electrical',
    date: '2026-08-20',
    time: '2:00 PM',
    duration: 90,
    status: 'confirmed',
    paymentStatus: 'paid',
    amount: 180,
    location: 'Gulshan, Dhaka',
  },
  {
    id: 'booking-3',
    customer: {
      id: 'cust-3',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    },
    trader: mockTrader,
    service: 'HVAC Repair',
    date: '2026-08-21',
    time: '9:00 AM',
    duration: 120,
    status: 'pending',
    paymentStatus: 'pending',
    amount: 250,
    location: 'Banani, Dhaka',
  },
];

export const mockCustomerBookings: Booking[] = [
  {
    id: 'cust-booking-1',
    customer: mockCustomer,
    trader: {
      id: 'trader-2',
      name: 'Shawon',
      businessName: 'Shawon Plumbing Services',
      email: 'shawon@tradeslot.com',
      phone: '+880 17XX XXXXXX',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=shawon',
    },
    service: 'Plumbing Service',
    date: '2026-08-20',
    time: '2:00 PM',
    duration: 60,
    status: 'confirmed',
    paymentStatus: 'paid',
    amount: 120,
    location: 'Gulshan, Dhaka',
  },
  {
    id: 'cust-booking-2',
    customer: mockCustomer,
    trader: {
      id: 'trader-3',
      name: 'Mike Johnson',
      businessName: 'Mike Electrical',
      email: 'mike@tradeslot.com',
      phone: '+880 18XX XXXXXX',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    },
    service: 'Electrical Repair',
    date: '2026-08-22',
    time: '10:00 AM',
    duration: 90,
    status: 'confirmed',
    paymentStatus: 'paid',
    amount: 150,
    location: 'Banani, Dhaka',
  },
];

export const mockTraderStats: StatCardData[] = [
  {
    label: "Today's Bookings",
    value: 3,
    comparison: '+2 from yesterday',
    icon: 'CalendarCheck',
  },
  {
    label: 'Upcoming',
    value: 7,
    comparison: 'This week',
    icon: 'CalendarClock',
  },
  {
    label: 'Completed Jobs',
    value: 24,
    comparison: 'This month',
    icon: 'CheckCircle',
  },
  {
    label: 'Total Earnings',
    value: '£480',
    comparison: '+12% from last month',
    icon: 'PoundSterling',
  },
];

export const mockCustomerStats: StatCardData[] = [
  {
    label: 'Upcoming Bookings',
    value: 2,
    comparison: 'This week',
    icon: 'CalendarCheck',
  },
  {
    label: 'Completed',
    value: 8,
    comparison: 'All time',
    icon: 'CheckCircle',
  },
  {
    label: 'Total Spent',
    value: '£240',
    comparison: 'This year',
    icon: 'PoundSterling',
  },
];

export const mockActivities: ActivityItem[] = [
  {
    id: 'act-1',
    message: 'Booking confirmed with John Smith',
    timestamp: '2 hours ago',
    type: 'booking',
  },
  {
    id: 'act-2',
    message: 'Payment received from Alex Brown',
    timestamp: '4 hours ago',
    type: 'payment',
  },
  {
    id: 'act-3',
    message: 'Work area updated to Gulshan',
    timestamp: '1 day ago',
    type: 'workarea',
  },
];

export const navItemsTrader = [
  { label: 'Dashboard', href: '/trader/dashboard', icon: 'LayoutDashboard' },
  { label: 'Work Area', href: '/trader/work-area', icon: 'MapPin' },
  { label: 'Bookings', href: '/trader/bookings', icon: 'Calendar' },
  { label: 'Payments', href: '/trader/payments', icon: 'CreditCard' },
  { label: 'Settings', href: '/trader/settings', icon: 'Settings' },
];

export const navItemsCustomer = [
  { label: 'Dashboard', href: '/customer/dashboard', icon: 'LayoutDashboard' },
  { label: 'Book a Trader', href: '/customer/book-trader', icon: 'Search' },
  { label: 'My Bookings', href: '/customer/bookings', icon: 'Calendar' },
  { label: 'Settings', href: '/customer/settings', icon: 'Settings' },
];

export const landingNavItems = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'For Traders', href: '#for-traders' },
  { label: 'For Customers', href: '#for-customers' },
];