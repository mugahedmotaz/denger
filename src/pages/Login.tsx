import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('يرجى إدخال اسم المستخدم وكلمة المرور');
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        toast.success('تم تسجيل الدخول بنجاح');
        navigate('/dashboard');
      } else {
        toast.error('اسم المستخدم أو كلمة المرور غير صحيحة');
      }
    } catch (error) {
      toast.error('حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
    <div className="max-w-md w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-7xl mb-4 drop-shadow-lg select-none">d92</div>
        <h1 className="text-4xl font-extrabold text-white mb-3 tracking-wide drop-shadow-xl">
          نظام إدارة الإطفاء
        </h1>
        <p className="text-blue-100 text-lg font-medium drop-shadow">
          تسجيل الدخول إلى النظام
        </p>
      </div>
      {/* Login Form */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-blue-100/30">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="username" className="block text-base font-bold text-blue-900 mb-2">
              اسم المستخدم
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-blue-50 text-blue-900 placeholder-blue-400 text-lg shadow-inner"
              placeholder="أدخل اسم المستخدم"
              required
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-base font-bold text-blue-900 mb-2">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-blue-50 text-blue-900 placeholder-blue-400 text-lg shadow-inner pr-14"
                placeholder="أدخل كلمة المرور"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-700 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-l from-blue-700 via-blue-600 to-blue-500 text-white py-3 px-4 rounded-xl font-bold text-lg shadow-lg hover:from-blue-800 hover:to-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <LogIn className="w-6 h-6" />
                <span>تسجيل الدخول</span>
              </>
            )}
          </button>
          <div className="flex justify-between items-center mt-2">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium">
              نسيت كلمة المرور؟
            </a>
          </div>
        </form>
        {/* Demo Accounts */}
        <div className="mt-8 p-5 bg-blue-50/70 rounded-xl border border-blue-100/30 shadow-inner">
          <h3 className="text-base font-bold text-blue-900 mb-3">
            حسابات تجريبية:
          </h3>
          <div className="space-y-2 text-sm text-blue-800">
            <div>مدير: manager1 / password</div>
            <div>سائق: driver1 / password</div>
            <div>رجل إطفاء: firefighter1 / password</div>
            <div>حارس: guard1 / password</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
export default Login;