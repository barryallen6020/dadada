
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="section-padding bg-gradient-to-b from-deskhive-skyblue to-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="glass-card p-8 md:p-12 backdrop-blur-xl bg-white/20 border border-white/30 shadow-xl">
                <h1 className="text-4xl font-bold text-deskhive-navy mb-8">Refund Policy</h1>
                
                <div className="space-y-6 text-deskhive-darkgray">
                  <p>Last Updated: {new Date().toLocaleDateString()}</p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">1. Refund Eligibility</h2>
                  <p>
                    DeskHive is committed to providing high-quality workspace services. We understand that circumstances may arise that require cancellation of a booking.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">2. Standard Refund Terms</h2>
                  <div className="mt-4 glass p-6 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl">
                    <h3 className="text-lg font-medium text-deskhive-royal mb-3">Cancellation Timeframes</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><span className="font-medium">More than 48 hours before booking:</span> Full refund</li>
                      <li><span className="font-medium">24-48 hours before booking:</span> 50% refund</li>
                      <li><span className="font-medium">Less than 24 hours before booking:</span> No refund</li>
                    </ul>
                  </div>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">3. Exceptional Circumstances</h2>
                  <p>
                    We may consider full or partial refunds in exceptional circumstances, such as:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Medical emergencies (with documentation)</li>
                    <li>Natural disasters</li>
                    <li>Unexpected workspace closure</li>
                    <li>Service unavailability due to technical issues on our part</li>
                  </ul>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">4. Subscription Plans</h2>
                  <p>
                    For users with subscription plans:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Monthly subscriptions may be canceled at any time, but refunds are not provided for partial months</li>
                    <li>Annual subscriptions may be refunded on a pro-rata basis if canceled within 14 days of purchase</li>
                  </ul>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">5. Refund Process</h2>
                  <p>
                    To request a refund:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2 mt-2">
                    <li>Log into your DeskHive account</li>
                    <li>Go to "My Bookings"</li>
                    <li>Select the booking you wish to cancel</li>
                    <li>Click "Request Refund"</li>
                    <li>Provide a reason for the cancellation</li>
                  </ol>
                  <p className="mt-2">
                    Refunds will be processed to the original payment method within 7-14 business days.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">6. Non-Refundable Items</h2>
                  <p>
                    The following are not eligible for refunds:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Service fees</li>
                    <li>Additional services that have already been delivered</li>
                    <li>Bookings that have been partially used</li>
                  </ul>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">7. Changes to This Policy</h2>
                  <p>
                    We reserve the right to update this Refund Policy at any time. Any changes will be posted on this page.
                  </p>
                  
                  <h2 className="text-2xl font-semibold text-deskhive-navy mt-8">8. Contact Us</h2>
                  <p>
                    If you have any questions about our Refund Policy, please contact us at <span className="text-deskhive-royal">billing@deskhive.ng</span>.
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

export default RefundPolicy;
