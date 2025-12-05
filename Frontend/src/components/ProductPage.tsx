// import all components

import sampleImage from "../imgs/shop-banner-1.jpg";

export default function ProductPage() {
  return (
    <>
      {/* main div */}
      {/* Corrected gradient syntax to standard Tailwind and set default text to light gray */}
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-purple-900 to-slate-900 text-gray-100 font-sans">
        
        {/* product pic and description and breadcrumbs*/}
        <div className="container mx-auto p-4 md:p-8">
          
          <div className="breadcrumbs text-sm ml-2 mb-6 text-purple-300">
            <ul>
              <li className="hover:text-white transition-colors">Home</li>
              <li className="hover:text-white transition-colors">Products</li>
              <li className="font-semibold text-white">Product-Page</li>
            </ul>
          </div>
          
          {/* Main Product Card - Glass Effect */}
          <div className="card bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden">
            
            {/* picture and description*/}
            <div className="flex-1 p-6">
              {/* Changed to responsive flex column on mobile, row on desktop */}
              <div className="flex flex-col lg:flex-row gap-6">
                
                {/* product image */}
                <div className="w-full lg:w-1/2 shrink-0">
                  {/* Improved image class for modern fit */}
                  <img 
                    src={sampleImage} 
                    alt="Product Image" 
                    className="w-full h-auto object-cover rounded-lg shadow-xl" 
                  />
                </div>
                
                {/* product description */}
                <div className="card-body flex flex-col gap-4 flex-1 justify-between p-0 lg:p-4">
                  
                  {/* reviews */}
                  {/* <div>   
                    <h2>Reviews</h2>
                            </div> */}

                  {/* title */}
                  <div className="card-title text-4xl lg:text-5xl font-extrabold  mb-6 bg-clip-text bg-linear-to-r from-white to-purple-300">
                    <h1>Big Chungus</h1>
                  </div>

                  <div className="description text-lg text-slate-300 border-b border-white/10 pb-4">
                    <h4>A rare and enchanting creature from the outer reaches of Andromeda. Known for its luminescent fur that shifts colors based on mood and its gentle, telepathic nature.</h4>
                  </div>

                  {/* price and stock */}
                  <div>
                    <div className="text-3xl font-extrabold text-white">
                      <h2>356 Galactic Credits</h2>
                    </div>
                    <div className="text-xl">
                      {/* Used a DaisyUI badge for better stock visibility */}
                      <h4 className="badge badge-outline border-green-400 text-green-400 mt-2">Current stock - Ready for hyperspace delivery</h4>
                    </div>
                  </div>

                  {/* species and planet */}
                  {/* Improved layout for side-by-side display */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-2">
                    <div className="text-xl">
                      <h4><span className="text-purple-300">Species:</span> <span className="font-semibold">Xylo-Pet</span></h4>
                    </div>
                    <div className="text-xl">
                      <h4><span className="text-purple-300">Home Planet:</span> <span className="font-semibold">Nova Prime</span></h4>
                    </div>
                  </div>


                  {/* quantity and button */}
                  <div className="card-actions flex flex-row gap-4 mt-auto">
                    {/* quantity */}
                    <div className="flex items-end">
                      {/* Styled input for dark theme and use DaisyUI class */}
                      <input
                        type="number"
                        className="input input-bordered w-20 bg-slate-900/50 border-white/20 text-white placeholder-slate-500"
                        placeholder="1"
                        min="1"
                        defaultValue="1"
                      />
                    </div>

                    {/* button */}
                    <div className="flex items-end">
                      {/* Applied galaxy gradient to primary button */}
                      <button className="btn btn-primary w-40 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border-none text-white shadow-xl shadow-purple-900/50">Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* div for featured products*/}
        {/* <div className="text-center">
          <div className="text-6xl">
            <h2>Featured products</h2>
          </div>
          <div>
            <div></div>
          </div>
        </div> */}
      </div>
    </>
  );
}