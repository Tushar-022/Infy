import React from 'react';

const Footer = () => {
  return (
    <div>
    <div className="text-center py-4 bg-gray-900" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
  <a href="/main" className="text-gray-400 hover:text-gray-200">
    Back to top
  </a>
</div>


    <footer className="bg-gray-800 text-white py-6">
    <div className="container mx-auto px-4">
  <div className="grid grid-cols-4 gap-4">
    <div>
      <h3 className="font-bold mb-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">Get to Know Us</h3>
      <ul className="space-y-1">
        <li><a target='blank' href="https://vcs-about-us.vercel.app/"  className="text-gray-400 hover:text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg">About Us</a></li>
        {/* <li><a href="/main" className="text-gray-400 hover:text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg">Careers</a></li>
        <li><a href="/main" className="text-gray-400 hover:text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg">Press Releases</a></li>
        <li><a href="/main" className="text-gray-400 hover:text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg">Amazon Science</a></li> */}
      </ul>
    </div>
    <div>
      <h3 className="font-bold mb-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">Connect with Us</h3>
      <ul className="space-y-1">
        <li><a href="/main" className="text-gray-400 hover:text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg">Facebook</a></li>
        <li><a href="/main" className="text-gray-400 hover:text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg">Twitter</a></li>
        <li><a href="/main" className="text-gray-400 hover:text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg">Instagram</a></li>
      </ul>
    </div>
    <div>
      <h3 className="font-bold mb-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">Make Money with Us</h3>
      <ul className="space-y-1">

        <li><a href="/main" className="text-gray-400 hover:text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg">Protect and Build Your Brand</a></li>

      </ul>
    </div>
    <div>
      <h3 className="font-bold mb-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">Support and Assistance</h3>
      <ul className="space-y-1">
        <li><a href="/privacy" className="text-gray-400 hover:text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg">Privacy-Policy</a></li>
        <li><a href="/main" className="text-gray-400 hover:text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg">Your Account</a></li>
      </ul>
    </div>
  </div>
</div>

    </footer>
  </div>
  );
};

export default Footer;
