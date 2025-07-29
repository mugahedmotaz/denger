import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  Truck, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Calendar,
  Shield,
  Wrench
} from 'lucide-react';
import { mockVehicles, mockUsers, mockShifts, mockMaintenanceTickets } from '../data/mockData';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const activeVehicles = mockVehicles.filter(v => v.status === 'active').length;
  const driversCount = mockUsers.filter(u => u.role === 'driver').length;
  const firefightersCount = mockUsers.filter(u => u.role === 'firefighter').length;
  const todayShifts = mockShifts.filter(s => s.date === new Date().toISOString().split('T')[0]);
  const urgentTickets = mockMaintenanceTickets.filter(t => t.priority === 'urgent' && t.status === 'open').length;

  const getRoleSpecificStats = () => {
    switch (user?.role) {
      case 'manager':
        return [
          { title: 'العربات النشطة', value: activeVehicles, icon: Truck, color: 'bg-green-500' },
          { title: 'عدد السائقين', value: driversCount, icon: Users, color: 'bg-blue-500' },
          { title: 'عدد الإطفائيين', value: firefightersCount, icon: Shield, color: 'bg-red-500' },
          { title: 'الورديات اليوم', value: todayShifts.length, icon: Calendar, color: 'bg-purple-500' },
        ];
      case 'driver':
      case 'firefighter':
        return [
          { title: 'وردياتي اليوم', value: 2, icon: Calendar, color: 'bg-blue-500' },
          { title: 'المهام المكتملة', value: 5, icon: CheckCircle, color: 'bg-green-500' },
          { title: 'المهام المعلقة', value: 1, icon: Clock, color: 'bg-yellow-500' },
          { title: 'التنبيهات', value: 3, icon: AlertTriangle, color: 'bg-red-500' },
        ];
      case 'guard':
        return [
          { title: 'مناوبات اليوم', value: 1, icon: Shield, color: 'bg-blue-500' },
          { title: 'الزوار المسجلون', value: 12, icon: Users, color: 'bg-green-500' },
          { title: 'التنبيهات الأمنية', value: 0, icon: AlertTriangle, color: 'bg-red-500' },
          { title: 'الحوادث المبلغة', value: 2, icon: Wrench, color: 'bg-yellow-500' },
        ];
      default:
        return [];
    }
  };

  const stats = getRoleSpecificStats();

  const getTodayTasks = () => {
    const baseTasks = [
      'مراجعة تقرير الوردية الصباحية',
      'فحص العربات قبل الخروج',
      'تحديث سجل الصيانة الدورية',
    ];

    switch (user?.role) {
      case 'manager':
        return [
          ...baseTasks,
          'مراجعة تذاكر الصيانة العاجلة',
          'إعداد جدول الورديات للأسبوع القادم',
          'متابعة تدريب الفريق الجديد',
        ];
      case 'driver':
        return [
          'فحص العربة رقم 001 قبل الخروج',
          'تحديث كتاب السير',
          'تسليم تقرير الرحلة السابقة',
        ];
      case 'firefighter':
        return [
          'فحص معدات الإطفاء',
          'تنظيف وصيانة الأدوات',
          'حضور جلسة التدريب الأسبوعية',
        ];
      case 'guard':
        return [
          'فحص أنظمة الأمان في البوابات',
          'مراجعة سجل دخول وخروج الزوار',
          'تسليم المناوبة للحارس التالي',
        ];
      default:
        return baseTasks;
    }
  };

  const todayTasks = getTodayTasks();

  const getRecentAlerts = () => {
    const alerts = [
      { id: 1, message: 'تأخير في وصول الفريق الثاني', type: 'warning', time: '10:30 ص' },
      { id: 2, message: 'عطل جديد في العربة رقم 003', type: 'error', time: '09:15 ص' },
      { id: 3, message: 'تم إكمال فحص العربة رقم 001', type: 'success', time: '08:45 ص' },
      { id: 4, message: 'تغيير في جدول الوردية المسائية', type: 'info', time: '08:00 ص' },
    ];

    return alerts;
  };

  const recentAlerts = getRecentAlerts();

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  const getAlertBgColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'error': return 'bg-red-50 border-red-200';
      case 'success': return 'bg-green-50 border-green-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-blue-100/30 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              مرحباً، {user?.name}
            </h1>
            <p className="text-gray-600">
              {new Date().toLocaleDateString('ar-SA', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="text-4xl">
            {user?.role === 'manager' ? '👨‍💼' : 
             user?.role === 'driver' ? '👨‍🚒' : 
             user?.role === 'firefighter' ? '🚒' : '🛡️'}
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2 space-x-reverse">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>مهام اليوم</span>
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {todayTasks.map((task, index) => (
                  <div key={index} className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700 flex-1">{task}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
                + إضافة مهمة جديدة
              </button>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2 space-x-reverse">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span>التنبيهات العاجلة</span>
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-lg border ${getAlertBgColor(alert.type)}`}>
                    <div className="flex items-start space-x-2 space-x-reverse">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
                عرض جميع التنبيهات
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {user?.role === 'manager' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">إجراءات سريعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 space-x-reverse p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800 font-medium">إضافة وردية جديدة</span>
            </button>
            <button className="flex items-center space-x-3 space-x-reverse p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <Users className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">تعيين فريق للعربة</span>
            </button>
            <button className="flex items-center space-x-3 space-x-reverse p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              <Wrench className="w-5 h-5 text-red-600" />
              <span className="text-red-800 font-medium">إنشاء تذكرة صيانة</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;