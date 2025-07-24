"use client"

import * as React from "react"
import { User, Mail, Shield, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { capitalizeFormat } from "../../../helpers/custom-function"

interface MemberCardProps {
  id: string
  name: string | null
  email: string
  image?: string | null
  role: string
  status: string
  onEdit?: (id: string) => void
  onRemove?: (id: string) => void
  showActions?: boolean
  className?: string
}

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'default'
    case 'pending':
      return 'secondary'
    case 'removed':
      return 'destructive'
    case 'suspended':
      return 'outline'
    default:
      return 'secondary'
  }
}

const getRoleIcon = (role: string) => {
  switch (role.toLowerCase()) {
    case 'owner':
    case 'admin':
      return <Shield className="h-3 w-3" />
    default:
      return <User className="h-3 w-3" />
  }
}

const getInitials = (name: string | null): string => {
  if (!name) return 'U'
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function MemberCard({
  id,
  name,
  email,
  image,
  role,
  status,
  onEdit,
  onRemove,
  showActions = false,
  className
}: MemberCardProps) {
  const displayName = name || "Unknown User"
  const initials = getInitials(name)

  return (
    <Card className={cn(
      "w-full max-w-sm transition-all duration-200",
      "hover:shadow-md hover:-translate-y-0.5",
      "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={image || undefined} alt={displayName} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm leading-none truncate">
                {displayName}
              </h3>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{email}</span>
              </div>
            </div>
          </div>

          {showActions && (onEdit || onRemove) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(id)}>
                    Edit
                  </DropdownMenuItem>
                )}
                {onRemove && (
                  <DropdownMenuItem 
                    onClick={() => onRemove(id)}
                    className="text-destructive focus:text-destructive"
                  >
                    Remove
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {getRoleIcon(role)}
            <span className="text-xs font-medium text-muted-foreground">
              {role ? capitalizeFormat(role) : "No Role"}
            </span>
          </div>
          
          <Badge 
            variant={getStatusVariant(status)}
            className="text-xs font-medium"
          >
            {capitalizeFormat(status)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
