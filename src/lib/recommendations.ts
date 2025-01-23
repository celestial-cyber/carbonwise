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
  biodegradable: [
    {
      title: "Start Composting",
      description: "Turn your organic waste into nutrient-rich compost for gardens and plants. This reduces methane emissions from landfills.",
      impact: "Reduce waste by 30%"
    },
    {
      title: "Garden Integration",
      description: "Use your composted materials in a home garden to grow your own vegetables and herbs.",
      impact: "Zero waste gardening"
    },
    {
      title: "Community Sharing",
      description: "Share excess compost with local community gardens or neighbors to maximize impact.",
      impact: "Build sustainable communities"
    }
  ],
  "non-biodegradable": [
    {
      title: "Proper Recycling",
      description: "Ensure proper sorting and cleaning of recyclable materials before disposal.",
      impact: "Increase recycling efficiency by 40%"
    },
    {
      title: "Reduce Consumption",
      description: "Choose reusable alternatives to reduce non-biodegradable waste generation.",
      impact: "Reduce waste by 50%"
    },
    {
      title: "Upcycling Projects",
      description: "Transform non-biodegradable items into useful products through creative upcycling.",
      impact: "Creative waste reduction"
    }
  ]
};

export const getRecommendations = (source: string): Recommendation[] => {
  return recommendations[source.toLowerCase()] || [];
};
