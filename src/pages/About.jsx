import React from 'react';
import { Shield, Award, Heart, Users, Truck, Leaf } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Every product undergoes strict quality checks to ensure you receive only the best from our farm.'
    },
    {
      icon: Heart,
      title: 'Animal Welfare',
      description: 'Our chickens are raised in a natural, stress-free environment with proper nutrition and care.'
    },
    {
      icon: Leaf,
      title: 'Sustainable Farming',
      description: 'We practice eco-friendly farming methods that protect the environment for future generations.'
    },
    {
      icon: Users,
      title: 'Family Owned',
      description: 'A family business with over 10 years of experience in poultry farming and customer service.'
    },
    {
      icon: Truck,
      title: 'Fresh Delivery',
      description: 'Direct from farm to your table with our efficient cold-chain delivery system.'
    },
    {
      icon: Award,
      title: 'Certified Quality',
      description: 'Licensed and certified by relevant authorities, ensuring compliance with all health standards.'
    }
  ];

  const team = [
    {
      name: 'Ashirazy zuberi',
      role: 'Farm Owner & Manager',
      image: 'https://i.imgur.com/WngXsLS.jpeg',
      description: 'With over 10 years in poultry farming, Ashirazy ensures our chickens receive the best care.'
    },
    {
      name: 'Issah chatila',
      role: 'Quality Control Manager & CTO',
      image: 'https://i.imgur.com/r0Zp0VS.jpeg',
      description: 'Issah oversees all quality control processes and ensures product safety standards.'
    },
    {
      name: 'Peter Mwangi',
      role: 'Delivery Coordinator',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Peter manages our delivery network to ensure fresh products reach you on time.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center  text-white ">
            <h1 className="text-4xl lg:text-6xl  font-bold mb-6">About Issahbati Farm</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Committed to providing the freshest, highest quality poultry products while maintaining 
              sustainable farming practices and exceptional animal welfare standards.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Fresh Farm began as a small family operation in 2003 with just 50 chickens and a dream 
                  to provide fresh, healthy poultry products to our local community. What started in our 
                  backyard has grown into a thriving farm serving hundreds of families across the region.
                </p>
                <p>
                  Our commitment to quality has never wavered. We believe that happy, healthy chickens 
                  produce the best eggs and meat. That's why we've invested in spacious, clean facilities 
                  and natural feeding programs that ensure our birds live comfortable, stress-free lives.
                </p>
                <p>
                  Today, Fresh Farm is proud to be a trusted source of premium poultry products, 
                  combining traditional farming wisdom with modern sustainable practices to deliver 
                  exceptional quality to your table.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/1769279/pexels-photo-1769279.jpeg"
                alt="Farm chickens"
                className="rounded-lg shadow-md"
              />
              <img
                src="https://images.pexels.com/photos/6294107/pexels-photo-6294107.jpeg"
                alt="Fresh eggs"
                className="rounded-lg shadow-md mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-1xl mx-auto">
              These core values guide everything we do, from caring for our animals to serving our customers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-colors">
                  <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The dedicated people behind Issahbati Farm who work tirelessly to bring you the best products
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-emerald-100">Years of Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-emerald-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-emerald-100">Chickens on Farm</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-emerald-100">Natural Feed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Experience Issahbati Farm Quality?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Join thousands of satisfied customers who trust Issahbati Farm for their poultry needs
          </p>
          <div className=" flex sm:flex-cols-2 gap-4 justify-center">
            <a
              href="/products"
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              Shop Now
            </a>
            <a
              href="/contact"
              className="border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;