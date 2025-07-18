"use client"

import { useEffect } from "react"
import { useForm, type ControllerRenderProps } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import type { Course, CourseFormData } from "@/lib/types"
import { useState } from "react"

const formSchema = z.object({
  name: z.string().min(2, { message: "Course name must be at least 2 characters." }),
  description: z.string().optional(),
  color: z.string().min(1, { message: "Please select a color." }),
  levels: z.array(z.string()).min(1, { message: "At least one level is required." }),
  monthlyFee: z.coerce.number().min(0.01, { message: "Monthly fee must be greater than 0." }),
  isActive: z.boolean().default(true),
})

interface CourseFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  course?: Course
  onSave: (courseData: CourseFormData) => void
}

const colorOptions = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#10B981" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Red", value: "#EF4444" },
  { name: "Orange", value: "#F97316" },
  { name: "Pink", value: "#EC4899" },
]

export function CourseForm({ open, onOpenChange, course, onSave }: CourseFormProps) {
  const [newLevel, setNewLevel] = useState("")

  const form = useForm<CourseFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#3B82F6",
      levels: [],
      monthlyFee: 0,
      isActive: true,
    },
  })

  useEffect(() => {
    if (course) {
      form.reset({
        name: course.name,
        description: course.description || "",
        color: course.color,
        levels: course.levels,
        monthlyFee: course.monthlyFee,
        isActive: course.isActive,
      })
    } else {
      form.reset({
        name: "",
        description: "",
        color: "#3B82F6",
        levels: [],
        monthlyFee: 0,
        isActive: true,
      })
    }
  }, [course, form, open])

  const onSubmit = (values: CourseFormData) => {
    onSave(values)
    onOpenChange(false)
    form.reset()
  }

  const addLevel = () => {
    if (newLevel.trim()) {
      const currentLevels = form.getValues("levels")
      if (!currentLevels.includes(newLevel.trim())) {
        form.setValue("levels", [...currentLevels, newLevel.trim()])
        setNewLevel("")
      }
    }
  }

  const removeLevel = (levelToRemove: string) => {
    const currentLevels = form.getValues("levels")
    form.setValue(
      "levels",
      currentLevels.filter((level) => level !== levelToRemove),
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{course ? "Edit Course" : "Add New Course"}</DialogTitle>
          <DialogDescription>
            {course ? "Make changes to the course here." : "Fill in the details for the new course."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }: { field: ControllerRenderProps<CourseFormData, "name"> }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Piano" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }: { field: ControllerRenderProps<CourseFormData, "description"> }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Course description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }: { field: ControllerRenderProps<CourseFormData, "color"> }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-6 gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          className={`h-10 rounded-md border-2 transition-all ${
                            field.value === color.value
                              ? "border-foreground scale-105"
                              : "border-border hover:border-foreground/50"
                          }`}
                          style={{ backgroundColor: color.value }}
                          onClick={() => field.onChange(color.value)}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="levels"
              render={({ field }: { field: ControllerRenderProps<CourseFormData, "levels"> }) => (
                <FormItem>
                  <FormLabel>Levels</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add level (e.g., Beginner)"
                          value={newLevel}
                          onChange={(e) => setNewLevel(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLevel())}
                        />
                        <Button type="button" onClick={addLevel} size="icon">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {field.value.map((level) => (
                          <Badge key={level} variant="secondary" className="flex items-center gap-1">
                            {level}
                            <button
                              type="button"
                              onClick={() => removeLevel(level)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monthlyFee"
              render={({ field }: { field: ControllerRenderProps<CourseFormData, "monthlyFee"> }) => (
                <FormItem>
                  <FormLabel>Monthly Fee</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="e.g., 150.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">{course ? "Save Changes" : "Add Course"}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
