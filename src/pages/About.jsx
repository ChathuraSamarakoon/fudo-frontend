import { FaUtensils, FaClock, FaHeart, FaSmile } from 'react-icons/fa';

function About() {
  return (
    <div className="bg-white min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">About Fudo</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We are passionate about delivering the best culinary experiences straight to your doorstep, with speed and love.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            { icon: <FaUtensils />, title: "Fresh Food", desc: "Always prepared with fresh, high-quality ingredients." },
            { icon: <FaClock />, title: "Fast Delivery", desc: "Your food arrives hot and ready to eat, on time." },
            { icon: <FaHeart />, title: "Made with Love", desc: "Prepared by the best chefs in your neighborhood." },
            { icon: <FaSmile />, title: "Happy Customers", desc: "Thousands of satisfied foodies trust us daily." }
          ].map((item, index) => (
            <div key={index} className="p-8 bg-gray-50 rounded-3xl text-center hover:shadow-lg transition-shadow">
              <div className="text-fudo-red text-4xl mb-6 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-gray-900 rounded-3xl p-12 text-white flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-extrabold mb-6">Our Story</h2>
            <p className="text-gray-300 leading-relaxed">
              Fudo started with a simple idea: that everyone deserves delicious food without the hassle of cooking or going out. 
              From a small local service to a community-driven delivery platform, our journey has always been about one thing: 
              making your life easier and your meals tastier.
            </p>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000" 
              alt="Delicious Food" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;