import React from "react";
const HeroImage = () => {
  return <div className="relative">
      <div className="glass-card rounded-xl p-2 md:p-6">
        <div className="aspect-[16/9] bg-gradient-to-br from-deskhive-navy/90 to-deskhive-royal rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 opacity-20 bg-[url('/lovable-uploads/e4637799-cdf0-41b0-af2b-8393e9f28fe0.png')] bg-center bg-no-repeat bg-contain"></div>
          <div className="absolute inset-0 p-3 md:p-8 flex flex-col justify-end">
            <h3 className="text-white text-xs md:text-xl font-bold mb-1 md:mb-3">Seamless Workspace Management</h3>
            <p className="text-white/80 text-[10px] md:text-lg mb-2 md:mb-6">
              Book, manage, and optimize your workspaces with ease
            </p>
            <div className="grid grid-cols-3 gap-2 md:gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-md p-2 md:p-6 flex flex-col items-center justify-center">
                <div className="text-white text-xs md:text-2xl font-bold">100+</div>
                <div className="text-white/70 text-[10px] md:text-lg text-center">Users</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-md p-2 md:p-6 flex flex-col items-center justify-center">
                <div className="text-white text-xs md:text-2xl font-bold">30+</div>
                <div className="text-white/70 text-[10px] md:text-lg text-center">Spaces</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-md p-2 md:p-6 flex flex-col items-center justify-center">
                <div className="text-white text-xs md:text-2xl font-bold">15+</div>
                <div className="text-white/70 text-[10px] md:text-lg text-center">Locations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute -bottom-4 md:-bottom-8 -left-4 md:-left-8 w-24 md:w-48 h-24 md:h-48 bg-deskhive-orange/20 backdrop-blur-sm rounded-2xl -z-10"></div>
      <div className="absolute -top-4 md:-top-8 -right-4 md:-right-8 w-16 md:w-32 h-16 md:h-32 bg-deskhive-navy/20 backdrop-blur-sm rounded-2xl -z-10"></div>
    </div>;
};
export default HeroImage;