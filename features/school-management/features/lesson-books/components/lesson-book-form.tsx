"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  BookOpen, 
  Plus, 
  X, 
  Upload, 
  Save,
  FileText,
  Tag,
  Hash,
  Users,
  DollarSign,
  Globe,
  Calendar,
  Edit3,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreateLessonBook, useUpdateLessonBook, type CreateLessonBookData, type UpdateLessonBookData } from "../api/use-lesson-books";

// Form validation schema
const chapterSchema = z.object({
  title: z.string().min(1, "Chapter title is required"),
  description: z.string().optional(),
  chapterNumber: z.number().min(1, "Chapter number must be at least 1"),
  pages: z.number().optional(),
  objectives: z.array(z.string()).default([]),
  resources: z.array(z.string()).default([]),
  exercises: z.array(z.string()).default([]),
});

const lessonBookFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  grade: z.string().min(1, "Grade is required"),
  author: z.string().min(1, "Author is required"),
  publisher: z.string().optional(),
  isbn: z.string().optional(),
  edition: z.string().optional(),
  publicationYear: z.number().optional(),
  language: z.string().min(1, "Language is required"),
  price: z.number().min(0, "Price must be a positive number"),
  currency: z.string().default("USD"),
  totalPages: z.number().optional(),
  courseId: z.string().optional(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  tags: z.array(z.string()).default([]),
  chapters: z.array(chapterSchema).default([]),
});

type LessonBookFormData = z.infer<typeof lessonBookFormSchema>;

interface LessonBookFormProps {
  lessonBookId?: string;
  initialData?: any;
  onSuccess?: () => void;
  className?: string;
}

export const LessonBookForm: React.FC<LessonBookFormProps> = ({
  lessonBookId,
  initialData,
  onSuccess,
  className,
}) => {
  const [coverImage, setCoverImage] = useState<string>(initialData?.coverImage || "");
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [newTag, setNewTag] = useState("");

  const createLessonBook = useCreateLessonBook();
  const updateLessonBook = useUpdateLessonBook();

  const isEditing = !!lessonBookId;
  const isLoading = createLessonBook.isPending || updateLessonBook.isPending;

  const form = useForm<LessonBookFormData>({
    resolver: zodResolver(lessonBookFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      subject: initialData?.subject || "",
      grade: initialData?.grade || "",
      author: initialData?.author || "",
      publisher: initialData?.publisher || "",
      isbn: initialData?.isbn || "",
      edition: initialData?.edition || "",
      publicationYear: initialData?.publicationYear || undefined,
      language: initialData?.language || "English",
      price: initialData?.price || 0,
      currency: initialData?.currency || "USD",
      totalPages: initialData?.totalPages || undefined,
      courseId: initialData?.courseId || "",
      difficulty: initialData?.difficulty || "beginner",
      tags: initialData?.tags || [],
      chapters: initialData?.chapters || [],
    },
  });

  const { fields: chapterFields, append: appendChapter, remove: removeChapter } = useFieldArray({
    control: form.control,
    name: "chapters",
  });

  const onSubmit = async (data: LessonBookFormData) => {
    try {
      const lessonBookData = {
        ...data,
        tags,
        coverImage,
      };

      if (isEditing && lessonBookId) {
        await updateLessonBook.mutateAsync({
          id: lessonBookId,
          data: lessonBookData as UpdateLessonBookData,
        });
      } else {
        await createLessonBook.mutateAsync(lessonBookData as CreateLessonBookData);
      }

      onSuccess?.();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const addChapter = () => {
    appendChapter({
      title: "",
      description: "",
      chapterNumber: chapterFields.length + 1,
      pages: undefined,
      objectives: [],
      resources: [],
      exercises: [],
    });
  };

  const subjects = [
    "Mathematics",
    "Computer Science",
    "Physics",
    "Chemistry",
    "Biology",
    "English Literature",
    "History",
    "Geography",
    "Art",
    "Music",
    "Physical Education",
    "Business Studies",
    "Economics",
    "Psychology",
    "Philosophy",
  ];

  const grades = [
    "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
    "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10",
    "Grade 11", "Grade 12", "University Level"
  ];

  const languages = [
    "English", "Spanish", "French", "German", "Chinese",
    "Japanese", "Korean", "Arabic", "Portuguese", "Italian"
  ];

  return (
    <div className={cn("max-w-4xl mx-auto", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            {isEditing ? "Edit Lesson Book" : "Add New Lesson Book"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Book Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold border-b pb-2">Book Information</h3>
                
                {/* Cover Image */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-24 w-16 rounded-md">
                    <AvatarImage src={coverImage} alt="Book cover" className="object-cover" />
                    <AvatarFallback className="rounded-md">
                      <BookOpen className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Label>Cover Image</Label>
                    <div className="flex gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => setCoverImage(e.target?.result as string);
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                        id="cover-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('cover-upload')?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Cover
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Book Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter book title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter author name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subjects.map((subject) => (
                              <SelectItem key={subject} value={subject}>
                                {subject}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="grade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grade Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select grade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {grades.map((grade) => (
                              <SelectItem key={grade} value={grade}>
                                {grade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {languages.map((language) => (
                              <SelectItem key={language} value={language}>
                                {language}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter book description" {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Publication Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold border-b pb-2">Publication Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="publisher"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Publisher</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter publisher" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isbn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ISBN</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter ISBN" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="edition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Edition</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 3rd Edition" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="publicationYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Publication Year</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="e.g., 2024" 
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="totalPages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Pages</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="e.g., 456" 
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Price
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.01"
                            placeholder="e.g., 89.99" 
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </Label>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag (e.g., calculus, algebra)"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-2"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Chapters */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
                    <Hash className="w-5 h-5" />
                    Chapters
                  </h3>
                  <Button type="button" onClick={addChapter} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Chapter
                  </Button>
                </div>

                <div className="space-y-4">
                  {chapterFields.map((field, index) => (
                    <Card key={field.id} className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Chapter {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeChapter(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`chapters.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Chapter Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter chapter title" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`chapters.${index}.pages`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pages</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="e.g., 45" 
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`chapters.${index}.description`}
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Chapter description" {...field} rows={2} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Card>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-6">
                <Button type="submit" disabled={isLoading}>
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Saving..." : isEditing ? "Update Lesson Book" : "Create Lesson Book"}
                </Button>
                <Button type="button" variant="outline" onClick={() => onSuccess?.()}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonBookForm;
