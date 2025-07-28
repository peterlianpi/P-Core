"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

/**
 * Enhanced Navigation Component with Smart Routing
 * 
 * Features:
 * 1. Detects hash fragments in URLs (e.g., /superadmin#users)
 * 2. Handles tab switching for same-page navigation
 * 3. Uses Next.js routing for different pages
 * 4. Provides visual feedback for active states
 * 5. Supports both route-based and hash-based navigation
 */

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname()
  const router = useRouter()

  /**
   * Smart navigation handler that determines whether to:
   * 1. Navigate to a new route (different page)
   * 2. Scroll to a section with hash (same page)
   * 3. Trigger tab switching (for dashboard-like interfaces)
   */
  const handleNavigation = (url: string, event: React.MouseEvent) => {
    // Check if URL contains a hash fragment
    const hasHash = url.includes('#')
    
    if (hasHash) {
      const [basePath, hash] = url.split('#')
      
      // If we're already on the base path, just handle the hash
      if (pathname === basePath || (basePath === '' && pathname === '/')) {
        event.preventDefault()
        
        // Try to find and trigger tab switching first
        const tabElement = document.querySelector(`[data-value="${hash}"]`) as HTMLElement
        if (tabElement) {
          // This is likely a tab interface - trigger the tab
          tabElement.click()
        } else {
          // Fallback to scrolling to the element
          const targetElement = document.getElementById(hash)
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' })
          }
        }
        
        // Update URL without page reload
        window.history.pushState(null, '', url)
        return
      }
    }
    
    // For all other cases, use Next.js routing
    // The Link component will handle this automatically
  }

  /**
   * Enhanced active state detection that considers:
   * 1. Exact path matches
   * 2. Path prefixes
   * 3. Hash fragments
   * 4. Current tab state
   */
  const isLinkActive = (url: string): boolean => {
    // Handle hash-based URLs
    if (url.includes('#')) {
      const [basePath, hash] = url.split('#')
      const currentBasePath = pathname
      
      // Check if we're on the same base path
      if (currentBasePath === basePath || (basePath === '' && currentBasePath === '/')) {
        // Check if the hash matches current tab or URL hash
        const currentHash = window.location.hash.slice(1)
        if (currentHash === hash) return true
        
        // Check if tab is active
        const tabElement = document.querySelector(`[data-value="${hash}"][data-state="active"]`)
        return !!tabElement
      }
      
      return false
    }
    
    // Standard path-based matching
    return pathname === url || pathname.startsWith(url + '/')
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          // Enhanced active state detection for main items
          const isItemActive = item.isActive || 
            isLinkActive(item.url) || 
            item.items?.some(subItem => isLinkActive(subItem.url))

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isItemActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton 
                    tooltip={item.title}
                    isActive={isItemActive}
                    asChild
                  >
                    <Link 
                      href={item.url}
                      onClick={(e) => handleNavigation(item.url, e)}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      {item.items && item.items.length > 0 && (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {item.items && item.items.length > 0 && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const isSubItemActive = isLinkActive(subItem.url)
                        
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton 
                              asChild
                              isActive={isSubItemActive}
                            >
                              <Link 
                                href={subItem.url}
                                onClick={(e) => handleNavigation(subItem.url, e)}
                              >
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
