import React from 'react';

const Loader: React.FC = () => (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80">
        <div className="w-16 h-16 border-8 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
    </div>
);

export default Loader;
