import { Leaf } from 'lucide-react';

const Header = () => {
  return (
    <div className="text-center mb-12 animate-fade-in">
      <div className="flex items-center justify-center mb-4 space-x-3">
        <Leaf className="h-12 w-12 text-eco animate-pulse" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-forest to-eco bg-clip-text text-transparent">
          CarbonWise
        </h1>
      </div>
      <p className="text-xl text-gray-600 mt-2">
        Detect, Analyze, and Reduce Your Carbon Footprint
      </p>
    </div>
  );
};

export default Header;