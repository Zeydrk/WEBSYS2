import { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you use react-router for links

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Transmitting message to HQ:", formData);
    // Add your email sending logic here
  };

  return (
    <>
      {/* Main Container - Matches ProductPage Background */}
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-purple-900 to-slate-900 text-gray-100 font-sans">
        
        
        <div className="container mx-auto p-4 md:p-8">
          {/* Breadcrumbs - Matches ProductPage */}
          <div className="breadcrumbs text-sm ml-2 mb-6 text-purple-300">
            <ul>
              <li className="hover:text-white transition-colors"><Link to="/">Home</Link></li>
              <li className="font-semibold text-white">Contact Comms</li>
            </ul>
          </div>

          {/* Main Glass Card */}
          <div className="card lg:card-side bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden max-w-5xl mx-auto">
            
            {/* Left Side: Admin Information / Decor */}
            <div className="lg:w-2/5 bg-linear-to-br from-purple-900/80 to-slate-900/80 p-8 flex flex-col justify-between relative overflow-hidden">
              {/* Decorative Circle for "Space" vibe */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
              
              <div>
                <h2 className="card-title text-3xl lg:text-4xl font-extrabold mb-4 text-white">
                  Contact HQ
                </h2>
                <p className="text-purple-200 text-lg mb-8">
                  Encountered a glitch in the matrix or need assistance with your intergalactic shipment? Open a channel below.
                </p>

                {/* Contact Details */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-slate-800/50 rounded-lg text-purple-400">
                      {/* Map Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Orbital Station Alpha</h3>
                      <p className="text-sm text-slate-400">Sector 7G, Outer Rim Territories</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-slate-800/50 rounded-lg text-purple-400">
                      {/* Mail Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Subspace Frequency</h3>
                      <p className="text-sm text-slate-400">help@interstellarpets.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-purple-500/30">
                <p className="text-xs text-slate-400">Response time varies based on light-speed delays.</p>
              </div>
            </div>

            {/* Right Side: The Form */}
            <div className="lg:w-3/5 p-8 lg:p-10 bg-slate-800/20">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Header for mobile visibility mainly */}
                <div className="mb-2">
                   <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-purple-300">
                    Transmit Message
                   </h1>
                </div>

                {/* Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-purple-300 font-semibold">Pilot Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Han Solo"
                    className="input input-bordered w-full bg-slate-900/50 border-white/20 text-white placeholder-slate-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-purple-300 font-semibold">Comms ID (Email)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="falcon@alliance.org"
                    className="input input-bordered w-full bg-slate-900/50 border-white/20 text-white placeholder-slate-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                {/* Message Body */}
                <div className="form-control flex flex-col">
                  <label className="label">
                    <span className="label-text text-purple-300 font-semibold">Transmission Content</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-32 w-130 bg-slate-900/50 border-white/20 text-white placeholder-slate-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    placeholder="Describe your issue or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="mt-4">
                  <button className="btn btn-primary w-full bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border-none text-white shadow-xl shadow-purple-900/50 text-lg uppercase tracking-wide">
                    Initialize Transmission
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}