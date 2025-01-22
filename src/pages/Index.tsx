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
      // Simulate ML model prediction
      // In a real app, this would make an API call to your ML backend
      const mockPredictions = ['vehicle', 'factory', 'waste'];
      const randomPrediction = mockPredictions[Math.floor(Math.random() * mockPredictions.length)];
      const mockConfidence = 0.85 + (Math.random() * 0.1);
      
      setPrediction(randomPrediction);
      setConfidence(mockConfidence);
      
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