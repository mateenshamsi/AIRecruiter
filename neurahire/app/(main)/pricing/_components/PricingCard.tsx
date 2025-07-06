import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText?: string;
}

interface PricingCardProps {
  tier: PricingTier;
}

export const PricingCard: React.FC<PricingCardProps> = ({ tier }) => {
  return (
    <>
    
  <Card className={`relative overflow-hidden transition-all duration-300 ${
    tier.popular 
      ? 'border-purple-600 shadow-lg shadow-purple-200/50 scale-105 bg-[#E0AAFF]/10' 
      : 'border-gray-200 hover:border-purple-300 hover:shadow-lg hover:-translate-y-1 bg-white'
  }`}>
    <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={100}
          inactiveZone={0.01}
        />
    {tier.popular && (
      <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-purple-400 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg flex items-center gap-1">
        <Star className="w-3 h-3 fill-current" />
        Popular
      </div>
    )}
    <CardHeader className="text-center pb-2">
      <CardTitle className="text-2xl font-bold text-purple-600">{tier.name}</CardTitle>
      <div className="py-4">
        <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
        {tier.price !== '$0' && <span className="text-gray-500"> / month</span>}
      </div>
      <CardDescription className="text-base text-gray-600">{tier.description}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4 px-6 py-8">
      <ul className="space-y-3">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-800 leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
      <Button 
        className={`w-full mt-6 transition-all duration-300 ${
          tier.popular 
            ? 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-lg hover:shadow-purple-300/50' 
            : 'border-purple-600 text-purple-600 bg-purple-50 hover:bg-purple-100 hover:text-purple-700'
        }`}
        variant={tier.popular ? "default" : "outline"}
        size="lg"
      >
        {tier.buttonText || 'Get Started'}
      </Button>
    </CardContent>
  </Card>
</>

  );
};  