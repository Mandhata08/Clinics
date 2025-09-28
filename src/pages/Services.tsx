import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Award, Clock, ChevronRight, Check } from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 1,
      name: 'Laser Hair Removal',
      color: 'blue',
      icon: Star,
      price: 'Starting from $150',
      duration: '30-60 minutes',
      sessions: '6-8 sessions',
      description: 'Permanent hair reduction using advanced IPL and Diode laser technology. Safe for all skin types with minimal discomfort.',
      benefits: [
        'FDA-approved technology',
        'Suitable for all skin types',
        'Minimal discomfort',
        'Long-lasting results',
        'No ingrown hairs'
      ],
      areas: ['Face', 'Legs', 'Arms', 'Underarms', 'Bikini', 'Back', 'Chest']
    },
    {
      id: 2,
      name: 'Skin Rejuvenation',
      color: 'purple',
      icon: Shield,
      price: 'Starting from $300',
      duration: '45-90 minutes',
      sessions: '3-5 sessions',
      description: 'CO2 and Fractional laser treatments for wrinkles, age spots, and skin texture improvement.',
      benefits: [
        'Reduces fine lines',
        'Improves skin texture',
        'Minimizes pores',
        'Evens skin tone',
        'Stimulates collagen'
      ],
      areas: ['Face', 'Neck', 'Hands', 'Décolletage']
    },
    {
      id: 3,
      name: 'Acne Treatment',
      color: 'green',
      icon: Award,
      price: 'Starting from $200',
      duration: '30-45 minutes',
      sessions: '4-6 sessions',
      description: 'Advanced laser therapy for active acne and acne scar reduction. Clinically proven results.',
      benefits: [
        'Reduces active acne',
        'Minimizes scarring',
        'Controls oil production',
        'Improves skin clarity',
        'Prevents future breakouts'
      ],
      areas: ['Face', 'Back', 'Chest', 'Shoulders']
    },
    {
      id: 4,
      name: 'Pigmentation Treatment',
      color: 'yellow',
      icon: Clock,
      price: 'Starting from $250',
      duration: '30-60 minutes',
      sessions: '2-4 sessions',
      description: 'Q-switched laser treatment for melasma, sun spots, and unwanted pigmentation removal.',
      benefits: [
        'Removes age spots',
        'Treats melasma',
        'Evens skin tone',
        'Minimal downtime',
        'Precise targeting'
      ],
      areas: ['Face', 'Hands', 'Arms', 'Chest']
    },
    {
      id: 5,
      name: 'Vascular Lesions',
      color: 'red',
      icon: Star,
      price: 'Starting from $180',
      duration: '20-40 minutes',
      sessions: '2-3 sessions',
      description: 'Precise laser treatment for spider veins, rosacea, and other vascular skin conditions.',
      benefits: [
        'Treats spider veins',
        'Reduces rosacea',
        'Improves circulation',
        'Quick treatment',
        'Minimal side effects'
      ],
      areas: ['Face', 'Legs', 'Chest']
    },
    {
      id: 6,
      name: 'Tattoo Removal',
      color: 'indigo',
      icon: Shield,
      price: 'Starting from $400',
      duration: '15-45 minutes',
      sessions: '6-12 sessions',
      description: 'Safe and effective laser tattoo removal using Picosecond laser technology.',
      benefits: [
        'All ink colors',
        'Minimal scarring',
        'Faster results',
        'Safe for all skin',
        'Professional grade'
      ],
      areas: ['Any body area']
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive laser treatments using state-of-the-art technology and expert medical care
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className={`bg-gradient-to-r from-${service.color}-500 to-${service.color}-600 p-6`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <service.icon className="text-white" size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{service.name}</h3>
                        <p className="text-white/80">{service.price}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Clock className="text-gray-600 mx-auto mb-2" size={20} />
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-semibold">{service.duration}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Star className="text-gray-600 mx-auto mb-2" size={20} />
                      <p className="text-sm text-gray-600">Sessions</p>
                      <p className="font-semibold">{service.sessions}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{service.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Benefits:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {service.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Check className="text-green-500" size={16} />
                          <span className="text-gray-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Treatment Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.areas.map((area, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 bg-${service.color}-100 text-${service.color}-700 rounded-full text-sm`}
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full bg-${service.color}-600 text-white py-3 rounded-lg font-semibold hover:bg-${service.color}-700 transition-colors flex items-center justify-center space-x-2`}
                  >
                    <span>Book Consultation</span>
                    <ChevronRight size={20} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Not Sure Which Treatment is Right for You?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Schedule a free consultation with our expert dermatologists to create a personalized treatment plan.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Schedule Free Consultation
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;