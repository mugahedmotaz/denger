import { User, Vehicle, Shift, Equipment, GuardDuty, MaintenanceTicket, Notification } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'manager1',
    name: 'أحمد محمد علي',
    role: 'manager',
    email: 'ahmed@fire.gov',
    phone: '+966501234567',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '2',
    username: 'driver1',
    name: 'محمد عبدالله السعد',
    role: 'driver',
    email: 'mohammed@fire.gov',
    phone: '+966501234568',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '3',
    username: 'firefighter1',
    name: 'خالد أحمد الزهراني',
    role: 'firefighter',
    email: 'khalid@fire.gov',
    phone: '+966501234569',
    avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '4',
    username: 'firefighter2',
    name: 'عبدالرحمن محمد القحطاني',
    role: 'firefighter',
    email: 'abdulrahman@fire.gov',
    phone: '+966501234570',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '5',
    username: 'guard1',
    name: 'سعد عبدالعزيز المطيري',
    role: 'guard',
    email: 'saad@fire.gov',
    phone: '+966501234571',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '6',
    username: 'driver2',
    name: 'فهد سالم الغامدي',
    role: 'driver',
    email: 'fahd@fire.gov',
    phone: '+966501234572',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '7',
    username: 'firefighter3',
    name: 'ناصر عبدالله الحربي',
    role: 'firefighter',
    email: 'nasser@fire.gov',
    phone: '+966501234573',
    avatar: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  }
];

export const mockVehicles: Vehicle[] = [
  {
    id: '1',
    number: '001',
    type: 'fire_truck',
    status: 'active',
    image: 'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    firefighters: []
  },
  {
    id: '2',
    number: '002',
    type: 'fire_truck',
    status: 'active',
    image: 'https://images.pexels.com/photos/1120872/pexels-photo-1120872.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    firefighters: []
  },
  {
    id: '3',
    number: '003',
    type: 'ambulance',
    status: 'maintenance',
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    firefighters: []
  },
  {
    id: '4',
    number: '004',
    type: 'rescue',
    status: 'active',
    image: 'https://images.pexels.com/photos/1120872/pexels-photo-1120872.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    firefighters: []
  }
];

export const mockShifts: Shift[] = [
  {
    id: '1',
    date: '2025-01-15',
    startTime: '08:00',
    endTime: '16:00',
    type: 'morning',
    participants: [mockUsers[1], mockUsers[2], mockUsers[3]],
    supervisor: mockUsers[0],
    notes: 'وردية صباحية عادية'
  },
  {
    id: '2',
    date: '2025-01-15',
    startTime: '16:00',
    endTime: '00:00',
    type: 'evening',
    participants: [mockUsers[5], mockUsers[6]],
    supervisor: mockUsers[0],
    notes: 'وردية مسائية'
  }
];

export const mockEquipment: Equipment[] = [
  {
    id: '1',
    name: 'خرطوم الإطفاء الرئيسي',
    type: 'hose',
    vehicleId: '1',
    status: 'working',
    lastChecked: '2025-01-14',
    notes: 'في حالة ممتازة'
  },
  {
    id: '2',
    name: 'جهاز التنفس الصناعي',
    type: 'breathing_apparatus',
    vehicleId: '1',
    status: 'working',
    lastChecked: '2025-01-14'
  },
  {
    id: '3',
    name: 'مطفأة الرغوة',
    type: 'foam_extinguisher',
    vehicleId: '1',
    status: 'damaged',
    lastChecked: '2025-01-14',
    notes: 'تحتاج صيانة - تسريب في الخزان'
  }
];

export const mockMaintenanceTickets: MaintenanceTicket[] = [
  {
    id: '1',
    vehicleId: '3',
    reportedBy: '2',
    title: 'عطل في المحرك',
    description: 'المحرك لا يعمل بشكل طبيعي، صوت غريب عند التشغيل',
    priority: 'urgent',
    status: 'open',
    images: [],
    createdAt: '2025-01-14T10:30:00Z',
    updatedAt: '2025-01-14T10:30:00Z'
  },
  {
    id: '2',
    equipmentId: '3',
    reportedBy: '3',
    title: 'تسريب في مطفأة الرغوة',
    description: 'يوجد تسريب في خزان الرغوة',
    priority: 'normal',
    status: 'in_progress',
    images: [],
    assignedTo: '1',
    createdAt: '2025-01-13T14:20:00Z',
    updatedAt: '2025-01-14T09:15:00Z'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'تذكرة صيانة جديدة',
    message: 'تم إنشاء تذكرة صيانة جديدة للعربة رقم 003',
    type: 'warning',
    read: false,
    createdAt: '2025-01-14T10:30:00Z'
  },
  {
    id: '2',
    userId: '2',
    title: 'تم تعيينك لوردية جديدة',
    message: 'تم تعيينك للوردية المسائية اليوم من 4:00 م إلى 12:00 ص',
    type: 'info',
    read: true,
    createdAt: '2025-01-14T08:00:00Z'
  }
];

export const vehicleInspectionItems = [
  { id: '1', name: 'فحص المحرك', category: 'engine', isRequired: true },
  { id: '2', name: 'فحص الإطارات', category: 'tires', isRequired: true },
  { id: '3', name: 'فحص الأضواء الأمامية', category: 'lights', isRequired: true },
  { id: '4', name: 'فحص الأضواء الخلفية', category: 'lights', isRequired: true },
  { id: '5', name: 'فحص الفرامل', category: 'brakes', isRequired: true },
  { id: '6', name: 'فحص مستوى الزيت', category: 'fluids', isRequired: true },
  { id: '7', name: 'فحص مستوى الماء', category: 'fluids', isRequired: true },
  { id: '8', name: 'فحص البطارية', category: 'electrical', isRequired: true },
  { id: '9', name: 'فحص أحزمة الأمان', category: 'safety', isRequired: true },
  { id: '10', name: 'فحص المرايا', category: 'visibility', isRequired: false }
];

export const equipmentInspectionItems = [
  { id: '1', name: 'خراطيم الإطفاء', category: 'hoses', isRequired: true },
  { id: '2', name: 'أجهزة التنفس', category: 'breathing', isRequired: true },
  { id: '3', name: 'الخوذات الواقية', category: 'protection', isRequired: true },
  { id: '4', name: 'البدلات الواقية', category: 'protection', isRequired: true },
  { id: '5', name: 'المطافئ اليدوية', category: 'extinguishers', isRequired: true },
  { id: '6', name: 'سلالم الإنقاذ', category: 'rescue', isRequired: true },
  { id: '7', name: 'أدوات القطع والكسر', category: 'tools', isRequired: true },
  { id: '8', name: 'أجهزة الإنذار', category: 'communication', isRequired: true },
  { id: '9', name: 'حبال الإنقاذ', category: 'rescue', isRequired: true },
  { id: '10', name: 'الإسعافات الأولية', category: 'medical', isRequired: true }
];