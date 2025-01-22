import React from 'react';
import { ThumbsUp } from 'lucide-react';

interface Recommendation {
  title: string;
  description: string;
  impact: string;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-4 border border-eco/20 hover:border-eco transition-colors">
      <div className="flex items-start space-x-4">
        <div className="bg-eco/10 rounded-full p-2">
          <ThumbsUp className="h-6 w-6 text-forest" />
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            {recommendation.title}
          </h4>
          <p className="text-gray-600 mb-4">
            {recommendation.description}
          </p>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-eco/10 text-forest">
            {recommendation.impact}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;