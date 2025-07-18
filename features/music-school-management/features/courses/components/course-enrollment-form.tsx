// components/CourseEnrollmentForm.tsx

"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Trash2, PlusCircle } from "lucide-react";

type Course = { id: string; name: string };

type Enrollment = {
  courseId: string;
  status: "ENROLLED" | "PAUSED" | "RESUMED" | "FINISHED" | "CANCELLED";
};

type Props = {
  availableCourses: Course[];
  enrollments: Enrollment[];
  setEnrollments: (enrollments: Enrollment[]) => void;
};

export const CourseEnrollmentForm = ({
  availableCourses,
  enrollments,
  setEnrollments,
}: Props) => {
  const handleChange = (
    index: number,
    key: keyof Enrollment,
    value: string
  ) => {
    const updated = [...enrollments];
    updated[index] = { ...updated[index], [key]: value };
    setEnrollments(updated);
  };

  const addEnrollment = () => {
    setEnrollments([...enrollments, { courseId: "", status: "ENROLLED" }]);
  };

  const removeEnrollment = (index: number) => {
    const updated = [...enrollments];
    updated.splice(index, 1);
    setEnrollments(updated);
  };

  return (
    <div className="space-y-4">
      <Label className="text-base">Course Enrollments</Label>

      {enrollments.map((enrollment, index) => (
        <div key={index} className="flex flex-wrap gap-4 items-end">
          {/* Course Select */}
          <div className="flex flex-col space-y-1">
            <Label>Course</Label>
            <Select
              value={enrollment.courseId}
              onValueChange={(val) => handleChange(index, "courseId", val)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                {availableCourses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Select */}
          <div className="flex flex-col space-y-1">
            <Label>Status</Label>
            <Select
              value={enrollment.status}
              onValueChange={(val) => handleChange(index, "status", val)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ENROLLED">ENROLLED</SelectItem>
                <SelectItem value="PAUSED">PAUSED</SelectItem>
                <SelectItem value="RESUMED">RESUMED</SelectItem>
                <SelectItem value="FINISHED">FINISHED</SelectItem>
                <SelectItem value="CANCELLED">CANCELLED</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Remove Button */}
          <Button
            variant="destructive"
            size="icon"
            onClick={() => removeEnrollment(index)}
            className="mt-6"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}

      {/* Add Button */}
      <Button
        type="button"
        variant="outline"
        onClick={addEnrollment}
        className="mt-2"
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Course
      </Button>
    </div>
  );
};
