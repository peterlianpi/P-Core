/**
 * School Schedules Page
 * Class schedules and timetables management
 */

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Users, Plus, Edit, Trash2 } from 'lucide-react';

interface ScheduleItem {
  id: string;
  course: string;
  teacher: string;
  room: string;
  day: string;
  startTime: string;
  endTime: string;
  grade: string;
  students: number;
}

const mockSchedules: ScheduleItem[] = [
  {
    id: '1',
    course: 'Mathematics',
    teacher: 'Dr. Smith',
    room: 'Room 101',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:30',
    grade: 'Grade 10',
    students: 25
  },
  {
    id: '2',
    course: 'English Literature',
    teacher: 'Ms. Johnson',
    room: 'Room 102',
    day: 'Monday',
    startTime: '11:00',
    endTime: '12:30',
    grade: 'Grade 11',
    students: 22
  },
  {
    id: '3',
    course: 'Physics',
    teacher: 'Mr. Brown',
    room: 'Lab 201',
    day: 'Tuesday',
    startTime: '09:00',
    endTime: '10:30',
    grade: 'Grade 12',
    students: 18
  },
  {
    id: '4',
    course: 'Chemistry',
    teacher: 'Dr. Davis',
    room: 'Lab 202',
    day: 'Tuesday',
    startTime: '11:00',
    endTime: '12:30',
    grade: 'Grade 12',
    students: 20
  }
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function SchoolSchedulesPage() {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const getSchedulesForDay = (day: string) => {
    return mockSchedules.filter(schedule => schedule.day === day);
  };

  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 16; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Class Schedules</h1>
          <p className="text-muted-foreground">
            Manage class timetables and schedules
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Schedule
        </Button>
      </div>

      {/* Schedule Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSchedules.length}</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(mockSchedules.map(s => s.teacher)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Teaching staff
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockSchedules.reduce((sum, s) => sum + s.students, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Enrolled students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classrooms</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(mockSchedules.map(s => s.room)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Active rooms
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Tabs */}
      <Tabs value={selectedDay} onValueChange={setSelectedDay}>
        <TabsList className="grid w-full grid-cols-5">
          {daysOfWeek.map(day => (
            <TabsTrigger key={day} value={day}>
              {day}
            </TabsTrigger>
          ))}
        </TabsList>

        {daysOfWeek.map(day => (
          <TabsContent key={day} value={day} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {day} Schedule
                </CardTitle>
                <CardDescription>
                  Class schedule for {day.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getSchedulesForDay(day).length > 0 ? (
                    getSchedulesForDay(day).map(schedule => (
                      <div
                        key={schedule.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">
                              {schedule.startTime} - {schedule.endTime}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium">{schedule.course}</h4>
                            <p className="text-sm text-muted-foreground">
                              {schedule.teacher} • {schedule.room}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{schedule.grade}</Badge>
                          <Badge variant="secondary">
                            {schedule.students} students
                          </Badge>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No classes scheduled for {day.toLowerCase()}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Weekly Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Overview</CardTitle>
          <CardDescription>Summary of all scheduled classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {daysOfWeek.map(day => {
              const daySchedules = getSchedulesForDay(day);
              return (
                <div key={day} className="text-center p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">{day}</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {daySchedules.length}
                  </div>
                  <p className="text-sm text-muted-foreground">classes</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {daySchedules.reduce((sum, s) => sum + s.students, 0)} students
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
