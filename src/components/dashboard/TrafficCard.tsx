import { TrafficStatus } from "@/services/traffic";

export default function TrafficCard({ traffic }: { traffic: TrafficStatus }) {
  return (
    <div className="col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-headline-md text-on-surface">Live Traffic Conditions</h2>
      </div>
      
      <div className="border border-surface-variant rounded-lg p-md">
        <div className="flex items-center gap-2 mb-3">
          <span className={`w-3 h-3 rounded-full ${traffic.color} animate-pulse-ring`}></span>
          <span className="font-headline-md text-[20px] text-on-surface">City-wide Traffic Status</span>
        </div>
        <p className="font-body-lg text-outline mb-2">
          {traffic.description}
        </p>
        <div className="font-data-mono text-on-surface text-lg mt-4">
          Traffic: {traffic.level}
        </div>
      </div>
    </div>
  );
}
