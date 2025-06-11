import React from 'react';
import clsx from 'clsx';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string | number;
    positive?: boolean;
  };
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon, 
  change,
  className
}) => {
  return (
    <div className={clsx("metric-card", className)}>
      <div className="flex justify-between items-start">
        <div>
          <div className="metric-label">{title}</div>
          <div className="metric-value">{value}</div>
          {change && (
            <div className={clsx("metric-change", change.positive ? "positive" : "negative")}>
              {change.positive ? '+' : ''}{change.value}
            </div>
          )}
        </div>
        <div className="p-3 rounded-full bg-blue-50 text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;