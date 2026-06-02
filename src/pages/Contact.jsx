import { useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import messageService from '../services/messageService';

function Contact() {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message_text: ''
  });

  const [status, setStatus] = useState(''); 

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setStatus('sending');

    try {
      
      await messageService.sendMessage(formData);
      setStatus('success');
      
      setFormData({ name: '', email: '', subject: '', message_text: '' });
      
      
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-10 py-16">
      
      
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-fudo-red mb-4">
          We're Here to Help
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto font-medium">
          Got a question about an order, want to partner with us, or just want to say hi? Drop us a line and our friendly team will get back to you faster than our deliveries.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        
        <div className="lg:w-1/3 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-8">
            
            <div className="flex gap-4 items-start">
              <div className="bg-red-50 p-3 rounded-full text-fudo-red">
                <FaEnvelope size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email Us</p>
                <p className="font-bold text-gray-900">support@fudo.app</p>
                <p className="text-sm text-gray-500 mt-1">For general inquiries and support.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-green-50 p-3 rounded-full text-green-600">
                <FaPhoneAlt size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Call Us</p>
                <p className="font-bold text-gray-900">074 15 90 060</p>
                <p className="text-sm text-gray-500 mt-1">Mon-Sun, 8am to Midnight EST.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-gray-100 p-3 rounded-full text-gray-600">
                <FaMapMarkerAlt size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Headquarters</p>
                <p className="font-bold text-gray-900">Welimada</p>
                <p className="text-sm text-gray-500 mt-1">Medagama,Welimada</p>
              </div>
            </div>

          </div>
        </div>

        
        <div className="lg:w-2/3 bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h3>
          <p className="text-gray-500 text-sm mb-8 font-medium">Fill out the form below and we'll aim to reply within 24 hours.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Jane Doe" 
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-fudo-red/50 focus:border-fudo-red font-medium"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="jane@example.com" 
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-fudo-red/50 focus:border-fudo-red font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">What is this regarding?</label>
              <select 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-fudo-red/50 focus:border-fudo-red font-medium text-gray-700 appearance-none"
              >
                <option value="">Select a topic...</option>
                <option value="Order Issue">Order Issue</option>
                <option value="Partnership">Partnership</option>
                <option value="Feedback">Feedback</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Your Message</label>
              <textarea 
                name="message_text"
                value={formData.messageText}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Please provide details so we can help you faster..." 
                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-fudo-red/50 focus:border-fudo-red font-medium resize-none"
              ></textarea>
            </div>

            
            {status === 'success' && <p className="text-green-600 font-bold text-sm">Message sent successfully!</p>}
            {status === 'error' && <p className="text-red-600 font-bold text-sm">Failed to send message. Try again.</p>}

            <button 
              type="submit" 
              disabled={status === 'sending'}
              className="bg-fudo-red text-white w-max px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors shadow-md disabled:bg-red-400"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message ✈️'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;