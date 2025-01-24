import React, { useState } from 'react';
import { toast } from 'sonner';
import Header from '../components/Header';
import AnalysisSection from '../components/AnalysisSection';
import ResultsSection from '../components/ResultsSection';
import ImpactSection from '../components/ImpactSection';
import AchievementsSection from '../components/AchievementsSection';

const Index = () => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageSelected = async (imageData: string) => {
    try {
      setIsAnalyzing(true);
      toast.info('Analyzing image...', { duration: 2000 });

      // Using WebGPU for faster analysis
      const classifier = await pipeline(
        'image-classification',
        'onnx-community/mobilenetv4_conv_small.e2400_r224_in1k',
        { device: 'webgpu' as const }
      );

      const results = await classifier(imageData);
      
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-eco/5 to-white">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <AnalysisSection 
              onImageSelected={handleImageSelected}
              isAnalyzing={isAnalyzing}
            />
            <ResultsSection 
              prediction={prediction}
              confidence={confidence}
            />
          </div>

          <div className="space-y-8">
            <ImpactSection 
              points={points}
              prediction={prediction}
            />
            <AchievementsSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;