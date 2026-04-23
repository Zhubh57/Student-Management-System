import React from 'react';

const Loader = ({ fullPage = false }) => {
  const loader = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative h-12 w-12">
        <div className="absolute h-full w-full rounded-full border-4 border-slate-700"></div>
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
      <p className="text-slate-400 font-medium animate-pulse">Loading...</p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 bg-opacity-75 backdrop-blur-sm">
        {loader}
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center py-12">
      {loader}
    </div>
  );
};

export default Loader;
