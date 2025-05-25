import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded-sm opacity-90"></div>
              </div>
              <span className="text-xl font-bold text-white">NeuraHire</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Revolutionizing recruitment with AI-driven interviews and intelligent candidate screening.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Product</h3>
            <div className="space-y-2">
              <a href="#" className="block hover:text-purple-400 transition-colors">Features</a>
              <a href="#" className="block hover:text-purple-400 transition-colors">Pricing</a>
              <a href="#" className="block hover:text-purple-400 transition-colors">API</a>
              <a href="#" className="block hover:text-purple-400 transition-colors">Integrations</a>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Company</h3>
            <div className="space-y-2">
              <a href="#" className="block hover:text-purple-400 transition-colors">About</a>
              <a href="#" className="block hover:text-purple-400 transition-colors">Blog</a>
              <a href="#" className="block hover:text-purple-400 transition-colors">Careers</a>
              <a href="#" className="block hover:text-purple-400 transition-colors">Contact</a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Support</h3>
            <div className="space-y-2">
              <a href="#" className="block hover:text-purple-400 transition-colors">Help Center</a>
              <a href="#" className="block hover:text-purple-400 transition-colors">Documentation</a>
              <a href="#" className="block hover:text-purple-400 transition-colors">Community</a>
              <a href="#" className="block hover:text-purple-400 transition-colors">Status</a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © 2025 NeuraHire. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
