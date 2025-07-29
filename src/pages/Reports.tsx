import React, { useState } from 'react';
import { BarChart3, TrendingUp, Download, Calendar, FileText, PieChart, Activity } from 'lucide-react';
import toast from 'react-hot-toast';

interface ReportData {
  id: string;
  title: string;
  type: 'vehicle' | 'personnel' | 'maintenance' | 'incidents';
  period: string;
  data: any;
  generatedAt: string;
}

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [reports] = useState<ReportData[]>([
    {
      id: '1',
      title: 'تقرير أداء المركبات',
      type: 'vehicle',
      period: 'شهري',
      data: { totalVehicles: 15, activeVehicles: 12, maintenanceVehicles: 3 },
      generatedAt: '2024-01-15 10:30'
    },
    {
      id: '2',
      title: 'تقرير الأفراد والورديات',
      type: 'personnel',
      period: 'أسبوعي',
      data: { totalPersonnel: 45, activeShifts: 8, completedShifts: 32 },
      generatedAt: '2024-01-14 16:00'
    },
    {
      id: '3',
      title: 'تقرير الصيانة والإصلاحات',
      type: 'maintenance',
      period: 'شهري',
      data: { totalTickets: 28, completedTickets: 22, pendingTickets: 6 },
      generatedAt: '2024-01-13 09:15'
    }
  ]);

  // Mock data for charts
  const vehicleStats = {
    total: 15,
    active: 12,
    maintenance: 3,
    efficiency: 85
  };

  const personnelStats = {
    total: 45,
    onDuty: 18,
    offDuty: 27,
    attendance: 92
  };

  const maintenanceStats = {
    totalCost: 15000,
    completedJobs: 22,
    pendingJobs: 6,
    avgResponseTime: 4.2
  };

  const incidentStats = {
    totalIncidents: 8,
    resolved: 6,
    pending: 2,
    responseTime: 12.5
  };

  const monthlyData = [
    { month: 'يناير', incidents: 12, maintenance: 8, personnel: 45 },
    { month: 'فبراير', incidents: 15, maintenance: 12, personnel: 47 },
    { month: 'مارس', incidents: 9, maintenance: 6, personnel: 44 },
    { month: 'أبريل', incidents: 18, maintenance: 15, personnel: 48 },
    { month: 'مايو', incidents: 11, maintenance: 9, personnel: 46 },
    { month: 'يونيو', incidents: 14, maintenance: 11, personnel: 49 }
  ];

  const handleGenerateReport = (type: string) => {
    toast.success(`تم إنشاء تقرير ${type} بنجاح`);
  };

  const handleDownloadReport = () => {
    toast.success('تم تحميل التقرير بنجاح');
  };

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'vehicle': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'personnel': return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'incidents': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getReportTypeText = (type: string) => {
    switch (type) {
      case 'vehicle': return 'المركبات';
      case 'personnel': return 'الأفراد';
      case 'maintenance': return 'الصيانة';
      case 'incidents': return 'الحوادث';
      default: return 'عام';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">التقارير والتحليلات</h1>
              <p className="text-gray-600">تحليل البيانات وإنشاء التقارير التفصيلية</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="week">أسبوعي</option>
              <option value="month">شهري</option>
              <option value="quarter">ربع سنوي</option>
              <option value="year">سنوي</option>
            </select>
            <button
              onClick={() => handleGenerateReport('شامل')}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FileText className="w-5 h-5" />
              إنشاء تقرير شامل
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">المركبات النشطة</p>
              <p className="text-2xl font-bold text-gray-900">{vehicleStats.active}</p>
              <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4" />
                {vehicleStats.efficiency}% كفاءة
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">الأفراد في الخدمة</p>
              <p className="text-2xl font-bold text-gray-900">{personnelStats.onDuty}</p>
              <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4" />
                {personnelStats.attendance}% حضور
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">تكلفة الصيانة</p>
              <p className="text-2xl font-bold text-gray-900">{maintenanceStats.totalCost.toLocaleString()}</p>
              <p className="text-sm text-blue-600 flex items-center gap-1 mt-1">
                <Activity className="w-4 h-4" />
                {maintenanceStats.avgResponseTime} ساعة متوسط
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Activity className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">الحوادث المحلولة</p>
              <p className="text-2xl font-bold text-gray-900">{incidentStats.resolved}</p>
              <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4" />
                {incidentStats.responseTime} دقيقة استجابة
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Activity className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">الاتجاهات الشهرية</h3>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          
          <div className="space-y-4">
            {monthlyData.slice(-3).map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{data.month}</span>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>حوادث: {data.incidents}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>صيانة: {data.maintenance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>أفراد: {data.personnel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">نظرة عامة على الأداء</h3>
            <PieChart className="w-5 h-5 text-blue-600" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">كفاءة المركبات</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full">
                  <div className="w-[85%] h-2 bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-900">85%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">حضور الأفراد</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full">
                  <div className="w-[92%] h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-900">92%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">معدل حل الحوادث</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full">
                  <div className="w-[75%] h-2 bg-red-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-900">75%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">كفاءة الصيانة</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full">
                  <div className="w-[78%] h-2 bg-yellow-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-900">78%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Report Generation */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">إنشاء تقارير سريعة</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => handleGenerateReport('المركبات')}
            className="flex flex-col items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            <div className="p-3 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <span className="font-medium text-gray-900">تقرير المركبات</span>
            <span className="text-sm text-gray-600 text-center">حالة وأداء جميع المركبات</span>
          </button>

          <button
            onClick={() => handleGenerateReport('الأفراد')}
            className="flex flex-col items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors"
          >
            <div className="p-3 bg-green-100 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <span className="font-medium text-gray-900">تقرير الأفراد</span>
            <span className="text-sm text-gray-600 text-center">الحضور والورديات والأداء</span>
          </button>

          <button
            onClick={() => handleGenerateReport('الصيانة')}
            className="flex flex-col items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-yellow-50 hover:border-yellow-300 transition-colors"
          >
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Activity className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="font-medium text-gray-900">تقرير الصيانة</span>
            <span className="text-sm text-gray-600 text-center">التكاليف والمدة والكفاءة</span>
          </button>

          <button
            onClick={() => handleGenerateReport('الحوادث')}
            className="flex flex-col items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
          >
            <div className="p-3 bg-red-100 rounded-lg">
              <Activity className="w-6 h-6 text-red-600" />
            </div>
            <span className="font-medium text-gray-900">تقرير الحوادث</span>
            <span className="text-sm text-gray-600 text-center">الاستجابة والحلول والوقاية</span>
          </button>
        </div>
      </div>

      {/* Generated Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">التقارير المُنشأة</h3>
            <div className="flex items-center gap-3">
              <select
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">جميع التقارير</option>
                <option value="vehicle">المركبات</option>
                <option value="personnel">الأفراد</option>
                <option value="maintenance">الصيانة</option>
                <option value="incidents">الحوادث</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {reports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{report.title}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getReportTypeColor(report.type)}`}>
                      {getReportTypeText(report.type)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>الفترة: {report.period}</span>
                    </div>
                    <span>•</span>
                    <span>تم الإنشاء: {report.generatedAt}</span>
                  </div>
                  
                  <div className="text-sm text-gray-700">
                    {report.type === 'vehicle' && (
                      <span>إجمالي المركبات: {report.data.totalVehicles} | النشطة: {report.data.activeVehicles} | الصيانة: {report.data.maintenanceVehicles}</span>
                    )}
                    {report.type === 'personnel' && (
                      <span>إجمالي الأفراد: {report.data.totalPersonnel} | الورديات النشطة: {report.data.activeShifts} | المكتملة: {report.data.completedShifts}</span>
                    )}
                    {report.type === 'maintenance' && (
                      <span>إجمالي التذاكر: {report.data.totalTickets} | المكتملة: {report.data.completedTickets} | المعلقة: {report.data.pendingTickets}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={handleDownloadReport}
                    className="flex items-center gap-2 px-3 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    تحميل
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

export default Reports;
