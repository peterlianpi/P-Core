"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Course,
  LessonBook,
  LessonBookFormValues,
} from "@/features/music-school-management/features/lesson-books/types";
import { BookTable } from "@/features/music-school-management/features/lesson-books/components/book-table";
import { BookForm } from "@/features/music-school-management/features/lesson-books/components/book-form";

// Mock data for courses with levels
const mockCourses: Course[] = [
  {
    id: "c1",
    name: "Piano",
    orgId: "org1",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    levels: ["Beginner Part I", "Beginner Part II", "Intermediate", "Advanced"],
  },
  {
    id: "c2",
    name: "Drums",
    orgId: "org1",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    levels: ["Book 1", "Book 2", "Book 3"],
  },
  {
    id: "c3",
    name: "Guitar",
    orgId: "org1",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    levels: ["Chords Basics", "Soloing Techniques"],
  },
  {
    id: "c4",
    name: "Violin",
    orgId: "org1",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    levels: ["Grade 1", "Grade 2"],
  },
];

const initialBooks: LessonBook[] = [
  {
    id: "b1",
    title: "Piano Basics Part I",
    author: "Jane Doe",
    price: 150.0,
    courseId: "c1",
    course: mockCourses[0], // Include course object for display
    level: "Beginner Part I",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
  },
  {
    id: "b2",
    title: "Drum Mastery Book 2",
    author: "John Smith",
    price: 200.5,
    courseId: "c2",
    course: mockCourses[1],
    level: "Book 2",
    createdAt: "2024-03-10T11:30:00Z",
    updatedAt: "2024-03-10T11:30:00Z",
  },
  {
    id: "b3",
    title: "Guitar Chords Basics",
    author: "Alice Brown",
    price: 120.0,
    courseId: "c3",
    course: mockCourses[2],
    level: "Chords Basics",
    createdAt: "2024-02-15T09:00:00Z",
    updatedAt: "2024-02-15T09:00:00Z",
  },
  {
    id: "b4",
    title: "Violin Grade 1",
    author: "Bob Johnson",
    price: 180.0,
    courseId: "c4",
    course: mockCourses[3],
    level: "Grade 1",
    createdAt: "2024-04-20T14:00:00Z",
    updatedAt: "2024-04-20T14:00:00Z",
  },
];

export default function LessonBooksPage() {
  const [books, setBooks] = useState<LessonBook[]>(initialBooks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<LessonBook | undefined>(
    undefined
  );
  const searchParams = useSearchParams();

  // Effect to open form automatically if 'add=true' is in URL
  useEffect(() => {
    if (searchParams.get("add") === "true") {
      handleAddBook();
    }
  }, [searchParams]);

  const handleAddBook = () => {
    setEditingBook(undefined);
    setIsFormOpen(true);
  };

  const handleEditBook = (book: LessonBook) => {
    setEditingBook(book);
    setIsFormOpen(true);
  };

  const handleDeleteBook = (id: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const handleSaveBook = (bookData: LessonBookFormValues) => {
    const now = new Date().toISOString();
    // Find the full course object based on courseId from mockCourses
    const selectedCourse = mockCourses.find((c) => c.id === bookData.courseId);

    if (editingBook) {
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === editingBook.id
            ? {
                ...book,
                ...bookData,
                updatedAt: now,
                course: selectedCourse || book.course, // Update course relation, fallback to existing if not found
              }
            : book
        )
      );
    } else {
      const newBook: LessonBook = {
        id: `b${Date.now()}`, // Simple unique ID generation
        createdAt: now,
        updatedAt: now,
        ...bookData,
        course: selectedCourse as Course, // Assert as Course, assuming selectedCourse will always be found for valid courseId
      };
      setBooks((prevBooks) => [...prevBooks, newBook]);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <Card className="rounded-lg">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
          <div className="flex flex-col">
            <CardTitle className="text-2xl font-bold">Lesson Books</CardTitle>
            <CardDescription>
              Manage your music school&apos;s lesson book inventory.
            </CardDescription>
          </div>
          <Button
            onClick={handleAddBook}
            className="w-full sm:w-auto rounded-lg"
          >
            Add New Book
          </Button>
        </CardHeader>
        <CardContent className="pt-4">
          <BookTable
            books={books}
            onEdit={handleEditBook}
            onDelete={handleDeleteBook}
          />
        </CardContent>
      </Card>

      <BookForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        book={editingBook}
        onSave={handleSaveBook}
        availableCourses={mockCourses}
      />
    </div>
  );
}
