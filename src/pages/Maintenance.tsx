import React, { useState } from 'react';
import { Wrench, AlertTriangle, CheckCircle, Clock, Plus, Edit, Trash2, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

interface MaintenanceTicket {
  id: string;
  title: string;
  description: string;
  vehicleId: string;
  vehicleName: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  estimatedCost: number;
  actualCost?: number;
  notes: string[];
}

const Maintenance: React.FC = () => {
  const [tickets, setTickets] = useState<MaintenanceTicket[]>([
    {
      id: '1',
      title: 'تسريب في نظام المياه',
      description: 'يوجد تسريب في خزان المياه الرئيسي للعربة رقم 101',
      vehicleId: '101',
      vehicleName: 'عربة إطفاء رقم 101',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'أحمد الميكانيكي',
      createdBy: 'محمد السائق',
      createdAt: '2024-01-15 09:00',
      updatedAt: '2024-01-15 14:30',
      estimatedCost: 500,
      notes: ['تم فحص النظام', 'يحتاج استبدال الخرطوم الرئيسي']
    },
    {
      id: '2',
      title: 'صيانة دورية للمحرك',
      description: 'صيانة دورية شهرية للمحرك وتغيير الزيت والفلاتر',
      vehicleId: '102',
      vehicleName: 'عربة إطفاء رقم 102',
      priority: 'medium',
      status: 'open',
      assignedTo: 'علي الفني',
      createdBy: 'سارة المديرة',
      createdAt: '2024-01-14 16:00',
      updatedAt: '2024-01-14 16:00',
      estimatedCost: 300,
      notes: []
    },
    {
      id: '3',
      title: 'إصلاح نظام الإنذار',
      description: 'نظام الإنذار لا يعمل بشكل صحيح - صوت ضعيف',
      vehicleId: '103',
      vehicleName: 'عربة إطفاء رقم 103',
      priority: 'urgent',
      status: 'completed',
      assignedTo: 'خالد الكهربائي',
      createdBy: 'فاطمة السائقة',
      createdAt: '2024-01-13 11:00',
      updatedAt: '2024-01-14 10:00',
      estimatedCost: 200,
      actualCost: 180,
      notes: ['تم استبدال السماعة', 'تم اختبار النظام بنجاح']
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    vehicleId: '',
    vehicleName: '',
    priority: 'medium' as const,
    assignedTo: '',
    estimatedCost: 0
  });

  const handleAddTicket = () => {
    if (!newTicket.title || !newTicket.description || !newTicket.vehicleName) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const ticket: MaintenanceTicket = {
      id: Date.now().toString(),
      ...newTicket,
      status: 'open',
      createdBy: 'المستخدم الحالي',
      createdAt: new Date().toLocaleString('ar-SA'),
      updatedAt: new Date().toLocaleString('ar-SA'),
      notes: []
    };

    setTickets([...tickets, ticket]);
    setNewTicket({
      title: '',
      description: '',
      vehicleId: '',
      vehicleName: '',
      priority: 'medium',
      assignedTo: '',
      estimatedCost: 0
    });
    setShowAddForm(false);
    toast.success('تم إنشاء تذكرة الصيانة بنجاح');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'عاجل';
      case 'high': return 'عالي';
      case 'medium': return 'متوسط';
      case 'low': return 'منخفض';
      default: return 'غير محدد';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'مفتوحة';
      case 'in-progress': return 'قيد التنفيذ';
      case 'completed': return 'مكتملة';
      case 'cancelled': return 'ملغية';
      default: return 'غير محدد';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertTriangle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <Trash2 className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const statusMatch = filterStatus === 'all' || ticket.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || ticket.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    completed: tickets.filter(t => t.status === 'completed').length,
    urgent: tickets.filter(t => t.priority === 'urgent').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Wrench className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">تذاكر الصيانة</h1>
              <p className="text-gray-600">إدارة ومتابعة طلبات الصيانة والإصلاح</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            إنشاء تذكرة جديدة
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Wrench className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">إجمالي التذاكر</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">مفتوحة</p>
              <p className="text-2xl font-bold text-gray-900">{stats.open}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">قيد التنفيذ</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">مكتملة</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">عاجلة</p>
              <p className="text-2xl font-bold text-gray-900">{stats.urgent}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">تصفية:</span>
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">جميع الحالات</option>
            <option value="open">مفتوحة</option>
            <option value="in-progress">قيد التنفيذ</option>
            <option value="completed">مكتملة</option>
            <option value="cancelled">ملغية</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">جميع الأولويات</option>
            <option value="urgent">عاجل</option>
            <option value="high">عالي</option>
            <option value="medium">متوسط</option>
            <option value="low">منخفض</option>
          </select>
        </div>
      </div>

      {/* Add Ticket Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">إنشاء تذكرة صيانة جديدة</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              ×
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">عنوان المشكلة</label>
              <input
                type="text"
                value={newTicket.title}
                onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="أدخل عنوان المشكلة"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم المركبة</label>
              <input
                type="text"
                value={newTicket.vehicleName}
                onChange={(e) => setNewTicket({ ...newTicket, vehicleName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="أدخل اسم المركبة"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الأولوية</label>
              <select
                value={newTicket.priority}
                onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">منخفض</option>
                <option value="medium">متوسط</option>
                <option value="high">عالي</option>
                <option value="urgent">عاجل</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المُكلف بالإصلاح</label>
              <input
                type="text"
                value={newTicket.assignedTo}
                onChange={(e) => setNewTicket({ ...newTicket, assignedTo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="أدخل اسم المُكلف"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">التكلفة المتوقعة (ريال)</label>
              <input
                type="number"
                value={newTicket.estimatedCost}
                onChange={(e) => setNewTicket({ ...newTicket, estimatedCost: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">وصف المشكلة</label>
              <textarea
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="اكتب وصفاً تفصيلياً للمشكلة"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              onClick={handleAddTicket}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              إنشاء التذكرة
            </button>
          </div>
        </div>
      )}

      {/* Tickets List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            تذاكر الصيانة ({filteredTickets.length})
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredTickets.map((ticket) => (
            <div key={ticket.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(ticket.priority)}`}>
                      {getPriorityText(ticket.priority)}
                    </span>
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(ticket.status)}`}>
                      {getStatusIcon(ticket.status)}
                      {getStatusText(ticket.status)}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{ticket.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                    <div>
                      <strong>المركبة:</strong> {ticket.vehicleName}
                    </div>
                    <div>
                      <strong>المُكلف:</strong> {ticket.assignedTo}
                    </div>
                    <div>
                      <strong>التكلفة المتوقعة:</strong> {ticket.estimatedCost} ريال
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>أنشئت بواسطة: {ticket.createdBy}</span>
                    <span>•</span>
                    <span>{ticket.createdAt}</span>
                    {ticket.updatedAt !== ticket.createdAt && (
                      <>
                        <span>•</span>
                        <span>آخر تحديث: {ticket.updatedAt}</span>
                      </>
                    )}
                  </div>
                  
                  {ticket.notes.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">ملاحظات:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {ticket.notes.map((note, index) => (
                          <li key={index}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
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
    </div>
  );
};

export default Maintenance;
