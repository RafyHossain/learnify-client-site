import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-200/70 backdrop-blur-sm z-50">
      <div className="bg-base-100 shadow-xl rounded-2xl px-10 py-8 flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>

        <p className="text-sm text-gray-500 tracking-wide animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;
