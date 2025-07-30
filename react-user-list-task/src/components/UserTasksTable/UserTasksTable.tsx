import { Button, Col, Flex, Input, Row, Select, Switch, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchTasksThunk } from "../../features/thunks/fetchTasksThunk";
import { fetchUsersThunk } from "../../features/thunks/fetchUsersThunk";
import usePagination from "./hooks/usePagination";
import { StatusesEnum } from "../../types/StatusesEnum";
import { toggleTaskStatus } from "../../features/slices/tasksSlice";
import useFilteredTasks from "./hooks/useFilteredTasks";

const UserTasks = () => {
  const [titleFilter, setTitleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState(StatusesEnum.ALL);
  const [ownerFilter, setOwnerFilter] = useState<number | null>(null);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const users = useAppSelector((state) => state.userInfo.users);
  const dispatch = useAppDispatch();
  const filteredTasks = useFilteredTasks(tasks, titleFilter, statusFilter, ownerFilter);
  const { paginatedTasks, totalPages, currentPage, handleNextPage, handlePrevPage } =
    usePagination(filteredTasks);

  useEffect(() => {
    dispatch(fetchTasksThunk());
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  return (
    <>
      <Row gutter={16} style={{ marginBottom: "24px" }}>
        <Col>
          <Input
            placeholder="Filter by title..."
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            allowClear
          />
        </Col>
        <Col>
          <Select
            placeholder="Filter by status..."
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            options={Object.values(StatusesEnum).map((status) => ({
              value: status,
              label: status,
            }))}
          />
        </Col>
        <Col>
          <Select
            placeholder="Filter by owner..."
            value={ownerFilter}
            onChange={(value) => setOwnerFilter(value)}
            allowClear
            options={users.map((user) => ({
              value: user.id,
              label: user.name,
            }))}
          />
        </Col>
      </Row>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#fafafa", borderBottom: "1px solid #f0f0f0" }}>
            <th style={{ padding: "16px", textAlign: "left" }}>Title</th>
            <th style={{ padding: "16px", textAlign: "left" }}>Owner</th>
            <th style={{ padding: "16px", textAlign: "left" }}>Status</th>
            <th style={{ padding: "16px", textAlign: "left" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTasks.map((task) => {
            const owner = users.find((user) => user.id === task.userId);

            return (
              <tr key={task.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td>{task.title}</td>
                <td>{owner?.name}</td>
                <td>
                  <Tag color={task.completed ? "success" : "error"}>
                    {task.completed ? "Completed" : "Not Completed"}
                  </Tag>
                </td>
                <td style={{ padding: "16px" }}>
                  <Switch
                    checked={task.completed}
                    onChange={() => dispatch(toggleTaskStatus(task.id))}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Flex justify="center" align="center" style={{ marginTop: "24px" }}>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Typography.Text style={{ margin: "0 16px" }}>
          Page {currentPage} of {totalPages}
        </Typography.Text>
        <Button onClick={handleNextPage} disabled={currentPage >= totalPages}>
          Next
        </Button>
      </Flex>
    </>
  );
};
export default UserTasks;
