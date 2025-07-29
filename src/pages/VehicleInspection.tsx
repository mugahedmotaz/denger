import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, Play, StopCircle, Send, ArrowRight } from 'lucide-react';
import { mockVehicles, vehicleInspectionItems } from '../data/mockData';
import { InspectionItem } from '../types';
import toast from 'react-hot-toast';

const VehicleInspection: React.FC = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const navigate = useNavigate();
  const vehicle = mockVehicles.find(v => v.id === vehicleId);

  const [inspectionItems, setInspectionItems] = useState<InspectionItem[]>(
    vehicleInspectionItems.map(item => ({
      ...item,
      status: 'pending' as const,
      notes: ''
    }))
  );

  const [engineTestRunning, setEngineTestRunning] = useState(false);
  const [engineTestDuration, setEngineTestDuration] = useState(0);
  const [engineTestInterval, setEngineTestInterval] = useState<NodeJS.Timeout | null>(null);
  const [generalNotes, setGeneralNotes] = useState('');

  React.useEffect(() => {
    if (!vehicle) {
      toast.error('العربة غير موجودة');
      navigate('/vehicles');
    }
  }, [vehicle, navigate]);

  React.useEffect(() => {
    return () => {
      if (engineTestInterval) {
        clearInterval(engineTestInterval);
      }
    };
  }, [engineTestInterval]);

  if (!vehicle) {
    return null;
  }

  const handleItemStatusChange = (itemId: string, status: 'pass' | 'fail') => {
    setInspectionItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, status } : item
    ));
  };

  const handleItemNotesChange = (itemId: string, notes: string) => {
    setInspectionItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, notes } : item
    ));
  };

  const startEngineTest = () => {
    if (engineTestRunning) return;

    setEngineTestRunning(true);
    setEngineTestDuration(0);

    const interval = setInterval(() => {
      setEngineTestDuration(prev => prev + 1);
    }, 1000);

    setEngineTestInterval(interval);
    toast.success('تم بدء اختبار المحرك');
  };

  const stopEngineTest = () => {
    if (!engineTestRunning || !engineTestInterval) return;

    clearInterval(engineTestInterval);
    setEngineTestInterval(null);
    setEngineTestRunning(false);
    toast.info(`تم إيقاف اختبار المحرك - المدة: ${Math.floor(engineTestDuration / 60)}:${(engineTestDuration % 60).toString().padStart(2, '0')}`);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getOverallStatus = () => {
    const completedItems = inspectionItems.filter(item => item.status !== 'pending');
    const failedItems = inspectionItems.filter(item => item.status === 'fail');
    const requiredItems = inspectionItems.filter(item => item.isRequired);
    const completedRequiredItems = requiredItems.filter(item => item.status !== 'pending');

    if (completedRequiredItems.length < requiredItems.length) {
      return 'pending';
    }

    return failedItems.length > 0 ? 'fail' : 'pass';
  };

  const handleSubmitReport = () => {
    const overallStatus = getOverallStatus();
    
    if (overallStatus === 'pending') {
      toast.error('يجب إكمال فحص جميع العناصر المطلوبة');
      return;
    }

    // Here you would send the inspection data to the backend
    const inspectionData = {
      vehicleId: vehicle.id,
      items: inspectionItems,
      engineTestDuration,
      overallStatus,
      generalNotes,
      timestamp: new Date().toISOString()
    };

    console.log('Submitting inspection:', inspectionData);
    
    toast.success('تم إرسال تقرير الفحص بنجاح');
    
    // Automatically redirect to equipment inspection
    setTimeout(() => {
      navigate(`/inspection/equipment/${vehicleId}`);
    }, 2000);
  };

  const getStatusIcon = (status: 'pass' | 'fail' | 'pending') => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: 'pass' | 'fail' | 'pending') => {
    switch (status) {
      case 'pass':
        return 'bg-green-50 border-green-200';
      case 'fail':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const pendingCount = inspectionItems.filter(item => item.status === 'pending').length;
  const passCount = inspectionItems.filter(item => item.status === 'pass').length;
  const failCount = inspectionItems.filter(item => item.status === 'fail').length;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-blue-100/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              onClick={() => navigate('/vehicles')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">فحص العربة رقم {vehicle.number}</h1>
              <p className="text-gray-600">فحص شامل لجميع أجزاء العربة قبل الخروج</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <img 
              src={vehicle.image} 
              alt={`عربة ${vehicle.number}`}
              className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
            />
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">المعلق</p>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
            </div>
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">نجح</p>
              <p className="text-2xl font-bold text-green-900">{passCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600">فشل</p>
              <p className="text-2xl font-bold text-red-900">{failCount}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">اختبار المحرك</p>
              <p className="text-xl font-bold text-blue-900">{formatDuration(engineTestDuration)}</p>
            </div>
            <div className="flex space-x-2 space-x-reverse">
              {!engineTestRunning ? (
                <button
                  onClick={startEngineTest}
                  className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
                >
                  <Play className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={stopEngineTest}
                  className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                >
                  <StopCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Inspection Items */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">عناصر الفحص</h2>
          <p className="text-sm text-gray-600 mt-1">
            فحص جميع العناصر وتسجيل أي ملاحظات ضرورية
          </p>
        </div>
        
        <div className="p-6 space-y-4">
          {inspectionItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg border-2 transition-all ${getStatusColor(item.status)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  {getStatusIcon(item.status)}
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {item.name}
                      {item.isRequired && <span className="text-red-500 mr-1">*</span>}
                    </h3>
                    <p className="text-sm text-gray-600">{item.category}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2 space-x-reverse">
                  <button
                    onClick={() => handleItemStatusChange(item.id, 'pass')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      item.status === 'pass'
                        ? 'bg-green-600 text-white'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    نجح
                  </button>
                  <button
                    onClick={() => handleItemStatusChange(item.id, 'fail')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      item.status === 'fail'
                        ? 'bg-red-600 text-white'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    فشل
                  </button>
                </div>
              </div>
              
              {(item.status === 'fail' || item.notes) && (
                <div className="mt-3">
                  <textarea
                    value={item.notes || ''}
                    onChange={(e) => handleItemNotesChange(item.id, e.target.value)}
                    placeholder="ملاحظات (مطلوبة في حالة الفشل)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows={2}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* General Notes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ملاحظات عامة</h3>
        <textarea
          value={generalNotes}
          onChange={(e) => setGeneralNotes(e.target.value)}
          placeholder="أضف أي ملاحظات عامة حول حالة العربة..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows={4}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmitReport}
          disabled={getOverallStatus() === 'pending'}
          className="flex items-center space-x-2 space-x-reverse px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
          <span>إرسال التقرير والانتقال لفحص المعدات</span>
        </button>
      </div>
    </div>
  );
};

export default VehicleInspection;