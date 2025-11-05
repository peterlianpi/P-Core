/**
 * Member Management API Hooks
 * React Query hooks for church member CRUD operations
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Member,
  CreateMemberRequest,
  UpdateMemberRequest,
  MemberFilters,
  MemberDashboard
} from '../types';

// Mock data for development
const mockMembers: Member[] = [
  {
    id: '1',
    number: 'MEM001',
    firstName: 'David',
    lastName: 'Johnson',
    email: 'david.johnson@church.com',
    phone: '+1234567890',
    dateOfBirth: new Date('1985-03-15'),
    gender: 'MALE',
    address: '123 Faith Street, City, State',
    baptismDate: new Date('2000-05-20'),
    membershipDate: new Date('1995-09-01'),
    status: 'ACTIVE',
    maritalStatus: 'MARRIED',
    occupation: 'Teacher',
    imageUrl: 'https://via.placeholder.com/150',
    orgId: 'org1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    number: 'MEM002',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.williams@church.com',
    phone: '+1234567891',
    dateOfBirth: new Date('1990-07-22'),
    gender: 'FEMALE',
    address: '456 Hope Avenue, City, State',
    baptismDate: new Date('2005-12-10'),
    membershipDate: new Date('2002-03-15'),
    status: 'ACTIVE',
    maritalStatus: 'MARRIED',
    occupation: 'Nurse',
    orgId: 'org1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    number: 'MEM003',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@church.com',
    phone: '+1234567892',
    dateOfBirth: new Date('1978-11-08'),
    gender: 'MALE',
    address: '789 Grace Boulevard, City, State',
    baptismDate: new Date('1998-08-15'),
    membershipDate: new Date('1990-01-20'),
    status: 'ACTIVE',
    maritalStatus: 'MARRIED',
    occupation: 'Pastor',
    orgId: 'org1',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// API Functions
const fetchMembers = async (filters: MemberFilters = {}): Promise<Member[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let filteredMembers = [...mockMembers];

  // Apply filters
  if (filters.status) {
    filteredMembers = filteredMembers.filter(m => m.status === filters.status);
  }
  if (filters.maritalStatus) {
    filteredMembers = filteredMembers.filter(m => m.maritalStatus === filters.maritalStatus);
  }
  if (filters.gender) {
    filteredMembers = filteredMembers.filter(m => m.gender === filters.gender);
  }
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredMembers = filteredMembers.filter(m =>
      `${m.firstName} ${m.lastName}`.toLowerCase().includes(searchLower) ||
      m.email?.toLowerCase().includes(searchLower) ||
      m.number.toLowerCase().includes(searchLower) ||
      m.phone?.toLowerCase().includes(searchLower)
    );
  }

  return filteredMembers;
};

const fetchMemberById = async (id: string): Promise<Member | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockMembers.find(m => m.id === id) || null;
};

const createMember = async (data: CreateMemberRequest): Promise<Member> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const newMember: Member = {
    id: Date.now().toString(),
    number: data.number,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
    gender: data.gender,
    address: data.address,
    baptismDate: data.baptismDate ? new Date(data.baptismDate) : undefined,
    membershipDate: new Date(),
    status: 'ACTIVE',
    maritalStatus: data.maritalStatus,
    occupation: data.occupation,
    orgId: 'org1', // In real app, get from context
    createdAt: new Date(),
    updatedAt: new Date()
  };

  mockMembers.push(newMember);
  return newMember;
};

const updateMember = async (id: string, data: UpdateMemberRequest): Promise<Member> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = mockMembers.findIndex(m => m.id === id);
  if (index === -1) {
    throw new Error('Member not found');
  }

  const updatedMember = {
    ...mockMembers[index],
    ...data,
    dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : mockMembers[index].dateOfBirth,
    baptismDate: data.baptismDate ? new Date(data.baptismDate) : mockMembers[index].baptismDate,
    updatedAt: new Date()
  };

  mockMembers[index] = updatedMember;
  return updatedMember;
};

const deleteMember = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const index = mockMembers.findIndex(m => m.id === id);
  if (index === -1) {
    throw new Error('Member not found');
  }

  mockMembers.splice(index, 1);
};

const fetchMemberDashboard = async (): Promise<MemberDashboard> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock upcoming birthdays (next 30 days)
  const upcomingBirthdays = mockMembers
    .filter(m => m.dateOfBirth)
    .map(member => {
      const today = new Date();
      const birthDate = new Date(member.dateOfBirth!);
      const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

      if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
      }

      const daysUntil = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      return {
        member,
        daysUntil: daysUntil > 365 ? daysUntil - 365 : daysUntil
      };
    })
    .filter(item => item.daysUntil <= 30)
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, 5);

  return {
    recentMembers: mockMembers.slice(-3),
    upcomingBirthdays,
    familyUpdates: [],
    choirActivities: []
  };
};

// React Query Hooks
export const useMembers = (filters: MemberFilters = {}) => {
  return useQuery({
    queryKey: ['members', filters],
    queryFn: () => fetchMembers(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMember = (id: string) => {
  return useQuery({
    queryKey: ['member', id],
    queryFn: () => fetchMemberById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });
};

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMemberRequest }) =>
      updateMember(id, data),
    onSuccess: (updatedMember) => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.setQueryData(['member', updatedMember.id], updatedMember);
    },
  });
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });
};

export const useMemberDashboard = () => {
  return useQuery({
    queryKey: ['member-dashboard'],
    queryFn: fetchMemberDashboard,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Utility hooks
export const useMemberStats = () => {
  return useQuery({
    queryKey: ['member-stats'],
    queryFn: async () => {
      const members = await fetchMembers();
      return {
        total: members.length,
        active: members.filter(m => m.status === 'ACTIVE').length,
        baptized: members.filter(m => m.baptismDate).length,
        married: members.filter(m => m.maritalStatus === 'MARRIED').length,
        single: members.filter(m => m.maritalStatus === 'SINGLE').length,
        male: members.filter(m => m.gender === 'MALE').length,
        female: members.filter(m => m.gender === 'FEMALE').length,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpcomingBirthdays = (limit: number = 10) => {
  return useQuery({
    queryKey: ['upcoming-birthdays', limit],
    queryFn: async () => {
      const dashboard = await fetchMemberDashboard();
      return dashboard.upcomingBirthdays.slice(0, limit);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
