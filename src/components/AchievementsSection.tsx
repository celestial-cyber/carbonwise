import { Trophy, Award, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Achievement {
  title: string;
  description: string;
  icon: JSX.Element;
  progress: number;
  target: number;
}

const AchievementsSection = () => {
  const achievements: Achievement[] = [
    {
      title: "Carbon Conscious",
      description: "Upload your first carbon footprint image",
      icon: <Trophy className="h-6 w-6 text-yellow-500" />,
      progress: 0,
      target: 1
    },
    {
      title: "Eco Warrior",
      description: "Reduce carbon footprint by 10%",
      icon: <Award className="h-6 w-6 text-eco" />,
      progress: 0,
      target: 10
    },
    {
      title: "Sustainability Champion",
      description: "Complete 5 eco-friendly actions",
      icon: <Target className="h-6 w-6 text-forest" />,
      progress: 0,
      target: 5
    }
  ];

  return (
    <Card className="border-eco/20 hover:border-eco transition-colors animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-forest">
          <Trophy className="h-5 w-5" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-eco/10 rounded-full p-2">
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900">
                  {achievement.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {achievement.description}
                </p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-eco h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsSection;