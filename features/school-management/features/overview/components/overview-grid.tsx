"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, Book, CalendarCheck, TrendingUp, TrendingDown } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface OverviewStat {
  id: string
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: React.ComponentType<{ className?: string }>
}

import type { DashboardStats } from "@/lib/types/database"

type DashboardData = DashboardStats

export function OverviewGrid() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { schoolApi } = await import("../../../lib/api-client")
        const data = await schoolApi.getDashboardStats()
        setDashboardData(data)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-full">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!dashboardData) {
    return null
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MM', {
      style: 'currency',
      currency: 'MMK',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const stats: OverviewStat[] = [
    {
      id: "stat1",
      title: "Total Revenue",
      value: formatCurrency(dashboardData.financialStats.totalRevenue),
      change: `${dashboardData.financialStats.revenueGrowthRate > 0 ? '+' : ''}${dashboardData.financialStats.revenueGrowthRate.toFixed(1)}% from last month`,
      changeType: dashboardData.financialStats.revenueGrowthRate > 0 ? 'positive' : dashboardData.financialStats.revenueGrowthRate < 0 ? 'negative' : 'neutral',
      icon: DollarSign,
    },
    {
      id: "stat2",
      title: "Total Students",
      value: dashboardData.studentStats.total.toString(),
      change: `+${dashboardData.studentStats.newThisMonth} new this month`,
      changeType: dashboardData.studentStats.newThisMonth > 0 ? 'positive' : 'neutral',
      icon: Users,
    },
    {
      id: "stat3",
      title: "Active Courses",
      value: dashboardData.courseStats.active.toString(),
      change: `${dashboardData.courseStats.enrollments} total enrollments`,
      changeType: 'neutral',
      icon: Book,
    },
    {
      id: "stat4",
      title: "Monthly Revenue",
      value: formatCurrency(dashboardData.financialStats.monthlyRevenue),
      change: `${dashboardData.financialStats.revenueGrowthRate > 0 ? '+' : ''}${dashboardData.financialStats.revenueGrowthRate.toFixed(1)}% growth`,
      changeType: dashboardData.financialStats.revenueGrowthRate > 0 ? 'positive' : dashboardData.financialStats.revenueGrowthRate < 0 ? 'negative' : 'neutral',
      icon: CalendarCheck,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.id} className="rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className={`text-xs flex items-center gap-1 ${
              stat.changeType === 'positive' ? 'text-green-600' : 
              stat.changeType === 'negative' ? 'text-red-600' : 
              'text-muted-foreground'
            }`}>
              {stat.changeType === 'positive' && <TrendingUp className="h-3 w-3" />}
              {stat.changeType === 'negative' && <TrendingDown className="h-3 w-3" />}
              {stat.change}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
