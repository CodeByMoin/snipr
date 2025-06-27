import { useState } from "react";
import { Link, Zap, Calendar, Infinity, Clock, Settings, Globe } from "lucide-react";

const UrlForm = ({ onShorten, showResult, darkMode }) => {
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [expirationOption, setExpirationOption] = useState("never");
  const [isLoading, setIsLoading] = useState(false);
  const [urlFocused, setUrlFocused] = useState(false);
  const [aliasFocused, setAliasFocused] = useState(false);

  const handleExpirationChange = (option) => {
    setExpirationOption(option);
    if (option !== "custom") setExpirationDate("");
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const handleSubmit = async () => {
    if (!url.trim()) return;
    setIsLoading(true);
    await onShorten({
      url: url.trim(),
      customAlias: customAlias.trim(),
      expirationOption,
      expirationDate: expirationOption === "custom" ? expirationDate : null,
    });
    setIsLoading(false);
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div
      className={`backdrop-blur-2xl rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl border transition-all duration-700 transform 
        ${showResult ? "scale-95 lg:scale-100" : "scale-100 hover:scale-[1.02]"}
        bg-white/30 border-white/40 dark:bg-gray-900/30 dark:border-gray-700/40 relative overflow-hidden group
        w-full max-w-4xl mx-auto`}
    >
      {/* Magical background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-blue-500/5 dark:from-pink-500/10 dark:via-purple-500/10 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Floating particles */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-pink-400 rounded-full animate-float opacity-30 hidden sm:block"></div>
      <div className="absolute bottom-6 left-6 w-1 h-1 bg-blue-400 rounded-full animate-float-delayed opacity-40 hidden sm:block"></div>

      {/* Enhanced Heading */}
      <div className="text-center mb-6 md:mb-8 relative z-10">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="p-1 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-600 dark:to-purple-700 shadow-lg">
            <Zap className="text-white" size={18} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
            Create Short Link
          </h2>
        </div>
        <div className="h-1 w-20 sm:w-24 mx-auto rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-lg animate-gradient-x" />
      </div>

      {/* Enhanced Form Fields */}
      <div className="space-y-4 sm:space-y-6 md:space-y-8 relative z-10">
        {/* URL Input */}
        <div className="relative group">
          <label className="block text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <Globe size={14} className="text-blue-500" />
            Enter your URL
          </label>
          <div className="relative">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={() => setUrlFocused(true)}
              onBlur={() => setUrlFocused(false)}
              placeholder="https://example.com/your-very-long-url-here"
              required
              className={`w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-500 focus:outline-none focus:ring-4 transform
                         ${urlFocused ? 'scale-[1.02] shadow-xl' : 'hover:scale-[1.01]'}
                         ${isValidUrl(url) && url ? 'border-green-400 bg-green-50/50 dark:bg-green-900/20' : ''}
                         bg-white/70 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500/20
                         dark:bg-gray-800/40 dark:border-gray-600/50 dark:text-white dark:placeholder-gray-500 dark:focus:border-pink-400 dark:focus:ring-pink-400/20
                         backdrop-blur-sm shadow-lg text-sm sm:text-base`}
            />
            <div
              className={`absolute right-4 sm:right-5 top-1/2 hidden sm:block transform -translate-y-1/2 transition-all duration-300 ${
                isValidUrl(url) && url ? "text-green-500 scale-110" : "text-gray-400 dark:text-gray-600"
              }`}
            >
              <Link size={20} />
            </div>
            
            {/* URL validation indicator */}
            {url && (
              <div className={`absolute -bottom-4 left-4 sm:left-5 text-xs font-medium transition-all duration-300 ${
                isValidUrl(url) ? 'text-green-500' : 'text-red-500'
              }`}>
                {isValidUrl(url) ? '✓ Valid URL' : '✗ Invalid URL format'}
              </div>
            )}
          </div>
        </div>

        {/* Custom Alias */}
        <div className="relative group">
          <label className="block text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <Settings size={14} className="text-purple-500" />
            Custom alias (optional)
          </label>
          <div className="relative">
            <div className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium text-sm sm:text-base">
              snipr.ly/
            </div>
            <input
              type="text"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
              onFocus={() => setAliasFocused(true)}
              onBlur={() => setAliasFocused(false)}
              placeholder="my-awesome-link"
              className={`w-full pl-16 sm:pl-24 pr-4 sm:pr-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-500 focus:outline-none focus:ring-4 transform
                         ${aliasFocused ? 'scale-[1.02] shadow-xl' : 'hover:scale-[1.01]'}
                         bg-white/70 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20
                         dark:bg-gray-800/40 dark:border-gray-600/50 dark:text-white dark:placeholder-gray-500 dark:focus:border-purple-400 dark:focus:ring-purple-400/20
                         backdrop-blur-sm shadow-lg text-sm sm:text-base`}
            />
          </div>
        </div>

        {/* Enhanced Expiration Options */}
        <div className="space-y-3 sm:space-y-4">
          <label className="block text-xs sm:text-sm md:text-base font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <Clock size={14} className="text-orange-500" />
            Link Expiration
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {[
              { value: "never", label: "Never", icon: Infinity, color: "from-green-500 to-emerald-500", desc: "Permanent" },
              { value: "1day", label: "1 Day", icon: Calendar, color: "from-blue-500 to-cyan-500", desc: "24 hours" },
              { value: "7days", label: "7 Days", icon: Calendar, color: "from-purple-500 to-pink-500", desc: "1 week" },
              { value: "custom", label: "Custom", icon: Settings, color: "from-orange-500 to-red-500", desc: "Pick date" },
            ].map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleExpirationChange(option.value)}
                  className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl border-2 transition-all duration-500 flex flex-col items-center justify-center gap-1 sm:gap-2 font-semibold text-xs sm:text-sm md:text-base backdrop-blur-sm transform hover:scale-105 hover:shadow-xl group relative overflow-hidden ${
                    expirationOption === option.value
                      ? `border-transparent bg-gradient-to-r ${option.color} text-white shadow-lg scale-105`
                      : "border-gray-200 bg-white/50 text-gray-600 hover:border-gray-300 hover:bg-white/70 dark:border-gray-600/50 dark:bg-gray-800/30 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-700/40"
                  }`}
                >
                  {/* Gradient overlay for selected state */}
                  {expirationOption === option.value && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${option.color} opacity-90`}></div>
                  )}
                  
                  <div className="relative z-10 flex flex-col items-center gap-1 sm:gap-2">
                    <IconComponent size={18} className={expirationOption === option.value ? 'animate-pulse' : ''} />
                    <span className="text-xs sm:text-sm font-bold">{option.label}</span>
                    <span className="text-[10px] sm:text-xs opacity-80">{option.desc}</span>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              );
            })}
          </div>

          {/* Enhanced Custom Date Picker */}
          {expirationOption === "custom" && (
            <div className="mt-3 sm:mt-4 animate-slide-down">
              <input
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                min={getMinDate()}
                className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-500 focus:outline-none focus:ring-4 transform hover:scale-[1.01] focus:scale-[1.02]
                           bg-white/70 border-gray-200 text-gray-800 focus:border-orange-500 focus:ring-orange-500/20
                           dark:bg-gray-800/40 dark:border-gray-600/50 dark:text-white dark:focus:border-orange-400 dark:focus:ring-orange-400/20
                           backdrop-blur-sm shadow-lg text-sm sm:text-base"
              />
            </div>
          )}
        </div>

        {/* Enhanced Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !url.trim() || (expirationOption === "custom" && !expirationDate)}
          className={`w-full py-3 sm:py-4 md:py-5 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-white text-sm sm:text-base md:text-lg transition-all duration-500 transform focus:outline-none focus:ring-4 focus:ring-pink-500/50 relative overflow-hidden group ${
            isLoading || !url.trim() || (expirationOption === "custom" && !expirationDate)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 hover:from-pink-600 hover:via-purple-700 hover:to-blue-700 hover:scale-105 hover:shadow-2xl shadow-lg dark:from-pink-600 dark:via-purple-700 dark:to-blue-700 dark:hover:from-pink-500 dark:hover:via-purple-600 dark:hover:to-blue-600"
          }`}
        >
          {/* Button background animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Button content */}
          <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
            {isLoading ? (
              <>
                <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 sm:border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="animate-pulse text-xs sm:text-sm md:text-base">Creating Magic...</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce delay-100"></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce delay-200"></div>
                </div>
              </>
            ) : (
              <>
                <Zap size={18} className="group-hover:animate-pulse" />
                <span className="text-xs sm:text-sm md:text-base">Shorten URL</span>
                <div className="absolute right-2 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                  ✨
                </div>
              </>
            )}
          </div>
          
          {/* Ripple effect */}
          <div className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 rounded-xl sm:rounded-2xl transition-transform duration-300"></div>
        </button>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-3deg); }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
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
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }
        
        .animate-gradient-x {
          background-size: 400% 400%;
          animation: gradient-x 3s ease infinite;
        }
        
        .delay-100 {
          animation-delay: 0.1s;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default UrlForm;