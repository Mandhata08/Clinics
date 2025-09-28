import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Users, Star, Calendar, MapPin } from 'lucide-react';

const Doctors = () => {
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      title: 'Lead Dermatologist & Medical Director',
      image: 'https://images.pexels.com/photos/5752296/pexels-photo-5752296.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['Laser Dermatology', 'Cosmetic Procedures', 'Skin Cancer Treatment'],
      experience: '15+ years',
      education: [
        'MD - University of Toronto',
        'Dermatology Residency - Toronto General Hospital',
        'Fellowship in Laser Surgery - Harvard Medical School'
      ],
      certifications: [
        'Board Certified Dermatologist',
        'Fellow of the Royal College of Physicians',
        'American Society for Laser Medicine & Surgery'
      ],
      achievements: [
        'Top Dermatologist Award 2023',
        'Published 50+ research papers',
        'International speaker on laser treatments'
      ],
      bio: 'Dr. Sarah Chen is a renowned dermatologist with over 15 years of experience in advanced laser treatments. She has pioneered several innovative techniques in laser hair removal and skin rejuvenation.',
      languages: ['English', 'Mandarin', 'French']
    },
    {
      id: 2,
      name: 'Dr. Michael Rodriguez',
      title: 'Senior Dermatologist',
      image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['Acne Treatment', 'Pigmentation Disorders', 'Anti-Aging'],
      experience: '12+ years',
      education: [
        'MD - McMaster University',
        'Dermatology Residency - Mount Sinai Hospital',
        'Advanced Training in Cosmetic Dermatology'
      ],
      certifications: [
        'Board Certified Dermatologist',
        'Canadian Dermatology Association Member',
        'International Society of Dermatology'
      ],
      achievements: [
        'Excellence in Patient Care Award',
        'Research Grant Recipient',
        'Mentor of the Year 2022'
      ],
      bio: 'Dr. Rodriguez specializes in treating complex skin conditions and has extensive experience in laser therapy for acne and pigmentation disorders.',
      languages: ['English', 'Spanish']
    },
    {
      id: 3,
      name: 'Dr. Emily Watson',
      title: 'Cosmetic Dermatologist',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['Laser Hair Removal', 'Skin Rejuvenation', 'Vascular Lesions'],
      experience: '8+ years',
      education: [
        'MD - University of British Columbia',
        'Dermatology Residency - Vancouver General Hospital',
        'Cosmetic Dermatology Fellowship - UCLA'
      ],
      certifications: [
        'Board Certified Dermatologist',
        'American Academy of Dermatology',
        'Certified Laser Safety Officer'
      ],
      achievements: [
        'Rising Star in Dermatology 2021',
        'Patient Choice Award',
        'Innovation in Laser Technology'
      ],
      bio: 'Dr. Watson is passionate about helping patients achieve their aesthetic goals through safe and effective laser treatments.',
      languages: ['English', 'German']
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
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Meet Our Expert Team</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Board-certified dermatologists with extensive experience in advanced laser treatments and cosmetic procedures
            </p>
          </motion.div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    src={doctor.image}
                    alt={doctor.name}
                    className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                  />
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-4xl font-bold text-gray-900 mb-2">{doctor.name}</h2>
                      <p className="text-xl text-blue-600 font-semibold mb-4">{doctor.title}</p>
                      <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Award className="text-blue-600 mr-2" size={20} />
                          Specialties
                        </h4>
                        <ul className="space-y-1">
                          {doctor.specialties.map((specialty, idx) => (
                            <li key={idx} className="text-gray-600">• {specialty}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Users className="text-blue-600 mr-2" size={20} />
                          Experience
                        </h4>
                        <p className="text-gray-600">{doctor.experience}</p>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">Languages:</p>
                          <p className="text-gray-600">{doctor.languages.join(', ')}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <BookOpen className="text-blue-600 mr-2" size={20} />
                        Education
                      </h4>
                      <ul className="space-y-1">
                        {doctor.education.map((edu, idx) => (
                          <li key={idx} className="text-gray-600">• {edu}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Certifications</h4>
                        <ul className="space-y-1">
                          {doctor.certifications.map((cert, idx) => (
                            <li key={idx} className="text-gray-600 text-sm">• {cert}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Achievements</h4>
                        <ul className="space-y-1">
                          {doctor.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-gray-600 text-sm">• {achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Calendar size={20} />
                      <span>Book with {doctor.name.split(' ')[1]}</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Team?</h2>
            <p className="text-xl text-gray-600">
              Our commitment to excellence and patient care sets us apart
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Board Certified',
                description: 'All our doctors are board-certified dermatologists with extensive training'
              },
              {
                icon: Star,
                title: 'Proven Results',
                description: 'Over 10,000 successful treatments with 98% patient satisfaction rate'
              },
              {
                icon: BookOpen,
                title: 'Continuous Learning',
                description: 'Regular training on latest techniques and technology advancements'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Doctors;