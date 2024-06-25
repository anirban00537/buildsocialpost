import React from "react";

const FullScreenLoading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-white"></div>
    </div>
  );
};

export default FullScreenLoading;
