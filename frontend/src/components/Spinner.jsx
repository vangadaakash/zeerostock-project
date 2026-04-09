import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-t-2 border-secondary animate-spin opacity-50 animation-delay-150"></div>
        <div className="absolute inset-4 rounded-full border-t-2 border-white animate-spin opacity-20 animation-delay-300"></div>
      </div>
    </div>
  );
};

export default Spinner;
