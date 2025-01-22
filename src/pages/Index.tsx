import React, { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import ResultsDisplay from '../components/ResultsDisplay';
import RecommendationCard from '../components/RecommendationCard';
import { getRecommendations } from '../lib/recommendations';
import { toast } from 'sonner';

const Index = () => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number>(0);

  const handleImageSelected = async (imageData: string) => {
    try {
      // Simulate ML model prediction with more specific categories
      const mockPredictions = [
        { type: 'waste', subtypes: ['organic_waste', 'food_waste', 'rotten_food'], confidence: 0.92 },
        { type: 'vehicle', subtypes: ['car', 'truck', 'motorcycle'], confidence: 0.89 },
        { type: 'factory', subtypes: ['industrial', 'manufacturing', 'processing'], confidence: 0.87 }
      ];
      
      // Simulate analyzing the image content more specifically
      const imageContent = imageData.toLowerCase();
      let selectedPrediction;
      
      // More specific detection logic
      if (imageContent.includes('waste') || imageContent.includes('banana') || imageContent.includes('food')) {
        selectedPrediction = mockPredictions[0];
      } else if (imageContent.includes('vehicle') || imageContent.includes('car')) {
        selectedPrediction = mockPredictions[1];
      } else if (imageContent.includes('factory') || imageContent.includes('industry')) {
        selectedPrediction = mockPredictions[2];
      } else {
        // Default to waste prediction with adjusted confidence for unknown items
        selectedPrediction = {
          type: 'waste',
          subtypes: ['organic_waste'],
          confidence: 0.95 // High confidence for waste detection
        };
      }
      
      setPrediction(selectedPrediction.type);
      setConfidence(selectedPrediction.confidence);
      
      toast.success('Analysis complete!');
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast.error('Error analyzing image. Please try again.');
    }
  };

  const recommendations = prediction ? getRecommendations(prediction) : [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-forest mb-4">
            Carbon Footprint Detector
          </h1>
          <p className="text-xl text-gray-600">
            Upload an image to identify emission sources and get recommendations
          </p>
        </div>

        <ImageUpload onImageSelected={handleImageSelected} />
        
        {prediction && (
          <div className="mt-12 space-y-6">
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