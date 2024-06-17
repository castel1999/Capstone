import React from 'react';

const LoadingVerTwo = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparant">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-grey-300"></div>
        </div>
    );
};

export default LoadingVerTwo;