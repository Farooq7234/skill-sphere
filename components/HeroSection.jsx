"use client";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 text-transparent bg-clip-text animate-gradient">
                  Teach What You Know,
                </span>
                <br />
                <span className="text-white">Learn What You Love</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-xl">
                Learn, teach, and grow together in a dynamic community where skills are traded, knowledge is shared.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
            </div>
          </div>

          {/* Right: Seamless Video Animation */}
          <div className="relative h-full min-h-[300px] flex items-center justify-center">
            <div className="relative w-full max-w-md rounded-xl overflow-hidden  bg-gray-900/50 backdrop-blur-sm">
              <video
                  typeof="video/mp4"
                  src="/hero-globe-dark.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
              />
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-30 blur-sm transition duration-1000"></div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-600/20 rounded-lg blur-sm animate-float"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-purple-600/20 rounded-lg blur-sm animate-float-delay"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
