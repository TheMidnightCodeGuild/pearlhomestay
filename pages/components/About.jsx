import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <section className="w-full min-h-screen bg-[#C6A38D] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-20 transition-all duration-300 hover:shadow-2xl">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-10">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
                Pearl Homestay: Where Comfort Meets Cultural Heritage
              </h2>
              <p className="text-indigo-600 font-medium mb-6 uppercase tracking-wider text-sm">About Us</p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Experience the perfect blend of modern comfort and traditional hospitality at 
                Pearl Homestay in Ujjain. Our thoughtfully designed accommodation offers guests 
                an authentic glimpse into the rich cultural heritage of this ancient holy city.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our peaceful surroundings and warm hospitality create a welcoming atmosphere 
                that feels like a home away from home. Step into a sanctuary where you can 
                relax after exploring the spiritual wonders of Ujjain, one of India's most 
                sacred cities.
              </p>
            </div>
            <div className="md:w-1/2 relative">
              <Image 
                src="/images/about.webp" 
                alt="Pearl Homestay Exterior" 
                className="w-full h-full object-cover"
                width={600}
                height={500}
                priority
                quality={100}
                unoptimized={true}
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8 bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Our Story</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Discover the charm and warmth of traditional Indian hospitality at 
              Pearl Homestay in Ujjain. Our property combines comfort with convenience, 
              offering guests a unique and memorable stay in this historically significant city.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our serene environment and convenient location make it the perfect base for 
              pilgrims and tourists alike. Here, you'll find yourself embraced by genuine 
              hospitality, allowing you to experience the spiritual essence of Ujjain 
              while enjoying all the comforts of home.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-50 to-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-8">Key Features</h3>
            <ul className="space-y-5 text-gray-700">
              <li className="flex items-center">
                <span className="text-indigo-600 mr-3 text-xl">✦</span>
                <span className="text-lg">Prime location in Ujjain</span>
              </li>
              <li className="flex items-center">
                <span className="text-indigo-600 mr-3 text-xl">✦</span>
                <span className="text-lg">Comfortable, well-appointed rooms</span>
              </li>
              <li className="flex items-center">
                <span className="text-indigo-600 mr-3 text-xl">✦</span>
                <span className="text-lg">Traditional Malwa hospitality</span>
              </li>
              <li className="flex items-center">
                <span className="text-indigo-600 mr-3 text-xl">✦</span>
                <span className="text-lg">Close to major temples and attractions</span>
              </li>
              <li className="flex items-center">
                <span className="text-indigo-600 mr-3 text-xl">✦</span>
                <span className="text-lg">Authentic local experiences</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
