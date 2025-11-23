
import ShopBanner from '../imgs/shop-banner-1.jpg'
export default function Products(){
    return(
        <>
            <div>
                {/* <img src={ShopBanner} alt="" className='w-full h-100 transform scaleX(-1)'/> */}
            </div>
            {/* main div for products and filters */}
            <div>
                {/* div for products */}
                <div>
                    {/* div for filters cards */}
                    <div></div>
                    <div>
                        {/* div for the cards */}
                        <div className='card bg-base-100 w-96 shadow-sm'>
                            <img src={ShopBanner} className='image-full' alt="" />
                            {/* div for card body */}
                            <div className='card-body'>
                                <div>
                                    <span>Specie</span>
                                    <h2 className='card-title'>Pet 1</h2>
                                    <p>Quick Description</p>
                                    <div className='flex-1 mt-4'>
                                        <div className='flex justify-between items-center'>
                                            <div>
                                                <span>Price</span>
                                            </div>
                                            <button className='btn btn-primary'>Add to cart</button>
                                        </div>
                                    </div>
                                    {/* <div className='card-actions justify-end'>
                                        <button className='btn btn-primary'>Buy Now</button>
                                    </div> */}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </>
    )
}