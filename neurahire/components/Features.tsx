import { Card, CardContent } from "@/components/ui/card";
import { Video, Phone, Users, BarChart3, Clock, Shield } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "AI Video Interviews",
    description: "Intelligent AI agents conduct comprehensive video interviews, analyzing both verbal responses and non-verbal cues.",
  },
  {
    icon: Phone,
    title: "Phone Screening",
    description: "Automated phone screenings that filter candidates efficiently before moving to detailed interview rounds.",
  },
  {
    icon: Users,
    title: "Candidate Management",
    description: "Centralized dashboard to track, manage, and evaluate all candidates throughout the hiring pipeline.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Deep insights into candidate performance, interview metrics, and hiring success rates.",
  },
  {
    icon: Clock,
    title: "Smart Scheduling",
    description: "Automated interview scheduling that works around both candidate and recruiter availability.",
  },
  {
    icon: Shield,
    title: "Bias-Free Hiring",
    description: "AI-driven evaluation eliminates unconscious bias, ensuring fair and objective candidate assessment.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Powerful Features for Modern Recruiting
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to streamline your hiring process and find the best talent efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
