// features/music-school-management/site/config.ts

import {
  BookIcon,
  UsersIcon,
  CalendarIcon,
  Settings2,
  LayoutDashboard,
  GroupIcon,
  DollarSignIcon,
  NotebookPenIcon,
  GraduationCap,
  UserRoundCog,
} from "lucide-react";

type Organizations = {
  organization: {
    name: string;
    id: string;
    description?: string;
    startedAt?: Date | null;
    logoImage?: string;
  };
  role?: string;
};

export function getNavByRole(pathname: string, organizations: Organizations[]) {
  const hasOrg = organizations.length > 0;

  if (organizations.some((org) => org.role === "OWNER")) {
    return [
      {
        title: "Overview",
        url: "/dashboard/overview",
        items: [
          {
            title: "Overview",
            url: "/dashboard/overview",
          },
        ],
        icon: LayoutDashboard,
        isActive: pathname.startsWith("/dashboard/overview"),
      },
      {
        title: "Courses",
        url: "/music-school-management/courses",
        icon: BookIcon,
        items: [
          { title: "Overview", url: "/music-school-management/courses" },
          {
            title: "Create Course",
            url: "/music-school-management/courses/add",
          },
        ],
        isActive: pathname.startsWith("/music-school-management/courses"),
      },
      {
        title: "Lesson Books",
        url: "/music-school-management/lesson-books",
        icon: NotebookPenIcon,
        isActive: pathname.startsWith("/music-school-management/lesson-books"),
        items: [
          { title: "Overview", url: "/music-school-management/lesson-books" },
          {
            title: "Create Lesson Book",
            url: "/music-school-management/lesson-books/add",
          },
        ],
      },
      {
        title: "Schedule",
        url: "/music-school-management/schedule",
        icon: CalendarIcon,
        isActive: pathname.startsWith("/music-school-management/schedule"),
        items: [
          { title: "Overview", url: "/music-school-management/schedule" },
          {
            title: "Create Schedule",
            url: "/music-school-management/schedule/add",
          },
        ],
      },
      {
        title: "Students",
        url: "/music-school-management/students",
        icon: GraduationCap,
        isActive: pathname.startsWith("/music-school-management/students"),
        items: [
          { title: "Overview", url: "/music-school-management/students" },
          {
            title: "Create Student",
            url: "/music-school-management/students/add",
          },
        ],
      },
      {
        title: "Teachers",
        url: "/music-school-management/teachers",
        icon: UserRoundCog,
        isActive: pathname.startsWith("/music-school-management/teachers"),
        items: [
          { title: "Overview", url: "/music-school-management/teachers" },
          {
            title: "Create Teacher",
            url: "/music-school-management/teachers/add",
          },
        ],
      },
      {
        title: "Transactions",
        url: "/music-school-management/transactions",
        icon: DollarSignIcon,
        isActive: pathname.startsWith("/music-school-management/transactions"),
        items: [
          { title: "Overview", url: "/music-school-management/transactions" },
          {
            title: "Create Transaction",
            url: "/music-school-management/transactions/add",
          },
        ],
      },
      ...(hasOrg
        ? [
            {
              title: "Organization",
              url: "/organization",
              icon: GroupIcon,
              isActive: pathname.startsWith("/organization"),
              items: [
                { title: "Organization", url: "/organization" },
                { title: "Manage Member", url: "/organization/manage-member" },
              ],
            },
          ]
        : []),
      {
        title: "Settings",
        url: "/settings",
        icon: Settings2,
        isActive: pathname.startsWith("/settings"),
        items: [
          { title: "Profile", url: "/settings" },
          { title: "Account", url: "/settings/account" },
          { title: "Notifications", url: "/settings/notifications" },
        ],
      },
    ];
  }

  if (organizations.some((org) => org.role === "TEACHER")) {
    return [
      {
        title: "Overview",
        url: "/dashboard/overview",
        icon: LayoutDashboard,
        items: [
          {
            title: "Dashboard",
            url: "/dashboard/overview",
          },
        ],
        isActive: pathname.startsWith("/dashboard/overview"),
      },
      {
        title: "My Courses",
        url: "/music-school-management/courses/my",
        icon: BookIcon,
        items: [
          {
            title: "Overview",
            url: "/music-school-management/courses/my",
          },
          {
            title: "Create Course",
            url: "/music-school-management/courses/my/add",
          },
        ],
        isActive: pathname.startsWith("/music-school-management/courses/my"),
      },
      {
        title: "My Students",
        url: "/music-school-management/students/my",
        icon: UsersIcon,
        items: [
          {
            title: "Overview",
            url: "/music-school-management/students/my",
          },
          {
            title: "Create Student",
            url: "/music-school-management/students/my/add",
          },
        ],
        isActive: pathname.startsWith("/music-school-management/students/my"),
      },
      {
        title: "My Schedule",
        url: "/music-school-management/schedule/my",
        icon: CalendarIcon,
        items: [
          {
            title: "Overview",
            url: "/music-school-management/schedule/my",
          },
          {
            title: "Create Schedule",
            url: "/music-school-management/schedule/my/add",
          },
        ],
        isActive: pathname.startsWith("/music-school-management/schedule/my"),
      },
      {
        title: "My Transactions",
        url: "/music-school-management/transactions/my",
        icon: DollarSignIcon,
        items: [
          {
            title: "Overview",
            url: "/music-school-management/transactions/my",
          },
          {
            title: "Create Transaction",
            url: "/music-school-management/transactions/my/add",
          },
        ],
        isActive: pathname.startsWith(
          "/music-school-management/transactions/my"
        ),
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings2,
        items: [
          { title: "Profile", url: "/settings" },
          { title: "Account", url: "/settings/account" },
          { title: "Notifications", url: "/settings/notifications" },
        ],
        isActive: pathname.startsWith("/settings"),
      },
    ];
  }

  return [];
}
