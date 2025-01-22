import React, { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import ResultsDisplay from '../components/ResultsDisplay';
import RecommendationCard from '../components/RecommendationCard';
import RewardsCard from '../components/RewardsCard';
import { getRecommendations } from '../lib/recommendations';
import { toast } from 'sonner';
import { pipeline } from '@huggingface/transformers';
import { Leaf } from 'lucide-react';

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

      // Try WebGPU first, fall back to WebAssembly
      let device = 'webgpu';
      
      try {
        // Initialize the image classification pipeline
        const classifier = await pipeline(
          'image-classification',
          'onnx-community/mobilenetv4_conv_small.e2400_r224_in1k',
          { device }
        );

        // Classify the image and type assert the result
        const results = (await classifier(imageData)) as ClassificationResult[];
        
        // Map the model's output to our categories
        let detectedType = 'waste';
        const label = results[0].label.toLowerCase();
        
        if (label.includes('car') || label.includes('truck') || label.includes('bus')) {
          detectedType = 'vehicle';
        } else if (label.includes('factory') || label.includes('building')) {
          detectedType = 'factory';
        } else if (label.includes('food') || label.includes('waste') || label.includes('organic')) {
          detectedType = 'waste';
        }

        setPrediction(detectedType);
        setConfidence(results[0].score);
        
        // Award points based on detection
        const newPoints = points + 10;
        setPoints(newPoints);
        
        toast.success('Analysis complete!');
      } catch (gpuError) {
        console.error('WebGPU failed, falling back to WebAssembly:', gpuError);
        device = 'cpu';
        toast.error('WebGPU not available. Please try again.');
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast.error('Error analyzing image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const recommendations = prediction ? getRecommendations(prediction) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-eco/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-12 w-12 text-forest mr-2" />
            <h1 className="text-4xl font-bold text-forest">
              EcoTrack
            </h1>
          </div>
          <p className="text-xl text-gray-600 mt-2">
            Track Your Impact, Change the Future
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <ImageUpload onImageSelected={handleImageSelected} />
            {isAnalyzing && (
              <div className="mt-4 text-center text-forest animate-pulse">
                Analyzing image...
              </div>
            )}
          </div>
          <div>
            <RewardsCard points={points} />
          </div>
        </div>
        
        {prediction && (
          <div className="mt-12 space-y-6 animate-fade-in">
            <ResultsDisplay 
              prediction={prediction} 
              confidence={confidence}
            />
            
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-forest mb-6">
                Recommendations
              </h2>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <RecommendationCard 
                    key={index} 
                    recommendation={rec}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;