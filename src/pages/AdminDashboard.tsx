import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Crown, Plus, CreditCard as Edit, Trash2, Calendar, User, Phone, Mail, CheckCircle, XCircle } from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  discount: string;
  original_price: number;
  sale_price: number;
  service: string;
  description: string;
  valid_until: string;
  terms: string[];
  popular: boolean;
  color: string;
  image_url?: string;
  active: boolean;
}

interface Appointment {
  id: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  service: string;
  doctor: string;
  preferred_date: string;
  preferred_time: string;
  message: string;
  status: string;
  created_at: string;
}

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
      fetchOffers();
    } catch (error) {
      console.error('Error saving offer:', error);
    }
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
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-royal-cream via-white to-royal-gold/10 flex items-center justify-center">
        <div className="text-center">
          <Crown className="w-12 h-12 text-royal-gold mx-auto mb-4 animate-pulse" />
          <p className="text-royal-navy font-serif">Loading Royal Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-cream via-white to-royal-gold/10 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Crown className="w-16 h-16 text-royal-gold mx-auto mb-4" />
          <h1 className="text-4xl font-serif text-royal-navy mb-2">Royal Admin Dashboard</h1>
          <p className="text-royal-navy/70">Manage your clinic's royal offerings</p>
        </div>

        {/* Offers Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif text-royal-navy">Royal Offers</h2>
            <button
              onClick={() => {
                setShowOfferForm(true);
                setEditingOffer(null);
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
              }}
              className="bg-royal-gold text-white px-6 py-2 rounded-lg hover:bg-royal-gold/90 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Offer
            </button>
          </div>

          {/* Offer Form */}
          {showOfferForm && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-royal-gold/20">
              <h3 className="text-xl font-serif text-royal-navy mb-4">
                {editingOffer ? 'Edit Offer' : 'Create New Offer'}
              </h3>
              <form onSubmit={handleOfferSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Offer Title"
                  value={offerForm.title}
                  onChange={(e) => setOfferForm({...offerForm, title: e.target.value})}
                  className="border border-royal-gold/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-royal-gold"
                  required
                />
                <input
                  type="text"
                  placeholder="Discount (e.g., 50% OFF)"
                  value={offerForm.discount}
                  onChange={(e) => setOfferForm({...offerForm, discount: e.target.value})}
                  className="border border-royal-gold/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-royal-gold"
                  required
                />
                <input
                  type="number"
                  placeholder="Original Price (₹)"
                  value={offerForm.original_price}
                  onChange={(e) => setOfferForm({...offerForm, original_price: e.target.value})}
                  className="border border-royal-gold/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-royal-gold"
                />
                <input
                  type="number"
                  placeholder="Sale Price (₹)"
                  value={offerForm.sale_price}
                  onChange={(e) => setOfferForm({...offerForm, sale_price: e.target.value})}
                  className="border border-royal-gold/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-royal-gold"
                />
                <input
                  type="text"
                  placeholder="Service Name"
                  value={offerForm.service}
                  onChange={(e) => setOfferForm({...offerForm, service: e.target.value})}
                  className="border border-royal-gold/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-royal-gold"
                  required
                />
                <input
                  type="date"
                  placeholder="Valid Until"
                  value={offerForm.valid_until}
                  onChange={(e) => setOfferForm({...offerForm, valid_until: e.target.value})}
                  className="border border-royal-gold/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-royal-gold"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={offerForm.description}
                  onChange={(e) => setOfferForm({...offerForm, description: e.target.value})}
                  className="border border-royal-gold/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-royal-gold md:col-span-2"
                  rows={3}
                  required
                />
                <input
                  type="text"
                  placeholder="Terms (comma separated)"
                  value={offerForm.terms}
                  onChange={(e) => setOfferForm({...offerForm, terms: e.target.value})}
                  className="border border-royal-gold/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-royal-gold"
                />
                <input
                  type="url"
                  placeholder="Image URL (optional)"
                  value={offerForm.image_url}
                  onChange={(e) => setOfferForm({...offerForm, image_url: e.target.value})}
                  className="border border-royal-gold/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-royal-gold"
                />
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={offerForm.popular}
                      onChange={(e) => setOfferForm({...offerForm, popular: e.target.checked})}
                      className="text-royal-gold"
                    />
                    Popular
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={offerForm.active}
                      onChange={(e) => setOfferForm({...offerForm, active: e.target.checked})}
                      className="text-royal-gold"
                    />
                    Active
                  </label>
                </div>
                <div className="md:col-span-2 flex gap-4">
                  <button
                    type="submit"
                    className="bg-royal-gold text-white px-6 py-2 rounded-lg hover:bg-royal-gold/90 transition-colors"
                  >
                    {editingOffer ? 'Update Offer' : 'Create Offer'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowOfferForm(false);
                      setEditingOffer(null);
                    }}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Offers List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-xl shadow-lg p-6 border border-royal-gold/20">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-lg text-royal-navy">{offer.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditOffer(offer)}
                      className="text-royal-gold hover:text-royal-gold/70"
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
                <p className="text-2xl font-bold text-royal-gold mb-2">{offer.discount}</p>
                <p className="text-royal-navy mb-2">{offer.service}</p>
                <div className="flex items-center gap-2 mb-2">
                  {offer.original_price > 0 && (
                    <span className="text-gray-500 line-through">₹{offer.original_price}</span>
                  )}
                  {offer.sale_price > 0 && (
                    <span className="text-royal-gold font-bold">₹{offer.sale_price}</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4">{offer.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className={`px-2 py-1 rounded ${offer.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {offer.active ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-gray-500">Until {new Date(offer.valid_until).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appointments Section */}
        <div>
          <h2 className="text-2xl font-serif text-royal-navy mb-6">Royal Appointments</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-royal-gold/10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-royal-navy uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-royal-navy uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-royal-navy uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-royal-navy uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-royal-navy uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 text-royal-gold mr-2" />
                            <div className="text-sm font-medium text-royal-navy">{appointment.patient_name}</div>
                          </div>
                          <div className="flex items-center mt-1">
                            <Mail className="w-3 h-3 text-gray-400 mr-2" />
                            <div className="text-sm text-gray-500">{appointment.patient_email}</div>
                          </div>
                          <div className="flex items-center mt-1">
                            <Phone className="w-3 h-3 text-gray-400 mr-2" />
                            <div className="text-sm text-gray-500">{appointment.patient_phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-royal-navy">{appointment.service}</div>
                        <div className="text-sm text-gray-500">Dr. {appointment.doctor}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-royal-gold mr-2" />
                          <div>
                            <div className="text-sm text-royal-navy">{new Date(appointment.preferred_date).toLocaleDateString()}</div>
                            <div className="text-sm text-gray-500">{appointment.preferred_time}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
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
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                              className="text-red-600 hover:text-red-900"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}