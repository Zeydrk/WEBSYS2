// import { useState, FormEvent } from "react";
import { useState, type FormEvent } from "react";
// import { Link } from "react-router-dom";
import image from "../imgs/shop-banner-1.jpg";

export default function Manage() {
  // TypeScript: Explicitly typing the state as a boolean
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // TypeScript: Typing the event as a Form Event on an HTML Form Element
  const handleAddPet = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Pet Added Successfully! (Connect backend to save data)");
    setIsModalOpen(false);
  };

  return (
    <>
      {/* main div */}
      <div>
        <div className="min-h-screen bg-linear-to-b from-slate-900 via-purple-900 to-slate-900 text-gray-100 font-sans relative">
          {/* hero banner */}
          <div
            className="hero min-h-[30vh] lg:min-h-[40vh]"
            style={{
              backgroundImage:
                "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
              backgroundAttachment: "fixed",
            }}
          >
            <div className="hero-overlay bg-black/60 backdrop-blur-[2px]"></div>
          </div>

          {/* Seller Profile Section */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="-mt-24 mb-12 flex flex-col md:flex-row items-center md:items-end gap-6">
              {/* Avatar */}
              <div className="avatar">
                <div className="w-40 rounded-full ring-4 ring-slate-900 ring-offset-4 ring-offset-purple-600 shadow-2xl shadow-purple-500/50">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="Seller Profile"
                  />
                </div>
              </div>

              {/* Seller Details */}
              <div className="flex-1 text-center md:text-left pt-4 md:pt-0">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                    Nebula Trader
                  </h1>
                  {/* Verified Badge Icon */}
                  <div
                    className="tooltip tooltip-right tooltip-primary"
                    data-tip="Verified Seller"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8 text-cyan-400"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <p className="text-purple-200 font-medium text-lg mb-4">
                  Exotic Creature Specialist • Sector 7
                </p>
              </div>

              {/* ADD BUTTON */}
              <div className="pb-4 md:pb-0">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn btn-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white border-none shadow-lg shadow-emerald-500/30 flex items-center gap-2 group transition-all duration-300 hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="size-6 group-hover:rotate-90 transition-transform"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  Add New Pet
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Wrapper */}
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar and Filters */}
              <div className="w-full lg:w-1/4 shrink-0 lg:sticky lg:top-8 h-fit">
                {/* Breadcrumbs */}
                <div className="breadcrumbs text-sm mb-4 text-purple-200">
                  <ul>
                    <li>
                      <a className="hover:text-white transition-colors">Home</a>
                    </li>
                    <li className="font-bold text-white">Products</li>
                  </ul>
                </div>

                {/* Heading */}
                <div className="mb-4 border-b border-white/10 pb-2">
                  <h1 className="text-xl font-bold text-white">
                    5 Results found
                  </h1>
                </div>

                {/* Filter Card */}
                <div className="card bg-slate-800/40 backdrop-blur-md border border-white/10 shadow-xl overflow-hidden">
                  <div className="card-body p-6">
                    <h3 className="card-title text-lg text-purple-300">
                      Filter Options
                    </h3>
                    {/* Search Bar */}
                    <div className="form-control w-full mt-2">
                      <label className="input input-bordered border-white/20 bg-slate-900/50 flex items-center gap-2 focus-within:border-purple-400 focus-within:ring-1 focus-within:ring-purple-400 text-sm">
                        <svg
                          className="h-4 w-4 opacity-70"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <path d="m21 21-4.3-4.3"></path>
                        </svg>
                        <input
                          type="search"
                          className="grow text-white placeholder-gray-400"
                          placeholder="Search species..."
                          required
                        />
                      </label>
                    </div>

                    {/* Species Type Dropdown */}
                    <div className="mt-4">
                      <div className="collapse collapse-arrow border border-white/10 bg-slate-900/30 rounded-lg">
                        <input type="checkbox" />
                        <div className="collapse-title font-medium text-white group-hover:text-purple-300 transition-colors">
                          Specie Type
                        </div>
                        <div className="collapse-content text-sm text-gray-300">
                          <ul className="space-y-2 py-2">
                            <li className="flex items-center gap-2 hover:text-purple-300 cursor-pointer">
                              <input
                                type="checkbox"
                                className="checkbox checkbox-xs checkbox-primary"
                              />{" "}
                              Specie 1
                            </li>
                            <li className="flex items-center gap-2 hover:text-purple-300 cursor-pointer">
                              <input
                                type="checkbox"
                                className="checkbox checkbox-xs checkbox-primary"
                              />{" "}
                              Specie 2
                            </li>
                            <li className="flex items-center gap-2 hover:text-purple-300 cursor-pointer">
                              <input
                                type="checkbox"
                                className="checkbox checkbox-xs checkbox-primary"
                              />{" "}
                              Specie 3
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {/* Product Card 1 */}
                  <div className="card w-full bg-base-100 shadow-xl image-full hover:scale-[1.02] transition-transform duration-300 hover:shadow-purple-500/20">
                    <figure>
                      <img
                        src={image}
                        alt="Pet"
                        className="group-hover:scale-110 transition-transform duration-500"
                      />
                    </figure>
                    <div className="card-body">
                      <div className="badge badge-secondary badge-outline mb-2">
                        planet Name
                      </div>
                      <h2 className="card-title text-2xl text-white">Pet 1</h2>
                      <p className="text-gray-200">
                        Rare space creature with unique abilities.
                      </p>
                      <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-white/20">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-300 uppercase">
                            Price
                          </span>
                          <span className="text-xl font-bold text-primary-content">
                            450.00 GC
                          </span>
                        </div>
                        <button className="btn btn-primary btn-sm md:btn-md shadow-lg shadow-purple-900/50 border-none bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white">
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Additional cards here... */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL POPUP FORM */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-900/50 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-900 via-purple-900/50 to-slate-900 p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white">Add New Creature</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-ghost btn-sm btn-circle text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleAddPet} className="p-6 space-y-4">
                
                {/* Pet Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Creature Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Void Crawler"
                    className="input input-bordered bg-slate-800/50 border-white/10 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-white w-full"
                    required
                  />
                </div>

                {/* Price and Planet */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-300">Price (GC)</span>
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="input input-bordered bg-slate-800/50 border-white/10 focus:border-purple-400 text-white w-full"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-300">Planet Origin</span>
                    </label>
                    <select className="select select-bordered bg-slate-800/50 border-white/10 text-white w-full">
                      <option disabled defaultValue="Select Planet">Select Planet</option>
                      <option>Mars</option>
                      <option>Neptune</option>
                      <option>Kepler-186f</option>
                      <option>Sector 7</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="form-control flex flex-col">
                  <label className="label">
                    <span className="label-text text-gray-300">Description</span>
                  </label>
                  <textarea
                    className="textarea w-110 textarea-bordered bg-slate-800/50 border-white/10 focus:border-purple-400 text-white h-24"
                    placeholder="Describe the creature's abilities..."
                  ></textarea>
                </div>

                {/* Image Upload */}
                <div className="form-control">
                    <label className="label"><span className="label-text text-gray-300">Image</span></label>
                    <input type="file" className="file-input file-input-bordered file-input-primary w-full bg-slate-800/50 text-gray-300" />
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-ghost text-gray-400 hover:text-white flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary bg-gradient-to-r from-purple-600 to-indigo-600 border-none text-white flex-1 shadow-lg shadow-purple-900/40"
                  >
                    Publish Creature
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}