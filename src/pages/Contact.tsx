import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Calendar, MessageSquare, Crown, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  service: yup.string().required('Please select a service'),
  preferredDate: yup.string().required('Preferred date is required'),
  preferredTime: yup.string().required('Preferred time is required'),
  message: yup.string().required('Message is required')
});

type FormData = yup.InferType<typeof schema>;

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('appointments')
        .insert([{
          patient_name: `${data.firstName} ${data.lastName}`,
          patient_email: data.email,
          patient_phone: data.phone,
          service: data.service,
          doctor: 'To be assigned',
          preferred_date: data.preferredDate,
          preferred_time: data.preferredTime,
          message: data.message,
          status: 'pending'
        }]);

      if (error) throw error;
      
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert('There was an error submitting your appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    'Royal Hair Removal',
    'Golden Skin Revival',
    'Diamond Clarity Treatment',
    'Platinum Pigmentation Therapy',
    'Royal Vascular Treatment',
    'Premium Tattoo Removal',
    'Royal Consultation'
  ];

  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
  ];

  if (isSubmitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 to-gold-50 luxury-bg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-24 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Crown className="text-royal-600" size={48} />
          </motion.div>
          <h1 className="text-5xl font-bold luxury-text mb-4 font-serif">Royal Gratitude!</h1>
          <p className="text-xl text-gray-700 mb-8 font-elegant">
            Your royal appointment request has been submitted successfully. Our royal concierge will contact you within 24 hours to confirm your exclusive booking.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSubmitted(false)}
            className="royal-button"
          >
            <Crown className="inline mr-2" size={20} />
            Book Another Royal Appointment
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-cream-50 via-gold-50 to-royal-100 luxury-bg relative overflow-hidden">
        <div className="absolute top-10 right-10 floating-element">
          <Crown className="text-gold-300 opacity-20" size={80} />
        </div>
        <div className="absolute bottom-10 left-10 floating-element" style={{ animationDelay: '3s' }}>
          <Sparkles className="text-royal-300 opacity-20" size={60} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold luxury-text mb-6 font-serif">Royal Contact</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-elegant">
              Ready to embark on your royal transformation journey? Connect with our distinguished team of experts today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white luxury-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="royal-card p-8"
              >
                <h2 className="text-3xl font-bold luxury-text mb-6 flex items-center font-serif">
                  <Crown className="text-royal-600 mr-3" size={32} />
                  Book Your Royal Appointment
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">
                        First Name *
                      </label>
                      <input
                        {...register('firstName')}
                        type="text"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.firstName ? 'border-red-500' : 'border-gold-300'
                        }`}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">
                        Last Name *
                      </label>
                      <input
                        {...register('lastName')}
                        type="text"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.lastName ? 'border-red-500' : 'border-gold-300'
                        }`}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">
                        Email *
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.email ? 'border-red-500' : 'border-gold-300'
                        }`}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">
                        Phone *
                      </label>
                      <input
                        {...register('phone')}
                        type="tel"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-gold-300'
                        }`}
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">
                      Royal Service Interest *
                    </label>
                    <select
                      {...register('service')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.service ? 'border-red-500' : 'border-gold-300'
                      }`}
                    >
                      <option value="">Select a royal service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">
                        Preferred Date *
                      </label>
                      <input
                        {...register('preferredDate')}
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.preferredDate ? 'border-red-500' : 'border-gold-300'
                        }`}
                      />
                      {errors.preferredDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.preferredDate.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">
                        Preferred Time *
                      </label>
                      <select
                        {...register('preferredTime')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.preferredTime ? 'border-red-500' : 'border-gold-300'
                        }`}
                      >
                        <option value="">Select a time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                      {errors.preferredTime && (
                        <p className="text-red-500 text-sm mt-1">{errors.preferredTime.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-elegant">
                      Message *
                    </label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.message ? 'border-red-500' : 'border-gold-300'
                      }`}
                      placeholder="Tell us about your royal skincare aspirations..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full royal-button py-4 text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Submitting Royal Request...</span>
                      </>
                    ) : (
                      <>
                        <Crown size={20} />
                        <span>Book Royal Appointment</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-royal-gradient p-8 rounded-2xl text-white relative overflow-hidden"
              >
                <div className="absolute inset-0 luxury-pattern opacity-20"></div>
                <h3 className="text-2xl font-bold mb-6 flex items-center font-serif relative">
                  <Crown className="mr-3" size={28} />
                  Royal Contact
                </h3>
                
                <div className="space-y-6 relative">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 font-elegant">Royal Palace</h4>
                      <p className="text-cream-100 font-elegant">
                        Royal Medical Plaza<br />
                        Luxury District, Mumbai 400001<br />
                        Maharashtra, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 font-elegant">Royal Hotline</h4>
                      <p className="text-cream-100 font-elegant">+91 98765 43210</p>
                      <p className="text-cream-100 text-sm font-elegant">Emergency: +91 98765 43211</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 font-elegant">Royal Correspondence</h4>
                      <p className="text-cream-100 font-elegant">royal@luminanceclinic.com</p>
                      <p className="text-cream-100 text-sm font-elegant">appointments@luminanceclinic.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 font-elegant">Royal Hours</h4>
                      <div className="text-cream-100 text-sm space-y-1 font-elegant">
                        <p>Monday - Friday: 10:00 AM - 8:00 PM</p>
                        <p>Saturday: 10:00 AM - 6:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Emergency Contact */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-red-50 border border-red-200 p-6 rounded-2xl royal-glow"
              >
                <h4 className="font-semibold text-red-800 mb-2 font-elegant">Royal Emergency</h4>
                <p className="text-red-700 text-sm mb-3 font-elegant">
                  For urgent royal skincare concerns or post-treatment emergencies, please call our dedicated royal emergency line.
                </p>
                <p className="font-semibold text-red-800 font-elegant">+91 98765 43211</p>
                <p className="text-red-600 text-xs mt-1 font-elegant">Available 24/7</p>
              </motion.div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-cream-100 rounded-2xl h-64 flex items-center justify-center royal-glow"
              >
                <div className="text-center">
                  <MapPin className="text-royal-400 mx-auto mb-2" size={48} />
                  <p className="text-royal-600 font-elegant">Royal Location Map</p>
                  <p className="text-royal-500 text-sm font-elegant">Luxury District, Mumbai</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-cream-50 luxury-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold luxury-text mb-4 font-serif">Royal Inquiries</h2>
            <p className="text-xl text-gray-700 font-elegant">
              Answers to common questions about our royal services and exclusive booking process
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How far in advance should I book my royal appointment?",
                answer: "We recommend booking 2-3 weeks in advance for royal treatments. For initial royal consultations, we often have same-week availability for our distinguished clientele."
              },
              {
                question: "What should I expect during my first royal visit?",
                answer: "Your first royal visit includes a comprehensive consultation in our royal suite, advanced skin analysis, and personalized treatment plan discussion. We'll also review your medical history and provide royal aftercare guidance."
              },
              {
                question: "Do you offer royal payment plans?",
                answer: "Yes, we offer exclusive flexible payment plans for our royal treatment packages. Our royal concierge can discuss premium options during your consultation."
              },
              {
                question: "What is your royal cancellation policy?",
                answer: "We require 48-hour notice for royal appointment cancellations. Same-day cancellations may incur a premium fee. We understand emergencies happen and handle each case with royal discretion."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="royal-card p-6"
              >
                <h4 className="font-semibold luxury-text mb-2 font-elegant">{faq.question}</h4>
                <p className="text-gray-700 font-elegant">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;