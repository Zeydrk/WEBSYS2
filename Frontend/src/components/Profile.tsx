import React, { useState } from "react";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------
// 1. TYPE DEFINITIONS
// ----------------------------------------------------------------------

// Define the shape of the User object
interface User {
  username: string;
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  birthDay: string;
  birthMonth: string;
  birthYear: string;
}

// Define the shape of the single Address object
interface Address {
  fullName: string;
  phone: string;
  region: string;
  province: string;
  city: string;
  barangay: string;
  postalCode: string;
  street: string;
  label: 'Home' | 'Work' | string;
}

// Define props for the sub-components
interface ProfileFormProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

interface AddressFormProps {
  address: Address;
  setAddress: React.Dispatch<React.SetStateAction<Address>>;
}

// ----------------------------------------------------------------------
// 2. MAIN COMPONENT (Profile)
// ----------------------------------------------------------------------

export default function Profile() {
  // State to manage which content to show: 'profile', 'address', 'password'
  const [activeTab, setActiveTab] = useState<string>("profile");

  // Mock User State (Type: User)
  const [user, setUser] = useState<User>({
    username: "skywalker_01",
    name: "Luke Skywalker",
    email: "luke@rebellion.org",
    phone: "********88",
    gender: "male",
    birthDay: "25",
    birthMonth: "09",
    birthYear: "1990",
  });

  // Mock Single Address State (Type: Address)
  const [address, setAddress] = useState<Address>({
    fullName: "Luke Skywalker",
    phone: "(+63) 912 345 6789",
    region: "Outer Rim Territories",
    province: "Tatooine",
    city: "Mos Eisley",
    barangay: "Cantina District",
    postalCode: "1138",
    street: "Hut 4, Lars Homestead",
    label: "Home"
  });

  // Helper to render content based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case "password":
        return <ChangePassword />;
      default:
        return <ProfileForm user={user} setUser={setUser} />;
    }
  };

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
                   <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="avatar" />
                </div>
             </div>
             <div>
               <div className="font-bold truncate text-white">{user.name}</div>
                <div 
                  onClick={() => setActiveTab("profile")}
                  className="text-xs text-slate-400 flex items-center gap-1 cursor-pointer hover:text-purple-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                  Profile
                </div>
             </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1">
             <div className="collapse collapse-arrow bg-transparent">
                <input type="checkbox" defaultChecked /> 
                <div className="collapse-title font-bold text-white flex gap-2 items-center">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                   My Account
                </div>
                <div className="collapse-content space-y-3 pl-9">
                   <button 
                     onClick={() => setActiveTab("profile")}
                     className={`block text-left w-full transition-colors ${activeTab === 'profile' ? 'text-purple-300 font-medium' : 'text-slate-400 hover:text-purple-300'}`}
                   >
                     Profile
                   </button>
                   
                   <button 
                     onClick={() => setActiveTab("password")}
                     className={`block text-left w-full transition-colors ${activeTab === 'password' ? 'text-purple-300 font-medium' : 'text-slate-400 hover:text-purple-300'}`}
                   >
                     Change Password
                   </button>
                </div>
             </div>
          </div>
        </aside>

        {/* =======================
            MAIN CONTENT (Right)
           ======================= */}
        <main className="flex-1 card bg-slate-800/50 backdrop-blur-md border border-purple-500/20 shadow-2xl min-h-[500px]">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10">
             <h1 className="text-2xl font-bold text-white capitalize">
               {activeTab === 'profile' && "My Profile"}
               {activeTab === 'password' && "Change Password"}
             </h1>
             <p className="text-slate-400 text-sm mt-1">
               {activeTab === 'profile' && "Manage and protect your account"}
               {activeTab === 'password' && "Ensure your account stays secure"}
             </p>
          </div>

          {/* Dynamic Content Body */}
          {renderContent()}

        </main>

      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 3. SUB-COMPONENTS
// ----------------------------------------------------------------------

const ProfileForm: React.FC<ProfileFormProps> = ({ user, setUser }) => {
  return (
    <div className="p-6 md:p-8 flex flex-col-reverse md:flex-row gap-8">
      {/* Form Section */}
      <div className="flex-1 space-y-6">


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

         {/* Name */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <label className="w-32 text-slate-400 md:text-right text-sm">Planet</label>
          <div className="flex-1">
            <input 
              type="text" 
              value="Earth"
              onChange={(e) => setUser({...user, name: e.target.value})}
              className="input input-bordered h-10 w-full bg-slate-900/50 border-white/20 focus:border-purple-500 text-white" 
            />
          </div>
        </div>

        {/* Birthday */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <label className="w-32 text-slate-400 md:text-right text-sm">Date of Birth</label>
          <div className="flex-1 flex gap-2">
            <select className="select select-bordered select-sm bg-slate-900/50 border-white/20 text-white w-20">
               <option disabled>Day</option>
               <option selected>25</option>
               <option>26</option>
            </select>
            <select className="select select-bordered select-sm bg-slate-900/50 border-white/20 text-white w-32">
               <option disabled>Month</option>
               <option selected>September</option>
               <option>October</option>
            </select>
            <select className="select select-bordered select-sm bg-slate-900/50 border-white/20 text-white w-24">
               <option disabled>Year</option>
               <option selected>1990</option>
               <option>1991</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-6">
           <div className="w-32 hidden md:block"></div>
           <button className="btn btn-primary w-24 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border-none text-white shadow-lg shadow-purple-900/50">
             Save
           </button>
        </div>
      </div>

      {/* Avatar Section */}
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
  );
}



const ChangePassword: React.FC = () => {
  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
       <div className="space-y-6">
          {/* Current Pw */}
          <div className="form-control w-full">
             <label className="label"><span className="label-text text-slate-400">Current Password</span></label>
             <input type="password" placeholder="••••••••" className="input input-bordered bg-slate-900/50 border-white/20 focus:border-purple-500 text-white w-full" />
          </div>

          {/* New Pw */}
          <div className="form-control w-full">
             <label className="label"><span className="label-text text-slate-400">New Password</span></label>
             <input type="password" placeholder="" className="input input-bordered bg-slate-900/50 border-white/20 focus:border-purple-500 text-white w-full" />
          </div>

          {/* Confirm Pw */}
          <div className="form-control w-full">
             <label className="label"><span className="label-text text-slate-400">Confirm New Password</span></label>
             <input type="password" placeholder="" className="input input-bordered bg-slate-900/50 border-white/20 focus:border-purple-500 text-white w-full" />
          </div>
          
          <div className="pt-4">
             <button className="btn btn-primary w-full md:w-auto px-8 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border-none text-white shadow-lg shadow-purple-900/50">
                Update Password
             </button>
             
          </div>
       </div>
    </div>
  );
}