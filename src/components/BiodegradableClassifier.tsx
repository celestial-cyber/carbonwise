import React, { useState } from 'react';
import { Recycle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface DisposalGuide {
  type: 'biodegradable' | 'non-biodegradable';
  recommendations: string[];
}

const BiodegradableClassifier = () => {
  const [itemName, setItemName] = useState('');
  const [guide, setGuide] = useState<DisposalGuide | null>(null);

  const biodegradableItems = ['paper', 'food', 'leaves', 'wood', 'cotton', 'fruit', 'vegetable'];

  const classifyItem = () => {
    if (!itemName.trim()) {
      toast.error("Please enter an item name");
      return;
    }

    const isBiodegradable = biodegradableItems.some(item => 
      itemName.toLowerCase().includes(item)
    );

    const recommendations = isBiodegradable ? [
      "Can be composted in a home composting bin",
      "Break down into smaller pieces to speed up decomposition",
      "Mix with other organic materials for better results"
    ] : [
      "Separate from biodegradable waste",
      "Check local recycling guidelines",
      "Consider reusing or upcycling if possible"
    ];

    setGuide({
      type: isBiodegradable ? 'biodegradable' : 'non-biodegradable',
      recommendations
    });

    toast.success("Classification complete!");
  };

  return (
    <Card className="border-eco/20 hover:border-eco transition-colors mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-forest">
          <Recycle className="h-5 w-5" />
          Biodegradable Classification
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Enter item name (e.g., paper cup)"
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <Button onClick={classifyItem} className="bg-forest hover:bg-forest/90">
              Classify
            </Button>
          </div>

          {guide && (
            <div className="mt-4 p-4 rounded-lg bg-eco/10">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-5 w-5 text-forest" />
                <h3 className="font-semibold text-lg">
                  {guide.type === 'biodegradable' ? 'Biodegradable Item' : 'Non-biodegradable Item'}
                </h3>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {guide.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BiodegradableClassifier;