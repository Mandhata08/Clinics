import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Star, CreditCard, FileText, Settings, Bell, ChevronRight, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const appointments = [
    {
      id: 1,
      service: 'Laser Hair Removal',
      doctor: 'Dr. Sarah Chen',
      date: '2024-04-15',
      time: '10:00 AM',
      status: 'confirmed',
      location: 'Room 101'
    },
    {
      id: 2,
      service: 'Skin Rejuvenation',
      doctor: 'Dr. Michael Rodriguez',
      date: '2024-04-22',
      time: '2:00 PM',
      status: 'pending',
      location: 'Room 203'
    },
    {
      id: 3,
      service: 'Follow-up Consultation',
      doctor: 'Dr. Sarah Chen',
      date: '2024-03-28',
      time: '11:00 AM',
      status: 'completed',
      location: 'Room 101'
    }
  ];

  const treatmentHistory = [
    {
      id: 1,
      service: 'Laser Hair Removal - Legs',
      date: '2024-03-15',
      doctor: 'Dr. Sarah Chen',
      status: 'Completed',
      notes: 'Excellent progress, minimal discomfort reported'
    },
    {
      id: 2,
      service: 'Initial Consultation',
      date: '2024-02-28',
      doctor: 'Dr. Sarah Chen',
      status: 'Completed',
      notes: 'Treatment plan established, patient education provided'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'history', name: 'Treatment History', icon: FileText },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Manage your appointments and track your treatment progress</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon size={20} />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Next Appointment</p>
                        <p className="text-2xl font-bold text-gray-900">Apr 15</p>
                        <p className="text-blue-600 text-sm">Laser Hair Removal</p>
                      </div>
                      <Calendar className="text-blue-600" size={32} />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Total Treatments</p>
                        <p className="text-2xl font-bold text-gray-900">8</p>
                        <p className="text-green-600 text-sm">2 Completed</p>
                      </div>
                      <Star className="text-yellow-500" size={32} />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Outstanding Balance</p>
                        <p className="text-2xl font-bold text-gray-900">$450</p>
                        <p className="text-red-600 text-sm">Due Apr 30</p>
                      </div>
                      <CreditCard className="text-red-500" size={32} />
                    </div>
                  </div>
                </div>

                {/* Upcoming Appointments */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                      <Plus size={16} />
                      <span>Book New</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {appointments.filter(apt => apt.status !== 'completed').map((appointment) => (
                      <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Calendar className="text-blue-600" size={20} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{appointment.service}</h3>
                              <p className="text-gray-600">with {appointment.doctor}</p>
                              <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                            <ChevronRight className="text-gray-400" size={20} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'appointments' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus size={20} />
                    <span>Book Appointment</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{appointment.service}</h3>
                          <p className="text-gray-600">Dr. {appointment.doctor}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="text-gray-400" size={16} />
                          <span className="text-gray-600">{appointment.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="text-gray-400" size={16} />
                          <span className="text-gray-600">{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600">{appointment.location}</span>
                        </div>
                      </div>

                      {appointment.status !== 'completed' && (
                        <div className="flex space-x-3">
                          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                            <Edit size={16} />
                            <span>Reschedule</span>
                          </button>
                          <button className="flex items-center space-x-2 text-red-600 hover:text-red-700">
                            <Trash2 size={16} />
                            <span>Cancel</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Treatment History</h2>

                <div className="space-y-6">
                  {treatmentHistory.map((treatment) => (
                    <div key={treatment.id} className="border-l-4 border-blue-500 pl-6 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{treatment.service}</h3>
                        <span className="text-sm text-gray-500">{treatment.date}</span>
                      </div>
                      <p className="text-gray-600 mb-2">Performed by {treatment.doctor}</p>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{treatment.notes}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'billing' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing Overview</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                      <h3 className="font-semibold text-red-800 mb-2">Outstanding Balance</h3>
                      <p className="text-2xl font-bold text-red-600">$450.00</p>
                      <p className="text-sm text-red-600">Due: April 30, 2024</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-2">Total Paid</h3>
                      <p className="text-2xl font-bold text-green-600">$1,200.00</p>
                      <p className="text-sm text-green-600">This year</p>
                    </div>
                  </div>

                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Pay Outstanding Balance
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Invoices</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'INV-001', date: '2024-03-15', amount: '$300.00', status: 'Paid' },
                      { id: 'INV-002', date: '2024-04-01', amount: '$450.00', status: 'Pending' }
                    ].map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-semibold">{invoice.id}</p>
                          <p className="text-sm text-gray-600">{invoice.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{invoice.amount}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {invoice.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          defaultValue={user?.name}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue={user?.email}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
                    <div className="space-y-3">
                      {[
                        'Email reminders for appointments',
                        'SMS notifications',
                        'Treatment progress updates',
                        'Special offers and promotions'
                      ].map((setting, index) => (
                        <label key={index} className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-gray-700">{setting}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;