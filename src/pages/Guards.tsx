import React, { useState } from 'react';
import { Shield, MapPin, Clock, AlertTriangle, CheckCircle, Plus, Edit, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

interface GuardPost {
  id: string;
  name: string;
  location: string;
  assignedGuard: string;
  status: 'active' | 'vacant' | 'maintenance';
  lastCheckIn: string;
  emergencyLevel: 'low' | 'medium' | 'high';
  notes: string;
}

interface GuardReport {
  id: string;
  guardName: string;
  postName: string;
  timestamp: string;
  type: 'check-in' | 'incident' | 'maintenance';
  description: string;
  priority: 'low' | 'medium' | 'high';
}

const Guards: React.FC = () => {
  const [guardPosts, setGuardPosts] = useState<GuardPost[]>([
    {
      id: '1',
      name: 'البوابة الرئيسية',
      location: 'المدخل الأمامي',
      assignedGuard: 'أحمد الحارس',
      status: 'active',
      lastCheckIn: '2024-01-15 14:30',
      emergencyLevel: 'low',
      notes: 'كل شيء طبيعي'
    },
    {
      id: '2',
      name: 'مخزن المعدات',
      location: 'الطابق الأول - الجناح الشرقي',
      assignedGuard: 'محمد سالم',
      status: 'active',
      lastCheckIn: '2024-01-15 14:15',
      emergencyLevel: 'medium',
      notes: 'يحتاج فحص أنظمة الإنذار'
    },
    {
      id: '3',
      name: 'موقف السيارات',
      location: 'الساحة الخلفية',
      assignedGuard: '',
      status: 'vacant',
      lastCheckIn: '',
      emergencyLevel: 'low',
      notes: 'في انتظار تعيين حارس'
    }
  ]);

  const [guardReports, setGuardReports] = useState<GuardReport[]>([
    {
      id: '1',
      guardName: 'أحمد الحارس',
      postName: 'البوابة الرئيسية',
      timestamp: '2024-01-15 14:30',
      type: 'check-in',
      description: 'تسجيل دخول دوري - كل شيء طبيعي',
      priority: 'low'
    },
    {
      id: '2',
      guardName: 'محمد سالم',
      postName: 'مخزن المعدات',
      timestamp: '2024-01-15 13:45',
      type: 'incident',
      description: 'صوت غريب من نظام التكييف - تم الإبلاغ للصيانة',
      priority: 'medium'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'vacant': return 'bg-red-100 text-red-800 border-red-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'vacant': return 'شاغر';
      case 'maintenance': return 'صيانة';
      default: return 'غير محدد';
    }
  };

  const getEmergencyColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getEmergencyText = (level: string) => {
    switch (level) {
      case 'high': return 'عالي';
      case 'medium': return 'متوسط';
      case 'low': return 'منخفض';
      default: return 'غير محدد';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'check-in': return <CheckCircle className="w-4 h-4" />;
      case 'incident': return <AlertTriangle className="w-4 h-4" />;
      case 'maintenance': return <Edit className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">إدارة الحراسة</h1>
              <p className="text-gray-600">مراقبة وإدارة نقاط الحراسة والتقارير الأمنية</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            إضافة نقطة حراسة
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">النقاط النشطة</p>
              <p className="text-2xl font-bold text-gray-900">
                {guardPosts.filter(post => post.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">النقاط الشاغرة</p>
              <p className="text-2xl font-bold text-gray-900">
                {guardPosts.filter(post => post.status === 'vacant').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Edit className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">تحت الصيانة</p>
              <p className="text-2xl font-bold text-gray-900">
                {guardPosts.filter(post => post.status === 'maintenance').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">التقارير اليوم</p>
              <p className="text-2xl font-bold text-gray-900">{guardReports.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Guard Posts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">نقاط الحراسة</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {guardPosts.map((post) => (
            <div key={post.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{post.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(post.status)}`}>
                      {getStatusText(post.status)}
                    </span>
                    <span className={`text-sm font-medium ${getEmergencyColor(post.emergencyLevel)}`}>
                      مستوى الطوارئ: {getEmergencyText(post.emergencyLevel)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{post.location}</span>
                    </div>
                    {post.assignedGuard && (
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        <span>{post.assignedGuard}</span>
                      </div>
                    )}
                    {post.lastCheckIn && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>آخر تسجيل: {post.lastCheckIn}</span>
                      </div>
                    )}
                  </div>
                  
                  {post.notes && (
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      <strong>ملاحظات:</strong> {post.notes}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => setSelectedPost(post.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">التقارير الأخيرة</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {guardReports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {getTypeIcon(report.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{report.guardName}</h3>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-600">{report.postName}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(report.priority)}`}>
                      {report.priority === 'high' ? 'عالي' : report.priority === 'medium' ? 'متوسط' : 'منخفض'}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{report.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{report.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guards;
