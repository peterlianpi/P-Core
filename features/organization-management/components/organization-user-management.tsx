"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Building2, Users, UserPlus, Settings, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import type { OrganizationRole } from "@/lib/types/database"
import MemberCard from "./member-card"
import MemberRemoveList from "./member-remove-list"
import MemberRoleEditor from "./member-role-editor"
import { useCurrentMemberRole } from "@/hooks/use-current-team-role"
import { useOrgData } from "../context/org-context"
import { useSelectedOrg } from "../context/selected-org-context"
import { useData } from "@/providers/data-provider"
import OrganizationInviteList from "./organization-invite-list"
import OrganizationInviteForm from "./organization-user-invite-form"

type User = {
  id: string
  name: string | null
  email: string
  image: string | null
  organization: {
    id: string
    role: OrganizationRole
    status: string
  }[]
}

const getTabIcon = (tab: string) => {
  switch (tab) {
    case 'members':
      return <Users className="h-4 w-4" />
    case 'invite':
      return <UserPlus className="h-4 w-4" />
    case 'remove':
      return <Users className="h-4 w-4" />
    case 'roles':
      return <Settings className="h-4 w-4" />
    case 'invitations':
      return <Mail className="h-4 w-4" />
    default:
      return null
  }
}

export default function OrganizationUserManagementPage() {
  const { orgId } = useData()
  const { organizations, users } = useOrgData()
  const { selectedOrgId, setSelectedOrgId } = useSelectedOrg()

  const [activeTab, setActiveTab] = useState("members")
  const [orgMembers, setOrgMembers] = useState<User[]>([])

  // Map organizations for display
  const resultOrg = organizations.map((org) => ({
    id: org.organization.id,
    name: org.organization.name,
  }))

  const currentUserRole = useCurrentMemberRole(users ?? [], selectedOrgId)
  const selectedOrganization = resultOrg.find(org => org.id === selectedOrgId)

  useEffect(() => {
    setSelectedOrgId(orgId)
  }, [orgId, setSelectedOrgId])

  // Filter users in selected organization
  useEffect(() => {
    if (!selectedOrgId) {
      setOrgMembers([])
      return
    }

    const filtered = users.filter((user) =>
      user.organization.some((org) => {
        const inOrg = org.id === selectedOrgId
        if (!inOrg) return false
        return currentUserRole === "OWNER" ? true : org.status === "ACTIVE"
      })
    )

    setOrgMembers(filtered)
  }, [currentUserRole, selectedOrgId, users])

  const isOwner = currentUserRole === "OWNER"
  const activeMembers = orgMembers.filter(m => 
    m.organization.find(o => o.id === selectedOrgId)?.status === "ACTIVE"
  )

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Organization Management</h1>
        <p className="text-muted-foreground">
          Manage members, roles, and invitations for your organization.
        </p>
      </div>

      {/* Organization Selector */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Select Organization</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 w-full sm:max-w-md">
              <Select onValueChange={setSelectedOrgId} value={selectedOrgId ?? ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an organization" />
                </SelectTrigger>
                <SelectContent>
                  {resultOrg.map((org) => (
                    <SelectItem key={org.id} value={org.id}>
                      {org.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedOrganization && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="font-normal">
                  {activeMembers.length} Active Members
                </Badge>
                <Badge variant="secondary" className="font-normal">
                  Role: {currentUserRole}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      {selectedOrgId ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="members" className="flex items-center gap-2">
              {getTabIcon('members')}
              <span className="hidden sm:inline">Members</span>
            </TabsTrigger>
            
            {isOwner && (
              <>
                <TabsTrigger value="invite" className="flex items-center gap-2">
                  {getTabIcon('invite')}
                  <span className="hidden sm:inline">Invite</span>
                </TabsTrigger>
                <TabsTrigger value="remove" className="flex items-center gap-2">
                  {getTabIcon('remove')}
                  <span className="hidden sm:inline">Remove</span>
                </TabsTrigger>
                <TabsTrigger value="roles" className="flex items-center gap-2">
                  {getTabIcon('roles')}
                  <span className="hidden sm:inline">Roles</span>
                </TabsTrigger>
                <TabsTrigger value="invitations" className="flex items-center gap-2">
                  {getTabIcon('invitations')}
                  <span className="hidden sm:inline">Invitations</span>
                </TabsTrigger>
              </>
            )}
          </TabsList>

          <TabsContent value="members" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Organization Members</h3>
                <p className="text-sm text-muted-foreground">
                  View all members in {selectedOrganization?.name}
                </p>
              </div>
              <Badge variant="outline">
                {orgMembers.length} Total Members
              </Badge>
            </div>
            
            <Separator />
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {orgMembers.map((member) => {
                const memberOrg = member.organization.find((o) => o.id === selectedOrgId)
                const role = memberOrg?.role ?? "N/A"
                const status = memberOrg?.status ?? "N/A"
                
                return (
                  <MemberCard
                    key={member.id}
                    id={member.id}
                    name={member.name}
                    email={member.email}
                    image={member.image}
                    role={role}
                    status={status}
                    showActions={isOwner}
                  />
                )
              })}
            </div>
            
            {orgMembers.length === 0 && (
              <Card className="p-8">
                <div className="text-center space-y-2">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-semibold">No members found</h3>
                  <p className="text-sm text-muted-foreground">
                    This organization doesn&apos;t have any members yet.
                  </p>
                </div>
              </Card>
            )}
          </TabsContent>

          {isOwner && (
            <>
              <TabsContent value="invite" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Invite New Members</h3>
                  <p className="text-sm text-muted-foreground">
                    Send invitations to add new members to {selectedOrganization?.name}
                  </p>
                </div>
                
                <Separator />
                
                <div className="max-w-2xl">
                  <OrganizationInviteForm selectedOrgId={selectedOrgId} />
                </div>
              </TabsContent>

              <TabsContent value="remove" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Remove Members</h3>
                  <p className="text-sm text-muted-foreground">
                    Remove members from {selectedOrganization?.name}
                  </p>
                </div>
                
                <Separator />
                
                <MemberRemoveList
                  members={orgMembers}
                  selectedOrgId={selectedOrgId}
                />
              </TabsContent>

              <TabsContent value="roles" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Manage Roles</h3>
                  <p className="text-sm text-muted-foreground">
                    Update member roles and permissions in {selectedOrganization?.name}
                  </p>
                </div>
                
                <Separator />
                
                <MemberRoleEditor
                  members={orgMembers}
                  selectedOrgId={selectedOrgId}
                />
              </TabsContent>

              <TabsContent value="invitations" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Pending Invitations</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage pending invitations for {selectedOrganization?.name}
                  </p>
                </div>
                
                <Separator />
                
                <OrganizationInviteList orgId={selectedOrgId} />
              </TabsContent>
            </>
          )}
        </Tabs>
      ) : (
        <Card className="p-8">
          <div className="text-center space-y-4">
            <Building2 className="h-16 w-16 mx-auto text-muted-foreground" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Select an Organization</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Choose an organization from the dropdown above to manage its members and settings.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
