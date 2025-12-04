// import libraries
// import React from 'react';
// import ReactDOM from 'react-dom/client';

// import needed components and assets
import image from '../imgs/shop-banner-1.jpg'
import { Link } from 'react-router-dom';


export default function Products() {
    return (
        <div className='min-h-screen bg-linear-to-b from-slate-900 via-purple-900 to-slate-900'>
            {/* hero banner */}
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage:
                        "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
                }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">"Get Exclusive Pets All Around The World"</h1>
                        <p className="mb-5">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                </div>
            </div>

            {/* main div for products and filters */}
            <div>
                {/* div for products */}
                <div className='flex flex-row p-6'>
                    {/* div for filters cards */}
                    <div className='ml-3'>
                        <div className="breadcrumbs text-sm">
                            <ul>
                                <li>Home</li>
                                <li>Products</li>
                            </ul>
                        </div>
                        {/* div for heading */}
                        <div>
                            <h1>5 Results found</h1>
                        </div>
                        {/* Filter Box */}
                        <div>
                            {/* Specie Filter */}
                            <div className='card bg-base-100 p-8 flex justify-start mt-5'>
                                {/* species header */}
                                <div>
                                    <h3>Species Filter</h3>
                                </div>
                                {/* search bar */}
                                <div className='mt-3'>
                                    <label className="input">
                                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <g
                                                strokeLinejoin="round"
                                                strokeLinecap="round"
                                                strokeWidth="2.5"
                                                fill="none"
                                                stroke="currentColor"
                                            >
                                                <circle cx="11" cy="11" r="8"></circle>
                                                <path d="m21 21-4.3-4.3"></path>
                                            </g>
                                        </svg>
                                        <input type="search" required placeholder="Search" />
                                    </label>
                                </div>
                                {/* Species Type */}
                                <div className='mt-3'>
                                    <ul>
                                        <li>Specie1</li>
                                        <li>Specie2</li>
                                        <li>Specie3</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* div for all the products */}
                        <div className='flex flex-wrap gap-4 justify-center'>
                            {/* div for the cards */}
                            <Link to={"./product"}>

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
                            </Link>
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