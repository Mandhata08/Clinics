import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Shield, Award, ChevronRight, Phone, Mail, MapPin, Clock } from 'lucide-react';

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
      <section className="pb-16 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
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
                  className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight"
                >
                  Advanced Laser
                  <span className="block text-blue-600">Dermatology</span>
                </motion.h1>
                <motion.p 
                  variants={itemVariants}
                  className="text-xl text-gray-600 leading-relaxed"
                >
                  Experience cutting-edge laser treatments for skin rejuvenation and hair removal 
                  at Toronto's premier dermatology clinic.
                </motion.p>
              </div>
              
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/contact"
                    className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
                  >
                    Book Consultation
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/services"
                    className="inline-block border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    View Services
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex items-center space-x-8 text-sm text-gray-600"
              >
                <div className="flex items-center space-x-2">
                  <Shield className="text-green-500" size={20} />
                  <span>FDA Approved</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="text-yellow-500" size={20} />
                  <span>Board Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="text-yellow-500" size={20} />
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
                className="rounded-2xl shadow-2xl"
              />
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="text-2xl font-bold text-blue-600">10,000+</div>
                <div className="text-gray-600">Successful Treatments</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Specialized Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced laser treatments delivered by certified dermatologists
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Laser Hair Removal', color: 'blue', icon: Star },
              { name: 'Skin Rejuvenation', color: 'purple', icon: Shield },
              { name: 'Acne Treatment', color: 'green', icon: Award }
            ].map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`bg-gradient-to-br from-${service.color}-50 to-${service.color}-100 p-8 rounded-2xl hover:shadow-lg transition-all cursor-pointer`}
              >
                <div className={`w-16 h-16 bg-${service.color}-600 rounded-xl flex items-center justify-center mb-6`}>
                  <service.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.name}</h3>
                <p className="text-gray-600 mb-6">
                  Professional treatment with state-of-the-art technology and expert care.
                </p>
                <div className={`flex items-center text-${service.color}-600 font-semibold`}>
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
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100">
              Book your consultation today and take the first step towards healthier skin
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Phone, title: 'Call Us', info: '(416) 555-0123' },
              { icon: Mail, title: 'Email Us', info: 'info@luminance.com' },
              { icon: MapPin, title: 'Visit Us', info: '123 Medical Drive, Toronto' },
              { icon: Clock, title: 'Hours', info: 'Mon-Fri: 9am-7pm' }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-white" size={24} />
                </div>
                <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-blue-100">{item.info}</p>
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
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Book Appointment
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;