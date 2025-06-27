import { useState, useRef } from "react";
import { Sparkles, QrCode, Download, Copy, Check, ExternalLink, RefreshCw, Clock, Share2, Star } from "lucide-react";
import { toPng } from "html-to-image";
import QRCode from "react-qr-code";

const UrlResult = ({ shortUrl, onReset, darkMode, expirationInfo }) => {
  const [copied, setCopied] = useState(false);
  const [qrCopied, setQrCopied] = useState(false);
  const qrCodeRef = useRef(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeRef.current) {
      toPng(qrCodeRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `qr-${shortUrl.split("/").pop() || "link"}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error("Error generating QR code:", err);
        });
    }
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Shortened URL',
          text: 'Check out this shortened link!',
          url: shortUrl,
        });
      } catch (err) {
        handleCopy(); // Fallback to copy
      }
    } else {
      handleCopy(); // Fallback to copy
    }
  };

  return (
    <div className="backdrop-blur-2xl rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border transition-all duration-700 transform hover:shadow-3xl bg-white/30 border-white/40 dark:bg-gray-900/30 dark:border-gray-700/40 relative overflow-hidden group animate-slide-in-right">
      
      {/* Magical background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5 dark:from-green-500/10 dark:via-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Floating celebration particles */}
      <div className="absolute top-6 right-8 w-2 h-2 bg-green-400 rounded-full animate-celebration hidden sm:block"></div>
      <div className="absolute top-12 right-16 w-1 h-1 bg-blue-400 rounded-full animate-celebration-delayed hidden sm:block"></div>
      <div className="absolute top-8 right-12 w-1.5 h-1.5 bg-purple-400 rounded-full animate-celebration-slow hidden sm:block"></div>

      {/* Enhanced Header */}
      <div className="text-center mb-6 md:mb-8 relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-3 sm:mb-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 dark:from-green-600 dark:via-emerald-600 dark:to-teal-600 shadow-2xl transform animate-bounce-gentle group-hover:scale-110 transition-transform duration-500">
          <Sparkles className="text-white animate-pulse" size={24} />
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full opacity-50 blur-xl animate-pulse"></div>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
          🎉 Link Created!
        </h2>
        <div className="h-1 w-20 sm:w-24 mx-auto rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 shadow-lg animate-gradient-x" />
        
        <div className="flex items-center justify-center gap-2 mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          <Star className="text-yellow-500 animate-pulse" size={14} />
          <span className="font-medium">Your link is ready to share!</span>
          <Star className="text-yellow-500 animate-pulse" size={14} />
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="space-y-4 sm:space-y-6 relative z-10">
        {/* Enhanced Short URL Display */}
        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-dashed border-green-300 bg-green-50/50 dark:border-green-600/50 dark:bg-green-900/20 transition-all duration-500 hover:shadow-lg group/url">
          <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-green-700 dark:text-green-300 flex items-center gap-2">
            <ExternalLink size={14} />
            Your shortened URL
          </label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border-2 font-mono text-sm sm:text-base bg-white text-blue-600 border-green-200 dark:bg-gray-800/50 dark:border-green-600/50 dark:text-blue-400 focus:outline-none transition-all duration-300 hover:shadow-md"
            />
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className={`px-3 py-2 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 ${
                  copied
                    ? "bg-green-500 text-white shadow-lg scale-105 dark:bg-green-600"
                    : "bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-green-800/30 dark:hover:text-green-400 shadow-md hover:shadow-lg"
                }`}
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  <span className="text-xs sm:text-sm">{copied ? "Copied!" : "Copy"}</span>
                </div>
              </button>
              
              <button
                onClick={shareLink}
                className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl font-semibold bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-800/30 dark:text-blue-400 dark:hover:bg-blue-700/30 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/30 shadow-md hover:shadow-lg"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-purple-300 bg-purple-50/50 dark:border-purple-500/30 dark:bg-purple-900/20 transition-all duration-500 hover:shadow-lg group/qr">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-5">
            <div className="flex items-center gap-3">
              <div className="p-1 sm:p-2 rounded-md sm:rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600">
                <QrCode size={18} className="text-white" />
              </div>
              <label className="text-sm sm:text-base font-bold text-purple-700 dark:text-purple-300">QR Code</label>
            </div>
            <button
              onClick={downloadQRCode}
              className={`flex items-center gap-1 sm:gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 ${
                qrCopied
                  ? "bg-green-500 text-white"
                  : "text-purple-600 hover:text-white bg-purple-100 hover:bg-purple-600 dark:text-purple-300 dark:bg-purple-600/20 dark:hover:bg-purple-600/50"
              }`}
            >
              {qrCopied ? <Check size={14} /> : <Download size={14} />}
              <span>{qrCopied ? "Downloaded!" : "Download"}</span>
            </button>
          </div>
          <div ref={qrCodeRef} className="flex justify-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-inner">
            <div className="p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <QRCode
                value={shortUrl}
                size={window.innerWidth < 640 ? 120 : 160}
                bgColor={darkMode ? "#1f2937" : "#ffffff"}
                fgColor={darkMode ? "#ffffff" : "#000000"}
                level="H"
              />
            </div>
          </div>
        </div>

        {/* Enhanced Expiration Info */}
        {expirationInfo && (
          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-amber-300 bg-amber-50/50 dark:border-amber-500/30 dark:bg-amber-900/20 transition-all duration-500 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <div className="p-1 sm:p-2 rounded-md sm:rounded-lg bg-gradient-to-r from-amber-500 to-orange-500">
                <Clock className="text-white" size={18} />
              </div>
              <label className="text-sm sm:text-base font-bold text-amber-700 dark:text-amber-300">Expiration Details</label>
            </div>
            <p className="text-xs sm:text-sm text-amber-600 dark:text-amber-200 font-medium bg-amber-100/50 dark:bg-amber-800/20 p-2 sm:p-3 rounded-lg sm:rounded-xl">
              {expirationInfo}
            </p>
          </div>
        )}

        {/* Enhanced Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1 sm:pt-2">
          <button
            onClick={onReset}
            className="flex-1 py-3 px-4 sm:py-4 sm:px-6 rounded-xl sm:rounded-2xl font-bold border-2 transition-all duration-500 transform hover:scale-105 focus:outline-none focus:ring-4 bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-600/70 dark:border-gray-600 shadow-lg hover:shadow-xl group/reset"
          >
            <div className="flex items-center justify-center gap-2">
              <RefreshCw size={18} className="group-hover/reset:animate-spin" />
              <span className="text-sm sm:text-base">Create Another</span>
            </div>
          </button>
          
          <button
            onClick={() => window.open(shortUrl, "_blank")}
            className="flex-1 py-3 px-4 sm:py-4 sm:px-6 rounded-xl sm:rounded-2xl font-bold text-white shadow-xl transform hover:scale-105 transition-all duration-500 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 dark:from-blue-600 dark:via-purple-700 dark:to-pink-700 dark:hover:from-blue-500 dark:hover:via-purple-600 dark:hover:to-pink-600 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 relative overflow-hidden group/visit"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover/visit:translate-x-[100%] transition-transform duration-1000"></div>
            
            <div className="flex items-center justify-center gap-2 relative z-10">
              <ExternalLink size={18} />
              <span className="text-sm sm:text-base">Visit Link</span>
              <div className="absolute right-0 opacity-0 group-hover/visit:opacity-100 transition-opacity duration-300 hidden sm:block">
                🚀
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes slide-in-right {
          from { 
            opacity: 0; 
            transform: translateX(100px) scale(0.9) rotate(5deg); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0) scale(1) rotate(0deg); 
          }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-5px) scale(1.05); }
        }
        
        @keyframes celebration {
          0% { opacity: 0; transform: translateY(0px) scale(0); }
          50% { opacity: 1; transform: translateY(-20px) scale(1.2); }
          100% { opacity: 0; transform: translateY(-40px) scale(0); }
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
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        
        .animate-celebration {
          animation: celebration 2s ease-out infinite;
        }
        
        .animate-celebration-delayed {
          animation: celebration 2.5s ease-out infinite;
          animation-delay: 0.5s;
        }
        
        .animate-celebration-slow {
          animation: celebration 3s ease-out infinite;
          animation-delay: 1s;
        }
        
        .animate-gradient-x {
          background-size: 400% 400%;
          animation: gradient-x 3s ease infinite;
        }
        
        .grid-cols-21 {
          grid-template-columns: repeat(21, minmax(0, 1fr));
        }
      `}</style>
    </div>
  );
};

export default UrlResult;