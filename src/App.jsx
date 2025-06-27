import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import UrlForm from "./components/UrlForm";
import UrlResult from "./components/UrlResult";

function App() {
  const [shortUrl, setShortUrl] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [expirationInfo, setExpirationInfo] = useState("");

  // Load dark mode from system preference (removed localStorage)
  useEffect(() => {
    setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  // Apply/remove dark class with enhanced transitions
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const handleShorten = async (urlData) => {
    try {
      const res = await axios.post("https://snipr-server.onrender.com/api/shorten", urlData);

      let expInfo = "";
      if (urlData.expirationOption === "never") {
        expInfo = "This link will never expire";
      } else if (urlData.expirationOption === "1day") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        expInfo = `This link will expire on ${tomorrow.toLocaleDateString()} at ${tomorrow.toLocaleTimeString()}`;
      } else if (urlData.expirationOption === "7days") {
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        expInfo = `This link will expire on ${nextWeek.toLocaleDateString()} at ${nextWeek.toLocaleTimeString()}`;
      } else if (urlData.expirationOption === "custom" && urlData.expirationDate) {
        const customDate = new Date(urlData.expirationDate);
        customDate.setHours(23, 59, 59);
        expInfo = `This link will expire on ${customDate.toLocaleDateString()} at ${customDate.toLocaleTimeString()}`;
      }

      setShortUrl(res.data.shortUrl);
      setExpirationInfo(expInfo);
      setShowResult(true);
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  const handleReset = () => {
    setShowResult(false);
    setShortUrl("");
    setExpirationInfo("");
  };

  return (
    <div className="min-h-screen transition-all duration-700 ease-in-out bg-gradient-to-br from-rose-50 via-sky-50 to-violet-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-800 flex flex-col items-center px-4 py-2 sm:py-4 relative overflow-hidden">
      
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs - Reduced size and opacity on mobile */}
        <div className="absolute top-20 left-10 w-64 h-64 sm:w-96 sm:h-96 rounded-full mix-blend-multiply filter blur-xl sm:blur-2xl opacity-20 sm:opacity-30 animate-float bg-gradient-to-r from-pink-400 to-rose-400 dark:from-pink-600 dark:to-purple-600"></div>
        <div className="absolute top-40 right-10 w-56 h-56 sm:w-80 sm:h-80 rounded-full mix-blend-multiply filter blur-xl sm:blur-2xl opacity-15 sm:opacity-25 animate-float-delayed bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-blue-600 dark:to-indigo-600"></div>
        <div className="absolute -bottom-20 sm:-bottom-32 left-20 w-48 h-48 sm:w-72 sm:h-72 rounded-full mix-blend-multiply filter blur-xl sm:blur-2xl opacity-10 sm:opacity-20 animate-float-slow bg-gradient-to-r from-purple-400 to-indigo-400 dark:from-purple-600 dark:to-pink-600"></div>
        
        {/* Sparkle Effects - Hidden on mobile */}
        <div className="absolute top-32 right-32 w-2 h-2 bg-yellow-400 rounded-full animate-sparkle opacity-80 hidden sm:block"></div>
        <div className="absolute bottom-40 left-40 w-3 h-3 bg-pink-400 rounded-full animate-sparkle-delayed opacity-60 hidden sm:block"></div>
        <div className="absolute top-60 left-60 w-1 h-1 bg-blue-400 rounded-full animate-sparkle-slow opacity-70 hidden sm:block"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <div className="w-full max-w-3xl mx-auto mt-8 sm:mt-12 md:mt-16 transition-opacity duration-500 ease-in-out animate-fade-in">
          {showResult ? (
            <UrlResult
              shortUrl={shortUrl}
              onReset={handleReset}
              darkMode={darkMode}
              expirationInfo={expirationInfo}
            />
          ) : (
            <UrlForm
              onShorten={handleShorten}
              showResult={showResult}
              darkMode={darkMode}
            />
          )}
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
          
        @keyframes float {
          0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          25% { transform: translate(10px, -15px) scale(1.05) rotate(1deg); }
          50% { transform: translate(-8px, 10px) scale(0.95) rotate(-1deg); }
          75% { transform: translate(12px, 5px) scale(1.02) rotate(0.5deg); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        
        @keyframes slideInRight {
          from { 
            opacity: 0; 
            transform: translateX(50px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
          }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 10s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float-slow {
          animation: float 12s ease-in-out infinite;
          animation-delay: 4s;
        }
        
        .animate-sparkle {
          animation: sparkle 3s ease-in-out infinite;
        }
        
        .animate-sparkle-delayed {
          animation: sparkle 4s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-sparkle-slow {
          animation: sparkle 5s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out;
        }
        
        @media (max-width: 640px) {
          .animate-float, .animate-float-delayed, .animate-float-slow {
            animation-duration: 12s;
          }
        }
      `}</style>
    </div>
  );
}

export default App;