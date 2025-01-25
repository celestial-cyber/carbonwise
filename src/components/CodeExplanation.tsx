import React from 'react';
import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CodeExplanation = () => {
  return (
    <Card className="border-eco/20 hover:border-eco transition-colors mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-forest">
          <BookOpen className="h-5 w-5" />
          Technical Implementation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold text-forest mb-2">Machine Learning Model</h3>
            <p className="text-gray-700">
              We utilize the MobileNetV4 model (mobilenetv4_conv_small.e2400_r224_in1k) from HuggingFace's transformers library. 
              This model runs directly in the browser using WebGPU acceleration for efficient image classification.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-forest mb-2">Key Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Real-time image analysis for environmental impact assessment</li>
              <li>Biodegradable material classification system</li>
              <li>Eco-friendly disposal recommendations</li>
              <li>Points-based reward system for environmental actions</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-forest mb-2">Technologies Used</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>React with TypeScript for robust frontend development</li>
              <li>Tailwind CSS for responsive and modern styling</li>
              <li>shadcn/ui for consistent UI components</li>
              <li>@huggingface/transformers for ML model integration</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-forest mb-2">Architecture</h3>
            <p className="text-gray-700">
              The application follows a component-based architecture with clear separation of concerns:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
              <li>AnalysisSection: Handles image upload and processing</li>
              <li>ResultsSection: Displays ML model predictions</li>
              <li>ImpactSection: Shows environmental impact and recommendations</li>
              <li>BiodegradableClassifier: Provides material classification</li>
            </ul>
          </section>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeExplanation;