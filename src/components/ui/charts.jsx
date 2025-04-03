// src/components/ui/charts.jsx
'use client';

import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  AreaChart as RechartsAreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Base card wrapper for charts
function ChartWrapper({ title, subtitle, children, className = '' }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          {title && <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

// Color presets
const colorPresets = {
  blue: ['#3b82f6', '#60a5fa', '#93c5fd'],
  green: ['#10b981', '#34d399', '#6ee7b7'],
  purple: ['#8b5cf6', '#a78bfa', '#c4b5fd'],
  red: ['#ef4444', '#f87171', '#fca5a5'],
  amber: ['#f59e0b', '#fbbf24', '#fcd34d'],
  default: ['#3b82f6', '#8b5cf6', '#ef4444', '#10b981', '#f59e0b', '#ec4899', '#6366f1']
};

// Line Chart Component
export function LineChart({
  data = [],
  xKey,
  yKey,
  title,
  subtitle,
  color = 'blue',
  height = 300,
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  showTooltip = true,
  showLegend = true,
  className = '',
  animate = true
}) {
  const colors = Array.isArray(yKey) 
    ? (colorPresets[color] || colorPresets.default)
    : [(colorPresets[color] || colorPresets.default)[0]];
  
  const yKeys = Array.isArray(yKey) ? yKey : [yKey];
  
  return (
    <ChartWrapper title={title} subtitle={subtitle} className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          {showXAxis && <XAxis 
            dataKey={xKey} 
            tick={{ fill: '#9ca3af' }} 
            axisLine={{ stroke: '#e5e7eb' }} 
          />}
          {showYAxis && <YAxis 
            tick={{ fill: '#9ca3af' }} 
            axisLine={{ stroke: '#e5e7eb' }} 
          />}
          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}
          
          {yKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              activeDot={{ r: 6 }}
              dot={{ r: 4 }}
              isAnimationActive={animate}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

// Bar Chart Component
export function BarChart({
  data = [],
  xKey,
  yKey,
  title,
  subtitle,
  color = 'blue',
  height = 300,
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  showTooltip = true,
  showLegend = true,
  stacked = false,
  className = '',
  animate = true
}) {
  const colors = Array.isArray(yKey) 
    ? (colorPresets[color] || colorPresets.default)
    : [(colorPresets[color] || colorPresets.default)[0]];
  
  const yKeys = Array.isArray(yKey) ? yKey : [yKey];
  
  return (
    <ChartWrapper title={title} subtitle={subtitle} className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          {showXAxis && <XAxis 
            dataKey={xKey} 
            tick={{ fill: '#9ca3af' }} 
            axisLine={{ stroke: '#e5e7eb' }} 
          />}
          {showYAxis && <YAxis 
            tick={{ fill: '#9ca3af' }} 
            axisLine={{ stroke: '#e5e7eb' }} 
          />}
          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}
          
          {yKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[index % colors.length]}
              stackId={stacked ? 'stack' : null}
              isAnimationActive={animate}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

// Area Chart Component
export function AreaChart({
  data = [],
  xKey,
  yKey,
  title,
  subtitle,
  color = 'blue',
  height = 300,
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  showTooltip = true,
  showLegend = true,
  stacked = false,
  className = '',
  animate = true
}) {
  const colors = Array.isArray(yKey) 
    ? (colorPresets[color] || colorPresets.default)
    : [(colorPresets[color] || colorPresets.default)[0]];
  
  const yKeys = Array.isArray(yKey) ? yKey : [yKey];
  
  return (
    <ChartWrapper title={title} subtitle={subtitle} className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          {showXAxis && <XAxis 
            dataKey={xKey} 
            tick={{ fill: '#9ca3af' }} 
            axisLine={{ stroke: '#e5e7eb' }} 
          />}
          {showYAxis && <YAxis 
            tick={{ fill: '#9ca3af' }} 
            axisLine={{ stroke: '#e5e7eb' }} 
          />}
          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}
          
          {yKeys.map((key, index) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              fill={`${colors[index % colors.length]}66`} // 40% opacity
              stroke={colors[index % colors.length]}
              stackId={stacked ? 'stack' : null}
              isAnimationActive={animate}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

// Pie Chart Component
export function PieChart({
  data = [],
  nameKey,
  valueKey,
  title,
  subtitle,
  color = 'default',
  height = 300,
  showTooltip = true,
  showLegend = true,
  className = '',
  animate = true,
  innerRadius = 0,
  outerRadius = "80%"
}) {
  const colors = colorPresets[color] || colorPresets.default;
  
  return (
    <ChartWrapper title={title} subtitle={subtitle} className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          {showTooltip && <Tooltip />}
          {showLegend && (
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center" 
            />
          )}
          
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            dataKey={valueKey}
            nameKey={nameKey}
            labelLine={false}
            isAnimationActive={animate}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]} 
              />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}