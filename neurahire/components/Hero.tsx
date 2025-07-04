import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                🚀 AI-Powered Recruiting Revolution
              </div>
              <h1 className="text-5xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Hire Smarter with
                <span className=" mx-4  bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  AI-Driven
                </span>
                Interviews
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Transform your hiring process with NeuraHire's intelligent AI agents. 
                Conduct seamless interviews, eliminate bias, and find the perfect candidates faster than ever.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-8 py-4 text-lg"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Time Saved</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">10k+</div>
                <div className="text-sm text-gray-600">Interviews Conducted</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">4.9★</div>
                <div className="text-sm text-gray-600">User Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative">
            <div className="relative">
           
              <div className="relative bg-white p-1 rounded-3xl shadow-2xl">
                <Image
                  src="/recruiter.png"
                  width={300}
                  height={200} 
                  alt="NeuraHire Dashboard" 
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>
            
          
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;