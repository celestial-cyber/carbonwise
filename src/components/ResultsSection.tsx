import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ResultsDisplay from './ResultsDisplay';

interface ResultsSectionProps {
  prediction: string | null;
  confidence: number;
}

const ResultsSection = ({ prediction, confidence }: ResultsSectionProps) => {
  if (!prediction) return null;

  return (
    <Card className="animate-fade-in border-eco/20 hover:border-eco transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-forest">
          <BarChart3 className="h-5 w-5" />
          Analysis Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResultsDisplay 
          prediction={prediction} 
          confidence={confidence}
        />
      </CardContent>
    </Card>
  );
};

export default ResultsSection;