/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalizeFormat } from "@/helpers/custom-function";
import React from "react";

type Student = {
  id: string;
  name: string;
  gender: string;
  age: number;
  status: string;
  image: string; // URL to the student's image
};

const StudentCardPage = ({ student }: { student: Student }) => {
  return (
    <>
      <div key={student.id} className="w-40">
        <Card key={student.id}>
          <CardHeader className="items-center">
            <img
              src={student.image}
              alt={`${student.image}'s photo`}
              className="object-contain rounded-full
                     w-24 mb-2"
            />
            <CardTitle className="text-xs font-semibold">
              {student.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1 text-xs">
            <div>Age: {student.age}</div>
            <div>Gender: {capitalizeFormat(student.gender)}</div>
            <div className="flex justify-center mt-2 items-center">
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
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default StudentCardPage;
