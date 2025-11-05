/**
 * Enhanced Analytics Dashboard
 * Comprehensive data visualization with multiple chart types
 */

'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  GraduationCap,
  Church,
  Calendar,
  DollarSign,
  Activity,
  Target,
  Award,
  Clock
} from 'lucide-react';

// Mock data for comprehensive analytics
const monthlyUserGrowth = [
  { month: 'Jan', students: 120, members: 85, books: 45, revenue: 2400 },
  { month: 'Feb', students: 135, members: 92, books: 52, revenue: 2800 },
  { month: 'Mar', students: 148, members: 98, books: 58, revenue: 3200 },
  { month: 'Apr', students: 162, members: 105, books: 65, revenue: 3600 },
  { month: 'May', students: 178, members: 112, books: 72, revenue: 4100 },
  { month: 'Jun', students: 195, members: 118, books: 78, revenue: 4600 },
  { month: 'Jul', students: 212, members: 125, books: 85, revenue: 5200 },
  { month: 'Aug', students: 228, members: 132, books: 92, revenue: 5800 },
  { month: 'Sep', students: 245, members: 138, books: 98, revenue: 6400 },
  { month: 'Oct', students: 262, members: 145, books: 105, revenue: 7100 },
  { month: 'Nov', students: 278, members: 152, books: 112, revenue: 7800 },
  { month: 'Dec', students: 295, members: 158, books: 118, revenue: 8500 },
];

const systemUsageData = [
  { name: 'School Management', value: 45, color: '#3B82F6' },
  { name: 'Church Management', value: 30, color: '#8B5CF6' },
  { name: 'Library Management', value: 15, color: '#10B981' },
  { name: 'User Management', value: 7, color: '#F59E0B' },
  { name: 'Analytics', value: 3, color: '#EF4444' },
];

const performanceMetrics = [
  { metric: 'Response Time', current: 245, target: 300, unit: 'ms' },
  { metric: 'Uptime', current: 99.9, target: 99.5, unit: '%' },
  { metric: 'Error Rate', current: 0.1, target: 1.0, unit: '%' },
  { metric: 'Throughput', current: 1250, target: 1000, unit: 'req/min' },
];

const studentDemographics = [
  { grade: 'Grade 1-3', count: 85, percentage: 29 },
  { grade: 'Grade 4-6', count: 92, percentage: 31 },
  { grade: 'Grade 7-9', count: 68, percentage: 23 },
  { grade: 'Grade 10-12', count: 50, percentage: 17 },
];

const bookCategories = [
  { category: 'Fiction', count: 245, percentage: 35 },
  { category: 'Non-Fiction', count: 189, percentage: 27 },
  { category: 'Academic', count: 156, percentage: 22 },
  { category: 'Reference', count: 78, percentage: 11 },
  { category: 'Others', count: 32, percentage: 5 },
];

const churchActivities = [
  { month: 'Jan', services: 12, baptisms: 3, weddings: 2, funerals: 1 },
  { month: 'Feb', services: 11, baptisms: 5, weddings: 1, funerals: 0 },
  { month: 'Mar', services: 13, baptisms: 2, weddings: 3, funerals: 2 },
  { month: 'Apr', services: 12, baptisms: 4, weddings: 1, funerals: 1 },
  { month: 'May', services: 14, baptisms: 6, weddings: 2, funerals: 0 },
  { month: 'Jun', services: 13, baptisms: 3, weddings: 1, funerals: 1 },
];

interface AnalyticsDashboardProps {
  className?: string;
}

export function AnalyticsDashboard({ className }: AnalyticsDashboardProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$85,000</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,845</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <div className="flex items-center text-xs text-green-600">
              <Target className="h-3 w-3 mr-1" />
              Above target (99.5%)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245ms</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              -15ms from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="growth" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="growth">Growth Trends</TabsTrigger>
          <TabsTrigger value="usage">System Usage</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="growth" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Growth Trends</CardTitle>
                <CardDescription>User acquisition and engagement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyUserGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="students"
                      stackId="1"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.6}
                      name="Students"
                    />
                    <Area
                      type="monotone"
                      dataKey="members"
                      stackId="2"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.6}
                      name="Members"
                    />
                    <Area
                      type="monotone"
                      dataKey="books"
                      stackId="3"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.6}
                      name="Books Added"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Growth</CardTitle>
                <CardDescription>Monthly recurring revenue trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyUserGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#F59E0B"
                      strokeWidth={3}
                      dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Usage Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>System Usage Distribution</CardTitle>
                <CardDescription>How different modules are being used</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={systemUsageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {systemUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Church Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Church Activities</CardTitle>
                <CardDescription>Monthly church services and events</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={churchActivities}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="services" fill="#8B5CF6" name="Services" />
                    <Bar dataKey="baptisms" fill="#06B6D4" name="Baptisms" />
                    <Bar dataKey="weddings" fill="#EC4899" name="Weddings" />
                    <Bar dataKey="funerals" fill="#6B7280" name="Funerals" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Student Demographics */}
            <Card>
              <CardHeader>
                <CardTitle>Student Demographics</CardTitle>
                <CardDescription>Student distribution by grade level</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={studentDemographics} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="grade" type="category" width={80} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Book Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Library Collection</CardTitle>
                <CardDescription>Books distribution by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={bookCategories}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {bookCategories.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`hsl(${index * 60}, 70%, 50%)`}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>System performance against targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{metric.metric}</span>
                      <span className="text-muted-foreground">
                        {metric.current}{metric.unit} / {metric.target}{metric.unit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          metric.current <= metric.target ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{
                          width: `${Math.min((metric.current / metric.target) * 100, 100)}%`
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Current: {metric.current}{metric.unit}</span>
                      <span>Target: {metric.target}{metric.unit}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Health Overview */}
            <Card>
              <CardHeader>
                <CardTitle>System Health Overview</CardTitle>
                <CardDescription>Real-time system status and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">99.9%</div>
                    <div className="text-sm text-green-700">Uptime</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">1.2s</div>
                    <div className="text-sm text-blue-700">Avg Response</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-600">0.1%</div>
                    <div className="text-sm text-yellow-700">Error Rate</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">1250</div>
                    <div className="text-sm text-purple-700">Requests/min</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
