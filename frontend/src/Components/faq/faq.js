import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t-2 border-gray-400 p-6 ">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="w-full md:grid md:grid-rows-1 flex flex-col md:gap-0 gap-y-12">
            <div className="grid md:grid-cols-3 gap-x-12">
           
                <div className="text-xl font-bold sm:text-sm  text-black mb-6">
                  At Elephant.ai, we guarantee your customers never have to wait. Our AI-powered chatbot operates 24/7, 
                  delivering instant, accurate responses to every query, and seamlessly transitioning to human support when needed.
                </div>
        
              <div className="md:grid hidden pt-8 grid-cols-3 col-span-2">
                <div className="flex flex-col lg:gap-y-8 gap-y-4">
                  <div className="text-black font-bold xl:text-3xl lg:text-2xl md:text-xl sm:text-lg xs:text-base 2xs:text-sm">
                    Company
                  </div>
                  {/* Company links */}
                </div>
                <div className="flex flex-col lg:gap-y-8 gap-y-4">
                  <div className="text-black font-bold xl:text-3xl lg:text-2xl md:text-xl sm:text-lg xs:text-base 2xs:text-sm">
                    Policy Info
                  </div>
                  {/* Privacy policy links */}
                </div>
                <div className="flex flex-col lg:gap-y-8 gap-y-4">
                  <div className="text-black font-bold xl:text-3xl lg:text-2xl md:text-xl sm:text-lg xs:text-base 2xs:text-sm">
                    Get Our App
                  </div>
                  {/* App download buttons */}
                </div>
              </div>
            </div>
            <div className="md:hidden flex flex-col lg:gap-y-8 gap-y-4">
              <div className="text-black font-bold xl:text-3xl lg:text-2xl md:text-xl sm:text-lg xs:text-base 2xs:text-sm">
                Get Our App
              </div>
              {/* App download buttons for mobile */}
            </div>
          </div>
        </div>
      </div>
      
    </footer>
  );
}
