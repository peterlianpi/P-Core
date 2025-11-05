/**
 * Data Insights Component
 * Advanced data analysis and insights visualization
 */

'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Users,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap
} from 'lucide-react';

// Advanced analytics data
const userEngagementData = [
  { date: '2024-01-01', activeUsers: 1200, newUsers: 45, sessions: 2800, avgSessionTime: 8.5 },
  { date: '2024-01-02', activeUsers: 1350, newUsers: 52, sessions: 3100, avgSessionTime: 9.2 },
  { date: '2024-01-03', activeUsers: 1180, newUsers: 38, sessions: 2650, avgSessionTime: 7.8 },
  { date: '2024-01-04', activeUsers: 1420, newUsers: 67, sessions: 3350, avgSessionTime: 10.1 },
  { date: '2024-01-05', activeUsers: 1580, newUsers: 73, sessions: 3680, avgSessionTime: 9.8 },
  { date: '2024-01-06', activeUsers: 1650, newUsers: 58, sessions: 3820, avgSessionTime: 11.2 },
  { date: '2024-01-07', activeUsers: 1720, newUsers: 61, sessions: 3980, avgSessionTime: 10.5 },
];

const performanceData = [
  { timestamp: '00:00', cpu: 45, memory: 62, network: 120, errors: 2 },
  { timestamp: '04:00', cpu: 38, memory: 58, network: 95, errors: 1 },
  { timestamp: '08:00', cpu: 72, memory: 78, network: 280, errors: 5 },
  { timestamp: '12:00', cpu: 85, memory: 82, network: 350, errors: 8 },
  { timestamp: '16:00', cpu: 68, memory: 75, network: 240, errors: 3 },
  { timestamp: '20:00', cpu: 52, memory: 68, network: 180, errors: 2 },
];

const correlationData = [
  { users: 1200, revenue: 2400, satisfaction: 4.2 },
  { users: 1350, revenue: 2800, satisfaction: 4.5 },
  { users: 1180, revenue: 2200, satisfaction: 3.8 },
  { users: 1420, revenue: 3200, satisfaction: 4.6 },
  { users: 1580, revenue: 3800, satisfaction: 4.8 },
  { users: 1650, revenue: 4100, satisfaction: 4.7 },
  { users: 1720, revenue: 4500, satisfaction: 4.9 },
];

const predictiveData = [
  { month: 'Jan', actual: 1200, predicted: 1150, confidence: 85 },
  { month: 'Feb', actual: 1350, predicted: 1320, confidence: 88 },
  { month: 'Mar', actual: 1180, predicted: 1250, confidence: 78 },
  { month: 'Apr', actual: 1420, predicted: 1380, confidence: 82 },
  { month: 'May', actual: 1580, predicted: 1520, confidence: 90 },
  { month: 'Jun', actual: 1650, predicted: 1680, confidence: 87 },
  { month: 'Jul', actual: 1720, predicted: 1750, confidence: 91 },
];

const anomalyData = [
  { time: '2024-01-01 10:00', value: 120, isAnomaly: false, severity: 0 },
  { time: '2024-01-01 11:00', value: 135, isAnomaly: false, severity: 0 },
  { time: '2024-01-01 12:00', value: 280, isAnomaly: true, severity: 3 },
  { time: '2024-01-01 13:00', value: 142, isAnomaly: false, severity: 0 },
  { time: '2024-01-01 14:00', value: 158, isAnomaly: false, severity: 0 },
  { time: '2024-01-01 15:00', value: 450, isAnomaly: true, severity: 4 },
  { time: '2024-01-01 16:00', value: 165, isAnomaly: false, severity: 0 },
];

interface DataInsightsProps {
  className?: string;
}

