"use client";

import { useRouter } from "next/navigation";

export const useOnClose = () => {
  const router = useRouter();

  const onClose = () => {
    const pathSegments = window.location.pathname.split("/");
    pathSegments.pop(); // Remove the last segment (ID)
    const parentPath = pathSegments.join("/") || "/";

    router.push(parentPath); // Navigate to parent
  };

  return onClose;
};
