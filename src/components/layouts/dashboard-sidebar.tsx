"use client";

import { Routes } from "@/utils/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaUsers } from "react-icons/fa";

const userPaths = [Routes.admin.users, Routes.admin.userDetail];
const lessonPaths = [Routes.admin.lessons, Routes.admin.lessonDetail];

export const menuData = [
  {
    id: 1,
    name: "Users",
    path: Routes.admin.users,
    icon: <FaUsers className="h-auto w-5" />,
  },
  {
    id: 1,
    name: "Lessons",
    path: Routes.admin.lessons,
    icon: <FaUsers className="h-auto w-5" />,
  },
];

export default function DashboardSidebar({
  className,
}: {
  className?: string;
}) {
  const [pathname] = useState<string>();
  const routePathName = usePathname();

  const isActive = (itemPath: string) => {
    if (pathname === itemPath) {
      return true;
    }
    if (
      userPaths.includes(itemPath) &&
      userPaths.includes(routePathName ?? "")
    ) {
      return true;
    }
    if (
      lessonPaths.includes(itemPath) &&
      lessonPaths.includes(routePathName ?? "")
    ) {
      return true;
    }
    return false;
  };

  return (
    <div
      className={`relative block h-full min-h-screen w-72 overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800',
        ${className}`}
    >
      <ul className="space-y-2 font-medium mt-16">
        {menuData.map((item, index) => (
          <li key={`sidebar item ${index}`}>
            <Link
              href={item.path}
              className={`group flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 border-2 border-black',
                      ${
                        isActive(item.path)
                          ? "bg-gradient-to-r from-[#000] to-[#7b7b7b] text-white hover:bg-gray-900"
                          : null
                      }
                    `}  
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
