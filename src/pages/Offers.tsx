import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tag, Clock, Star, Gift, Percent, Calendar, CheckCircle, Crown, Sparkles, Gem } from 'lucide-react';
import { supabase, type Offer } from '../lib/supabase';

const Offers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOffers(data || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
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

  const getColorIcon = (color: string) => {
    switch (color) {
      case 'royal': return Crown;
      case 'gold': return Sparkles;
      case 'cream': return Gem;
      default: return Star;
    }
  };

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
            <h1 className="text-6xl font-bold luxury-text mb-6 font-serif">Royal Offers</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-elegant">
              Exclusive royal packages crafted for discerning clientele seeking the finest in aesthetic treatments
            </p>
          </motion.div>
        </div>
      </section>

      {/* Current Offers */}
      <section className="py-20 bg-white luxury-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold luxury-text mb-4 font-serif">Royal Promotions</h2>
            <p className="text-xl text-gray-700 font-elegant">
              Exclusive limited-time offers for our most coveted treatments
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-royal-600"></div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {offers.map((offer, index) => {
                const IconComponent = getColorIcon(offer.color);
                return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative royal-card overflow-hidden hover:shadow-2xl transition-all group ${
                  offer.popular ? 'ring-2 ring-gold-400' : ''
                }`}
              >
                {offer.popular && (
                  <div className="absolute top-4 right-4 bg-gold-400 text-gold-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center font-elegant">
                    <Crown size={16} className="mr-1" />
                    Royal Choice
                  </div>
                )}

                <div className="relative h-48 overflow-hidden">
                  <img
                    src={offer.image_url || 'https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=600'}
                    alt={offer.service}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className={`bg-gradient-to-r from-${offer.color}-500 to-${offer.color}-600 text-white px-4 py-2 rounded-lg font-bold text-lg font-serif`}>
                      {offer.discount}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <IconComponent className={`text-${offer.color}-600 mr-2`} size={24} />
                    <h3 className="text-2xl font-bold luxury-text font-serif">{offer.title}</h3>
                  </div>
                  <p className="text-lg text-royal-600 font-semibold mb-3 font-elegant">{offer.service}</p>
                  <p className="text-gray-700 mb-4 font-elegant">{offer.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-green-600 font-serif">{formatPrice(offer.sale_price)}</span>
                      <span className="text-lg text-gray-500 line-through font-elegant">{formatPrice(offer.original_price)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 font-elegant">
                      <Clock size={16} className="mr-1" />
                      Valid until {new Date(offer.valid_until).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2 font-elegant">Terms & Conditions:</h4>
                    <ul className="space-y-1">
                      {offer.terms.map((term, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700 font-elegant">
                          <CheckCircle size={16} className="text-gold-500 mr-2 mt-0.5 flex-shrink-0" />
                          {term}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full royal-button flex items-center justify-center space-x-2"
                  >
                    <Crown size={20} />
                    <span>Claim Royal Offer</span>
                  </motion.button>
                </div>
              </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Seasonal Offers */}
      <section className="py-20 bg-cream-50 luxury-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold luxury-text mb-4 font-serif">Seasonal Royal Offers</h2>
            <p className="text-xl text-gray-700 font-elegant">
              Exclusive seasonal packages designed for your royal skincare journey
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
                className="royal-card p-8 text-center hover:shadow-2xl transition-shadow group"
              >
                <div className="w-16 h-16 bg-royal-gradient rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Crown className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold luxury-text mb-2 font-serif">{offer.season}</h3>
                <h4 className="text-lg font-semibold text-royal-600 mb-3 font-elegant">{offer.title}</h4>
                <p className="text-gray-700 mb-4 font-elegant">{offer.description}</p>
                <div className="text-2xl font-bold luxury-text mb-2 font-serif">{offer.discount} OFF</div>
                <p className="text-sm text-gray-600 mb-6 font-elegant">Valid until {offer.validUntil}</p>
                <button className="w-full royal-button">
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Program */}
      <section className="py-20 bg-royal-gradient relative overflow-hidden">
        <div className="absolute inset-0 luxury-pattern opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-4 font-serif">Royal Membership</h2>
            <p className="text-xl text-cream-100 font-elegant">
              Join our exclusive royal circle for unparalleled privileges and luxury experiences
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
                <Crown className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-elegant">Royal Privileges</h3>
              <p className="text-cream-100 font-elegant">
                Enjoy 20% off all treatments and exclusive access to limited royal services and promotions.
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
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-elegant">Royal Treatment</h3>
              <p className="text-cream-100 font-elegant">
                Priority scheduling, dedicated royal suite access, and personalized concierge services.
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
                <Gem className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-elegant">Royal Amenities</h3>
              <p className="text-cream-100 font-elegant">
                Complimentary royal consultations, premium aftercare, and exclusive royal events.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="bg-white text-royal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-cream-50 transition-colors font-elegant">
              <Crown className="inline mr-2" size={20} />
              Join Royal Membership
            </button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-white luxury-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              <span className="luxury-text font-serif">Royal Notifications</span>
            </h2>
            <p className="text-xl text-gray-700 mb-8 font-elegant">
              Subscribe to receive exclusive royal offers and be the first to experience our newest luxury treatments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your royal email"
                className="flex-1 px-4 py-3 border border-gold-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-transparent font-elegant"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="royal-button"
              >
                Join Royal Circle
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Offers;