// import libraries
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

// hooks
import useProduct from "../hooks/useProduct";

// import needed components and assets
import image from "../imgs/shop-banner-1.jpg";
import bannerImg from "../imgs/banner 4.png";

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
    distanceFromSun: number;
  };
}

export default function Products() {
  const petServices = useProduct();


  const [allPets, setAllPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  // checkbox tracker
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);

  // fetching data
  useEffect(() => {
    petServices
      .fetchPets()
      .then((res: Pet[]) => {
        setAllPets(res);
        setFilteredPets(res);
      })
      .catch((err) => {
        console.error("Error fetching pets:", err);
      });
  }, []);

  
  // We use useMemo so we don't recalculate this on every keystroke, only when pet data changes
  const uniqueSpecies = useMemo(() => {
    // Create a Set to get unique values, then convert back to Array
    const speciesList = Array.from(new Set(allPets.map((pet) => pet.species)));
    return speciesList.sort(); // Sort alphabetically
  }, [allPets]);

  // --- 3. Combined Filter Logic (Search + Checkboxes) ---
  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    const results = allPets.filter((pet) => {
      // A. Check if it matches the search text (Name OR Species)
      const matchesSearch =
        pet.name.toLowerCase().includes(lowercasedSearchTerm) ||
        pet.species.toLowerCase().includes(lowercasedSearchTerm);

      // B. Check if it matches the Checkboxes
      // If no checkboxes are selected, return true (show all).
      // If checkboxes ARE selected, check if this pet's species is in the list.
      const matchesCheckbox =
        selectedSpecies.length === 0 || selectedSpecies.includes(pet.species);

      // Return true only if BOTH conditions are met
      return matchesSearch && matchesCheckbox;
    });

    setFilteredPets(results);
  }, [searchTerm, allPets, selectedSpecies]);

  // --- Handlers ---

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSpeciesCheckboxChange = (species: string) => {
    setSelectedSpecies((prevSelected) => {
      if (prevSelected.includes(species)) {
        // If already selected, remove it (uncheck)
        return prevSelected.filter((s) => s !== species);
      } else {
        // If not selected, add it (check)
        return [...prevSelected, species];
      }
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-purple-900 to-slate-900 text-gray-100 font-sans">
      {/* Hero Banner */}
      <div
        className="hero min-h-[60vh] lg:min-h-[70vh]"
        style={{
          backgroundImage:
            `url(${bannerImg})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="hero-overlay bg-black/60 backdrop-blur-[2px]"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-xl">
            <h1 className="mb-5 text-4xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-200 to-pink-200 drop-shadow-lg">
              Get Exclusive Pets All Around The Galaxy
            </h1>
            <p className="mb-5 text-lg text-gray-200">
              Get the latest pets around the space with PROJECT:ISTC
            </p>
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

            {/* Results Count */}
            <div className="mb-4 border-b border-white/10 pb-2">
              <h1 className="text-xl font-bold text-white">
                {filteredPets.length} Results found
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
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </label>
                </div>

                {/* Species Type Dropdown (Dynamic) */}
                <div className="mt-4">
                  <div className="collapse collapse-arrow border border-white/10 bg-slate-900/30 rounded-lg">
                    <input type="checkbox" defaultChecked /> {/* Default open */}
                    <div className="collapse-title font-medium text-white group-hover:text-purple-300 transition-colors">
                      Specie Type
                    </div>
                    <div className="collapse-content text-sm text-gray-300">
                      <ul className="space-y-2 py-2">
                        {/* Dynamically Map Unique Species */}
                        {uniqueSpecies.map((specie) => (
                          <li
                            key={specie}
                            className="flex items-center gap-2 hover:text-purple-300 cursor-pointer"
                          >
                            <label className="flex items-center gap-2 cursor-pointer w-full">
                              <input
                                type="checkbox"
                                className="checkbox checkbox-xs checkbox-primary"
                                checked={selectedSpecies.includes(specie)}
                                onChange={() => handleSpeciesCheckboxChange(specie)}
                              />
                              <span className="capitalize">{specie}</span>
                            </label>
                          </li>
                        ))}

                        {/* Fallback if no data is loaded yet */}
                        {uniqueSpecies.length === 0 && (
                          <li className="text-gray-500 italic">
                            Loading species...
                          </li>
                        )}
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
              {filteredPets.map((pet: Pet) => (
                <Link to={`./${pet.petId}`} key={pet.petId} className="group">
                  <div className="card w-full bg-base-100 shadow-xl image-full hover:scale-[1.02] transition-transform duration-300 hover:shadow-purple-500/20">
                    <figure>
                      {/* Using the image from object if available, otherwise fallback to import */}
                      <img
                        src={pet.imageUrl || image}
                        alt={pet.name}
                        className="group-hover:scale-110 transition-transform duration-500 w-full h-full object-cover"
                      />
                    </figure>
                    <div className="card-body">
                      <div className="badge badge-secondary badge-outline mb-2">
                        {pet.originPlanet.planetName}
                      </div>
                      <h2 className="card-title text-2xl text-white">
                        {pet.name}
                      </h2>
                      <p className="text-gray-200 line-clamp-2">
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

              {/* No Results Message */}
              {filteredPets.length === 0 && (
                <div className="col-span-1 md:col-span-2 xl:col-span-3 text-center py-16 bg-slate-800/20 rounded-xl border border-white/5">
                  <p className="text-2xl text-purple-300 font-bold mb-2">
                    No galactic pets found
                  </p>
                  <p className="text-gray-400">
                    Try adjusting your search terms or filters.
                  </p>
                  <button 
                    onClick={() => {
                        setSearchTerm('');
                        setSelectedSpecies([]);
                    }}
                    className="btn btn-ghost btn-sm mt-4 text-purple-200"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}