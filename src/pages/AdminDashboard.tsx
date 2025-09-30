import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, type Offer, type Appointment } from '../lib/supabase';
import { Crown, Plus, Edit, Trash2, Calendar, User, Phone, Mail, CheckCircle, XCircle, Star } from 'lucide-react';

export default function AdminDashboard() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);

  const [offerForm, setOfferForm] = useState({
    title: '',
    discount: '',
    original_price: '',
    sale_price: '',
    service: '',
    description: '',
    valid_until: '',
    terms: '',
    popular: false,
    color: 'gold',
    image_url: '',
    active: true
  });

  useEffect(() => {
    fetchOffers();
    fetchAppointments();
  }, []);

  const fetchOffers = async () => {
    try {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setOffers(data || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setAppointments(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };

  const handleOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const offerData = {
        ...offerForm,
        original_price: parseFloat(offerForm.original_price) || 0,
        sale_price: parseFloat(offerForm.sale_price) || 0,
        terms: offerForm.terms.split(',').map(term => term.trim()).filter(term => term)
      };

      if (editingOffer) {
        const { error } = await supabase
          .from('offers')
          .update(offerData)
          .eq('id', editingOffer.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('offers')
          .insert([offerData]);
        
        if (error) throw error;
      }

      resetForm();
      fetchOffers();
    } catch (error) {
      console.error('Error saving offer:', error);
      alert('Error saving offer. Please try again.');
    }
  };

  const resetForm = () => {
    setOfferForm({
      title: '',
      discount: '',
      original_price: '',
      sale_price: '',
      service: '',
      description: '',
      valid_until: '',
      terms: '',
      popular: false,
      color: 'gold',
      image_url: '',
      active: true
    });
    setShowOfferForm(false);
    setEditingOffer(null);
  };

  const handleEditOffer = (offer: Offer) => {
    setEditingOffer(offer);
    setOfferForm({
      title: offer.title,
      discount: offer.discount,
      original_price: offer.original_price.toString(),
      sale_price: offer.sale_price.toString(),
      service: offer.service,
      description: offer.description,
      valid_until: offer.valid_until,
      terms: offer.terms.join(', '),
      popular: offer.popular,
      color: offer.color,
      image_url: offer.image_url || '',
      active: offer.active
    });
    setShowOfferForm(true);
  };

  const handleDeleteOffer = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      try {
        const { error } = await supabase
          .from('offers')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        fetchOffers();
      } catch (error) {
        console.error('Error deleting offer:', error);
        alert('Error deleting offer. Please try again.');
      }
    }
  };

  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Error updating appointment. Please try again.');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-gold-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <Crown className="w-12 h-12 text-gold-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-700 font-serif">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-gold-50 pt-20 luxury-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Crown className="w-16 h-16 text-gold-600 mx-auto mb-4" />
          <h1 className="text-4xl font-serif luxury-text mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 font-elegant">Manage your clinic's offerings and appointments</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="royal-card p-6 text-center"
          >
            <Star className="w-8 h-8 text-gold-600 mx-auto mb-2" />
            <div className="text-2xl font-bold luxury-text">{offers.length}</div>
            <div className="text-gray-600 font-elegant">Active Offers</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="royal-card p-6 text-center"
          >
            <Calendar className="w-8 h-8 text-royal-600 mx-auto mb-2" />
            <div className="text-2xl font-bold luxury-text">{appointments.length}</div>
            <div className="text-gray-600 font-elegant">Total Appointments</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="royal-card p-6 text-center"
          >
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold luxury-text">
              {appointments.filter(apt => apt.status === 'confirmed').length}
            </div>
            <div className="text-gray-600 font-elegant">Confirmed</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="royal-card p-6 text-center"
          >
            <User className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold luxury-text">
              {appointments.filter(apt => apt.status === 'pending').length}
            </div>
            <div className="text-gray-600 font-elegant">Pending</div>
          </motion.div>
        </div>

        {/* Offers Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif luxury-text">Manage Offers</h2>
            <button
              onClick={() => {
                setShowOfferForm(true);
                setEditingOffer(null);
                resetForm();
              }}
              className="royal-button flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Offer
            </button>
          </div>

          {/* Offer Form */}
          {showOfferForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="royal-card p-6 mb-6"
            >
              <h3 className="text-xl font-serif luxury-text mb-4">
                {editingOffer ? 'Edit Offer' : 'Create New Offer'}
              </h3>
              <form onSubmit={handleOfferSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Offer Title"
                  value={offerForm.title}
                  onChange={(e) => setOfferForm({...offerForm, title: e.target.value})}
                  className="border border-gold-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Discount (e.g., 50% OFF)"
                  value={offerForm.discount}
                  onChange={(e) => setOfferForm({...offerForm, discount: e.target.value})}
                  className="border border-gold-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  required
                />
                <input
                  type="number"
                  placeholder="Original Price (₹)"
                  value={offerForm.original_price}
                  onChange={(e) => setOfferForm({...offerForm, original_price: e.target.value})}
                  className="border border-gold-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <input
                  type="number"
                  placeholder="Sale Price (₹)"
                  value={offerForm.sale_price}
                  onChange={(e) => setOfferForm({...offerForm, sale_price: e.target.value})}
                  className="border border-gold-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <input
                  type="text"
                  placeholder="Service Name"
                  value={offerForm.service}
                  onChange={(e) => setOfferForm({...offerForm, service: e.target.value})}
                  className="border border-gold-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  required
                />
                <input
                  type="date"
                  placeholder="Valid Until"
                  value={offerForm.valid_until}
                  onChange={(e) => setOfferForm({...offerForm, valid_until: e.target.value})}
                  className="border border-gold-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={offerForm.description}
                  onChange={(e) => setOfferForm({...offerForm, description: e.target.value})}
                  className="border border-gold-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500 md:col-span-2"
                  rows={3}
                  required
                />
                <input
                  type="text"
                  placeholder="Terms (comma separated)"
                  value={offerForm.terms}
                  onChange={(e) => setOfferForm({...offerForm, terms: e.target.value})}
                  className="border border-gold-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <input
                  type="url"
                  placeholder="Image URL (optional)"
                  value={offerForm.image_url}
                  onChange={(e) => setOfferForm({...offerForm, image_url: e.target.value})}
                  className="border border-gold-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 font-elegant">
                    <input
                      type="checkbox"
                      checked={offerForm.popular}
                      onChange={(e) => setOfferForm({...offerForm, popular: e.target.checked})}
                      className="text-gold-600"
                    />
                    Popular
                  </label>
                  <label className="flex items-center gap-2 font-elegant">
                    <input
                      type="checkbox"
                      checked={offerForm.active}
                      onChange={(e) => setOfferForm({...offerForm, active: e.target.checked})}
                      className="text-gold-600"
                    />
                    Active
                  </label>
                </div>
                <div className="md:col-span-2 flex gap-4">
                  <button
                    type="submit"
                    className="royal-button"
                  >
                    {editingOffer ? 'Update Offer' : 'Create Offer'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors font-elegant"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Offers List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="royal-card p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-lg luxury-text">{offer.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditOffer(offer)}
                      className="text-gold-600 hover:text-gold-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteOffer(offer.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gold-600 mb-2">{offer.discount}</p>
                <p className="text-gray-700 mb-2 font-elegant">{offer.service}</p>
                <div className="flex items-center gap-2 mb-2">
                  {offer.original_price > 0 && (
                    <span className="text-gray-500 line-through font-elegant">
                      {formatPrice(offer.original_price)}
                    </span>
                  )}
                  {offer.sale_price > 0 && (
                    <span className="text-gold-600 font-bold font-elegant">
                      {formatPrice(offer.sale_price)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4 font-elegant">{offer.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className={`px-2 py-1 rounded font-elegant ${
                    offer.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {offer.active ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-gray-500 font-elegant">
                    Until {new Date(offer.valid_until).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Appointments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-serif luxury-text mb-6">Appointments</h2>
          <div className="royal-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gold-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider font-elegant">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider font-elegant">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider font-elegant">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider font-elegant">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider font-elegant">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 text-gold-600 mr-2" />
                            <div className="text-sm font-medium text-gray-900 font-elegant">
                              {appointment.patient_name}
                            </div>
                          </div>
                          <div className="flex items-center mt-1">
                            <Mail className="w-3 h-3 text-gray-400 mr-2" />
                            <div className="text-sm text-gray-500 font-elegant">
                              {appointment.patient_email}
                            </div>
                          </div>
                          <div className="flex items-center mt-1">
                            <Phone className="w-3 h-3 text-gray-400 mr-2" />
                            <div className="text-sm text-gray-500 font-elegant">
                              {appointment.patient_phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-elegant">{appointment.service}</div>
                        <div className="text-sm text-gray-500 font-elegant">{appointment.doctor}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gold-600 mr-2" />
                          <div>
                            <div className="text-sm text-gray-900 font-elegant">
                              {new Date(appointment.preferred_date).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-500 font-elegant">
                              {appointment.preferred_time}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full font-elegant ${
                          appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {appointment.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                              className="text-green-600 hover:text-green-900"
                              title="Confirm"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                              className="text-red-600 hover:text-red-900"
                              title="Cancel"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                        {appointment.status === 'confirmed' && (
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                            className="text-blue-600 hover:text-blue-900"
                            title="Mark as completed"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}