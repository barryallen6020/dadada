import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="section-padding pt-28 bg-gradient-to-b from-deskhive-skyblue to-white">
          <div className="container mx-auto px-2">
            <div className="max-w-5xl mx-auto">
              <div className="glass-card p-4 md:p-12 backdrop-blur-xl bg-white/20 border border-white/30 shadow-xl">
                <h1 className="text-4xl font-bold text-deskhive-navy mb-8">Privacy Policy</h1>
                
                <div className="space-y-6 text-deskhive-darkgray">
                  <p>Last Updated: {new Date().toLocaleDateString()}</p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">1. Introduction</h2>
                  <p>
                    At DeskHive, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">2. Information We Collect</h2>
                  <p>
                    We collect various types of information, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Personal information (name, email, phone number)</li>
                    <li>Account information</li>
                    <li>Booking history</li>
                    <li>Usage data</li>
                    <li>Device information</li>
                  </ul>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">3. How We Use Your Information</h2>
                  <p>
                    We use your information to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Provide and improve our services</li>
                    <li>Process bookings and payments</li>
                    <li>Communicate with you</li>
                    <li>Personalize your experience</li>
                    <li>Ensure security and prevent fraud</li>
                  </ul>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">4. Information Sharing</h2>
                  <p>
                    We may share your information with:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Service providers who help us operate our platform</li>
                    <li>Workspace owners (limited information for booking purposes)</li>
                    <li>Legal authorities when required by law</li>
                  </ul>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">5. Data Security</h2>
                  <p>
                    We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">6. Your Data Rights</h2>
                  <p>
                    Depending on your location, you may have rights regarding your personal data, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Access to your data</li>
                    <li>Correction of inaccurate data</li>
                    <li>Deletion of your data</li>
                    <li>Restriction of processing</li>
                    <li>Data portability</li>
                  </ul>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">7. Cookies and Similar Technologies</h2>
                  <p>
                    We use cookies and similar technologies to enhance your experience, analyze usage, and assist in our marketing efforts.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">8. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">9. Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at <span className="text-deskhive-royal">privacy@deskhive.ng</span>.
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

export default PrivacyPolicy;
