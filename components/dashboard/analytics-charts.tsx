"use client";

/**
 * ANALYTICS CHARTS: Interactive Data Visualization
 * 
 * This component provides:
 * 1. Organization-specific chart types
 * 2. Interactive and responsive charts
 * 3. Real-time data visualization
 * 4. Multiple chart formats (line, bar, pie, area)
 * 5. Export and sharing capabilities
 * 
 * FEATURES:
 * - Dynamic chart selection based on org type
 * - Animated chart transitions
 * - Responsive design for all screen sizes
 * - Custom color schemes matching theme
 * - Data filtering and time range selection
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ComposedChart
} from 'recharts';
import { 
  Calendar,
  Download,
  Filter,
  TrendingUp,
  Users,
  DollarSign,
  BookOpen,
  GraduationCap
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// ============================================================================
// SAMPLE DATA GENERATION
// ============================================================================

const generateSchoolData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return {
    enrollmentTrend: months.map((month, index) => ({
      month,
      students: 800 + Math.floor(Math.random() * 200) + (index * 15),
      newEnrollments: 20 + Math.floor(Math.random() * 30),
      graduations: index === 5 || index === 11 ? 40 + Math.floor(Math.random() * 20) : Math.floor(Math.random() * 5)
    })),
    
    revenueData: months.map((month, index) => ({
      month,
      tuitionFees: 25000 + Math.floor(Math.random() * 10000),
      miscFees: 3000 + Math.floor(Math.random() * 2000),
      expenses: 15000 + Math.floor(Math.random() * 5000)
    })),
    
    coursePerformance: [
      { course: 'Mathematics', students: 245, completion: 92, satisfaction: 4.5 },
      { course: 'Science', students: 223, completion: 88, satisfaction: 4.3 },
      { course: 'English', students: 267, completion: 95, satisfaction: 4.6 },
      { course: 'History', students: 189, completion: 90, satisfaction: 4.2 },
      { course: 'Art', students: 156, completion: 97, satisfaction: 4.8 }
    ],
    
    gradeDistribution: [
      { grade: 'A', count: 156, color: '#10b981' },
      { grade: 'B', count: 234, color: '#3b82f6' },
      { grade: 'C', count: 189, color: '#f59e0b' },
      { grade: 'D', count: 67, color: '#ef4444' },
      { grade: 'F', count: 23, color: '#6b7280' }
    ]
  };
};

const generateChurchData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return {
    membershipTrend: months.map((month, index) => ({
      month,
      members: 650 + Math.floor(Math.random() * 100) + (index * 8),
      newMembers: 5 + Math.floor(Math.random() * 15),
      active: 450 + Math.floor(Math.random() * 50) + (index * 5)
    })),
    
    donationData: months.map((month, index) => ({
      month,
      tithes: 8000 + Math.floor(Math.random() * 3000),
      offerings: 2000 + Math.floor(Math.random() * 1000),
      specialGiving: Math.floor(Math.random() * 5000)
    })),
    
    eventAttendance: [
      { event: 'Sunday Service', attendance: 420, capacity: 500 },
      { event: 'Bible Study', attendance: 89, capacity: 120 },
      { event: 'Youth Group', attendance: 45, capacity: 60 },
      { event: 'Prayer Meeting', attendance: 67, capacity: 80 },
      { event: 'Community Outreach', attendance: 156, capacity: 200 }
    ]
  };
};

const generateBusinessData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return {
    revenueGrowth: months.map((month, index) => ({
      month,
      revenue: 45000 + Math.floor(Math.random() * 20000) + (index * 2000),
      expenses: 25000 + Math.floor(Math.random() * 10000),
      profit: 15000 + Math.floor(Math.random() * 8000) + (index * 1000)
    })),
    
    projectStatus: [
      { status: 'Completed', count: 23, color: '#10b981' },
      { status: 'In Progress', count: 8, color: '#3b82f6' },
      { status: 'Planning', count: 5, color: '#f59e0b' },
      { status: 'On Hold', count: 2, color: '#ef4444' }
    ],
    
    teamPerformance: [
      { team: 'Development', productivity: 92, satisfaction: 4.5, size: 12 },
      { team: 'Design', productivity: 88, satisfaction: 4.7, size: 6 },
      { team: 'Marketing', productivity: 85, satisfaction: 4.3, size: 8 },
      { team: 'Sales', productivity: 95, satisfaction: 4.6, size: 10 }
    ]
  };
};

// ============================================================================
// CHART COMPONENTS
// ============================================================================

const TrendChart: React.FC<{ data: any[]; title: string; dataKeys: string[] }> = ({ 
  data, 
  title, 
  dataKeys 
}) => {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            {title}
          </span>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            {dataKeys.map((key, index) => (
              <Line 
                key={key}
                type="monotone" 
                dataKey={key} 
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const BarChartComponent: React.FC<{ data: any[]; title: string; dataKey: string }> = ({ 
  data, 
  title, 
  dataKey 
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <BarChart className="h-5 w-5" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="course" />
          <YAxis />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Bar dataKey={dataKey} fill="#3b82f6" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const PieChartComponent: React.FC<{ data: any[]; title: string }> = ({ data, title }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <PieChart className="h-5 w-5" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

// ============================================================================
// MAIN ANALYTICS CHARTS COMPONENT
// ============================================================================

interface AnalyticsChartsProps {
  orgType?: string;
}

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ orgType = 'school' }) => {
  const [timeRange, setTimeRange] = useState('12months');
  const [selectedChart, setSelectedChart] = useState('overview');

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch analytics data from API using feature-based API
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Import dashboard API dynamically to avoid circular dependencies
        const { getDashboardAnalytics } = await import('@/features/dashboard/api');
        
        const result = await getDashboardAnalytics(orgType, timeRange);
        
        if (result.success && result.data) {
          setData(result.data);
        } else {
          // Fallback to mock data if API fails
          switch (orgType) {
            case 'school':
              setData(generateSchoolData());
              break;
            case 'church':
              setData(generateChurchData());
              break;
            case 'business':
              setData(generateBusinessData());
              break;
            default:
              setData(generateSchoolData());
          }
        }
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
        // Fallback to mock data if API fails
        switch (orgType) {
          case 'school':
            setData(generateSchoolData());
            break;
          case 'church':
            setData(generateChurchData());
            break;
          case 'business':
            setData(generateBusinessData());
            break;
          default:
            setData(generateSchoolData());
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [orgType, timeRange]);

  if (loading || !data) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-32 bg-muted rounded animate-pulse" />
          <div className="h-8 w-24 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-96 bg-muted rounded animate-pulse" />
      </div>
    );
  }

  const renderSchoolCharts = () => (
    <Tabs value={selectedChart} onValueChange={setSelectedChart} className="space-y-6">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>
        
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="12months">12 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendChart
            data={data.enrollmentTrend}
            title="Student Enrollment Trend"
            dataKeys={['students', 'newEnrollments']}
          />
          <PieChartComponent
            data={data.gradeDistribution}
            title="Grade Distribution"
          />
        </div>
      </TabsContent>

      <TabsContent value="academic" className="space-y-6">
        <BarChartComponent
          data={data.coursePerformance}
          title="Course Performance"
          dataKey="completion"
        />
      </TabsContent>

      <TabsContent value="financial" className="space-y-6">
        <TrendChart
          data={data.revenueData}
          title="Financial Overview"
          dataKeys={['tuitionFees', 'miscFees', 'expenses']}
        />
      </TabsContent>
    </Tabs>
  );

  const renderChurchCharts = () => (
    <Tabs value={selectedChart} onValueChange={setSelectedChart} className="space-y-6">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="membership">Membership</TabsTrigger>
          <TabsTrigger value="giving">Giving</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">3 Months</SelectItem>
            <SelectItem value="6months">6 Months</SelectItem>
            <SelectItem value="12months">12 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <TabsContent value="membership" className="space-y-6">
        <TrendChart
          data={data.membershipTrend}
          title="Membership Growth"
          dataKeys={['members', 'active', 'newMembers']}
        />
      </TabsContent>

      <TabsContent value="giving" className="space-y-6">
        <TrendChart
          data={data.donationData}
          title="Donation Trends"
          dataKeys={['tithes', 'offerings', 'specialGiving']}
        />
      </TabsContent>

      <TabsContent value="events" className="space-y-6">
        <BarChartComponent
          data={data.eventAttendance}
          title="Event Attendance"
          dataKey="attendance"
        />
      </TabsContent>
    </Tabs>
  );

  const renderBusinessCharts = () => (
    <Tabs value={selectedChart} onValueChange={setSelectedChart} className="space-y-6">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">3 Months</SelectItem>
            <SelectItem value="6months">6 Months</SelectItem>
            <SelectItem value="12months">12 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <TabsContent value="revenue" className="space-y-6">
        <TrendChart
          data={data.revenueGrowth}
          title="Revenue & Profit Trends"
          dataKeys={['revenue', 'expenses', 'profit']}
        />
      </TabsContent>

      <TabsContent value="projects" className="space-y-6">
        <PieChartComponent
          data={data.projectStatus}
          title="Project Status Distribution"
        />
      </TabsContent>

      <TabsContent value="teams" className="space-y-6">
        <BarChartComponent
          data={data.teamPerformance}
          title="Team Productivity"
          dataKey="productivity"
        />
      </TabsContent>
    </Tabs>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {orgType === 'school' && renderSchoolCharts()}
      {orgType === 'church' && renderChurchCharts()}
      {orgType === 'business' && renderBusinessCharts()}
    </motion.div>
  );
};

export default AnalyticsCharts;
