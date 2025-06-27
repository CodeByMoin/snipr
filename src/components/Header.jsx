import { Sun, Moon, Link, Sparkles, Zap, Star } from "lucide-react";

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="text-center top-0 relative animate-fade-in px-4 py-4 sm:py-6 overflow-hidden">
      {/* Dark Mode Toggle */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50">
        <button
          onClick={toggleDarkMode}
          className="group p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-500 backdrop-blur-xl border-2 transform hover:scale-110 hover:rotate-12 focus:outline-none focus:ring-4 focus:ring-purple-500/30
                     bg-white/20 border-white/30 text-orange-500 hover:bg-white/30 hover:border-white/50 shadow-lg hover:shadow-xl
                     dark:bg-gray-800/20 dark:border-gray-600/30 dark:text-yellow-400 dark:hover:bg-gray-700/30 dark:hover:border-gray-500/50"
        >
          <div className="relative overflow-hidden">
            {darkMode ? (
              <Sun size={16} className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-500 rotate-0 scale-100 group-hover:rotate-180 group-hover:scale-110" />
            ) : (
              <Moon size={16} className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-500 rotate-0 scale-100 group-hover:-rotate-12 group-hover:scale-110" />
            )}
            
            {/* Magical particles effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-0.5 left-0.5 sm:bottom-1 sm:left-1 w-0.5 h-0.5 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </button>
      </div>

      {/* Background Circles */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-10">
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 animate-spin-slow blur-sm" />
      </div>

      {/* Floating dots - hidden on mobile */}
      <div className="absolute top-10 left-10 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-30 hidden sm:block" />
      <div className="absolute top-20 right-12 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-40 hidden sm:block" />
      <div className="absolute bottom-10 left-16 w-2.5 h-2.5 bg-purple-400 rounded-full animate-ping opacity-20 hidden sm:block" />

      {/* Logo and Title */}
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative">
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 dark:from-pink-600 dark:via-purple-700 dark:to-blue-700 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <Link className="text-white drop-shadow-md sm:drop-shadow-lg" size={24} />
            </div>
            <div className="absolute inset-0 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 opacity-50 blur-xl group-hover:opacity-75 transition-all duration-500"></div>
          </div>

          <div className="relative">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl p-1 sm:p-2 font-black bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent animate-gradient-x hover:scale-105 transition-transform duration-500 cursor-default drop-shadow-sm">
              Snipr
            </h1>
            <div className="absolute inset-0 p-1 sm:p-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent opacity-30 blur-sm -z-10">
              Snipr
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 md:gap-3 mb-3 sm:mb-4 animate-fade-in-up">
          <Sparkles className="text-pink-500 dark:text-pink-400 animate-pulse w-4 h-4 sm:w-5 sm:h-5" />
          <p className="text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-gray-700 to-gray-600 dark:from-gray-200 dark:to-gray-300 bg-clip-text text-transparent">
            Transform long URLs into powerful short links
          </p>
          <Zap className="text-blue-500 dark:text-blue-400 animate-pulse w-4 h-4 sm:w-5 sm:h-5" />
        </div>

        {/* Features */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 animate-fade-in-up delay-200">
          <div className="flex items-center gap-1 sm:gap-2 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
            <Star size={12} className="text-yellow-500" />
            <span className="font-medium">Lightning Fast</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
            <span className="text-purple-500 text-xs sm:text-sm">📱</span>
            <span className="font-medium">QR Codes</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
            <span className="text-green-500 text-xs sm:text-sm">📊</span>
            <span className="font-medium">Analytics Ready</span>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-gradient-x {
          background-size: 400% 400%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </header>
  );
};

export default Header;