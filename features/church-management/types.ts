/**
 * Church Management Types
 * Type definitions for church management domain
 */

export interface Member {
  id: string;
  number: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  address?: string;
  baptismDate?: Date;
  membershipDate: Date;
  status: 'ACTIVE' | 'INACTIVE' | 'TRANSFERRED' | 'DECEASED';
  maritalStatus?: 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'WIDOWED';
  occupation?: string;
  imageUrl?: string;
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Family {
  id: string;
  name: string;
  headOfFamilyId: string;
  headOfFamily: Member;
  address?: string;
  phone?: string;
  members: FamilyMember[];
  status: 'ACTIVE' | 'INACTIVE' | 'DISSOLVED';
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FamilyMember {
  id: string;
  familyId: string;
  family: Family;
  memberId: string;
  member: Member;
  relationship: 'SPOUSE' | 'CHILD' | 'PARENT' | 'SIBLING' | 'OTHER';
  isHead: boolean;
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Choir {
  id: string;
  name: string;
  description?: string;
  conductor?: string;
  voiceParts: VoicePart[];
  rehearsalDay?: string;
  rehearsalTime?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'DISSOLVED';
  imageUrl?: string;
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VoicePart {
  id: string;
  name: 'SOPRANO' | 'ALTO' | 'TENOR' | 'BASS';
  description?: string;
}

export interface ChoirMember {
  id: string;
  choirId: string;
  choir: Choir;
  memberId: string;
  member: Member;
  voicePart: VoicePart;
  joinedDate: Date;
  status: 'ACTIVE' | 'INACTIVE' | 'LEFT';
  notes?: string;
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Khawk {
  id: string;
  name: string;
  description?: string;
  leaderId?: string;
  leader?: Member;
  status: 'ACTIVE' | 'INACTIVE';
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Veng {
  id: string;
  name: string;
  khawkId: string;
  khawk: Khawk;
  description?: string;
  leaderId?: string;
  leader?: Member;
  status: 'ACTIVE' | 'INACTIVE';
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Home {
  id: string;
  name: string;
  vengId: string;
  veng: Veng;
  address?: string;
  leaderId?: string;
  leader?: Member;
  meetingDay?: string;
  meetingTime?: string;
  status: 'ACTIVE' | 'INACTIVE';
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HomeMember {
  id: string;
  homeId: string;
  home: Home;
  memberId: string;
  member: Member;
  joinedDate: Date;
  status: 'ACTIVE' | 'INACTIVE' | 'MOVED';
  role?: 'LEADER' | 'ASSISTANT' | 'MEMBER';
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

// API Request/Response Types
export interface CreateMemberRequest {
  number: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  address?: string;
  baptismDate?: string;
  maritalStatus?: 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'WIDOWED';
  occupation?: string;
}

export interface UpdateMemberRequest extends Partial<CreateMemberRequest> {
  status?: 'ACTIVE' | 'INACTIVE' | 'TRANSFERRED' | 'DECEASED';
}

export interface CreateFamilyRequest {
  name: string;
  headOfFamilyId: string;
  address?: string;
  phone?: string;
}

export interface CreateChoirRequest {
  name: string;
  description?: string;
  conductor?: string;
  voiceParts: string[];
  rehearsalDay?: string;
  rehearsalTime?: string;
}

export interface AddChoirMemberRequest {
  choirId: string;
  memberId: string;
  voicePart: string;
  notes?: string;
}

// Filter and Search Types
export interface MemberFilters {
  status?: string;
  maritalStatus?: string;
  gender?: string;
  search?: string;
  khawkId?: string;
  vengId?: string;
  homeId?: string;
  page?: number;
  limit?: number;
}

export interface FamilyFilters {
  status?: string;
  search?: string;
  khawkId?: string;
  vengId?: string;
  page?: number;
  limit?: number;
}

export interface ChoirFilters {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

// Statistics Types
export interface ChurchStats {
  totalMembers: number;
  activeMembers: number;
  totalFamilies: number;
  activeFamilies: number;
  totalChoirs: number;
  activeChoirs: number;
  totalKhawks: number;
  totalVengs: number;
  totalHomes: number;
  baptizedMembers: number;
  marriedMembers: number;
  recentBaptisms: number;
  recentMemberships: number;
}

// Dashboard Types
export interface MemberDashboard {
  recentMembers: Member[];
  upcomingBirthdays: Array<{
    member: Member;
    daysUntil: number;
  }>;
  familyUpdates: Family[];
  choirActivities: ChoirMember[];
}

export interface ChurchAdminDashboard {
  stats: ChurchStats;
  recentMembers: Member[];
  activeChoirs: Choir[];
  familyGrowth: Array<{
    month: string;
    families: number;
    members: number;
  }>;
}
