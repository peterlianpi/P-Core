// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
// import { Separator } from "@/components/ui/separator"
// import { Palette, RotateCcw } from "lucide-react"
// import { useThemeStore } from "@/lib/theme-store"

// const colorOptions = [
//   { name: "Blue", value: "#3B82F6" },
//   { name: "Green", value: "#10B981" },
//   { name: "Purple", value: "#8B5CF6" },
//   { name: "Red", value: "#EF4444" },
//   { name: "Orange", value: "#F97316" },
//   { name: "Pink", value: "#EC4899" },
// ]

// const fontSizeOptions = [
//   { name: "Small", value: "small" as const },
//   { name: "Medium", value: "medium" as const },
//   { name: "Large", value: "large" as const },
// ]

// const borderRadiusOptions = [
//   { name: "None", value: "none" as const },
//   { name: "Small", value: "small" as const },
//   { name: "Medium", value: "medium" as const },
//   { name: "Large", value: "large" as const },
// ]

// export function ThemeCustomizer() {
//   const [open, setOpen] = useState(false)
//   const { settings, updateSettings, resetSettings } = useThemeStore()

//   return (
//     <Sheet open={open} onOpenChange={setOpen}>
//       <SheetTrigger asChild>
//         <Button variant="outline" size="icon" className="bg-transparent">
//           <Palette className="h-4 w-4" />
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="w-80">
//         <SheetHeader>
//           <SheetTitle>Customize Theme</SheetTitle>
//           <SheetDescription>Personalize your music school dashboard appearance</SheetDescription>
//         </SheetHeader>

//         <div className="space-y-6 py-6">
//           {/* Primary Color */}
//           <div className="space-y-3">
//             <Label className="text-sm font-medium">Primary Color</Label>
//             <div className="grid grid-cols-3 gap-2">
//               {colorOptions.map((color) => (
//                 <button
//                   key={color.value}
//                   className={`h-10 rounded-md border-2 transition-all ${
//                     settings.primaryColor === color.value
//                       ? "border-foreground scale-105"
//                       : "border-border hover:border-foreground/50"
//                   }`}
//                   style={{ backgroundColor: color.value }}
//                   onClick={() => updateSettings({ primaryColor: color.value })}
//                   title={color.name}
//                 />
//               ))}
//             </div>
//           </div>

//           <Separator />

//           {/* Font Size */}
//           <div className="space-y-3">
//             <Label className="text-sm font-medium">Font Size</Label>
//             <Select
//               value={settings.fontSize}
//               onValueChange={(value: "small" | "medium" | "large") => updateSettings({ fontSize: value })}
//             >
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 {fontSizeOptions.map((option) => (
//                   <SelectItem key={option.value} value={option.value}>
//                     {option.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <Separator />

//           {/* Border Radius */}
//           <div className="space-y-3">
//             <Label className="text-sm font-medium">Border Radius</Label>
//             <Select
//               value={settings.borderRadius}
//               onValueChange={(value: "none" | "small" | "medium" | "large") => updateSettings({ borderRadius: value })}
//             >
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 {borderRadiusOptions.map((option) => (
//                   <SelectItem key={option.value} value={option.value}>
//                     {option.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <Separator />

//           {/* Reset Button */}
//           <Button variant="outline" onClick={resetSettings} className="w-full bg-transparent">
//             <RotateCcw className="h-4 w-4 mr-2" />
//             Reset to Default
//           </Button>
//         </div>
//       </SheetContent>
//     </Sheet>
//   )
// }
