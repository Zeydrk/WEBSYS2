// import { Link } from "react-router-dom";
import image from "../imgs/shop-banner-1.jpg";

export default function Manage() {
  return (
    <>
      {/* main div */}
      <div>
        <div className="min-h-screen bg-linear-to-b from-slate-900 via-purple-900 to-slate-900 text-gray-100 font-sans">
          {/* hero banner */}
          <div
            className="hero min-h-[30vh] lg:min-h-[40vh]" // Adjusted height for better proportions
            style={{
              backgroundImage:
                "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
              backgroundAttachment: "fixed", // Parallax effect
            }}
          >
            {/* Darker overlay for better text contrast */}
            <div className="hero-overlay bg-black/60 backdrop-blur-[2px]"></div>
          </div>
          {/* Seller Profile Section - Overlapping the Banner */}
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

              {/* Action Button */}
            </div>
          </div>

          {/* Main Content Wrapper - Centered with max-width */}
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar and Filters */}
              {/* Made sticky on desktop so it follows scroll */}
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

                {/* Filter Card - Glass Effect */}
                <div className="card bg-slate-800/40 backdrop-blur-md border border-white/10 shadow-xl overflow-hidden">
                  <div className="card-body p-6">
                    {/* Header */}
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
                      <h2 className="card-title text-2xl text-white"></h2>
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

                  {/* Product Card 2 */}
                  <div className="card w-full bg-base-100 shadow-xl image-full hover:scale-[1.02] transition-transform duration-300 hover:shadow-purple-500/20 cursor-pointer group">
                    <figure>
                      <img
                        src={image}
                        alt="Pet"
                        className="group-hover:scale-110 transition-transform duration-500"
                      />
                    </figure>
                    <div className="card-body">
                      <div className="badge badge-accent badge-outline mb-2">
                        Planet Name
                      </div>
                      <h2 className="card-title text-2xl text-white">Pet 2</h2>
                      <p className="text-gray-200">
                        Quick Description of the pet.
                      </p>
                      <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-white/20">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-300 uppercase">
                            Price
                          </span>
                          <span className="text-xl font-bold text-primary-content">
                            300.00 GC
                          </span>
                        </div>
                        <button className="btn btn-primary btn-sm md:btn-md shadow-lg shadow-purple-900/50 border-none bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white">
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product Card 3 */}
                  <div className="card w-full bg-base-100 shadow-xl image-full hover:scale-[1.02] transition-transform duration-300 hover:shadow-purple-500/20 cursor-pointer group">
                    <figure>
                      <img
                        src={image}
                        alt="Pet"
                        className="group-hover:scale-110 transition-transform duration-500"
                      />
                    </figure>
                    <div className="card-body">
                      <div className="badge badge-outline text-white mb-2">
                        Planet Name
                      </div>
                      <h2 className="card-title text-2xl text-white">Pet 3</h2>
                      <p className="text-gray-200">
                        Quick Description of the pet.
                      </p>
                      <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-white/20">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-300 uppercase">
                            Price
                          </span>
                          <span className="text-xl font-bold text-primary-content">
                            150.00 GC
                          </span>
                        </div>
                        <button className="btn btn-primary btn-sm md:btn-md shadow-lg shadow-purple-900/50 border-none bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white">
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product Card 4 */}
                  <div className="card w-full bg-base-100 shadow-xl image-full hover:scale-[1.02] transition-transform duration-300 hover:shadow-purple-500/20 cursor-pointer group">
                    <figure>
                      <img
                        src={image}
                        alt="Pet"
                        className="group-hover:scale-110 transition-transform duration-500"
                      />
                    </figure>
                    <div className="card-body">
                      <div className="badge badge-secondary badge-outline mb-2">
                        Planet Name
                      </div>
                      <h2 className="card-title text-2xl text-white">Pet 4</h2>
                      <p className="text-gray-200">
                        Quick Description of the pet.
                      </p>
                      <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-white/20">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-300 uppercase">
                            Price
                          </span>
                          <span className="text-xl font-bold text-primary-content">
                            900.00 GC
                          </span>
                        </div>
                        <button className="btn btn-primary btn-sm md:btn-md shadow-lg shadow-purple-900/50 border-none bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white">
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product Card 5 */}
                  <div className="card w-full bg-base-100 shadow-xl image-full hover:scale-[1.02] transition-transform duration-300 hover:shadow-purple-500/20 cursor-pointer group">
                    <figure>
                      <img
                        src={image}
                        alt="Pet"
                        className="group-hover:scale-110 transition-transform duration-500"
                      />
                    </figure>
                    <div className="card-body">
                      <div className="badge badge-accent badge-outline mb-2">
                        Planet Name
                      </div>
                      <h2 className="card-title text-2xl text-white">Pet 5</h2>
                      <p className="text-gray-200">
                        Quick Description of the pet.
                      </p>
                      <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-white/20">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-300 uppercase">
                            Price
                          </span>
                          <span className="text-xl font-bold text-primary-content">
                            120.00 GC
                          </span>
                        </div>
                        <button className="btn btn-primary btn-sm md:btn-md shadow-lg shadow-purple-900/50 border-none bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white">
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
