import React, { useState } from 'react';
import { Calendar, Clock, Users, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  date: string;
  assignedPersonnel: string[];
  status: 'scheduled' | 'active' | 'completed';
}

const Shifts: React.FC = () => {
  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: '1',
      name: 'وردية الصباح',
      startTime: '08:00',
      endTime: '16:00',
      date: '2024-01-15',
      assignedPersonnel: ['أحمد محمد', 'سارة أحمد', 'محمد علي'],
      status: 'scheduled'
    },
    {
      id: '2',
      name: 'وردية المساء',
      startTime: '16:00',
      endTime: '00:00',
      date: '2024-01-15',
      assignedPersonnel: ['علي حسن', 'فاطمة سالم'],
      status: 'active'
    },
    {
      id: '3',
      name: 'وردية الليل',
      startTime: '00:00',
      endTime: '08:00',
      date: '2024-01-16',
      assignedPersonnel: ['خالد عبدالله', 'نور الدين'],
      status: 'completed'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingShift, setEditingShift] = useState<string | null>(null);
  const [newShift, setNewShift] = useState({
    name: '',
    startTime: '',
    endTime: '',
    date: '',
    assignedPersonnel: [] as string[]
  });

  const handleAddShift = () => {
    if (!newShift.name || !newShift.startTime || !newShift.endTime || !newShift.date) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const shift: Shift = {
      id: Date.now().toString(),
      ...newShift,
      status: 'scheduled'
    };

    setShifts([...shifts, shift]);
    setNewShift({ name: '', startTime: '', endTime: '', date: '', assignedPersonnel: [] });
    setShowAddForm(false);
    toast.success('تم إضافة الوردية بنجاح');
  };

  const handleDeleteShift = (id: string) => {
    setShifts(shifts.filter(shift => shift.id !== id));
    toast.success('تم حذف الوردية بنجاح');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return 'مجدولة';
      case 'active': return 'نشطة';
      case 'completed': return 'مكتملة';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">جدولة الورديات</h1>
              <p className="text-gray-600">إدارة وتنظيم ورديات العمل</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            إضافة وردية جديدة
          </button>
        </div>
      </div>

      {/* Add Shift Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">إضافة وردية جديدة</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم الوردية</label>
              <input
                type="text"
                value={newShift.name}
                onChange={(e) => setNewShift({ ...newShift, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="أدخل اسم الوردية"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">التاريخ</label>
              <input
                type="date"
                value={newShift.date}
                onChange={(e) => setNewShift({ ...newShift, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">وقت البداية</label>
              <input
                type="time"
                value={newShift.startTime}
                onChange={(e) => setNewShift({ ...newShift, startTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">وقت النهاية</label>
              <input
                type="time"
                value={newShift.endTime}
                onChange={(e) => setNewShift({ ...newShift, endTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              onClick={handleAddShift}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Save className="w-4 h-4" />
              حفظ الوردية
            </button>
          </div>
        </div>
      )}

      {/* Shifts List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">الورديات المجدولة</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {shifts.map((shift) => (
            <div key={shift.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{shift.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(shift.status)}`}>
                      {getStatusText(shift.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{shift.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{shift.startTime} - {shift.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{shift.assignedPersonnel.length} أفراد مُعينين</span>
                    </div>
                  </div>
                  
                  {shift.assignedPersonnel.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">الأفراد المُعينين:</p>
                      <div className="flex flex-wrap gap-2">
                        {shift.assignedPersonnel.map((person, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                            {person}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => setEditingShift(shift.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteShift(shift.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
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

export default Shifts;
