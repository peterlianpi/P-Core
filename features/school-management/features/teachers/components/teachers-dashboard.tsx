"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  BookOpen, 
  Star,
  Phone,
  Mail,
  Search,
  Plus,
  Edit,
  Eye,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Sample teacher data with enhanced fields
const generateTeachersData = () => [
  {
    id: "1",
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@school.edu",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b194?w=150",
    department: "Mathematics",
    specialization: "Advanced Calculus",
    status: "active",
    employmentType: "full-time",
    joiningDate: "2020-08-15",
    experience: "8 years",
    qualifications: ["PhD Mathematics", "MIT"],
    courses: ["Advanced Calculus", "Linear Algebra", "Statistics"],
    students: 156,
    rating: 4.8,
    salary: 85000,
    performance: {
      attendance: 98,
      studentSatisfaction: 4.9,
      courseCompletion: 96,
    },
    address: "123 Oak Street, City, State 12345",
    emergencyContact: {
      name: "John Wilson",
      phone: "+1 (555) 987-6543",
      relation: "Spouse",
    },
  },
  {
    id: "2",
    name: "Prof. Michael Chen",
    email: "michael.chen@school.edu",
    phone: "+1 (555) 234-5678",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    department: "Computer Science",
    specialization: "Machine Learning",
    status: "active",
    employmentType: "full-time",
    joiningDate: "2019-01-10",
    experience: "12 years",
    qualifications: ["PhD Computer Science", "Stanford"],
    courses: ["Data Structures", "AI Fundamentals", "Machine Learning"],
    students: 203,
    rating: 4.7,
    salary: 92000,
    performance: {
      attendance: 95,
      studentSatisfaction: 4.8,
      courseCompletion: 94,
    },
    address: "456 Pine Avenue, City, State 12346",
    emergencyContact: {
      name: "Lisa Chen",
      phone: "+1 (555) 876-5432",
      relation: "Spouse",
    },
  },
  {
    id: "3",
    name: "Ms. Emily Rodriguez",
    email: "emily.rodriguez@school.edu",
    phone: "+1 (555) 345-6789",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    department: "English Literature",
    specialization: "Creative Writing",
    status: "active",
    employmentType: "part-time",
    joiningDate: "2021-09-01",
    experience: "5 years",
    qualifications: ["MA English Literature", "Yale"],
    courses: ["Creative Writing", "Modern Literature", "Poetry Analysis"],
    students: 89,
    rating: 4.9,
    salary: 45000,
    performance: {
      attendance: 100,
      studentSatisfaction: 4.9,
      courseCompletion: 98,
    },
    address: "789 Elm Drive, City, State 12347",
    emergencyContact: {
      name: "Carlos Rodriguez",
      phone: "+1 (555) 765-4321",
      relation: "Father",
    },
  },
  {
    id: "4",
    name: "Dr. James Thompson",
    email: "james.thompson@school.edu",
    phone: "+1 (555) 456-7890",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    department: "Physics",
    specialization: "Quantum Mechanics",
    status: "on-leave",
    employmentType: "full-time",
    joiningDate: "2018-03-20",
    experience: "15 years",
    qualifications: ["PhD Physics", "Harvard"],
    courses: ["Quantum Physics", "Thermodynamics", "Electromagnetism"],
    students: 134,
    rating: 4.6,
    salary: 88000,
    performance: {
      attendance: 92,
      studentSatisfaction: 4.7,
      courseCompletion: 93,
    },
    address: "321 Maple Court, City, State 12348",
    emergencyContact: {
      name: "Margaret Thompson",
      phone: "+1 (555) 654-3210",
      relation: "Spouse",
    },
  },
];

interface TeachersDashboardProps {
  className?: string;
}

