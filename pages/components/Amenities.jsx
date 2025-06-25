"use client";
import Image from "next/image";
import ac from "@/public/icons/air-conditioner.png";
import bathroom from "@/public/icons/male-and-female.png";
import family from "@/public/icons/parents.png";
import parking from "@/public/icons/garage.png";
import power from "@/public/icons/generator.png";
import tea from "@/public/icons/coffee-cup.png";
import toiletries from "@/public/icons/toiletries.png";
import wifi from "@/public/icons/travel.png";

const Amenities = () => {
  const services = [
    { id: "1", text: "Luxurious Air Conditioning", icon: ac },
    { id: "2", text: "Modern Clean Bathrooms", icon: bathroom },
    { id: "3", text: "Secure Parking Facility", icon: parking },
    { id: "4", text: "High-Speed Internet", icon: wifi },
    { id: "5", text: "Premium Toiletries", icon: toiletries },
    { id: "6", text: "Welcoming Family Space", icon: family },
    { id: "7", text: "24/7 Security", icon: power },
    { id: "8", text: "24/7 Room Service", icon: tea },
  ];

  return (
    <section id="services" className="py-20 bg-[#C6A38D] border-l-[10px] border-r-[10px] border-b-[10px] border-[#8B593E]">
      <div className="lg:max-w-[1300px] mx-auto px-6">
        <header className="text-center mb-16">
          <h2 className="text-5xl md:text-5xl sm:text-4xl font-bold mb-6 text-neutral-800">
            Premium <span className="text-primary relative">Amenities
              <span className="absolute bottom-1 left-0 w-full h-2 bg-primary/30"></span>
            </span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Experience luxury and comfort with our carefully curated selection of
            premium amenities designed to make your stay exceptional.
          </p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="flex flex-col items-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="rounded-full p-6 mb-4 bg-white shadow-lg group-hover:shadow-xl group-hover:bg-primary/10 transition-all duration-300 border-6 border-[#8B593E]">
                <Image
                  src={service.icon}
                  alt={service.text}
                  className="w-12 h-12 object-cover group-hover:scale-110 transition-transform duration-300"
                  width={48}
                  height={48}
                />
              </div>
              <p className="text-center font-medium text-neutral-700 group-hover:text-primary transition-colors duration-300">
                {service.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
