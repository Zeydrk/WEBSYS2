
// import all components

import sampleImage from "../imgs/shop-banner-1.jpg"


export default function ProductPage(){
    return(
        <>
            {/* main div */}
            <div>
                {/* product pic and description and breadcrumbs*/}
                <div className="card bg-base-100 shadow-sm">
                    <div className="breadcrumbs text-sm ml-2">
                        <ul>
                            <li>Home</li>
                            <li>Products</li>
                            <li>Product-Page</li>
                        </ul>
                    </div>

                    {/* picture and description*/}
                    <div className="flex-1">
                        <div className="menu menu-horizontal">
                            {/* product */}
                            <div className="">
                                <img src={sampleImage} alt="" className="size-90"/>
                            </div>
                            {/* product description */}
                            <div className="ml-4">
                                {/* reviews */}
                                <div>   
                                    <h2>Reviews</h2>
                                </div>

                                {/* title */}
                                <div className="card-title">
                                    <h1>Name</h1>
                                </div>

                                {/* price */}
                                <div>
                                    <h2>Price</h2>
                                </div>

                                {/* species */}
                                <div>
                                    <h4>Species</h4>
                                </div>

                                {/* quantity */}
                                <div>
                                    <input type="number" className="input validator" placeholder="quantity" />

                                </div>

                                {/* button */}
                                <div>
                                    <button className="btn btn-primary">Add to cart</button>
                                </div>

                            </div>
                        </div>
                    </div>

                    
                </div>
            </div>
        </>
    )
}