export const TeachersDashboard: React.FC<TeachersDashboardProps> = ({
  className,
}) => {
  const [teachers] = useState(generateTeachersData());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [view, setView] = useState<"grid" | "table">("grid");

  // Filter teachers based on search and filters
  const filteredTeachers = useMemo(() => {
    return teachers.filter(teacher => {
      const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           teacher.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = selectedDepartment === "all" || 
                               teacher.department === selectedDepartment;
      
      const matchesStatus = selectedStatus === "all" || 
                           teacher.status === selectedStatus;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [teachers, searchTerm, selectedDepartment, selectedStatus]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const activeTeachers = teachers.filter(t => t.status === "active").length;
    const totalStudents = teachers.reduce((sum, t) => sum + t.students, 0);
    const averageRating = teachers.reduce((sum, t) => sum + t.rating, 0) / teachers.length;
    const averageAttendance = teachers.reduce((sum, t) => sum + t.performance.attendance, 0) / teachers.length;

    return {
      totalTeachers: teachers.length,
      activeTeachers,
      totalStudents,
      averageRating: Math.round(averageRating * 10) / 10,
      averageAttendance: Math.round(averageAttendance),
    };
  }, [teachers]);

  // Get unique departments for filter
  const departments = [...new Set(teachers.map(t => t.department))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200";
      case "on-leave": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "inactive": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getEmploymentTypeColor = (type: string) => {
    switch (type) {
      case "full-time": return "bg-blue-100 text-blue-800 border-blue-200";
      case "part-time": return "bg-purple-100 text-purple-800 border-purple-200";
      case "contract": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teachers Management</h1>
          <p className="text-muted-foreground">
            Manage faculty members, track performance, and monitor teaching excellence
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/school-management/teachers/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Teacher
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.totalTeachers}</div>
            <p className="text-xs text-muted-foreground">
              {summaryStats.activeTeachers} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Taught</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Total enrollments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.averageRating}/5</div>
            <p className="text-xs text-muted-foreground">
              Student feedback
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.averageAttendance}%</div>
            <p className="text-xs text-muted-foreground">
              This semester
            </p>
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
                  placeholder="Search teachers by name, email, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-1">
              <Button
                variant={view === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("grid")}
              >
                Grid
              </Button>
              <Button
                variant={view === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("table")}
              >
                Table
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Teachers Grid/Table */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <Card key={teacher.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={teacher.avatar} alt={teacher.name} />
                      <AvatarFallback>
                        {teacher.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{teacher.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{teacher.department}</p>
                      <p className="text-xs text-muted-foreground">{teacher.specialization}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Badge className={getStatusColor(teacher.status)}>
                      {teacher.status}
                    </Badge>
                    <Badge className={getEmploymentTypeColor(teacher.employmentType)}>
                      {teacher.employmentType}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 mr-2" />
                    {teacher.email}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 mr-2" />
                    {teacher.phone}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-lg font-semibold">{teacher.students}</div>
                    <div className="text-xs text-muted-foreground">Students</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold flex items-center justify-center">
                      {teacher.rating}
                      <Star className="w-4 h-4 ml-1 text-yellow-500" />
                    </div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{teacher.experience}</div>
                    <div className="text-xs text-muted-foreground">Experience</div>
                  </div>
                </div>

                {/* Courses */}
                <div>
                  <p className="text-sm font-medium mb-2">Teaching:</p>
                  <div className="flex flex-wrap gap-1">
                    {teacher.courses.slice(0, 2).map((course) => (
                      <Badge key={course} variant="outline" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                    {teacher.courses.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{teacher.courses.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/school-management/teachers/${teacher.id}`}>
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/school-management/teachers/${teacher.id}/edit`}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="p-4 font-medium">Teacher</th>
                    <th className="p-4 font-medium">Department</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Students</th>
                    <th className="p-4 font-medium">Rating</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={teacher.avatar} alt={teacher.name} />
                            <AvatarFallback>
                              {teacher.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{teacher.name}</div>
                            <div className="text-sm text-muted-foreground">{teacher.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>{teacher.department}</div>
                        <div className="text-sm text-muted-foreground">{teacher.specialization}</div>
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(teacher.status)}>
                          {teacher.status}
                        </Badge>
                      </td>
                      <td className="p-4">{teacher.students}</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          {teacher.rating}
                          <Star className="w-4 h-4 ml-1 text-yellow-500" />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/school-management/teachers/${teacher.id}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/school-management/teachers/${teacher.id}/edit`}>
                              <Edit className="w-4 h-4" />
                            </Link>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {filteredTeachers.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No teachers found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters.
            </p>
            <Button asChild>
              <Link href="/school-management/teachers/new">
                Add First Teacher
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeachersDashboard;
