import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Users, DollarSign, TrendingUp, Plus, Edit, Trash2, 
  CheckCircle, XCircle, Clock, Star, MessageSquare, Settings,
  FileText, Image, UserCheck, AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const appointments = [
    {
      id: 1,
      patient: 'Jessica Davis',
      service: 'Laser Hair Removal',
      doctor: 'Dr. Sarah Chen',
      date: '2024-04-15',
      time: '10:00 AM',
      status: 'pending',
      phone: '(416) 555-0123'
    },
    {
      id: 2,
      patient: 'Michael Roberts',
      service: 'Skin Rejuvenation',
      doctor: 'Dr. Michael Rodriguez',
      date: '2024-04-15',
      time: '2:00 PM',
      status: 'confirmed',
      phone: '(416) 555-0124'
    },
    {
      id: 3,
      patient: 'Amanda Lee',
      service: 'Acne Treatment',
      doctor: 'Dr. Emily Watson',
      date: '2024-04-16',
      time: '11:00 AM',
      status: 'pending',
      phone: '(416) 555-0125'
    }
  ];

  const offers = [
    {
      id: 1,
      title: 'New Patient Special',
      discount: '50% OFF',
      service: 'First Laser Hair Removal',
      validUntil: '2024-12-31',
      active: true
    },
    {
      id: 2,
      title: 'Summer Skin Package',
      discount: '30% OFF',
      service: 'Skin Rejuvenation Package',
      validUntil: '2024-08-31',
      active: true
    }
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      specialty: 'Lead Dermatologist',
      experience: '15+ years',
      rating: 4.9,
      patients: 1250,
      status: 'active'
    },
    {
      id: 2,
      name: 'Dr. Michael Rodriguez',
      specialty: 'Senior Dermatologist',
      experience: '12+ years',
      rating: 4.8,
      patients: 980,
      status: 'active'
    }
  ];

  const queries = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@email.com',
      subject: 'Pricing Information',
      message: 'I would like to know about laser hair removal pricing...',
      date: '2024-04-14',
      status: 'pending'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah@email.com',
      subject: 'Appointment Rescheduling',
      message: 'I need to reschedule my appointment due to...',
      date: '2024-04-13',
      status: 'resolved'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: TrendingUp },
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'offers', name: 'Manage Offers', icon: Star },
    { id: 'doctors', name: 'Doctors', icon: UserCheck },
    { id: 'queries', name: 'Customer Queries', icon: MessageSquare },
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}! Manage your clinic operations</p>
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
                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Today's Appointments</p>
                        <p className="text-2xl font-bold text-gray-900">12</p>
                        <p className="text-green-600 text-sm">+2 from yesterday</p>
                      </div>
                      <Calendar className="text-blue-600" size={32} />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Total Patients</p>
                        <p className="text-2xl font-bold text-gray-900">2,847</p>
                        <p className="text-green-600 text-sm">+15 this week</p>
                      </div>
                      <Users className="text-green-600" size={32} />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Monthly Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">$45,200</p>
                        <p className="text-green-600 text-sm">+12% from last month</p>
                      </div>
                      <DollarSign className="text-yellow-600" size={32} />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Pending Queries</p>
                        <p className="text-2xl font-bold text-gray-900">8</p>
                        <p className="text-red-600 text-sm">Needs attention</p>
                      </div>
                      <AlertCircle className="text-red-600" size={32} />
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Appointments</h3>
                    <div className="space-y-3">
                      {appointments.slice(0, 3).map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-semibold text-gray-900">{appointment.patient}</p>
                            <p className="text-sm text-gray-600">{appointment.service}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Active Offers</h3>
                    <div className="space-y-3">
                      {offers.slice(0, 3).map((offer) => (
                        <div key={offer.id} className="p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900">{offer.title}</p>
                              <p className="text-sm text-gray-600">{offer.discount} - {offer.service}</p>
                            </div>
                            <span className="text-green-600 text-sm">Active</span>
                          </div>
                        </div>
                      ))}
                    </div>
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
                  <h2 className="text-2xl font-bold text-gray-900">Appointment Management</h2>
                  <div className="flex space-x-3">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Export
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Add Appointment
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{appointment.patient}</h3>
                          <p className="text-gray-600">{appointment.service}</p>
                          <p className="text-sm text-gray-500">Dr. {appointment.doctor}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{appointment.date} at {appointment.time}</p>
                          <p className="text-sm text-gray-600">{appointment.phone}</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${getStatusColor(appointment.status)}`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        {appointment.status === 'pending' && (
                          <>
                            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                              <CheckCircle size={16} />
                              <span>Confirm</span>
                            </button>
                            <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                              <XCircle size={16} />
                              <span>Decline</span>
                            </button>
                          </>
                        )}
                        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                          <Edit size={16} />
                          <span>Edit</span>
                        </button>
                        <button className="flex items-center space-x-2 text-red-600 hover:text-red-700">
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'offers' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Manage Offers</h2>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                      <Plus size={20} />
                      <span>Create New Offer</span>
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {offers.map((offer) => (
                      <div key={offer.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">{offer.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            offer.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {offer.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <p className="text-2xl font-bold text-blue-600">{offer.discount}</p>
                          <p className="text-gray-600">{offer.service}</p>
                          <p className="text-sm text-gray-500">Valid until: {offer.validUntil}</p>
                        </div>

                        <div className="flex space-x-3">
                          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                            <Edit size={16} />
                            <span>Edit</span>
                          </button>
                          <button className="flex items-center space-x-2 text-red-600 hover:text-red-700">
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                          <button className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                            <Image size={16} />
                            <span>Upload Image</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'doctors' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Doctor Management</h2>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus size={20} />
                    <span>Add Doctor</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <UserCheck className="text-blue-600" size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                            <p className="text-gray-600">{doctor.specialty}</p>
                            <p className="text-sm text-gray-500">{doctor.experience}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-2">
                            <Star className="text-yellow-500 fill-current" size={16} />
                            <span className="font-semibold">{doctor.rating}</span>
                          </div>
                          <p className="text-sm text-gray-600">{doctor.patients} patients</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${getStatusColor(doctor.status)}`}>
                            {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-3 mt-4">
                        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                          <Edit size={16} />
                          <span>Edit Profile</span>
                        </button>
                        <button className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                          <Calendar size={16} />
                          <span>View Schedule</span>
                        </button>
                        <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
                          <FileText size={16} />
                          <span>Performance</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'queries' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Customer Queries</h2>
                  <div className="flex space-x-3">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Mark All Read
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {queries.map((query) => (
                    <div key={query.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{query.name}</h3>
                          <p className="text-gray-600">{query.email}</p>
                          <p className="text-sm text-gray-500">{query.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(query.status)}`}>
                          {query.status.charAt(0).toUpperCase() + query.status.slice(1)}
                        </span>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{query.subject}</h4>
                        <p className="text-gray-600">{query.message}</p>
                      </div>

                      {query.status === 'pending' && (
                        <div className="flex space-x-3">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Reply
                          </button>
                          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                            Mark Resolved
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Clinic Settings</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Name</label>
                          <input
                            type="text"
                            defaultValue="Luminance Clinic"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                          <input
                            type="tel"
                            defaultValue="(416) 555-0123"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Operating Hours</h3>
                      <div className="space-y-3">
                        {[
                          'Monday - Friday: 9:00 AM - 7:00 PM',
                          'Saturday: 10:00 AM - 4:00 PM',
                          'Sunday: Closed'
                        ].map((hours, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span>{hours}</span>
                            <button className="text-blue-600 hover:text-blue-700">Edit</button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Menu</h3>
                      <div className="space-y-2">
                        {[
                          'Laser Hair Removal',
                          'Skin Rejuvenation',
                          'Acne Treatment',
                          'Pigmentation Treatment'
                        ].map((service, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span>{service}</span>
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-700">
                                <Edit size={16} />
                              </button>
                              <button className="text-red-600 hover:text-red-700">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <Plus size={16} />
                        <span>Add Service</span>
                      </button>
                    </div>

                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Save All Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;