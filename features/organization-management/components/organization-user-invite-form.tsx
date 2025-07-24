"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, Mail, UserPlus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { OrganizationRole } from "@/lib/types/database"
import { useInviteMember } from "../api/use-invite-member"
import { useCurrentUser } from "@/hooks/use-current-user"

const inviteFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  role: z
    .string()
    .min(1, "Please select a role")
    .refine((val) => ["ADMIN", "MEMBER", "ACCOUNTANT", "OFFICE_STAFF"].includes(val), {
      message: "Please select a valid role",
    }),
})

type InviteFormValues = z.infer<typeof inviteFormSchema>

interface OrganizationInviteFormProps {
  selectedOrgId: string
  onSuccess?: () => void
  className?: string
}

const roleOptions = [
  {
    value: "ADMIN",
    label: "Admin",
    description: "Can manage organization settings and members",
  },
  {
    value: "MEMBER",
    label: "Member",
    description: "Standard access to organization features",
  },
  {
    value: "ACCOUNTANT",
    label: "Accountant",
    description: "Access to financial features and reports",
  },
  {
    value: "OFFICE_STAFF",
    label: "Office Staff",
    description: "Basic access for administrative tasks",
  },
]

export default function OrganizationInviteForm({
  selectedOrgId,
  onSuccess,
  className
}: OrganizationInviteFormProps) {
  const currentUser = useCurrentUser()
  const createInviteMember = useInviteMember(currentUser?.id ?? "")

  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      email: "",
      role: "",
    },
  })

  const onSubmit = async (values: InviteFormValues) => {
    if (!selectedOrgId) {
      toast.error("Please select an organization")
      return
    }

    const inviteData = {
      email: values.email,
      organizationId: selectedOrgId,
      role: values.role as OrganizationRole,
    }

    createInviteMember.mutate(inviteData, {
      onSuccess: () => {
        toast.success(`Invitation sent to ${values.email} successfully!`)
        form.reset()
        onSuccess?.()
      },
      onError: (error) => {
        toast.error(error.message || "Failed to send invitation")
      },
    })
  }

  const isLoading = createInviteMember.isPending

  return (
    <Card className={className}>
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <UserPlus className="h-5 w-5 text-primary" />
          <CardTitle className="text-xl">Invite Member</CardTitle>
        </div>
        <CardDescription>
          Send an invitation to add a new member to your organization.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="user@example.com"
                        className="pl-10"
                        disabled={isLoading}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    The person will receive an email invitation to join your organization.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role for this member" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roleOptions.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          <div className="flex flex-col items-start">
                            <span className="font-medium">{role.label}</span>
                            <span className="text-xs text-muted-foreground">
                              {role.description}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the appropriate access level for this member.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Invitation...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Invitation
                  </>
                )}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={isLoading}
                className="sm:w-auto"
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
