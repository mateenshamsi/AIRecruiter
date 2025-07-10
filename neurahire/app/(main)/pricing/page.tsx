import React from 'react';
import { PricingCard } from './_components/PricingCard';
import FAQ from './_components/FAQ';

const pricingTiers = [
  {
    name: 'Free Forever',
    price: '$0',
    description: 'Perfect for getting started with AI-powered recruiting',
    features: [
      'Discover AI-matched candidates each month',
      'Basic resume parsing to save time',
      'Solo recruiting for individuals',
      'Standard email support'
    ],
    buttonText: 'Start Free'
  },
  {
    name: 'Starter',
    price: '$99',
    description: 'Everything you need to scale your recruiting process',
    features: [
      'Unlimited AI matches to keep your pipeline full',
      'Advanced resume parsing & enriched data',
      'Invite your team & share hiring pipelines',
      'Basic integrations & priority email support'
    ],
    popular: true,
    buttonText: 'Start 14-Day Trial'
  },
  {
    name: 'Pro',
    price: '$999',
    description: 'Advanced features for enterprise teams',
    features: [
      'Advanced AI scoring & smart shortlisting',
      'Manage large teams with roles & permissions',
      'White-label career page & deep integrations',
      'SSO, GDPR tools & premium support'
    ],
    buttonText: 'Contact Sales'
  }
];

const Pricing = () => {
  return (
    <div >
      <div className="container mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-purple-600 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Start hiring smarter with AI — free forever.<br />
            Upgrade for advanced features & team collaboration.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={index} tier={tier} />
          ))}
        </div>
          <FAQ/>
        
      </div>
    </div>
  );
};

export default Pricing;