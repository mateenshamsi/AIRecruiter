import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Create Interview",
    description: "Set up your AI interview with custom questions, evaluation criteria, and job requirements.",
    color: "from-purple-600 to-blue-500",
  },
  {
    step: "02", 
    title: "Schedule Candidates",
    description: "Invite candidates and let them choose their preferred interview time through our smart scheduling system.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    step: "03",
    title: "AI Conducts Interview",
    description: "Our AI agent conducts the interview, asking follow-up questions and analyzing responses in real-time.",
    color: "from-cyan-500 to-green-500",
  },
  {
    step: "04",
    title: "Review Results",
    description: "Get detailed analysis, candidate scores, and recommendations to make informed hiring decisions.",
    color: "from-green-500 to-emerald-500",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            How NeuraHire Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple, efficient, and powerful. Get started with AI-driven recruiting in just four steps.
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-200 via-blue-200 via-cyan-200 to-green-200"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-8 text-center">
                    <div className="space-y-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto`}>
                        <span className="text-white font-bold text-lg">{step.step}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;