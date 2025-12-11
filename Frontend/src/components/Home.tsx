// imports
import backImage from "../imgs/pexels-pixabay-2150.jpg"


export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-purple-900 to-slate-900 text-gray-100 font-sans">
        {/* hero banner */}
        <div
          className="hero min-h-screen" // Adjusted height for better proportions
          style={{
            backgroundImage:
              `url(${backImage})`,
            backgroundAttachment: "fixed", // Parallax effect
          }}
        >
          {/* Darker overlay for better text contrast */}
          <div className="hero-overlay bg-black/60 backdrop-blur-[2px]"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-xl">
              <h1 className="mb-5 text-4xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-200 to-pink-200 drop-shadow-lg">
                "Get Your Dream Pet With Ease!"
              </h1>
              <p className="mb-5 text-lg text-gray-200">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
    </>
  );
}
