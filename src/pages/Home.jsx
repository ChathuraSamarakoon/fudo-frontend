import { MapPin, Star, Clock } from 'lucide-react';

function Home() {
  return (
    // මුළු පිටුවම කොටස් දෙකකට (වම සහ දකුණ) කඩන්න flex පාවිච්චි කරලා තියෙනවා
    <div className="max-w-7xl mx-auto px-10 py-16 flex flex-col-reverse lg:flex-row items-center gap-12">
      
      {/* ⬅️ වම් පැත්ත: අකුරු සහ Search Box එක */}
      <div className="lg:w-1/2 flex flex-col gap-6">
        
        {/* පොඩි Badge එක */}
        <div className="bg-orange-100 text-orange-600 font-bold px-4 py-1.5 rounded-full w-max text-sm flex items-center gap-2">
          <span>🔥</span> #1 Food Delivery App
        </div>

        {/* ප්‍රධාන මාතෘකාව */}
        <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-gray-900">
          Delicious Food <br />
          <span className="text-fudo-red">Delivered</span> To Your <br />
          Door
        </h1>

        {/* විස්තරය */}
        <p className="text-lg text-gray-600 max-w-md leading-relaxed font-medium">
          Craving something amazing? Get the best local restaurants delivered straight to you, fresh and fast.
        </p>

        {/* Search Box එක */}
        <div className="relative mt-4 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <MapPin size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Enter your delivery address" 
            className="w-full pl-12 pr-32 py-4 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-fudo-red/50 focus:border-fudo-red transition-all font-medium"
          />
          <button className="absolute right-2 top-2 bottom-2 bg-fudo-red text-white px-6 rounded-full font-bold hover:bg-red-700 transition-colors shadow-md">
            Find Food
          </button>
        </div>

        {/* Happy Customers කෑල්ල */}
        <div className="flex items-center gap-4 mt-6">
          <div className="flex -space-x-3">
            <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300"></div>
            <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-400"></div>
            <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-500"></div>
            <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">+2k</div>
          </div>
          <p className="text-sm font-semibold text-gray-600">Happy customers in your area</p>
        </div>

      </div>

      {/* ➡️ දකුණු පැත්ත: කෑම පින්තූරය සහ Badges */}
      <div className="lg:w-1/2 relative w-full">
        {/* දැනට ඇත්ත පින්තූරයක් නැති නිසා අන්තර්ජාලයෙන් ලස්සන කෑම පින්තූරයක් දාලා තියෙන්නේ */}
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop" 
          alt="Delicious Pasta" 
          className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
        />

        {/* පින්තූරය උඩ තියෙන Time Badge එක */}
        <div className="absolute top-8 -left-8 bg-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold">Delivery Time</p>
            <p className="text-sm font-extrabold text-gray-900">Under 30 Min</p>
          </div>
        </div>

        {/* පින්තූරය උඩ තියෙන Rating Badge එක */}
        <div className="absolute bottom-10 right-[-20px] bg-white px-5 py-3 rounded-2xl shadow-xl flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 text-red-500">
            <Star size={20} fill="currentColor" />
            <span className="font-extrabold text-gray-900 text-lg">4.9</span>
          </div>
          <p className="text-xs text-gray-500 font-bold">Overall Rating</p>
        </div>

      </div>

    </div>
  );
}

// මෙන්න මේ පේළිය නැති නිසා තමයි අර Error එක ආවේ!
export default Home;