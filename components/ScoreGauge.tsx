import React from 'react';

interface ScoreGaugeProps {
  score: number;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  // Determine color based on score
  let colorClass = "text-red-500";
  let strokeColor = "#ef4444";
  
  if (score >= 80) {
    colorClass = "text-green-500";
    strokeColor = "#22c55e";
  } else if (score >= 60) {
    colorClass = "text-yellow-500";
    strokeColor = "#eab308";
  }

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="#e2e8f0"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke={strokeColor}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
            <span className={`text-3xl font-bold ${colorClass}`}>
                {score}
            </span>
            <span className="text-xs text-slate-400 uppercase font-semibold">
                得分
            </span>
        </div>
      </div>
    </div>
  );
};

export default ScoreGauge;