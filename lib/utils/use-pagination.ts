import { useState } from "react";

export function usePagination() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const { pageSize, pageIndex } = pagination;
  return {
    pagination,
    onPaginationChange: setPagination,
    take: pageSize.toString(),
    skip: (pageSize * pageIndex).toString(),
  };
}
