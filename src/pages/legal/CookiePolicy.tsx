
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="section-padding bg-gradient-to-b from-deskhive-skyblue to-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="glass-card p-8 md:p-12 backdrop-blur-xl bg-white/20 border border-white/30 shadow-xl">
                <h1 className="text-4xl font-bold text-deskhive-navy mb-8">Cookie Policy</h1>
                
                <div className="space-y-6 text-deskhive-darkgray">
                  <p>Last Updated: {new Date().toLocaleDateString()}</p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">1. What Are Cookies</h2>
                  <p>
                    Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by enabling certain features and remembering your preferences.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">2. Types of Cookies We Use</h2>
                  <h3 className="text-lg font-medium text-deskhive-royal mt-4">Essential Cookies</h3>
                  <p>
                    These cookies are necessary for the functioning of our website. They enable core features such as security, network management, and account access.
                  </p>
                  
                  <h3 className="text-lg font-medium text-deskhive-royal mt-4">Functionality Cookies</h3>
                  <p>
                    These cookies allow us to remember choices you make and provide enhanced, personalized features. They may be set by us or by third-party providers.
                  </p>
                  
                  <h3 className="text-lg font-medium text-deskhive-royal mt-4">Performance Cookies</h3>
                  <p>
                    These cookies collect information about how you use our website, such as which pages you visit and any errors you might encounter. This helps us improve our website.
                  </p>
                  
                  <h3 className="text-lg font-medium text-deskhive-royal mt-4">Marketing Cookies</h3>
                  <p>
                    These cookies track your activity on our website and across the internet to deliver more relevant advertising to you.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">3. How to Manage Cookies</h2>
                  <p>
                    Most web browsers allow you to control cookies through their settings. You can typically find these settings in the "options" or "preferences" menu of your browser.
                  </p>
                  <p className="mt-2">
                    Please note that restricting cookies may affect the functionality of our website.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">4. Third-Party Cookies</h2>
                  <p>
                    Some of our pages display content from external providers, such as YouTube, Facebook, and Twitter. To view this content, you may have to accept their specific terms and cookies.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">5. Changes to Our Cookie Policy</h2>
                  <p>
                    We may update our Cookie Policy from time to time. Any changes will be posted on this page.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">6. Contact Us</h2>
                  <p>
                    If you have any questions about our Cookie Policy, please contact us at <span className="text-deskhive-royal">privacy@deskhive.ng</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
