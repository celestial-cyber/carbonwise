import React from 'react';
import { Trophy, Award, Gift } from 'lucide-react';

interface RewardsCardProps {
  points: number;
}

const RewardsCard: React.FC<RewardsCardProps> = ({ points }) => {
  const getRewardIcon = () => {
    if (points >= 100) return <Trophy className="h-8 w-8 text-yellow-500" />;
    if (points >= 50) return <Award className="h-8 w-8 text-eco" />;
    return <Gift className="h-8 w-8 text-forest" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-4 border border-eco/20 hover:border-eco transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Eco Points</h3>
          <p className="text-3xl font-bold text-forest">{points}</p>
        </div>
        {getRewardIcon()}
      </div>
      <p className="text-sm text-gray-600 mt-4">
        Keep making eco-friendly choices to earn more points!
      </p>
    </div>
  );
};

export default RewardsCard;