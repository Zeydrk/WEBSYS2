// import all components

import sampleImage from "../imgs/shop-banner-1.jpg";

export default function ProductPage() {
  return (
    <>
      {/* main div */}
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-purple-900 to-slate-900">
        {/* product pic and description and breadcrumbs*/}
        <div className="p-7">
          <div className="breadcrumbs text-sm ml-2">
            <ul>
              <li>Home</li>
              <li>Products</li>
              <li>Product-Page</li>
            </ul>
          </div>
          <div className="card bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden">
            {/* picture and description*/}
            <div className="flex-1">
              <div className="flex gap-6">
                {/* product */}
                <div className="">
                  <img src={sampleImage} alt="" className="size-150   " />
                </div>
                {/* product description */}
                <div className="card-body flex flex-col gap-3 flex-1 justify-between">
                  {/* reviews */}
                  {/* <div>   
                        <h2>Reviews</h2>
                                    </div> */}

                  {/* title */}
                  <div className="card-title text-3xl font-bold">
                    <h1>Big Chungus</h1>
                  </div>

                  <div className="description text-lg">
                    <h4>A rare and enchanting creature from the outer reaches of Andromeda. Known for its luminescent fur that shifts colors based on mood and its gentle, telepathic nature.</h4>
                  </div>

                  {/* price and stock */}
                  <div>
                    <div className="text-2xl">
                      <h2>356 Galactic Credits</h2>
                    </div>
                    <div className="text-xl">
                      <h4>Current stock - Ready for hyperspace delivery</h4>
                    </div>
                  </div>

                  {/* species and planet */}
                  <div>
                    <div className="text-xl">
                      <h4>Species</h4>
                    </div>
                    <div className="text-xl">
                      <h4>Home Planet</h4>
                    </div>
                  </div>


                  {/* quantity and button */}
                  <div className="card-actions flex flex-row gap-2 mt-auto">
                    {/* quantity */}
                    <div>
                        <input
                        type="number"
                        className="input validator w-20"
                        placeholder="0"
                        />
                    </div>

                    {/* button */}
                    <div>
                        <button className="btn btn-primary w-140">Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* div for featured products*/}
        <div className="text-center">
          {/* div for header */}
          <div className="text-6xl">
            <h2>Featured products</h2>
          </div>
          {/* products div */}
          <div>
            {/* specific product div */}
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
