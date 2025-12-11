// imports
import backImage from "../imgs/pexels-pixabay-2150.jpg"
import { useNavigate } from "react-router-dom";

export default function Home() {
  const Navigate = useNavigate()

  function shopLink(){
      Navigate('/products')
  }
  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-purple-900 to-slate-900 text-gray-100 font-sans">
        {/* hero banner */}
        <div
          className="hero min-h-screen" 
          style={{
            backgroundImage:
              `url(${backImage})`,
            backgroundAttachment: "fixed", 
          }}
        >
          {/* Darker overlay for better text contrast */}
          <div className="hero-overlay bg-black/60 backdrop-blur-[2px]"></div>
          <div className="hero-content text-neutral-content text-center flex flex-col">
            <div className="max-w-xl">
              <h1 className="mb-5 text-4xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-200 to-pink-200 drop-shadow-lg">
                Get Your Dream Pet With Ease!
              </h1>
              <p className="mb-5 text-lg text-gray-200">
                "PROJECT:ISTC is the Universe's First Intergalactic Pet Trading Center, Where You Can Get Pets of Different Species Around the Universe"
              </p>
            </div>
            <div>
              {/* UPDATED BUTTON HERE */}
              <button onClick={shopLink} className="btn btn-primary btn-lg border-none bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 hover:scale-105 transition-transform">
                Shop Now
              </button>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
    </>
  );
}