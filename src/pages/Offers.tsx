import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Clock, Star, Gift, Percent, Calendar, CheckCircle } from 'lucide-react';

const Offers = () => {
  const offers = [
    {
      id: 1,
      title: 'New Patient Special',
      discount: '50% OFF',
      originalPrice: '$300',
      salePrice: '$150',
      service: 'First Laser Hair Removal Session',
      description: 'Perfect for first-time patients to experience our premium laser hair removal service.',
      validUntil: '2024-12-31',
      terms: [
        'Valid for new patients only',
        'Cannot be combined with other offers',
        'Consultation included',
        'All body areas available'
      ],
      popular: true,
      color: 'blue',
      image: 'https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 2,
      title: 'Summer Skin Package',
      discount: '30% OFF',
      originalPrice: '$800',
      salePrice: '$560',
      service: 'Complete Skin Rejuvenation Package',
      description: 'Get summer-ready skin with our comprehensive rejuvenation package including 3 sessions.',
      validUntil: '2024-08-31',
      terms: [
        'Includes 3 treatment sessions',
        'Free aftercare products',
        'Follow-up consultation included',
        'Valid for face and neck'
      ],
      popular: false,
      color: 'purple',
      image: 'https://images.pexels.com/photos/5752296/pexels-photo-5752296.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 3,
      title: 'Acne Clear Program',
      discount: '25% OFF',
      originalPrice: '$600',
      salePrice: '$450',
      service: '4-Session Acne Treatment Package',
      description: 'Comprehensive acne treatment program with advanced laser therapy and skincare guidance.',
      validUntil: '2024-10-31',
      terms: [
        '4 laser treatment sessions',
        'Customized skincare routine',
        'Progress monitoring included',
        'Suitable for all acne types'
      ],
      popular: false,
      color: 'green',
      image: 'https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 4,
      title: 'Couples Treatment Deal',
      discount: '40% OFF',
      originalPrice: '$1200',
      salePrice: '$720',
      service: 'Laser Hair Removal for Two',
      description: 'Perfect for couples! Both partners get premium laser hair removal treatment.',
      validUntil: '2024-09-30',
      terms: [
        'Valid for 2 people',
        'Same treatment area',
        'Appointments can be separate',
        'Includes consultation for both'
      ],
      popular: true,
      color: 'red',
      image: 'https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 5,
      title: 'Age Spot Removal Special',
      discount: '35% OFF',
      originalPrice: '$400',
      salePrice: '$260',
      service: 'Pigmentation Treatment Session',
      description: 'Advanced Q-switched laser treatment for age spots, sun damage, and pigmentation.',
      validUntil: '2024-11-30',
      terms: [
        'Single treatment session',
        'Free skin analysis',
        'Post-treatment care included',
        'Suitable for face and hands'
      ],
      popular: false,
      color: 'yellow',
      image: 'https://images.pexels.com/photos/5752296/pexels-photo-5752296.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 6,
      title: 'Student Discount',
      discount: '20% OFF',
      originalPrice: 'Regular Prices',
      salePrice: '20% Savings',
      service: 'All Treatments',
      description: 'Special discount for students on all our laser treatments and services.',
      validUntil: 'Ongoing',
      terms: [
        'Valid student ID required',
        'Cannot combine with other offers',
        'Available year-round',
        'All services included'
      ],
      popular: false,
      color: 'indigo',
      image: 'https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  const seasonalOffers = [
    {
      season: 'Spring Special',
      title: 'Spring Renewal Package',
      description: 'Refresh your skin for spring with our comprehensive treatment package',
      discount: '30%',
      validUntil: '2024-05-31'
    },
    {
      season: 'Summer Ready',
      title: 'Hair-Free Summer',
      description: 'Get ready for summer with our intensive hair removal packages',
      discount: '25%',
      validUntil: '2024-07-31'
    },
    {
      season: 'Fall Refresh',
      title: 'Post-Summer Recovery',
      description: 'Repair summer damage with our skin rejuvenation treatments',
      discount: '35%',
      validUntil: '2024-11-30'
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
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Special Offers</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take advantage of our exclusive deals and packages for premium laser treatments
            </p>
          </motion.div>
        </div>
      </section>

      {/* Current Offers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Current Promotions</h2>
            <p className="text-xl text-gray-600">
              Limited-time offers on our most popular treatments
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg border-2 overflow-hidden hover:shadow-xl transition-all ${
                  offer.popular ? 'border-yellow-400' : 'border-gray-100'
                }`}
              >
                {offer.popular && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star size={16} className="mr-1" />
                    Popular
                  </div>
                )}

                <div className="relative h-48 overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.service}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className={`bg-${offer.color}-600 text-white px-4 py-2 rounded-lg font-bold text-lg`}>
                      {offer.discount}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                  <p className="text-lg text-blue-600 font-semibold mb-3">{offer.service}</p>
                  <p className="text-gray-600 mb-4">{offer.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-green-600">{offer.salePrice}</span>
                      <span className="text-lg text-gray-500 line-through">{offer.originalPrice}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={16} className="mr-1" />
                      Valid until {new Date(offer.validUntil).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Terms & Conditions:</h4>
                    <ul className="space-y-1">
                      {offer.terms.map((term, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {term}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full bg-${offer.color}-600 text-white py-3 rounded-lg font-semibold hover:bg-${offer.color}-700 transition-colors flex items-center justify-center space-x-2`}
                  >
                    <Gift size={20} />
                    <span>Claim This Offer</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Offers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Seasonal Promotions</h2>
            <p className="text-xl text-gray-600">
              Year-round savings tailored to your seasonal skincare needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {seasonalOffers.map((offer, index) => (
              <motion.div
                key={offer.season}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Percent className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.season}</h3>
                <h4 className="text-lg font-semibold text-blue-600 mb-3">{offer.title}</h4>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <div className="text-2xl font-bold text-green-600 mb-2">{offer.discount} OFF</div>
                <p className="text-sm text-gray-500 mb-6">Valid until {offer.validUntil}</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Program */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Luminance VIP Membership</h2>
            <p className="text-xl text-purple-100">
              Join our exclusive membership program for year-round savings and priority booking
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Tag className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Exclusive Discounts</h3>
              <p className="text-purple-100">
                Get 15% off all treatments and priority access to new services and special promotions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Calendar className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Priority Booking</h3>
              <p className="text-purple-100">
                Skip the wait with priority appointment scheduling and flexible rescheduling options.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Gift className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Complimentary Services</h3>
              <p className="text-purple-100">
                Enjoy free consultations, skin analysis, and exclusive member-only events and workshops.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              Join VIP Membership
            </button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Never Miss a Deal
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Subscribe to our newsletter and be the first to know about exclusive offers and promotions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Offers;