export function DataInsights({ className }: DataInsightsProps) {
  const [timeRange, setTimeRange] = useState('7d');
  const [metric, setMetric] = useState('users');

  const insights = [
    {
      type: 'positive',
      icon: TrendingUp,
      title: 'User Growth Acceleration',
      description: 'User acquisition rate increased by 23% compared to last period',
      impact: 'High',
      value: '+23%'
    },
    {
      type: 'warning',
      icon: AlertTriangle,
      title: 'Performance Degradation',
      description: 'Average response time increased by 15% during peak hours',
      impact: 'Medium',
      value: '+15%'
    },
    {
      type: 'info',
      icon: Info,
      title: 'Seasonal Pattern Detected',
      description: 'Weekly usage patterns show consistent peaks on Wednesdays',
      impact: 'Low',
      value: 'Weekly'
    },
    {
      type: 'success',
      icon: CheckCircle,
      title: 'System Optimization',
      description: 'Database query performance improved by 35% after recent updates',
      impact: 'High',
      value: '+35%'
    }
  ];

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          <Select value={metric} onValueChange={setMetric}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="users">Active Users</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="engagement">Engagement</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-600" />
            AI-Powered Insights
          </CardTitle>
          <CardDescription>
            Automated analysis and recommendations based on your data patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}
              >
                <div className="flex items-start gap-3">
                  <insight.icon className="h-5 w-5 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <Badge className={`text-xs ${getImpactColor(insight.impact)}`}>
                        {insight.impact}
                      </Badge>
                    </div>
                    <p className="text-sm opacity-80 mb-2">{insight.description}</p>
                    <div className="text-lg font-bold">{insight.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Trends Analysis</TabsTrigger>
          <TabsTrigger value="correlation">Correlation</TabsTrigger>
          <TabsTrigger value="predictive">Predictive</TabsTrigger>
          <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Engagement Trends */}
            <Card>
              <CardHeader>
                <CardTitle>User Engagement Trends</CardTitle>
                <CardDescription>Detailed analysis of user behavior patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={userEngagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                      formatter={(value, name) => [
                        name === 'avgSessionTime' ? `${value} min` : value,
                        name === 'activeUsers' ? 'Active Users' :
                        name === 'newUsers' ? 'New Users' :
                        name === 'sessions' ? 'Sessions' : 'Avg Session Time'
                      ]}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="activeUsers" fill="#3B82F6" name="Active Users" />
                    <Bar yAxisId="left" dataKey="newUsers" fill="#10B981" name="New Users" />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="avgSessionTime"
                      stroke="#F59E0B"
                      strokeWidth={3}
                      name="Avg Session Time"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* System Performance */}
            <Card>
              <CardHeader>
                <CardTitle>System Performance Metrics</CardTitle>
                <CardDescription>Real-time system resource utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="cpu"
                      stroke="#EF4444"
                      strokeWidth={2}
                      name="CPU Usage (%)"
                    />
                    <Line
                      type="monotone"
                      dataKey="memory"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      name="Memory Usage (%)"
                    />
                    <Line
                      type="monotone"
                      dataKey="network"
                      stroke="#10B981"
                      strokeWidth={2}
                      name="Network (Mbps)"
                    />
                    <ReferenceLine y={80} stroke="#F59E0B" strokeDasharray="5 5" label="Threshold" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="correlation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Correlation Analysis</CardTitle>
              <CardDescription>Relationships between key metrics and user satisfaction</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={correlationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    dataKey="users"
                    name="Active Users"
                    label={{ value: 'Active Users', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="revenue"
                    name="Revenue"
                    label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      name === 'revenue' ? `$${value}` : value,
                      name === 'users' ? 'Active Users' : 'Revenue'
                    ]}
                  />
                  <Scatter
                    name="User-Revenue Correlation"
                    dataKey="revenue"
                    fill="#3B82F6"
                  />
                </ScatterChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Correlation Insight:</strong> Strong positive correlation (r = 0.87) between active users and revenue.
                  Each additional 100 users correlates with approximately $1,200 in additional revenue.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Predictive Analytics</CardTitle>
              <CardDescription>Forecasting future trends with confidence intervals</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={predictiveData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="actual" fill="#3B82F6" name="Actual" />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#EF4444"
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    name="Predicted"
                  />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">91%</div>
                  <div className="text-sm text-green-700">Avg Accuracy</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">+8.5%</div>
                  <div className="text-sm text-blue-700">Growth Forecast</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">30 days</div>
                  <div className="text-sm text-purple-700">Prediction Horizon</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anomalies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Anomaly Detection</CardTitle>
              <CardDescription>Automated detection of unusual patterns and outliers</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={anomalyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="time"
                    tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(value) => new Date(value).toLocaleString()}
                    formatter={(value, name) => [value, 'Value']}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={(props) => {
                      const { payload } = props;
                      if (payload.isAnomaly) {
                        return (
                          <circle
                            {...props}
                            r={6}
                            fill={payload.severity >= 4 ? '#EF4444' : '#F59E0B'}
                            stroke="#fff"
                            strokeWidth={2}
                          />
                        );
                      }
                      return <circle {...props} r={3} fill="#3B82F6" />;
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Normal data points</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Minor anomalies (severity 1-3)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Critical anomalies (severity 4+)</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Alert:</strong> 2 anomalies detected in the last 24 hours. Recommended investigation of high-value spikes.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
