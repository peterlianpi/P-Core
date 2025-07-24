"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  FileText,
  Star,
  Tag,
  Users,
  Calendar,
  Globe,
  DollarSign,
  Hash,
  Filter,
  Download,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Sample data - replace with actual API calls
const generateLessonBooksData = () => [
  {
    id: "1",
    title: "Advanced Mathematics Fundamentals",
    description:
      "Comprehensive guide to advanced mathematical concepts including calculus, algebra, and geometry.",
    subject: "Mathematics",
    grade: "Grade 12",
    author: "Dr. Emily Johnson",
    publisher: "Academic Publishers",
    isbn: "978-0-123456-78-9",
    edition: "3rd Edition",
    publicationYear: 2023,
    language: "English",
    price: 89.99,
    currency: "USD",
    totalPages: 456,
    coverImage:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200",
    isActive: true,
    difficulty: "advanced" as const,
    tags: ["calculus", "algebra", "geometry", "trigonometry"],
    chapters: [
      {
        id: "ch1",
        title: "Introduction to Calculus",
        chapterNumber: 1,
        pages: 45,
        objectives: ["Understand derivatives", "Learn integration basics"],
        resources: ["Video lectures", "Practice problems"],
        exercises: ["Exercise 1.1", "Exercise 1.2"],
      },
      {
        id: "ch2",
        title: "Advanced Algebra",
        chapterNumber: 2,
        pages: 52,
        objectives: ["Master polynomial equations", "Solve complex systems"],
        resources: ["Interactive simulations", "Step-by-step guides"],
        exercises: ["Exercise 2.1", "Exercise 2.2", "Exercise 2.3"],
      },
    ],
    courseName: "Advanced Mathematics",
    createdAt: "2024-01-15",
    enrolledStudents: 45,
  },
  {
    id: "2",
    title: "Introduction to Computer Science",
    description:
      "Beginner-friendly introduction to programming concepts, data structures, and algorithms.",
    subject: "Computer Science",
    grade: "Grade 10",
    author: "Prof. Michael Chen",
    publisher: "Tech Education Press",
    isbn: "978-0-987654-32-1",
    edition: "2nd Edition",
    publicationYear: 2024,
    language: "English",
    price: 75.5,
    currency: "USD",
    totalPages: 320,
    coverImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200",
    isActive: true,
    difficulty: "beginner" as const,
    tags: ["programming", "algorithms", "data structures", "python"],
    chapters: [
      {
        id: "ch1",
        title: "Programming Basics",
        chapterNumber: 1,
        pages: 40,
        objectives: [
          "Learn Python syntax",
          "Understand variables and data types",
        ],
        resources: ["Code examples", "IDE setup guide"],
        exercises: ["Hello World", "Variable practice"],
      },
    ],
    courseName: "Computer Science Fundamentals",
    createdAt: "2024-01-10",
    enrolledStudents: 38,
  },
  {
    id: "3",
    title: "World History: Modern Era",
    description:
      "Exploring major historical events from the Renaissance to the 21st century.",
    subject: "History",
    grade: "Grade 11",
    author: "Dr. Sarah Williams",
    publisher: "Historical Society Press",
    isbn: "978-0-456789-01-2",
    edition: "4th Edition",
    publicationYear: 2023,
    language: "English",
    price: 65.0,
    currency: "USD",
    totalPages: 380,
    coverImage:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200",
    isActive: false,
    difficulty: "intermediate" as const,
    tags: [
      "renaissance",
      "industrial revolution",
      "world wars",
      "modern history",
    ],
    chapters: [
      {
        id: "ch1",
        title: "The Renaissance",
        chapterNumber: 1,
        pages: 35,
        objectives: [
          "Understand Renaissance culture",
          "Learn about key figures",
        ],
        resources: ["Historical documents", "Timeline charts"],
        exercises: ["Timeline creation", "Essay questions"],
      },
    ],
    courseName: "World History",
    createdAt: "2023-12-20",
    enrolledStudents: 29,
  },
];

interface LessonBooksDashboardProps {
  className?: string;
}

