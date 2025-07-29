export interface User {
  id: string;
  username: string;
  name: string;
  role: 'manager' | 'driver' | 'firefighter' | 'guard';
  email: string;
  phone: string;
  avatar?: string;
}

export interface Vehicle {
  id: string;
  number: string;
  type: 'fire_truck' | 'ambulance' | 'rescue';
  status: 'active' | 'maintenance' | 'out_of_service';
  image: string;
  driver?: User;
  firefighters: User[];
}

export interface Shift {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'morning' | 'evening' | 'night';
  participants: User[];
  supervisor: User;
  notes?: string;
}

export interface InspectionItem {
  id: string;
  name: string;
  category: string;
  status: 'pass' | 'fail' | 'pending';
  notes?: string;
  isRequired: boolean;
}

export interface VehicleInspection {
  id: string;
  vehicleId: string;
  inspectorId: string;
  date: string;
  items: InspectionItem[];
  engineTestDuration?: number;
  overallStatus: 'pass' | 'fail' | 'pending';
  notes?: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  vehicleId: string;
  status: 'working' | 'damaged' | 'missing';
  lastChecked: string;
  notes?: string;
}

export interface GuardDuty {
  id: string;
  guardId: string;
  post: 'operations_gate' | 'external_gate';
  startTime: string;
  endTime?: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: 'scheduled' | 'active' | 'completed';
  handoverNotes?: string;
}

export interface MaintenanceTicket {
  id: string;
  vehicleId?: string;
  equipmentId?: string;
  reportedBy: string;
  title: string;
  description: string;
  priority: 'urgent' | 'normal' | 'low';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  images: string[];
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
}

export interface VisitorLog {
  id: string;
  name: string;
  purpose: string;
  company?: string;
  checkInTime: string;
  checkOutTime?: string;
  guardId: string;
  notes?: string;
}