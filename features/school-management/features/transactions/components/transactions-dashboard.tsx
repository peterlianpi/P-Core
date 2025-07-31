"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
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
} from "recharts";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Plus, 
  Search, 
  Filter,
  Download,
  Receipt,
  CreditCard,
  Banknote,
  ArrowUpCircle,
  ArrowDownCircle,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DateRangePicker } from "../../../components/filters/date-range-picker";

// Sample data - replace with actual API calls
const generateTransactionsData = () => [
  {
    id: "1",
    type: "income" as const,
    category: "tuition" as const,
    amount: 1500,
    currency: "USD",
    description: "Tuition payment - Advanced Mathematics Course",
    date: "2024-01-15",
    paymentMethod: "card" as const,
    status: "completed" as const,
    studentName: "Alice Johnson",
    courseName: "Advanced Mathematics",
    reference: "TXN-2024-001",
    invoiceNumber: "INV-001",
    receiptNumber: "RCP-001",
  },
  {
    id: "2",
    type: "expense" as const,
    category: "salary" as const,
    amount: 3500,
    currency: "USD",
    description: "Monthly salary - Dr. Sarah Wilson",
    date: "2024-01-01",
    paymentMethod: "bank_transfer" as const,
    status: "completed" as const,
    teacherName: "Dr. Sarah Wilson",
    reference: "TXN-2024-002",
  },
  {
    id: "3",
    type: "income" as const,
    category: "materials" as const,
    amount: 250,
    currency: "USD",
    description: "Lab equipment fee",
    date: "2024-01-10",
    paymentMethod: "cash" as const,
    status: "pending" as const,
    studentName: "Bob Smith",
    reference: "TXN-2024-003",
  },
  {
    id: "4",
    type: "expense" as const,
    category: "utilities" as const,
    amount: 850,
    currency: "USD",
    description: "Monthly electricity and water bills",
    date: "2024-01-05",
    paymentMethod: "bank_transfer" as const,
    status: "completed" as const,
    reference: "TXN-2024-004",
  },
];

const generateStatsData = () => ({
  totalIncome: 25500,
  totalExpense: 18200,
  netProfit: 7300,
  pendingAmount: 1250,
  transactionCount: 156,
  monthlyGrowth: 12.5,
});

const generateChartData = () => [
  { month: "Jan", income: 22000, expense: 15000 },
  { month: "Feb", income: 25000, expense: 17000 },
  { month: "Mar", income: 28000, expense: 18500 },
  { month: "Apr", income: 26500, expense: 19000 },
  { month: "May", income: 30000, expense: 20000 },
  { month: "Jun", income: 32000, expense: 21000 },
];

const generateCategoryData = () => [
  { category: "Tuition", amount: 18500, percentage: 65 },
  { category: "Materials", amount: 4200, percentage: 15 },
  { category: "Lab Fees", amount: 2800, percentage: 10 },
  { category: "Other", amount: 2850, percentage: 10 },
];

const COLORS = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
};

const chartConfig = {
  income: { label: "Income", color: COLORS.success },
  expense: { label: "Expense", color: COLORS.danger },
  net: { label: "Net Profit", color: COLORS.primary },
};

interface TransactionsDashboardProps {
  className?: string;
}

export const TransactionsDashboard: React.FC<TransactionsDashboardProps> = ({
  className,
}) => {
  const [transactions] = useState(generateTransactionsData());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dateRange, setDateRange] = useState({
    from: new Date(2024, 0, 1),
    to: new Date(),
  });

  const stats = generateStatsData();
  const chartData = generateChartData();
  const categoryData = generateCategoryData();

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (transaction.studentName && transaction.studentName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (transaction.teacherName && transaction.teacherName.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = selectedType === "all" || transaction.type === selectedType;
      const matchesStatus = selectedStatus === "all" || transaction.status === selectedStatus;
      const matchesCategory = selectedCategory === "all" || transaction.category === selectedCategory;

      return matchesSearch && matchesType && matchesStatus && matchesCategory;
    });
  }, [transactions, searchTerm, selectedType, selectedStatus, selectedCategory]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      case "refunded": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      case "cancelled": return <XCircle className="w-4 h-4" />;
      case "refunded": return <RotateCcw className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "cash": return <Banknote className="w-4 h-4" />;
      case "card": return <CreditCard className="w-4 h-4" />;
      case "bank_transfer": return <ArrowUpCircle className="w-4 h-4" />;
      case "mobile_payment": return <ArrowUpCircle className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Management</h1>
          <p className="text-muted-foreground">
            Track income, expenses, and manage financial transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button asChild>
            <Link href="/school-management/transactions/new">
              <Plus className="w-4 h-4 mr-2" />
              New Transaction
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${stats.totalIncome.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +{stats.monthlyGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expense</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ${stats.totalExpense.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${stats.netProfit.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +15.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              ${stats.pendingAmount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.pendingAmount / stats.totalIncome) * 100)}% of total income
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expense Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="income"
                  stackId="1"
                  stroke={COLORS.success}
                  fill={COLORS.success}
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="expense"
                  stackId="2"
                  stroke={COLORS.danger}
                  fill={COLORS.danger}
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Income by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percentage }) => `${category}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={[COLORS.primary, COLORS.success, COLORS.warning, COLORS.info][index % 4]}
                    />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search transactions by description, reference, or person..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="tuition">Tuition</SelectItem>
                <SelectItem value="materials">Materials</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <DateRangePicker
              date={dateRange}
              onDateChange={setDateRange}
              className="w-auto"
            />
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className={cn(
                    "p-2 rounded-full",
                    transaction.type === "income" ? "bg-green-100" : "bg-red-100"
                  )}>
                    {transaction.type === "income" ? (
                      <ArrowUpCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDownCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <span>{transaction.reference}</span>
                      <span>•</span>
                      <span>{new Date(transaction.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        {getPaymentMethodIcon(transaction.paymentMethod)}
                        <span className="capitalize">{transaction.paymentMethod.replace('_', ' ')}</span>
                      </div>
                    </div>
                    {(transaction.studentName || transaction.teacherName) && (
                      <div className="text-sm text-muted-foreground">
                        {transaction.studentName && (
                          <span>Student: {transaction.studentName}</span>
                        )}
                        {transaction.teacherName && (
                          <span>Teacher: {transaction.teacherName}</span>
                        )}
                        {transaction.courseName && (
                          <span> • Course: {transaction.courseName}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className={cn(
                      "text-lg font-semibold",
                      transaction.type === "income" ? "text-green-600" : "text-red-600"
                    )}>
                      {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {transaction.category}
                    </div>
                  </div>

                  <Badge className={cn("flex items-center gap-1", getStatusColor(transaction.status))}>
                    {getStatusIcon(transaction.status)}
                    <span className="capitalize">{transaction.status}</span>
                  </Badge>

                  <div className="flex gap-1">
                    {transaction.invoiceNumber && (
                      <Button variant="ghost" size="sm">
                        <Receipt className="w-4 h-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/school-management/transactions/${transaction.id}`}>
                        View
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No transactions found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters.
              </p>
              <Button asChild>
                <Link href="/school-management/transactions/new">
                  Create First Transaction
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsDashboard;
