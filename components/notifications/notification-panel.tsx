// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
// import { Bell, Check, X, AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react"
// import { mockNotifications, type Notification } from "@/lib/mock-data"
// import { cn } from "@/lib/utils"

// const getNotificationIcon = (type: Notification["type"]) => {
//   switch (type) {
//     case "success":
//       return <CheckCircle className="h-4 w-4 text-green-600" />
//     case "warning":
//       return <AlertTriangle className="h-4 w-4 text-yellow-600" />
//     case "error":
//       return <XCircle className="h-4 w-4 text-red-600" />
//     default:
//       return <Info className="h-4 w-4 text-blue-600" />
//   }
// }

// const getNotificationBg = (type: Notification["type"]) => {
//   switch (type) {
//     case "success":
//       return "bg-green-50 border-green-200"
//     case "warning":
//       return "bg-yellow-50 border-yellow-200"
//     case "error":
//       return "bg-red-50 border-red-200"
//     default:
//       return "bg-blue-50 border-blue-200"
//   }
// }

// export function NotificationPanel() {
//   const [open, setOpen] = useState(false)
//   const [notifications, setNotifications] = useState(mockNotifications)

//   const unreadCount = notifications.filter((n) => !n.isRead).length

//   const markAsRead = (id: string) => {
//     setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
//   }

//   const markAllAsRead = () => {
//     setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
//   }

//   const deleteNotification = (id: string) => {
//     setNotifications((prev) => prev.filter((n) => n.id !== id))
//   }

//   return (
//     <Sheet open={open} onOpenChange={setOpen}>
//       <SheetTrigger asChild>
//         <Button variant="outline" size="icon" className="relative bg-transparent">
//           <Bell className="h-4 w-4" />
//           {unreadCount > 0 && (
//             <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
//               {unreadCount}
//             </Badge>
//           )}
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="w-80">
//         <SheetHeader>
//           <div className="flex items-center justify-between">
//             <SheetTitle>Notifications</SheetTitle>
//             {unreadCount > 0 && (
//               <Button variant="ghost" size="sm" onClick={markAllAsRead}>
//                 Mark all read
//               </Button>
//             )}
//           </div>
//           <SheetDescription>Stay updated with your music school activities</SheetDescription>
//         </SheetHeader>

//         <ScrollArea className="h-[calc(100vh-120px)] mt-6">
//           <div className="space-y-3">
//             {notifications.length === 0 ? (
//               <div className="text-center py-8 text-muted-foreground">
//                 <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
//                 <p>No notifications</p>
//               </div>
//             ) : (
//               notifications.map((notification) => (
//                 <div
//                   key={notification.id}
//                   className={cn(
//                     "p-3 rounded-lg border transition-all",
//                     notification.isRead ? "bg-muted/30" : getNotificationBg(notification.type),
//                     !notification.isRead && "border-l-4",
//                   )}
//                 >
//                   <div className="flex items-start gap-3">
//                     {getNotificationIcon(notification.type)}
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center justify-between mb-1">
//                         <h4 className={cn("text-sm font-medium truncate", !notification.isRead && "font-semibold")}>
//                           {notification.title}
//                         </h4>
//                         <div className="flex items-center gap-1">
//                           {!notification.isRead && (
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-6 w-6"
//                               onClick={() => markAsRead(notification.id)}
//                             >
//                               <Check className="h-3 w-3" />
//                             </Button>
//                           )}
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-6 w-6 text-muted-foreground hover:text-destructive"
//                             onClick={() => deleteNotification(notification.id)}
//                           >
//                             <X className="h-3 w-3" />
//                           </Button>
//                         </div>
//                       </div>
//                       <p className="text-xs text-muted-foreground mb-2">{notification.message}</p>
//                       <p className="text-xs text-muted-foreground">
//                         {new Date(notification.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </ScrollArea>
//       </SheetContent>
//     </Sheet>
//   )
// }