export const LessonBooksDashboard: React.FC<LessonBooksDashboardProps> = ({
  className,
}) => {
  const [lessonBooks] = useState(generateLessonBooksData());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [view, setView] = useState<"grid" | "table">("grid");

  // Filter lesson books
  const filteredLessonBooks = useMemo(() => {
    return lessonBooks.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesSubject =
        selectedSubject === "all" || book.subject === selectedSubject;
      const matchesGrade =
        selectedGrade === "all" || book.grade === selectedGrade;
      const matchesDifficulty =
        selectedDifficulty === "all" || book.difficulty === selectedDifficulty;
      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "active" && book.isActive) ||
        (selectedStatus === "inactive" && !book.isActive);

      return (
        matchesSearch &&
        matchesSubject &&
        matchesGrade &&
        matchesDifficulty &&
        matchesStatus
      );
    });
  }, [
    lessonBooks,
    searchTerm,
    selectedSubject,
    selectedGrade,
    selectedDifficulty,
    selectedStatus,
  ]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const totalBooks = lessonBooks.length;
    const activeBooks = lessonBooks.filter((book) => book.isActive).length;
    const totalStudents = lessonBooks.reduce(
      (sum, book) => sum + book.enrolledStudents,
      0
    );
    const averagePrice =
      lessonBooks.reduce((sum, book) => sum + book.price, 0) /
      lessonBooks.length;

    return {
      totalBooks,
      activeBooks,
      totalStudents,
      averagePrice: Math.round(averagePrice * 100) / 100,
    };
  }, [lessonBooks]);

  // Get unique values for filters
  const subjects = [...new Set(lessonBooks.map((book) => book.subject))];
  const grades = [...new Set(lessonBooks.map((book) => book.grade))];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "intermediate":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Lesson Books Management
          </h1>
          <p className="text-muted-foreground">
            Manage educational resources, textbooks, and learning materials
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button asChild>
            <Link href="/school-management/lesson-books/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Lesson Book
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.totalBooks}</div>
            <p className="text-xs text-muted-foreground">
              {summaryStats.activeBooks} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Books</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.activeBooks}</div>
            <p className="text-xs text-muted-foreground">Currently in use</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summaryStats.totalStudents}
            </div>
            <p className="text-xs text-muted-foreground">Using lesson books</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${summaryStats.averagePrice}
            </div>
            <p className="text-xs text-muted-foreground">Per book</p>
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
                  placeholder="Search books by title, author, subject, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                {grades.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedDifficulty}
              onValueChange={setSelectedDifficulty}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
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

      {/* Lesson Books Grid */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessonBooks.map((book) => (
            <Card key={book.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-16 w-12 rounded-md">
                      <AvatarImage
                        src={book.coverImage}
                        alt={book.title}
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-md">
                        <BookOpen className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight">
                        {book.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        by {book.author}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getDifficultyColor(book.difficulty)}>
                          {book.difficulty}
                        </Badge>
                        <Badge className={getStatusColor(book.isActive)}>
                          {book.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Book Details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subject:</span>
                    <span className="font-medium">{book.subject}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Grade:</span>
                    <span className="font-medium">{book.grade}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium">${book.price}</span>
                  </div>
                  {book.totalPages && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Pages:</span>
                      <span className="font-medium">{book.totalPages}</span>
                    </div>
                  )}
                </div>

                {/* Course & Students */}
                {book.courseName && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Course:</span>
                      <span className="font-medium">{book.courseName}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-muted-foreground">Students:</span>
                      <span className="font-medium">
                        {book.enrolledStudents}
                      </span>
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div>
                  <p className="text-sm font-medium mb-2">Tags:</p>
                  <div className="flex flex-wrap gap-1">
                    {book.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                    {book.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{book.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Chapters Info */}
                <div className="text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Hash className="w-4 h-4 mr-1" />
                    {book.chapters.length} chapters
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <Link href={`/school-management/lesson-books/${book.id}`}>
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <Link
                      href={`/school-management/lesson-books/${book.id}/edit`}
                    >
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
        <>
          {/* Table View would go here */}
          <Card>
            <CardContent className="p-0">
              <div className="text-center py-8">
                <p className="text-muted-foreground">Table view coming soon</p>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* No Results */}
      {filteredLessonBooks.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No lesson books found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters.
            </p>
            <Button asChild>
              <Link href="/school-management/lesson-books/new">
                Add First Lesson Book
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LessonBooksDashboard;
