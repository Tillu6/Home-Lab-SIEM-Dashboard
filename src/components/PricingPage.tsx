import React, { useState } from 'react';
import { Check, Shield, Zap, Star, CreditCard } from 'lucide-react';
import { stripeProducts } from '../stripe-config';
import { useStripeCheckout } from '../hooks/useStripeCheckout';

const PricingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { createCheckoutSession } = useStripeCheckout();

  const handlePurchase = async (priceId: string, mode: 'payment' | 'subscription') => {
    setIsLoading(priceId);
    
    try {
      await createCheckoutSession({
        priceId,
        mode,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/pricing`
      });
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-16">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/50">
              <Shield className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            Secure Your Home Lab
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Get enterprise-grade security monitoring and threat detection for your home lab environment. 
            One-time purchase, lifetime access.
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {stripeProducts.map((product) => (
            <div
              key={product.id}
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 relative overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              {/* Popular Badge */}
              <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-bl-2xl">
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">Most Popular</span>
                </div>
              </div>

              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
              
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">{product.name}</h2>
                  <p className="text-slate-400 mb-6">{product.description}</p>
                  
                  {/* Price */}
                  <div className="mb-6">
                    <div className="text-5xl font-bold text-white mb-2">{product.price}</div>
                    <div className="text-slate-400">One-time payment • Lifetime access</div>
                  </div>

                  {/* Purchase Button */}
                  <button
                    onClick={() => handlePurchase(product.priceId, product.mode)}
                    disabled={isLoading === product.priceId}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-medium py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center text-lg"
                  >
                    {isLoading === product.priceId ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <CreditCard className="mr-3 w-5 h-5" />
                        Get Instant Access
                      </>
                    )}
                  </button>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-blue-400" />
                    What's Included
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guarantee */}
                <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center text-green-400 mb-2">
                    <Shield className="w-5 h-5 mr-2" />
                    <span className="font-medium">30-Day Money-Back Guarantee</span>
                  </div>
                  <p className="text-green-300 text-sm">
                    Not satisfied? Get a full refund within 30 days, no questions asked.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-white font-medium mb-2">Secure Payment</h3>
              <p className="text-slate-400 text-sm">Powered by Stripe with bank-level security</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-white font-medium mb-2">Instant Access</h3>
              <p className="text-slate-400 text-sm">Download immediately after purchase</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-white font-medium mb-2">Lifetime Updates</h3>
              <p className="text-slate-400 text-sm">Free updates and new features forever</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;