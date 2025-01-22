interface Recommendation {
  title: string;
  description: string;
  impact: string;
}

const recommendations: Record<string, Recommendation[]> = {
  vehicle: [
    {
      title: "Use Public Transportation",
      description: "Switch to buses or trains for your daily commute to significantly reduce your carbon footprint.",
      impact: "Reduce emissions by up to 20%"
    },
    {
      title: "Consider Carpooling",
      description: "Share rides with colleagues or use carpooling apps to decrease the number of vehicles on the road.",
      impact: "Save 2.2 tons CO2/year"
    }
  ],
  factory: [
    {
      title: "Energy Efficiency Audit",
      description: "Conduct regular energy audits to identify and fix inefficient processes and equipment.",
      impact: "Up to 30% energy savings"
    },
    {
      title: "Renewable Energy Integration",
      description: "Implement solar panels or wind energy solutions to power operations.",
      impact: "Reduce emissions by 40-60%"
    }
  ],
  waste: [
    {
      title: "Implement Recycling Program",
      description: "Set up comprehensive recycling systems and educate about proper waste segregation.",
      impact: "Divert 70% waste from landfills"
    },
    {
      title: "Composting Initiative",
      description: "Start composting organic waste to reduce methane emissions from landfills.",
      impact: "Reduce methane by 50%"
    }
  ]
};

export const getRecommendations = (source: string): Recommendation[] => {
  return recommendations[source.toLowerCase()] || [];
};