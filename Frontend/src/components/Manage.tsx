import { Link } from "react-router-dom";
import image from "../imgs/shop-banner-1.jpg";

export default function Manage() {
  return (
    <>
      {/* main div */}
      <div>
        {/* div for seller image and banner */}
        <div>
          {/* banner/background image */}
          <div>
            <img src="" alt="" />
          </div>
          {/* profile and seller name */}
          <div>
            <img src="" alt="" />
            <h1></h1>
          </div>
        </div>

        {/* products */}
        {/* Product Grid */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Product Card 1 */}
            <Link to={"./:id"} className="group">
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
                    Planet Name
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
            </Link>
            
          </div>
        </div>
      </div>
    </>
  );
}
