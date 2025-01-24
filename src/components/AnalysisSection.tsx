import { Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUpload from './ImageUpload';

interface AnalysisSectionProps {
  onImageSelected: (imageData: string) => Promise<void>;
  isAnalyzing: boolean;
}

const AnalysisSection = ({ onImageSelected, isAnalyzing }: AnalysisSectionProps) => {
  return (
    <Card className="border-eco/20 hover:border-eco transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-forest">
          <Upload className="h-5 w-5" />
          Upload Image
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ImageUpload onImageSelected={onImageSelected} />
        {isAnalyzing && (
          <div className="mt-4 text-center text-forest animate-pulse">
            Analyzing your image for environmental impact...
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalysisSection;