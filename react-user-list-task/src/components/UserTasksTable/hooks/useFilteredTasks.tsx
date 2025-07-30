import { useMemo } from "react";
import { StatusesEnum } from "../../../types/StatusesEnum";
import { TaskData } from "../../../types/TaskData";

const useFilteredTasks = (
  tasks: TaskData[],
  titleFilter: string,
  statusFilter: StatusesEnum,
  ownerFilter: number | null,
) => {
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        return task.title.toLowerCase().includes(titleFilter.toLowerCase());
      })
      .filter((task) => {
        if (statusFilter === StatusesEnum.COMPLETED) {
          return task.completed;
        }
        if (statusFilter === StatusesEnum.NOT_COMPLETED) {
          return !task.completed;
        }
        return true;
      })
      .filter((task) => {
        if (ownerFilter) return task.userId === ownerFilter;
        return true;
      });
  }, [tasks, titleFilter, statusFilter, ownerFilter]);

  return filteredTasks;
};

export default useFilteredTasks;
