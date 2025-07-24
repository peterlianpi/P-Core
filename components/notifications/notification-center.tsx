"use client"

import React, { useState, useEffect } from "react"
import { Bell, MoreVertical, AlertCircle, Info, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { format, formatDistanceToNow } from "date-fns"
import { toast } from "sonner"

interface Notification {
  id: string
  title: string
  message: string
  type: "INFO" | "WARNING" | "ERROR" | "SUCCESS" | "ANNOUNCEMENT"
  priority: "LOW" | "MEDIUM" | "HIGH"
  isRead: boolean
  isArchived: boolean
  actionUrl?: string
  createdAt: string
  createdBy?: {
    id: string
    name: string
    role: string
  }
}

interface NotificationCenterProps {
  className?: string
  triggerClassName?: string
  side?: "left" | "right"
}

const NotificationTypeIcons = {
  INFO: Info,
  WARNING: AlertCircle,
  ERROR: AlertCircle,
  SUCCESS: CheckCircle,
  ANNOUNCEMENT: Bell,
}

const NotificationTypeColors = {
  INFO: "text-blue-500 bg-blue-50 dark:bg-blue-950",
  WARNING: "text-yellow-500 bg-yellow-50 dark:bg-yellow-950",
  ERROR: "text-red-500 bg-red-50 dark:bg-red-950",
  SUCCESS: "text-green-500 bg-green-50 dark:bg-green-950",
  ANNOUNCEMENT: "text-purple-500 bg-purple-50 dark:bg-purple-950",
}

const PriorityColors = {
  LOW: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  MEDIUM: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200",
  HIGH: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200",
}

export function NotificationCenter({ 
  className,
  triggerClassName,
  side = "right" 
}: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    type: "all",
    priority: "all",
    isRead: "all",
  })

  // Mock notification actions - replace with actual API calls
  const fetchNotifications = async (pageNum = 1, reset = false) => {
    setLoading(true)
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const mockNotifications: Notification[] = [
        {
          id: "1",
          title: "System Maintenance Scheduled",
          message: "Routine maintenance will be performed tonight from 2 AM to 4 AM EST.",
          type: "ANNOUNCEMENT",
          priority: "HIGH",
          isRead: false,
          isArchived: false,
          createdAt: new Date().toISOString(),
          createdBy: { id: "admin", name: "System Admin", role: "SUPERADMIN" }
        },
        {
          id: "2",
          title: "New Student Enrollment",
          message: "John Doe has been successfully enrolled in Mathematics 101.",
          type: "SUCCESS",
          priority: "MEDIUM",
          isRead: false,
          isArchived: false,
          createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          createdBy: { id: "teacher", name: "Jane Smith", role: "TEACHER" }
        },
        {
          id: "3",
          title: "Payment Overdue",
          message: "Student ID #12345 has an overdue payment of $500.",
          type: "WARNING",
          priority: "HIGH",
          isRead: true,
          isArchived: false,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          createdBy: { id: "admin", name: "Finance Admin", role: "ADMIN" }
        },
        {
          id: "4",
          title: "Welcome to P-Core",
          message: "Thank you for joining our platform. Get started by exploring the dashboard.",
          type: "INFO",
          priority: "LOW",
          isRead: true,
          isArchived: false,
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        }
      ]

      if (reset) {
        setNotifications(mockNotifications)
      } else {
        setNotifications(prev => [...prev, ...mockNotifications])
      }

      setUnreadCount(mockNotifications.filter(n => !n.isRead).length)
      setHasMore(pageNum < 3) // Mock pagination
    } catch {
      toast.error("Failed to load notifications")
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (notificationId: string) => {
    try {
      // Mock API call
      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId ? { ...n, isRead: true } : n
        )
      )
      setUnreadCount(prev => Math.max(0, prev - 1))
      toast.success("Notification marked as read")
    } catch {
      toast.error("Failed to update notification")
    }
  }

  const markAllAsRead = async () => {
    try {
      // Mock API call
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
      setUnreadCount(0)
      toast.success("All notifications marked as read")
    } catch {
      toast.error("Failed to mark all as read")
    }
  }

  const archiveNotification = async (notificationId: string) => {
    try {
      // Mock API call
      setNotifications(prev => prev.filter(n => n.id !== notificationId))
      toast.success("Notification archived")
    } catch {
      toast.error("Failed to archive notification")
    }
  }

  useEffect(() => {
    fetchNotifications(1, true)
  }, [filters])

  const filteredNotifications = notifications.filter(notification => {
    if (filters.type !== "all" && notification.type !== filters.type) return false
    if (filters.priority !== "all" && notification.priority !== filters.priority) return false
    if (filters.isRead === "read" && !notification.isRead) return false
    if (filters.isRead === "unread" && notification.isRead) return false
    return true
  })

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchNotifications(nextPage)
    }
  }

  const NotificationItem = ({ notification }: { notification: Notification }) => {
    const IconComponent = NotificationTypeIcons[notification.type]
    
    return (
      <Card className={cn(
        "mb-3 transition-all duration-200 hover:shadow-md",
        !notification.isRead && "border-l-4 border-l-blue-500 bg-blue-50/30 dark:bg-blue-950/30"
      )}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={cn(
              "rounded-full p-2 flex-shrink-0",
              NotificationTypeColors[notification.type]
            )}>
              <IconComponent className="h-4 w-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={cn(
                      "text-sm font-medium truncate",
                      !notification.isRead && "font-semibold"
                    )}>
                      {notification.title}
                    </h4>
                    <Badge 
                      variant="secondary"
                      className={cn("text-xs", PriorityColors[notification.priority])}
                    >
                      {notification.priority}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span title={format(new Date(notification.createdAt), "PPpp")}>
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    
                    {notification.createdBy && (
                      <span className="text-xs">
                        by {notification.createdBy.name}
                      </span>
                    )}
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {!notification.isRead && (
                      <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                        Mark as read
                      </DropdownMenuItem>
                    )}
                    {notification.actionUrl && (
                      <DropdownMenuItem asChild>
                        <a href={notification.actionUrl} target="_blank" rel="noopener noreferrer">
                          View details
                        </a>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem 
                      onClick={() => archiveNotification(notification.id)}
                      className="text-red-600"
                    >
                      Archive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("relative", triggerClassName)}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent side={side} className={cn("w-full sm:w-96", className)}>
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="secondary">
                  {unreadCount} unread
                </Badge>
              )}
            </SheetTitle>
          </div>
          <SheetDescription>
            Stay updated with the latest activities and announcements
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-2">
            <Select
              value={filters.type}
              onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="INFO">Info</SelectItem>
                <SelectItem value="WARNING">Warning</SelectItem>
                <SelectItem value="ERROR">Error</SelectItem>
                <SelectItem value="SUCCESS">Success</SelectItem>
                <SelectItem value="ANNOUNCEMENT">Announcement</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.isRead}
              onValueChange={(value) => setFilters(prev => ({ ...prev, isRead: value }))}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action buttons */}
          {unreadCount > 0 && (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={markAllAsRead}
                className="flex-1"
              >
                Mark all as read
              </Button>
            </div>
          )}

          <Separator />

          {/* Notifications list */}
          <ScrollArea className="h-[calc(100vh-300px)]">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {notifications.length === 0 ? "No notifications yet" : "No notifications match your filters"}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
                
                {hasMore && (
                  <div className="text-center pt-4">
                    <Button 
                      variant="outline" 
                      onClick={loadMore} 
                      disabled={loading}
                      size="sm"
                    >
                      {loading ? "Loading..." : "Load more"}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}