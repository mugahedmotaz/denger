import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const DebugInfo: React.FC = () => {
  const { user, isLoading } = useAuth();

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white rounded-xl shadow border border-gray-200 text-right">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">معلومات المستخدم الحالية (Debug)</h2>
      {isLoading ? (
        <div className="text-gray-500">جاري التحميل...</div>
      ) : user ? (
        <>
          <pre className="bg-gray-50 p-4 rounded text-sm text-gray-800 overflow-x-auto border border-gray-100 mb-4">
            {JSON.stringify(user, null, 2)}
          </pre>
          {!["manager","driver","firefighter","guard"].includes(user.role) && (
            <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded p-3 mt-2">
              ⚠️ الدور الحالي (<b>{user.role}</b>) غير مدعوم أو غير متوقع.<br/>
              لن تتمكن من تصفح الصفحات، وسيتم إعادتك للصفحة الرئيسية.<br/>
              <span className="text-xs">يرجى التأكد من أن الدور مطابق تمامًا لأحد القيم التالية: manager, driver, firefighter, guard</span>
            </div>
          )}
        </>
      ) : (
        <div className="text-red-500">لا يوجد مستخدم مسجل دخول حالياً.</div>
      )}
    </div>
  );
};

export default DebugInfo;
