import React from "react";

const FullScreenLoading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="carousel-loader relative w-20 h-20">
        <div className="main-slide bg-primary" />
        <div className="side-slide left bg-primary" />
        <div className="side-slide right bg-primary" />
      </div>

      <style jsx>{`
        .carousel-loader {
          width: 100px;
          height: 100px;
          position: relative;
        }

        .main-slide {
          width: 70px;
          height: 100px;
          border-radius: 10px;
          position: absolute;
          left: 15px;
          animation: pulse 1.5s infinite ease-in-out;
        }

        .side-slide {
          width: 10px;
          height: 80px;
          opacity: 0.6;
          border-radius: 6px;
          position: absolute;
          top: 10px;
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

export default FullScreenLoading;
