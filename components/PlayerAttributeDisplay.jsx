import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

const PlayerAttributesRadar = ({ attributes }) => {
  if (!attributes) return null;
  
  // Transform the attributes object into the format needed for the RadarChart
  const formattedData = [
    { attribute: 'Overall', value: attributes.overall || 0 },
    { attribute: 'Inside', value: attributes.insideScoring || 0 },
    { attribute: 'Outside', value: attributes.outsideScoring || 0 },
    { attribute: 'In-between', value: attributes.inbetweenScoring || 0 },
    { attribute: 'Athleticism', value: attributes.athleticism || 0 },
    { attribute: 'Rebounding', value: attributes.rebounding || 0 },
    { attribute: 'Defense', value: attributes.defense || 0 }
  ];
  
  return (
    <div className="w-full" style={{ height: '220px' }}>
    <RadarChart 
      width={200} 
      height={200} 
      cx={100} 
      cy={100} 
      outerRadius={80} 
      data={formattedData}
    >
      <PolarGrid stroke="#e2e8f0" />
      <PolarAngleAxis 
        dataKey="attribute" 
        tick={{ fill: '#64748b', fontSize: 10 }}
      />
      <Radar
        name="Attributes"
        dataKey="value"
        stroke="#ef4444"
        fill="#ef4444"
        fillOpacity={0.3}
      />
    </RadarChart>
  </div>
  );
};

export default PlayerAttributesRadar;