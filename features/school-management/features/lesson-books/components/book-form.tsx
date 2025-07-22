"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Course, LessonBook, LessonBookFormValues } from "../types"

// Zod schema for form validation
const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  author: z.string().optional(),
  price: z.coerce.number().min(0.01, { message: "Price must be greater than 0." }),
  courseId: z.string().min(1, { message: "Please select a course." }),
  level: z.string().min(1, { message: "Please select a level." }),
})

interface BookFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  book?: LessonBook // Optional book object for editing
  onSave: (bookData: LessonBookFormValues) => void // Callback for saving data
  availableCourses: Course[] // List of available courses to select from
}

export function BookForm({ open, onOpenChange, book, onSave, availableCourses }: BookFormProps) {
  const form = useForm<LessonBookFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      price: 0,
      courseId: "",
      level: "",
    },
  })

  // Find the selected course to filter available levels
  const selectedCourse = availableCourses.find((course) => course.id === form.watch("courseId"))
  const availableLevels = selectedCourse?.levels || []

  // Effect to reset form fields when a new book is selected for editing or dialog opens/closes
  useEffect(() => {
    if (book) {
      // Populate form with existing book data for editing
      form.reset({
        title: book.title,
        author: book.author || "",
        price: book.price,
        courseId: book.courseId,
        level: book.level || "",
      })
    } else {
      // Reset form to default values for adding a new book
      form.reset({
        title: "",
        author: "",
        price: 0,
        courseId: "",
        level: "",
      })
    }
  }, [book, form, open]) // Dependencies: book object, form instance, and dialog open state

  // Handle form submission
  const onSubmit = (values: LessonBookFormValues) => {
    onSave(values) // Call the onSave callback with form data
    onOpenChange(false) // Close the dialog
    form.reset() // Reset form fields after successful submission
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{book ? "Edit Lesson Book" : "Add New Lesson Book"}</DialogTitle>
          <DialogDescription>
            {book ? "Make changes to the lesson book here." : "Fill in the details for the new lesson book."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Piano Basics Part I" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Author Field */}
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Price Field */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="e.g., 150.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Course Selection Field */}
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableCourses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Level/Part Selection Field (depends on selected course) */}
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level/Part</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedCourse}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableLevels.length > 0 ? (
                        availableLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-levels-available" disabled>
                          No levels available for this course
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit Button */}
            <Button type="submit">{book ? "Save Changes" : "Add Book"}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
