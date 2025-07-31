'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useStudentEnrollments, useStudentGrades, type Student } from '../api';

interface StudentDetailProps {
  student: Student;
  onClose: () => void;
}

const statusColors = {
  ACTIVE: 'bg-green-100 text-green-800',
  INACTIVE: 'bg-gray-100 text-gray-800',
  GRADUATED: 'bg-blue-100 text-blue-800',
  TRANSFERRED: 'bg-yellow-100 text-yellow-800',
};

export function StudentDetail({ student, onClose }: StudentDetailProps) {
  const { data: enrollments, isLoading: enrollmentsLoading } = useStudentEnrollments(student.id);
  const { data: grades, isLoading: gradesLoading } = useStudentGrades(student.id);

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Student Details - {student.firstName} {student.lastName}
            <Badge className={statusColors[student.status]}>
              {student.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="academic">Academic Info</TabsTrigger>
            <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Student ID</label>
                    <p className="text-sm">{student.studentId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="text-sm">{student.firstName} {student.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-sm">{student.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-sm">{student.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                    <p className="text-sm">
                      {student.dateOfBirth ? formatDate(student.dateOfBirth) : 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Enrollment Date</label>
                    <p className="text-sm">{formatDate(student.enrollmentDate)}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Address</label>
                    <p className="text-sm">{student.address || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Emergency Contact</label>
                    <p className="text-sm">{student.emergencyContact || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Emergency Phone</label>
                    <p className="text-sm">{student.emergencyPhone || 'Not provided'}</p>
                  </div>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium text-gray-500">Guardian Name</label>
                    <p className="text-sm">{student.guardianName || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Guardian Phone</label>
                    <p className="text-sm">{student.guardianPhone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Guardian Email</label>
                    <p className="text-sm">{student.guardianEmail || 'Not provided'}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {(student.medicalInfo || student.notes) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {student.medicalInfo && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Medical Information</label>
                      <p className="text-sm whitespace-pre-wrap">{student.medicalInfo}</p>
                    </div>
                  )}
                  {student.notes && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Notes</label>
                      <p className="text-sm whitespace-pre-wrap">{student.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="academic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Academic Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Grade Level</label>
                  <p className="text-lg font-semibold">{student.gradeLevel || 'Not assigned'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Section</label>
                  <p className="text-lg font-semibold">{student.section || 'Not assigned'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Enrollments</label>
                  <p className="text-lg font-semibold">{student._count?.enrollments || 0}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="enrollments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Enrollments</CardTitle>
              </CardHeader>
              <CardContent>
                {enrollmentsLoading ? (
                  <p className="text-center py-4">Loading enrollments...</p>
                ) : !enrollments?.data.length ? (
                  <p className="text-center py-4 text-gray-500">No enrollments found</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course Code</TableHead>
                        <TableHead>Course Name</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead>Enrolled Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enrollments.data.map((enrollment) => (
                        <TableRow key={enrollment.id}>
                          <TableCell className="font-medium">
                            {enrollment.course.code}
                          </TableCell>
                          <TableCell>{enrollment.course.name}</TableCell>
                          <TableCell>{enrollment.course.credits || '-'}</TableCell>
                          <TableCell>{formatDate(enrollment.enrolledAt)}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {enrollment.status || 'Enrolled'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grades" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Grade History</CardTitle>
              </CardHeader>
              <CardContent>
                {gradesLoading ? (
                  <p className="text-center py-4">Loading grades...</p>
                ) : !grades?.data.length ? (
                  <p className="text-center py-4 text-gray-500">No grades found</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Assessment Type</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead>Max Points</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {grades.data.map((grade) => (
                        <TableRow key={grade.id}>
                          <TableCell className="font-medium">
                            {grade.course.name} ({grade.course.code})
                          </TableCell>
                          <TableCell>{grade.assessmentType || '-'}</TableCell>
                          <TableCell>
                            <Badge variant={grade.grade === 'A' ? 'default' : 'secondary'}>
                              {grade.grade || '-'}
                            </Badge>
                          </TableCell>
                          <TableCell>{grade.points?.toString() || '-'}</TableCell>
                          <TableCell>{grade.maxPoints?.toString() || '-'}</TableCell>
                          <TableCell>{formatDate(grade.createdAt)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
