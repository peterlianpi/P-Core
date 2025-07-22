// features/school-management/site/config.ts
"use client";

import { Settings2, GroupIcon, GraduationCap, Users } from "lucide-react";

type Organizations = {
  organization: {
    name: string;
    id: string;
    description?: string;
    startedAt?: Date | null;
    logoImage?: string;
    type?: string;
  };
  role?: string;
};

function getSharedNavItems(pathname: string, hasOrg: boolean) {
  const sharedItems = [];

  if (hasOrg) {
    sharedItems.push({
      title: "Organization",
      url: "/organization",
      icon: GroupIcon,
      isActive: pathname.startsWith("/organization"),
      items: [
        { title: "Organization", url: "/organization" },
        { title: "Manage Member", url: "/organization/manage-member" },
      ],
    });
  }

  sharedItems.push({
    title: "Settings",
    url: "/settings",
    icon: Settings2,
    isActive: pathname.startsWith("/settings"),
    items: [
      { title: "Profile", url: "/settings" },
      { title: "Account", url: "/settings/account" },
      { title: "Notifications", url: "/settings/notifications" },
    ],
  });

  return sharedItems;
}

export function getNavByRole(
  pathname: string,
  organizations: Organizations[],
  orgId: string
) {
  const hasOrg = organizations.length > 0;

  const currentOrg = organizations.find((o) => o.organization.id === orgId);
  const role = currentOrg?.role;
  const type = currentOrg?.organization?.type;

  const isSchool = type === "school";
  const isChurch = type === "church";

  // SCHOOL MANAGEMENT
  if (isSchool) {
    const isOwnerOrAdmin = role === "OWNER" || role === "ADMIN";
    const isTeacher = role === "TEACHER";

    const schoolItems = [
      {
        title: "School Management",
        url: "/school-management/overview",
        icon: GraduationCap,
        isActive: pathname.startsWith("/school-management"),
        items: [
          ...(isOwnerOrAdmin || isTeacher
            ? [
                { title: "Courses", url: "/school-management/courses" },
                {
                  title: "Lesson Books",
                  url: "/school-management/lesson-books",
                },
              ]
            : []),
          ...(isOwnerOrAdmin || isTeacher
            ? [{ title: "Students", url: "/school-management/students" }]
            : []),
          ...(isOwnerOrAdmin
            ? [
                { title: "Teachers", url: "/school-management/teachers" },
                { title: "Schedule", url: "/school-management/schedule" },
                {
                  title: "Transactions",
                  url: "/school-management/transactions",
                },
              ]
            : []),
        ],
      },
    ];
    return [...schoolItems, ...getSharedNavItems(pathname, hasOrg)];
  }

  // CHURCH MANAGEMENT
  if (isChurch) {
    const isOwnerOrAdmin = role === "OWNER" || role === "ADMIN";

    // CHURCH MANAGEMENT
    const churchItems = [
      {
        title: "Church Management",
        url: "#",
        icon: Users,
        isActive: pathname.startsWith("/members"),
        items: [
          { title: "Members", url: "/members" },
          ...(isOwnerOrAdmin
            ? [
                { title: "Add Member", url: "/members/add" },
                { title: "Homes", url: "/home" },
                { title: "Add Home", url: "/home/add" },
                { title: "Vengs", url: "/vengs" },
                { title: "Add Veng", url: "/vengs/add" },
                { title: "Khawks", url: "/khawks" },
                { title: "Add Khawk", url: "/khawks/add" },
              ]
            : []),
        ],
      },
    ];

    return [...churchItems, ...getSharedNavItems(pathname, hasOrg)];
  }

  return [...getSharedNavItems(pathname, hasOrg)];
}
