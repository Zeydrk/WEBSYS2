// import libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
// import needed components and assets
import image from '../imgs/shop-banner-1.jpg'


export default function Products(){
    return(
        <div className='min-h-screen bg-linear-to-b from-slate-900 via-purple-900 to-slate-900'>
            {/* hero banner */}
            <div>
                
            </div>

            {/* main div for products and filters */}
            <div>
                {/* div for products */}
                <div>
                    {/* div for filters cards */}
                    <div>

                    </div>
                    <div>
                        {/* div for all the products */}
                        <div className='flex flex-wrap gap-4 justify-center'>
                            {/* div for the cards */}
                            <div className='card bg-base-100 w-96 shadow-sm cursor-pointer' >
                                <img src={image} className='image-full' alt="" />
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
                                    </div>
                                </div>
                            </div>
                            {/* div for the cards */}
                            <div className='card bg-base-100 w-96 shadow-sm cursor-pointer' >
                                <img src={image} className='image-full' alt="" />
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
                                    </div>
                                </div>
                            </div>
                            {/* div for the cards */}
                            <div className='card bg-base-100 w-96 shadow-sm cursor-pointer' >
                                <img src={image} className='image-full' alt="" />
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
                                    </div>
                                </div>
                            </div>
                            {/* div for the cards */}
                            <div className='card bg-base-100 w-96 shadow-sm cursor-pointer' >
                                <img src={image} className='image-full' alt="" />
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
                                    </div>
                                </div>
                            </div>
                            {/* div for the cards */}
                            <div className='card bg-base-100 w-96 shadow-sm cursor-pointer' >
                                <img src={image} className='image-full' alt="" />
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
                                    </div>
                                </div>
                            </div>
                            {/* div for the cards */}
                            <div className='card bg-base-100 w-96 shadow-sm cursor-pointer' >
                                <img src={image} className='image-full' alt="" />
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}