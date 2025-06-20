import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <section className="w-full min-h-screen bg-[#C6A38D] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#fffff0] rounded-2xl shadow-xl overflow-hidden mb-20 transition-all duration-300 hover:shadow-2xl">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-10">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
                Pearl Homestay: Your Gateway to Mahakal Temple
              </h2>
              <p className="text-indigo-600 font-medium mb-6 uppercase tracking-wider text-sm">About Us</p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Experience the divine aura of Mahakaleshwar Temple with a comfortable stay at 
                Pearl Homestay in Ujjain. Our thoughtfully designed accommodation offers pilgrims and tourists 
                the perfect retreat after visiting one of India's most revered Jyotirlingas.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Located in close proximity to the sacred Mahakal Temple, our homestay provides 
                a serene environment where you can reflect on your spiritual journey while enjoying 
                modern comforts. We understand the significance of this pilgrimage and strive to enhance 
                your divine experience in the holy city of Ujjain.
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
              Founded with the vision to serve devotees visiting the magnificent Mahakaleshwar Temple, 
              Pearl Homestay offers a blend of spiritual ambiance and modern comfort. We understand the 
              sacred journey you've undertaken to witness the divine presence of Lord Shiva at one of his 
              most powerful abodes.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our homestay was established to provide pilgrims with a restful sanctuary after participating 
              in the powerful Bhasma Aarti and other rituals at the Mahakal Temple. We aim to extend the 
              spiritual experience beyond the temple premises through our warm hospitality and serene environment.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-50 to-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-8">Key Features</h3>
            <ul className="space-y-5 text-gray-700">
              <li className="flex items-center">
                <span className="text-indigo-600 mr-3 text-xl">✦</span>
                <span className="text-lg">Just minutes away from Mahakaleshwar Temple</span>
              </li>
              <li className="flex items-center">
                <span className="text-indigo-600 mr-3 text-xl">✦</span>
                <span className="text-lg">Guidance for temple rituals and darshan</span>
              </li>
              <li className="flex items-center">
                <span className="text-indigo-600 mr-3 text-xl">✦</span>
                <span className="text-lg">Sattvic meals available on request</span>
              </li>
              <li className="flex items-center">
                <span className="text-indigo-600 mr-3 text-xl">✦</span>
                <span className="text-lg">Easy access to other sacred sites in Ujjain</span>
              </li>
              <li className="flex items-center">
                <span className="text-indigo-600 mr-3 text-xl">✦</span>
                <span className="text-lg">Peaceful environment for meditation and reflection</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
