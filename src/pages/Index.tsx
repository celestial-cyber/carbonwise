import React, { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import ResultsDisplay from '../components/ResultsDisplay';
import RecommendationCard from '../components/RecommendationCard';
import RewardsCard from '../components/RewardsCard';
import { getRecommendations } from '../lib/recommendations';
import { toast } from 'sonner';
import { pipeline } from '@huggingface/transformers';
import { Leaf, BookOpen, BarChart3, Upload, TreePine } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ClassificationResult {
  label: string;
  score: number;
}

const Index = () => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageSelected = async (imageData: string) => {
    try {
      setIsAnalyzing(true);
      toast.info('Analyzing image...', { duration: 2000 });

      const classifier = await pipeline(
        'image-classification',
        'onnx-community/mobilenetv4_conv_small.e2400_r224_in1k',
        { device: 'webgpu' as const }
      );

      const results = (await classifier(imageData)) as ClassificationResult[];
      
      let detectedType = 'waste';
      const label = results[0].label.toLowerCase();
      
      if (label.includes('car') || label.includes('truck') || label.includes('bus')) {
        detectedType = 'vehicle';
      } else if (label.includes('factory') || label.includes('building')) {
        detectedType = 'factory';
      }

      setPrediction(detectedType);
      setConfidence(results[0].score);
      
      const newPoints = points + 10;
      setPoints(newPoints);
      
      toast.success('Analysis complete!');
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast.error('Error analyzing image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const recommendations = prediction ? getRecommendations(prediction) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-eco/5 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4 space-x-3">
            <TreePine className="h-12 w-12 text-forest" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-forest to-eco bg-clip-text text-transparent">
              EcoImageWise
            </h1>
          </div>
          <p className="text-xl text-gray-600 mt-2">
            Detect, Analyze, and Reduce Your Carbon Footprint
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Upload and Results */}
          <div className="space-y-8">
            <Card className="border-eco/20 hover:border-eco transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-forest">
                  <Upload className="h-5 w-5" />
                  Upload Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload onImageSelected={handleImageSelected} />
                {isAnalyzing && (
                  <div className="mt-4 text-center text-forest animate-pulse">
                    Analyzing your image for environmental impact...
                  </div>
                )}
              </CardContent>
            </Card>

            {prediction && (
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
            )}
          </div>

          {/* Right Column - Rewards and Recommendations */}
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
        </div>
      </div>
    </div>
  );
};

export default Index;