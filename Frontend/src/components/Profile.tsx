import { useState } from "react";
import { Link } from "react-router-dom";
// import sampleAvatar from "../imgs/shop-banner-1.jpg"; // Replace with your default avatar path or keep null

export default function Profile() {
  // Mock User State
  const [user, setUser] = useState({
    username: "skywalker_01",
    name: "Luke Skywalker",
    email: "luke@rebellion.org",
    phone: "********88",
    gender: "male",
    birthDay: "25",
    birthMonth: "09",
    birthYear: "1990",
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-purple-900 to-slate-900 text-gray-100 font-sans p-4 md:p-8">
      
      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm ml-2 mb-6 text-purple-300 max-w-7xl mx-auto">
        <ul>
          <li className="hover:text-white transition-colors"><Link to="/">Home</Link></li>
          <li className="font-semibold text-white">My Account</li>
        </ul>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        
        {/* =======================
            LEFT SIDEBAR (Menu)
           ======================= */}
        <aside className="w-full md:w-64 shrink-0">
          
          {/* User Mini Summary */}
          <div className="flex items-center gap-4 mb-8 px-2">
             <div className="avatar">
                <div className="w-12 h-12 rounded-full ring ring-purple-500 ring-offset-base-100 ring-offset-2">
                   {/* Placeholder or User Image */}
                   <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="avatar" />
                </div>
             </div>
             <div>
                <div className="font-bold truncate text-white">{user.username}</div>
                <div className="text-xs text-slate-400 flex items-center gap-1 cursor-pointer hover:text-purple-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                  Edit Profile
                </div>
             </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1">
             {/* My Account Group */}
             <div className="collapse collapse-arrow bg-transparent">
                <input type="checkbox" defaultChecked /> 
                <div className="collapse-title font-bold text-white flex gap-2 items-center">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                   My Account
                </div>
                <div className="collapse-content space-y-3 pl-9">
                   <Link to="#" className="block text-purple-300 font-medium">Profile</Link>
                   <Link to="#" className="block text-slate-400 hover:text-purple-300 transition-colors">Addresses</Link>
                   <Link to="#" className="block text-slate-400 hover:text-purple-300 transition-colors">Change Password</Link>
                   <Link to="#" className="block text-slate-400 hover:text-purple-300 transition-colors">Privacy Settings</Link>
                </div>
             </div>

             {/* Notifications */}
             <div className="px-4 py-3 font-bold text-slate-300 hover:text-white flex gap-2 items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                Notification Settings
             </div>
          </div>
        </aside>

        {/* =======================
            MAIN CONTENT (Right)
           ======================= */}
        <main className="flex-1 card bg-slate-800/50 backdrop-blur-md border border-purple-500/20 shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10">
             <h1 className="text-2xl font-bold text-white">My Profile</h1>
             <p className="text-slate-400 text-sm mt-1">Manage and protect your account</p>
          </div>

          {/* Content Body */}
          <div className="p-6 md:p-8 flex flex-col-reverse md:flex-row gap-8">
             
             {/* --- FORM SECTION --- */}
             <div className="flex-1 space-y-6">
                
                {/* Username */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                   <label className="w-32 text-slate-400 md:text-right text-sm">Username</label>
                   <div className="flex-1">
                      <div className="text-white font-medium">{user.username}</div>
                      <div className="text-xs text-slate-500 mt-1">Username can only be changed once.</div>
                   </div>
                </div>

                {/* Name */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                   <label className="w-32 text-slate-400 md:text-right text-sm">Name</label>
                   <div className="flex-1">
                      <input 
                        type="text" 
                        value={user.name}
                        onChange={(e) => setUser({...user, name: e.target.value})}
                        className="input input-bordered h-10 w-full bg-slate-900/50 border-white/20 focus:border-purple-500 text-white" 
                      />
                   </div>
                </div>

                {/* Email */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                   <label className="w-32 text-slate-400 md:text-right text-sm">Email</label>
                   <div className="flex-1 flex gap-2 items-center">
                      <span className="text-white">{user.email}</span>
                      <button className="text-purple-400 underline text-sm hover:text-purple-300">Change</button>
                   </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                   <label className="w-32 text-slate-400 md:text-right text-sm">Phone Number</label>
                   <div className="flex-1 flex gap-2 items-center">
                      <span className="text-white">{user.phone}</span>
                      <button className="text-purple-400 underline text-sm hover:text-purple-300">Change</button>
                   </div>
                </div>

                {/* Gender */}
                <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6">
                   <label className="w-32 text-slate-400 md:text-right text-sm pt-2">Gender</label>
                   <div className="flex-1 flex gap-4">
                      <label className="label cursor-pointer gap-2 justify-start">
                        <input type="radio" name="gender" className="radio radio-primary radio-sm border-white/30 checked:bg-purple-500" defaultChecked />
                        <span className="label-text text-slate-300">Male</span>
                      </label>
                      <label className="label cursor-pointer gap-2 justify-start">
                        <input type="radio" name="gender" className="radio radio-primary radio-sm border-white/30 checked:bg-purple-500" />
                        <span className="label-text text-slate-300">Female</span>
                      </label>
                      <label className="label cursor-pointer gap-2 justify-start">
                        <input type="radio" name="gender" className="radio radio-primary radio-sm border-white/30 checked:bg-purple-500" />
                        <span className="label-text text-slate-300">Other</span>
                      </label>
                   </div>
                </div>

                {/* Birthday */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                   <label className="w-32 text-slate-400 md:text-right text-sm">Date of Birth</label>
                   <div className="flex-1 flex gap-2">
                      {/* Day */}
                      <select className="select select-bordered select-sm bg-slate-900/50 border-white/20 text-white w-20">
                         <option disabled>Day</option>
                         <option selected>25</option>
                         <option>26</option>
                      </select>
                      {/* Month */}
                      <select className="select select-bordered select-sm bg-slate-900/50 border-white/20 text-white w-32">
                         <option disabled>Month</option>
                         <option selected>September</option>
                         <option>October</option>
                      </select>
                      {/* Year */}
                      <select className="select select-bordered select-sm bg-slate-900/50 border-white/20 text-white w-24">
                         <option disabled>Year</option>
                         <option selected>1990</option>
                         <option>1991</option>
                      </select>
                   </div>
                </div>

                {/* Save Button */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-6">
                    <div className="w-32 hidden md:block"></div> {/* Spacer */}
                    <button className="btn btn-primary w-24 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border-none text-white shadow-lg shadow-purple-900/50">
                        Save
                    </button>
                </div>

             </div>

             {/* --- AVATAR UPLOAD SECTION (Right Side) --- */}
             <div className="md:w-64 md:border-l md:border-white/10 flex flex-col items-center justify-center gap-4 py-4">
                <div className="avatar">
                    <div className="w-28 h-28 rounded-full bg-slate-700 ring-2 ring-white/20 overflow-hidden">
                       <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Profile" className="object-cover" />
                    </div>
                </div>
                
                <input type="file" id="file-upload" className="hidden" />
                <label htmlFor="file-upload" className="btn btn-outline btn-sm text-purple-300 border-white/20 hover:bg-white/10 hover:border-white/40 hover:text-white">
                   Select Image
                </label>

                <div className="text-center text-xs text-slate-500 space-y-1">
                   <p>File size: maximum 1 MB</p>
                   <p>File extension: .JPEG, .PNG</p>
                </div>
             </div>

          </div>
        </main>

      </div>
    </div>
  );
}