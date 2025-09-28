import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Shield, Award, ChevronRight, Phone, Mail, MapPin, Clock, Crown, Sparkles, Gem } from 'lucide-react';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="pb-16 bg-gradient-to-br from-cream-50 via-gold-50 to-royal-100 overflow-hidden luxury-bg relative">
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 floating-element">
          <Crown className="text-gold-300 opacity-20" size={60} />
        </div>
        <div className="absolute top-40 right-20 floating-element" style={{ animationDelay: '2s' }}>
          <Sparkles className="text-royal-300 opacity-20" size={40} />
        </div>
        <div className="absolute bottom-20 left-1/4 floating-element" style={{ animationDelay: '4s' }}>
          <Gem className="text-gold-400 opacity-20" size={50} />
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-4">
                <motion.h1 
                  variants={itemVariants}
                  className="text-4xl lg:text-7xl font-bold leading-tight font-serif"
                >
                  <span className="luxury-text">Royal</span>
                  <span className="block luxury-text">Dermatology</span>
                  <span className="block text-2xl lg:text-3xl font-elegant text-royal-600 mt-4">Excellence</span>
                </motion.h1>
                <motion.p 
                  variants={itemVariants}
                  className="text-xl text-gray-700 leading-relaxed font-elegant"
                >
                  Experience the pinnacle of luxury dermatology with our royal treatment packages, 
                  combining ancient wisdom with modern technology for unparalleled results.
                </motion.p>
              </div>
              
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/contact"
                    className="royal-button text-lg"
                  >
                    <Crown className="inline mr-2" size={20} />
                    Royal Consultation
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/services"
                    className="inline-block border-2 border-royal-600 text-royal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-royal-600 hover:text-white transition-colors font-elegant"
                  >
                    View Services
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex items-center space-x-8 text-sm text-gray-700 font-elegant"
              >
                <div className="flex items-center space-x-2">
                  <Shield className="text-gold-500" size={20} />
                  <span>FDA Approved</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="text-royal-500" size={20} />
                  <span>Board Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="text-gold-500" size={20} />
                  <span>5.0 Rating</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <motion.img 
                whileHover={{ scale: 1.02 }}
                src="https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Modern dermatology treatment"
                className="rounded-2xl shadow-2xl royal-glow"
              />
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 royal-card p-6"
              >
                <div className="text-2xl font-bold luxury-text font-serif">10,000+</div>
                <div className="text-gray-600 font-elegant">Royal Treatments</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white luxury-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold luxury-text mb-4 font-serif">Royal Treatment Portfolio</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-elegant">
              Exquisite treatments crafted for royalty, delivered by master dermatologists
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Royal Hair Removal', color: 'royal', icon: Crown },
              { name: 'Golden Skin Revival', color: 'gold', icon: Sparkles },
              { name: 'Diamond Clarity Treatment', color: 'cream', icon: Gem }
            ].map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="royal-card p-8 hover:shadow-2xl transition-all cursor-pointer group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br from-${service.color}-500 to-${service.color}-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold luxury-text mb-4 font-serif">{service.name}</h3>
                <p className="text-gray-700 mb-6 font-elegant">
                  Luxurious treatment combining royal traditions with cutting-edge technology.
                </p>
                <div className={`flex items-center text-${service.color}-600 font-semibold font-elegant`}>
                  <span>Learn More</span>
                  <ChevronRight size={20} className="ml-1" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/services"
              className="royal-button text-lg"
            >
              View All Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-20 bg-royal-gradient relative overflow-hidden">
        <div className="absolute inset-0 luxury-pattern opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-4 font-serif">Begin Your Royal Journey</h2>
            <p className="text-xl text-cream-100 font-elegant">
              Schedule your royal consultation and embark on a transformative experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Phone, title: 'Royal Hotline', info: '+91 98765 43210' },
              { icon: Mail, title: 'Royal Correspondence', info: 'royal@luminance.com' },
              { icon: MapPin, title: 'Royal Palace', info: 'Luxury Medical District, Mumbai' },
              { icon: Clock, title: 'Royal Hours', info: 'Mon-Sat: 10am-8pm' }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center hover:bg-white/20 transition-colors"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-white" size={24} />
                </div>
                <h4 className="font-semibold text-white mb-2 font-elegant">{item.title}</h4>
                <p className="text-cream-100 font-elegant">{item.info}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/contact"
             className="inline-block bg-white text-royal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-cream-50 transition-colors font-elegant"
            >
             <Crown className="inline mr-2" size={20} />
             Book Royal Appointment
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;