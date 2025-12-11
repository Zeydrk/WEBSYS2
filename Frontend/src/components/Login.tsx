export default function Login() {
  return (
    <>
      {/* Main Div - Full Screen Background */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-black font-sans relative overflow-hidden">
        
        {/* Background Decor */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]"></div>

        {/* Main Card */}
        <div className="card w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-900/30 z-10">
          <div className="card-body px-8 py-10">
            
            {/* Logo Area */}
            <div className="flex justify-center mb-2">
              <div className="w-20 h-20 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/40 ring-4 ring-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z" opacity="0.5" />
                  <path fillRule="evenodd" d="M12 4a8 8 0 0 0-6.93 12h13.86A8 8 0 0 0 12 4Z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Header Text */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-black text-white tracking-tight">
                Login to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Galaxy</span>
              </h1>
              <p className="text-sm text-gray-400 mt-2">Enter your galactic credentials.</p>
            </div>

            {/* Form Container */}
            <form className="space-y-4">
            

              {/* Email Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-300 text-xs font-bold uppercase tracking-wider">Email Coordinates</span>
                </label>
                <label className="input input-bordered bg-slate-800/50 border-white/10 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 flex items-center gap-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input type="email" className="grow placeholder:text-gray-500 bg-transparent" placeholder="pilot@starship.com" required />
                </label>
              </div>

              {/* Password Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-300 text-xs font-bold uppercase tracking-wider">Security Key</span>
                </label>
                <label className="input input-bordered bg-slate-800/50 border-white/10 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 flex items-center gap-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                    <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                  </svg>
                  <input type="password" className="grow placeholder:text-gray-500 bg-transparent" placeholder="••••••••" required />
                </label>
              </div>

             

              {/* Centered Submit Button */}
              <div className="form-control mt-8 flex justify-center items-center">
                <button className="btn w-100 border-none bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/50 hover:shadow-purple-900/80 transition-all duration-300 transform hover:scale-105 rounded-full">
                  Initialize
                </button>
              </div>

            </form>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-400">
                Account not yet initialized?{" "}
                <a href="/register" className="link link-hover text-purple-400 font-bold hover:text-purple-300 transition-colors">
                  Register Here
                </a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}