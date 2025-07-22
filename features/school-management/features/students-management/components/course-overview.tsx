"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StudentCardPage from "./student-card";

type Student = {
  id: string;
  name: string;
  gender: string;
  age: number;
  status: string;
  image: string; // URL to the student's image
};

type Course = {
  id: string;
  name: string;
  students: Student[];
};

export function CourseOverview({ courses }: { courses: Course[] }) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {courses.map((course) => (
        <AccordionItem key={course.id} value={course.id}>
          <AccordionTrigger className="text-lg font-semibold">
            {course.name} ({course.students.length} students)
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-wrap gap-2 justify-start">
              {course.students.map((student) => (
                <div key={student.id}>
                  <StudentCardPage student={student} />
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
