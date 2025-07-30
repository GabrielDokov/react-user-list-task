import { useState } from "react";
import { TaskData } from "../../../types/TaskData";

const usePagination = (tasks: TaskData[]) => {
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tasks.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedTasks = tasks.slice(startIndex, startIndex + PAGE_SIZE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    setCurrentPage,
    totalPages,
    paginatedTasks,
    currentPage,
    handleNextPage,
    handlePrevPage,
  };
};

export default usePagination;
