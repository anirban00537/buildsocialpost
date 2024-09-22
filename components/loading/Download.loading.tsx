import React from "react";

const DownloadLoading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50">
      <div className="carousel-loader relative w-20 h-20 mb-4">
        <div className="main-slide bg-primary" />
        <div className="side-slide left bg-primary" />
        <div className="side-slide right bg-primary" />
      </div>
      <p className="text-white text-sm font-normal">Downloading Carousel</p>

      <style jsx>{`
        .carousel-loader {
          width: 50px;
          height: 50px;
          position: relative;
        }

        .main-slide {
          width: 35px;
          height: 50px;
          border-radius: 5px;
          position: absolute;
          left: 7.5px;
          animation: pulse 1.5s infinite ease-in-out;
        }

        .side-slide {
          width: 5px;
          height: 40px;
          opacity: 0.6;
          border-radius: 3px;
          position: absolute;
          top: 5px;
        }

        .left {
          left: 0;
        }

        .right {
          right: 0;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.95);
          }
        }
      `}</style>
    </div>
  );
};

export default DownloadLoading;
