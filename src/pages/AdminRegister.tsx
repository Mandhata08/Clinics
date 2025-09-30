import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff, Shield, User, Mail, Lock, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  adminCode: yup.string().required('Admin code is required')
});

type FormData = yup.InferType<typeof schema>;

const AdminRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    setError('');
    
    // Verify admin code (in production, this should be more secure)
    if (data.adminCode !== 'LUMINANCE_ADMIN_2024') {
      setError('Invalid admin code');
      return;
    }

    const result = await registerUser(data.name, data.email, data.password, 'admin');
    
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-gold-50 to-royal-100 flex items-center justify-center py-12 luxury-bg">
      <div className="max-w-md w-full mx-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="royal-card p-8"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-royal-gradient rounded-xl flex items-center justify-center mx-auto mb-4"
            >
              <Shield className="text-white" size={32} />
            </motion.div>
            <h1 className="text-3xl font-bold luxury-text mb-2 font-serif">Admin Registration</h1>
            <p className="text-gray-600 font-elegant">Create administrator account for Luminance Clinic</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">
                Full Name
              </label>
              <div className="relative">
                <input
                  {...register('name')}
                  type="text"
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gold-300'
                  }`}
                  placeholder="Enter your full name"
                />
                <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">
                Email Address
              </label>
              <div className="relative">
                <input
                  {...register('email')}
                  type="email"
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gold-300'
                  }`}
                  placeholder="Enter your email"
                />
                <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-colors ${
                    errors.password ? 'border-red-500' : 'border-gold-300'
                  }`}
                  placeholder="Create a password"
                />
                <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-colors ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gold-300'
                  }`}
                  placeholder="Confirm your password"
                />
                <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">
                Admin Code
              </label>
              <div className="relative">
                <input
                  {...register('adminCode')}
                  type="password"
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-colors ${
                    errors.adminCode ? 'border-red-500' : 'border-gold-300'
                  }`}
                  placeholder="Enter admin code"
                />
                <Crown className="absolute left-4 top-3.5 text-gray-400" size={20} />
              </div>
              {errors.adminCode && (
                <p className="text-red-500 text-sm mt-1">{errors.adminCode.message}</p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full royal-button py-3 text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <Shield size={20} />
                  <span>Create Admin Account</span>
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 p-4 bg-gold-50 rounded-lg border border-gold-200">
            <h4 className="font-semibold text-gold-800 mb-2 font-elegant">Admin Registration</h4>
            <p className="text-gold-700 text-sm font-elegant">
              This page is for authorized personnel only. You need a valid admin code to register as an administrator.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminRegister;