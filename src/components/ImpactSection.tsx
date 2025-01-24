import { Leaf, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RewardsCard from './RewardsCard';
import RecommendationCard from './RecommendationCard';
import { getRecommendations } from '../lib/recommendations';

interface ImpactSectionProps {
  points: number;
  prediction: string | null;
}

const ImpactSection = ({ points, prediction }: ImpactSectionProps) => {
  const recommendations = prediction ? getRecommendations(prediction) : [];

  return (
    <div className="space-y-8">
      <Card className="border-eco/20 hover:border-eco transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-forest">
            <Leaf className="h-5 w-5" />
            Your Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RewardsCard points={points} />
        </CardContent>
      </Card>

      {prediction && (
        <Card className="animate-fade-in border-eco/20 hover:border-eco transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-forest">
              <BookOpen className="h-5 w-5" />
              Eco-Friendly Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <RecommendationCard 
                  key={index} 
                  recommendation={rec}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImpactSection;