import React, { useState } from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Users, DollarSign, TrendingUp, Plus, Edit, Trash2, 
  CheckCircle, XCircle, Clock, Star, MessageSquare, Settings,
  FileText, Image, UserCheck, AlertCircle, Crown, Upload
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, type Offer, type Appointment } from '../lib/supabase';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [offers, setOffers] = useState<Offer[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [offersResponse, appointmentsResponse] = await Promise.all([
        supabase.from('offers').select('*').order('created_at', { ascending: false }),
        supabase.from('appointments').select('*').order('created_at', { ascending: false })
      ]);

      if (offersResponse.error) throw offersResponse.error;
      if (appointmentsResponse.error) throw appointmentsResponse.error;

      setOffers(offersResponse.data || []);
      setAppointments(appointmentsResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOffer = async (offerData: Partial<Offer>) => {
    try {
      const { error } = await supabase
        .from('offers')
        .insert([offerData]);

      if (error) throw error;
      fetchData();
      setShowOfferModal(false);
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  const handleUpdateOffer = async (id: string, updates: Partial<Offer>) => {
    try {
      const { error } = await supabase
        .from('offers')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      fetchData();
      setEditingOffer(null);
    } catch (error) {
      console.error('Error updating offer:', error);
    }
  };

  const handleDeleteOffer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('offers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  const handleUpdateAppointmentStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

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
    <div className="pt-20 min-h-screen bg-cream-50 luxury-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <Crown className="text-royal-600 mr-3" size={32} />
            <h1 className="text-4xl font-bold luxury-text font-serif">Royal Admin Dashboard</h1>
          </div>
          <p className="text-gray-700 font-elegant">Welcome back, {user?.name}! Manage your royal clinic operations</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="royal-card p-6"
            >
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-royal-50 text-royal-600 border-r-2 border-royal-600'
                        : 'text-gray-700 hover:bg-gold-50 font-elegant'
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
                  <div className="royal-card p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-elegant">Today's Appointments</p>
                        <p className="text-2xl font-bold luxury-text font-serif">{appointments.filter(apt => apt.status === 'confirmed').length}</p>
                        <p className="text-green-600 text-sm font-elegant">Active bookings</p>
                      </div>
                      <Calendar className="text-royal-600" size={32} />
                    </div>
                  </div>

                  <div className="royal-card p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-elegant">Total Appointments</p>
                        <p className="text-2xl font-bold luxury-text font-serif">{appointments.length}</p>
                        <p className="text-green-600 text-sm font-elegant">All time</p>
                      </div>
                      <Users className="text-gold-600" size={32} />
                    </div>
                  </div>

                  <div className="royal-card p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-elegant">Active Offers</p>
                        <p className="text-2xl font-bold luxury-text font-serif">{offers.filter(offer => offer.active).length}</p>
                        <p className="text-green-600 text-sm font-elegant">Live promotions</p>
                      </div>
                      <Star className="text-gold-600" size={32} />
                    </div>
                  </div>

                  <div className="royal-card p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-elegant">Pending Requests</p>
                        <p className="text-2xl font-bold luxury-text font-serif">{appointments.filter(apt => apt.status === 'pending').length}</p>
                        <p className="text-red-600 text-sm font-elegant">Needs attention</p>
                      </div>
                      <AlertCircle className="text-red-600" size={32} />
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="royal-card p-6">
                    <h3 className="text-xl font-bold luxury-text mb-4 font-serif">Recent Appointments</h3>
                    <div className="space-y-3">
                      {appointments.slice(0, 3).map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-3 bg-cream-50 rounded-lg">
                          <div>
                            <p className="font-semibold text-gray-900 font-elegant">{appointment.patient_name}</p>
                            <p className="text-sm text-gray-600 font-elegant">{appointment.service}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="royal-card p-6">
                    <h3 className="text-xl font-bold luxury-text mb-4 font-serif">Active Offers</h3>
                    <div className="space-y-3">
                      {offers.slice(0, 3).map((offer) => (
                        <div key={offer.id} className="p-3 bg-royal-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900 font-elegant">{offer.title}</p>
                              <p className="text-sm text-gray-600 font-elegant">{offer.discount} - {offer.service}</p>
                            </div>
                            <span className="text-green-600 text-sm font-elegant">Active</span>
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
                className="royal-card p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold luxury-text font-serif">Royal Appointment Management</h2>
                  <div className="flex space-x-3">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-elegant">
                      Export
                    </button>
                    <button className="royal-button">
                      Add Appointment
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="border border-gold-200 rounded-lg p-6 bg-white/50">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 font-elegant">{appointment.patient_name}</h3>
                          <p className="text-gray-600 font-elegant">{appointment.service}</p>
                          <p className="text-sm text-gray-500 font-elegant">{appointment.doctor}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold font-elegant">{appointment.preferred_date} at {appointment.preferred_time}</p>
                          <p className="text-sm text-gray-600 font-elegant">{appointment.patient_phone}</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${getStatusColor(appointment.status)}`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        {appointment.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleUpdateAppointmentStatus(appointment.id, 'confirmed')}
                              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-elegant"
                            >
                              <CheckCircle size={16} />
                              <span>Confirm</span>
                            </button>
                            <button 
                              onClick={() => handleUpdateAppointmentStatus(appointment.id, 'cancelled')}
                              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-elegant"
                            >
                              <XCircle size={16} />
                              <span>Decline</span>
                            </button>
                          </>
                        )}
                        <button className="flex items-center space-x-2 text-royal-600 hover:text-royal-700 font-elegant">
                          <Edit size={16} />
                          <span>Edit</span>
                        </button>
                        <button className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-elegant">
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
                <div className="royal-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold luxury-text font-serif">Manage Royal Offers</h2>
                    <button 
                      onClick={() => setShowOfferModal(true)}
                      className="royal-button flex items-center space-x-2"
                    >
                      <Plus size={20} />
                      <span>Create Royal Offer</span>
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {offers.map((offer) => (
                      <div key={offer.id} className="border border-gold-200 rounded-lg p-6 bg-white/50">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold luxury-text font-elegant">{offer.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            offer.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {offer.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <p className="text-2xl font-bold luxury-text font-serif">{offer.discount}</p>
                          <p className="text-gray-700 font-elegant">{offer.service}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-green-600 font-serif">{formatPrice(offer.sale_price)}</span>
                            <span className="text-sm text-gray-500 line-through font-elegant">{formatPrice(offer.original_price)}</span>
                          </div>
                          <p className="text-sm text-gray-500 font-elegant">Valid until: {new Date(offer.valid_until).toLocaleDateString()}</p>
                        </div>

                        <div className="flex space-x-3">
                          <button 
                            onClick={() => setEditingOffer(offer)}
                            className="flex items-center space-x-2 text-royal-600 hover:text-royal-700 font-elegant"
                          >
                            <Edit size={16} />
                            <span>Edit</span>
                          </button>
                          <button 
                            onClick={() => handleDeleteOffer(offer.id)}
                            className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-elegant"
                          >
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                          <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-elegant">
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
                className="royal-card p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold luxury-text font-serif">Royal Doctor Management</h2>
                  <button className="royal-button flex items-center space-x-2">
                    <Plus size={20} />
                    <span>Add Doctor</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="border border-gold-200 rounded-lg p-6 bg-white/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-royal-100 rounded-full flex items-center justify-center">
                            <Crown className="text-royal-600" size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold luxury-text font-elegant">{doctor.name}</h3>
                            <p className="text-gray-700 font-elegant">{doctor.specialty}</p>
                            <p className="text-sm text-gray-600 font-elegant">{doctor.experience}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-2">
                            <Star className="text-gold-500 fill-current" size={16} />
                            <span className="font-semibold font-elegant">{doctor.rating}</span>
                          </div>
                          <p className="text-sm text-gray-600 font-elegant">{doctor.patients} patients</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${getStatusColor(doctor.status)}`}>
                            {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-3 mt-4">
                        <button className="flex items-center space-x-2 text-royal-600 hover:text-royal-700 font-elegant">
                          <Edit size={16} />
                          <span>Edit Profile</span>
                        </button>
                        <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-elegant">
                          <Calendar size={16} />
                          <span>View Schedule</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gold-600 hover:text-gold-700 font-elegant">
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
                className="royal-card p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold luxury-text font-serif">Royal Customer Queries</h2>
                  <div className="flex space-x-3">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-elegant">
                      Mark All Read
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {queries.map((query) => (
                    <div key={query.id} className="border border-gold-200 rounded-lg p-6 bg-white/50">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 font-elegant">{query.name}</h3>
                          <p className="text-gray-600 font-elegant">{query.email}</p>
                          <p className="text-sm text-gray-500 font-elegant">{query.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(query.status)}`}>
                          {query.status.charAt(0).toUpperCase() + query.status.slice(1)}
                        </span>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2 font-elegant">{query.subject}</h4>
                        <p className="text-gray-700 font-elegant">{query.message}</p>
                      </div>

                      {query.status === 'pending' && (
                        <div className="flex space-x-3">
                          <button className="royal-button">
                            Reply
                          </button>
                          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-elegant">
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
                <div className="royal-card p-6">
                  <h2 className="text-2xl font-bold luxury-text mb-6 font-serif">Royal Clinic Settings</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold luxury-text mb-4 font-elegant">Business Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">Clinic Name</label>
                          <input
                            type="text"
                            defaultValue="Luminance Clinic"
                            className="w-full px-4 py-2 border border-gold-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-transparent font-elegant"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">Phone</label>
                          <input
                            type="tel"
                            defaultValue="+91 98765 43210"
                            className="w-full px-4 py-2 border border-gold-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-transparent font-elegant"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold luxury-text mb-4 font-elegant">Royal Operating Hours</h3>
                      <div className="space-y-3">
                        {[
                          'Monday - Friday: 10:00 AM - 8:00 PM',
                          'Saturday: 10:00 AM - 6:00 PM',
                          'Sunday: Closed'
                        ].map((hours, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-cream-50 rounded-lg">
                            <span className="font-elegant">{hours}</span>
                            <button className="text-royal-600 hover:text-royal-700 font-elegant">Edit</button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold luxury-text mb-4 font-elegant">Royal Services Menu</h3>
                      <div className="space-y-2">
                        {[
                          'Royal Hair Removal',
                          'Golden Skin Revival',
                          'Diamond Clarity Treatment',
                          'Platinum Pigmentation Therapy'
                        ].map((service, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-cream-50 rounded-lg">
                            <span className="font-elegant">{service}</span>
                            <div className="flex space-x-2">
                              <button className="text-royal-600 hover:text-royal-700">
                                <Edit size={16} />
                              </button>
                              <button className="text-red-600 hover:text-red-700">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="mt-4 royal-button flex items-center space-x-2">
                        <Plus size={16} />
                        <span>Add Service</span>
                      </button>
                    </div>

                    <button className="royal-button">
                      Save All Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="royal-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-2xl font-bold luxury-text mb-6 font-serif">Create Royal Offer</h3>
            <OfferForm 
              onSubmit={handleCreateOffer}
              onCancel={() => setShowOfferModal(false)}
            />
          </div>
        </div>
      )}

      {/* Edit Offer Modal */}
      {editingOffer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="royal-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-2xl font-bold luxury-text mb-6 font-serif">Edit Royal Offer</h3>
            <OfferForm 
              offer={editingOffer}
              onSubmit={(data) => handleUpdateOffer(editingOffer.id, data)}
              onCancel={() => setEditingOffer(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Offer Form Component
const OfferForm: React.FC<{
  offer?: Offer;
  onSubmit: (data: Partial<Offer>) => void;
  onCancel: () => void;
}> = ({ offer, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: offer?.title || '',
    discount: offer?.discount || '',
    original_price: offer?.original_price || 0,
    sale_price: offer?.sale_price || 0,
    service: offer?.service || '',
    description: offer?.description || '',
    valid_until: offer?.valid_until || '',
    terms: offer?.terms || [],
    popular: offer?.popular || false,
    color: offer?.color || 'royal',
    image_url: offer?.image_url || '',
    active: offer?.active !== undefined ? offer.active : true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gold-300 rounded-lg focus:ring-2 focus:ring-royal-500 font-elegant"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">Discount</label>
          <input
            type="text"
            value={formData.discount}
            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
            className="w-full px-4 py-2 border border-gold-300 rounded-lg focus:ring-2 focus:ring-royal-500 font-elegant"
            placeholder="e.g., 50% OFF"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">Original Price (₹)</label>
          <input
            type="number"
            value={formData.original_price}
            onChange={(e) => setFormData({ ...formData, original_price: Number(e.target.value) })}
            className="w-full px-4 py-2 border border-gold-300 rounded-lg focus:ring-2 focus:ring-royal-500 font-elegant"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">Sale Price (₹)</label>
          <input
            type="number"
            value={formData.sale_price}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">Service</label>
        <input
          type="text"
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          className="w-full px-4 py-2 border border-gold-300 rounded-lg focus:ring-2 focus:ring-royal-500 font-elegant"
          required
        />
      </div>
            onChange={(e) => setFormData({ ...formData, sale_price: Number(e.target.value) })}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border border-gold-300 rounded-lg focus:ring-2 focus:ring-royal-500 font-elegant"
          rows={3}
          required
        />
      </div>
            className="w-full px-4 py-2 border border-gold-300 rounded-lg focus:ring-2 focus:ring-royal-500 font-elegant"
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">Valid Until</label>
          <input
            type="date"
            value={formData.valid_until}
            onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
            className="w-full px-4 py-2 border border-gold-300 rounded-lg focus:ring-2 focus:ring-royal-500 font-elegant"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">Color Theme</label>
          <select
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className="w-full px-4 py-2 border border-gold-300 rounded-lg focus:ring-2 focus:ring-royal-500 font-elegant"
          >
            <option value="royal">Royal</option>
            <option value="gold">Gold</option>
            <option value="cream">Cream</option>
          </select>
        </div>
      </div>
            required
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">Image URL</label>
        <input
          type="url"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          className="w-full px-4 py-2 border border-gold-300 rounded-lg focus:ring-2 focus:ring-royal-500 font-elegant"
          placeholder="https://example.com/image.jpg"
        />
      </div>
          />
      <div className="flex items-center space-x-4">
        <label className="flex items-center font-elegant">
          <input
            type="checkbox"
            checked={formData.popular}
            onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
            className="rounded border-gold-300 text-royal-600 focus:ring-royal-500"
          />
          <span className="ml-2">Popular Offer</span>
        </label>
        <label className="flex items-center font-elegant">
          <input
            type="checkbox"
            checked={formData.active}
            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
            className="rounded border-gold-300 text-royal-600 focus:ring-royal-500"
          />
          <span className="ml-2">Active</span>
        </label>
      </div>
        </div>
      <div className="flex space-x-4 pt-4">
        <button type="submit" className="royal-button flex-1">
          {offer ? 'Update Offer' : 'Create Offer'}
        </button>
        <button 
          type="button" 
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 transition-colors font-elegant"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
      </div>
export default AdminDashboard;