import React from 'react';
import welcomeImage from '../../utils/images/doco.avif'; // Make sure to provide the correct path to your image

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 md:p-8 text-white">
      <h2 className="text-3xl md:text-5xl font-bold text-center">Hi Welcome!</h2>
      <p className="mt-4 text-base md:text-3xl text-center">Let's Get Started</p>
      <p className="mt-2 text-xl md:text-2xl text-center">
      Elevate Your Health with Our Premier Medical Services!!
      </p>
      <img src={welcomeImage} alt="Welcome" className="mt-4 w-40 h-auto md:w-60 md:h-70" />
    </div>
  );
};

export default Welcome;