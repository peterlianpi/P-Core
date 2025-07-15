"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Student = {
  id: string;
  name: string;
  gender: string;
  age: number;
  status: string;
};

type Course = {
  id: string;
  name: string;
  students: Student[];
};

export function CourseOverview({ courses }: { courses: Course[] }) {
  return (
    <Accordion type="multiple" className="w-full space-y-4">
      {courses.map((course) => (
        <AccordionItem key={course.id} value={course.id}>
          <AccordionTrigger className="text-lg font-semibold">
            {course.name} ({course.students.length} students)
          </AccordionTrigger>

          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {course.students.map((student) => (
                <Card key={student.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">{student.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-1 text-sm">
                    <div>Age: {student.age}</div>
                    <div>
                      Gender: <Badge>{student.gender}</Badge>
                    </div>
                    <Badge
                      variant={
                        student.status === "ENROLLED" ||
                        student.status === "FINISHED" ||
                        student.status === "RESUMED"
                          ? "success"
                          : student.status === "CANCELLED"
                            ? "destructive"
                            : "default"
                      }
                      className="text-xs"
                    >
                      {student.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
