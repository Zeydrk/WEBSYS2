// import libraries
// import React from 'react';
// import ReactDOM from 'react-dom/client';

// import {useState } from "react";
// import { ToastContainer, toast } from "react-toastify";

// hooks
import useProduct from "../hooks/useProduct";

// import needed components and assets
import image from "../imgs/shop-banner-1.jpg";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

interface Pet {
  petId: string;
  name: string;
  species: string;
  description: string;
  basePrice: number;
  stockQty: number;
  imageUrl: string;
  planetId: string;
  originPlanet: {
    planetId: string;
    planetName: string;
    distanceFromSun:  number;
  }

}

export default function Products() {
  const petServices = useProduct();
  const [pets, setPets] = useState([]);

  async function handleOnClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    
  }

  useEffect(() => {
    petServices
      .fetchPets()
      .then((res) => {
        // console.log(res);
        setPets(res);
        // console.log(pets);
      })
      .catch((err) => {
        console.error("Error fetching pets:", err);
      });
  }, []);

  // const handleOnClick = () => {
  //   console.log(petServices.product)
  // }

  return (
    // Added text-gray-100 to ensure text is readable on the dark gradient by default
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-purple-900 to-slate-900 text-gray-100 font-sans">
      {/* hero banner */}
      <div
        className="hero min-h-[60vh] lg:min-h-[70vh]" // Adjusted height for better proportions
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
          backgroundAttachment: "fixed", // Parallax effect
        }}
      >
        {/* Darker overlay for better text contrast */}
        <div className="hero-overlay bg-black/60 backdrop-blur-[2px]"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-xl">
            <h1 className="mb-5 text-4xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-200 to-pink-200 drop-shadow-lg">
              "Get Exclusive Pets All Around The Galaxy"
            </h1>
            <p className="mb-5 text-lg text-gray-200">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
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
              <h1 className="text-xl font-bold text-white">5 Results found</h1>
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
              {/* Product Card 1 */}
              {pets.map((pet: Pet) => (
                <Link to={`./${pet.petId}`} key={pet.petId} className="group">
                  <div
                    key={pet.petId}
                    className="card w-full bg-base-100 shadow-xl image-full hover:scale-[1.02] transition-transform duration-300 hover:shadow-purple-500/20"
                  >
                    <figure>
                      <img
                        src={image}
                        alt="Pet"
                        className="group-hover:scale-110 transition-transform duration-500"
                      />
                    </figure>
                    <div className="card-body">
                      <div className="badge badge-secondary badge-outline mb-2">
                        {pet.originPlanet.planetName}
                      </div>
                      <h2 className="card-title text-2xl text-white">
                        {pet.name}
                      </h2>
                      <p className="text-gray-200">
                        {pet.description}
                      </p>
                      <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-white/20">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-300 uppercase">
                            Price
                          </span>
                          <span className="text-xl font-bold text-primary-content">
                            {pet.basePrice} GC
                          </span>
                        </div>
                        <button className="btn btn-primary btn-sm md:btn-md shadow-lg shadow-purple-900/50 border-none bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white">
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

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
                  <p className="text-gray-200">Quick Description of the pet.</p>
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
                  <p className="text-gray-200">Quick Description of the pet.</p>
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
                  <p className="text-gray-200">Quick Description of the pet.</p>
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
                  <p className="text-gray-200">Quick Description of the pet.</p>
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
  );
}
