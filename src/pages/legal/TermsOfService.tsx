
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="section-padding bg-gradient-to-b from-deskhive-skyblue to-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="glass-card p-8 md:p-12 backdrop-blur-xl bg-white/20 border border-white/30 shadow-xl">
                <h1 className="text-4xl font-bold text-deskhive-navy mb-8">Terms of Service</h1>
                
                <div className="space-y-6 text-deskhive-darkgray">
                  <p>Last Updated: {new Date().toLocaleDateString()}</p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">1. Acceptance of Terms</h2>
                  <p>
                    By accessing or using DeskHive's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">2. Description of Services</h2>
                  <p>
                    DeskHive provides a workspace management platform that allows users to discover, book, and manage workspaces in various locations across Nigeria.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">3. User Accounts</h2>
                  <p>
                    To use certain features of our services, you must register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">4. Booking and Cancellation</h2>
                  <p>
                    Users may book workspaces subject to availability. Cancellation policies may vary depending on the workspace and will be clearly communicated at the time of booking.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">5. Prohibited Activities</h2>
                  <p>
                    Users may not engage in any illegal or unauthorized use of our services, including but not limited to harassment, impersonation, or interference with our services.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">6. Intellectual Property</h2>
                  <p>
                    All content, trademarks, and intellectual property on DeskHive belong to us or our licensors. Users may not use, copy, or distribute our content without our permission.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">7. Limitation of Liability</h2>
                  <p>
                    DeskHive is not liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of our services.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">8. Changes to Terms</h2>
                  <p>
                    We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">9. Governing Law</h2>
                  <p>
                    These terms are governed by the laws of the Federal Republic of Nigeria.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">10. Contact Information</h2>
                  <p>
                    For questions about these terms, please contact us at <span className="text-deskhive-royal">legal@deskhive.ng</span>.
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

export default TermsOfService;
