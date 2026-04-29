import { Recommendation } from "@/lib/recommendation";
import { getCommuteModeIcon } from "@/components/ui/commute-icons";

interface HeroRecommendationProps {
  recommendation: Recommendation;
}

export default function HeroRecommendation({ recommendation }: HeroRecommendationProps) {
  return (
    <div className="col-span-12 lg:col-span-8 bg-primary-container text-on-primary-container rounded-xl p-lg relative overflow-hidden flex flex-col justify-between min-h-[300px]">
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-secondary to-transparent z-0" />

      <div className="relative z-10">
        <h1 className="font-headline-lg text-on-primary mb-sm">Today's Optimal Route</h1>
        <p className="font-body-lg text-on-primary-container max-w-[450px]">
          {recommendation.advisory}
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-sm mt-8">
        <div className="bg-surface-container-lowest text-primary rounded-full p-sm flex items-center justify-center">
          {getCommuteModeIcon(recommendation.mode)}
        </div>
        <div>
          <div className="font-headline-md text-on-primary">Take the {recommendation.mode}</div>
          <div className="font-label-caps text-on-primary-container">Est. Travel Time: {recommendation.travelTime}</div>
        </div>
      </div>
    </div>
  );
}
