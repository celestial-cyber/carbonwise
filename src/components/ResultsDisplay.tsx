import React from 'react';
import { Leaf, Factory, Car } from 'lucide-react';

interface ResultsDisplayProps {
  prediction: string | null;
  confidence: number;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ prediction, confidence }) => {
  const getIcon = () => {
    switch (prediction?.toLowerCase()) {
      case 'vehicle':
        return <Car className="h-8 w-8 text-forest" />;
      case 'factory':
        return <Factory className="h-8 w-8 text-forest" />;
      default:
        return <Leaf className="h-8 w-8 text-forest" />;
    }
  };

  if (!prediction) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto mt-8 animate-fade-in">
      <div className="flex items-center space-x-4">
        {getIcon()}
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {prediction}
          </h3>
          <p className="text-sm text-gray-500">
            Confidence: {(confidence * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;