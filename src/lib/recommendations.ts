interface Recommendation {
  title: string;
  description: string;
  impact: string;
}

const recommendations: Record<string, Recommendation[]> = {
  vehicle: [
    {
      title: "Switch to Electric Vehicles",
      description: "Consider transitioning to electric or hybrid vehicles for significant reduction in carbon emissions. Many governments offer incentives for EV adoption.",
      impact: "Reduce emissions by up to 50%"
    },
    {
      title: "Optimize Route Planning",
      description: "Use smart navigation apps to find the most fuel-efficient routes and avoid traffic congestion.",
      impact: "Save up to 20% fuel consumption"
    },
    {
      title: "Regular Maintenance",
      description: "Keep your vehicle well-maintained with regular service checks to ensure optimal fuel efficiency.",
      impact: "Improve efficiency by 15%"
    }
  ],
  factory: [
    {
      title: "Renewable Energy Integration",
      description: "Install solar panels or wind turbines to power operations. Consider energy storage solutions for consistent supply.",
      impact: "Reduce emissions by 60%"
    },
    {
      title: "Smart Energy Management",
      description: "Implement IoT sensors and smart meters to monitor and optimize energy consumption in real-time.",
      impact: "Save 30% on energy costs"
    },
    {
      title: "Waste Heat Recovery",
      description: "Install heat exchangers and recovery systems to capture and reuse waste heat from industrial processes.",
      impact: "Improve efficiency by 25%"
    }
  ],
  waste: [
    {
      title: "Composting Program",
      description: "Start composting organic waste to create nutrient-rich soil for gardens and reduce methane emissions from landfills.",
      impact: "Divert 40% waste from landfills"
    },
    {
      title: "Recycling Innovation",
      description: "Implement advanced sorting systems and partner with recycling facilities to maximize material recovery.",
      impact: "Achieve 80% recycling rate"
    },
    {
      title: "Zero Waste Initiative",
      description: "Develop strategies to eliminate waste through better product design and material selection.",
      impact: "Reduce waste by 90%"
    }
  ]
};

export const getRecommendations = (source: string): Recommendation[] => {
  return recommendations[source.toLowerCase()] || [];
};